import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import localforage from 'localforage';
import type { UserProgress, LessonScore } from '../types';
import { POINTS } from '../types';
import { modules } from '../data/modules';
import { useAuth } from './AuthContext';
import {
  initializeUserProgress,
  loadUserProgress,
  syncLessonCompletion,
  syncBadgeEarned,
  syncEntireProgress,
  mergeProgress as mergeFirebaseProgress
} from '../services/firebaseService';

interface ProgressContextType {
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => Promise<void>;
  completeLesson: (lessonId: string, score: number, isPerfect: boolean) => Promise<void>;
  unlockNextLesson: (currentLessonId: string) => Promise<void>;
  earnBadge: (badgeId: string) => Promise<void>;
  isLessonUnlocked: (lessonId: string) => boolean;
  isLessonCompleted: (lessonId: string) => boolean;
  getLessonScore: (lessonId: string) => LessonScore | undefined;
  calculatePoints: (correctAnswers: number, totalQuestions: number, isPerfect: boolean) => number;
  resetProgress: () => Promise<void>;
  isSyncing: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Initialize localforage for offline storage
localforage.config({
  name: 'ElderlyLearningApp',
  storeName: 'progress',
});

const defaultProgress: UserProgress = {
  userId: 'local-user',
  completedLessons: [],
  currentLesson: modules[0]?.lessons[0]?.id || null,
  unlockedLessons: [modules[0]?.lessons[0]?.id || ''],
  scores: {},
  earnedBadges: [],
  totalPoints: 0,
  lastActive: new Date(),
  streak: 0,
  preferences: {
    language: 'en',
    fontSize: 'normal',
    theme: 'light',
    soundEnabled: true,
    autoPlayVideos: false,
  },
};

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load progress from both localforage and Firebase on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        // Load from localforage first (fast, offline-capable)
        const localData = await localforage.getItem<UserProgress>('userProgress');
        const localProgress = localData || defaultProgress;

        if (user) {
          // User is logged in - sync with Firebase
          console.log('🔄 Loading progress from Firebase...');
          await initializeUserProgress(user.uid);
          const cloudProgress = await loadUserProgress(user.uid);

          if (cloudProgress) {
            // Merge local and cloud data (union of both)
            const merged = mergeFirebaseProgress(
              {
                ...localProgress,
                completedLessons: localProgress.completedLessons,
                totalPoints: localProgress.totalPoints,
                earnedBadges: localProgress.earnedBadges,
                currentStreak: localProgress.streak,
                lastActivityDate: localProgress.lastActive.toISOString(),
                createdAt: null,
                updatedAt: null
              },
              cloudProgress
            );

            setProgress({
              ...localProgress,
              completedLessons: merged.completedLessons,
              totalPoints: merged.totalPoints,
              earnedBadges: merged.earnedBadges,
              streak: merged.currentStreak,
            });

            // Sync merged data back to Firebase
            await syncEntireProgress(user.uid, {
              completedLessons: merged.completedLessons,
              totalPoints: merged.totalPoints,
              earnedBadges: merged.earnedBadges,
              currentStreak: merged.currentStreak,
            });

            console.log('✅ Progress loaded and synced from Firebase');
          } else {
            setProgress(localProgress);
            console.log('📱 Using local storage (no cloud data)');
          }
        } else {
          // No user logged in - use local storage only
          setProgress(localProgress);
          console.log('📱 Using local storage (offline mode)');
        }
      } catch (error) {
        console.error('❌ Error loading progress:', error);
        
        // Fallback to localStorage
        const localData = await localforage.getItem<UserProgress>('userProgress');
        if (localData) {
          setProgress(localData);
        }
      } finally {
        setIsLoaded(true);
      }
    };
    
    loadProgress();
  }, [user]);

  // Save progress to localforage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      const saveProgress = async () => {
        try {
          await localforage.setItem('userProgress', progress);
        } catch (error) {
          console.error('Error saving progress:', error);
        }
      };
      saveProgress();
    }
  }, [progress, isLoaded]);

  const updateProgress = async (updates: Partial<UserProgress>) => {
    const newProgress = {
      ...progress,
      ...updates,
      lastActive: new Date(),
    };
    setProgress(newProgress);

    // Sync to Firebase if user is logged in
    if (user) {
      setIsSyncing(true);
      try {
        await syncEntireProgress(user.uid, {
          completedLessons: newProgress.completedLessons,
          totalPoints: newProgress.totalPoints,
          earnedBadges: newProgress.earnedBadges,
          currentStreak: newProgress.streak,
        });
      } catch (error) {
        console.error('Failed to sync progress update:', error);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const calculatePoints = (correctAnswers: number, _totalQuestions: number, isPerfect: boolean): number => {
    const basePoints = POINTS.BASE_COMPLETION;
    const answerPoints = correctAnswers * POINTS.PER_CORRECT_ANSWER;
    const bonusPoints = isPerfect ? POINTS.PERFECT_SCORE_BONUS : 0;
    return basePoints + answerPoints + bonusPoints;
  };

  const completeLesson = async (lessonId: string, score: number, isPerfect: boolean) => {
    // Calculate total questions from the lesson's quiz
    const lessonData = modules
      .flatMap((m) => m.lessons)
      .find((l) => l.id === lessonId);
    
    const totalQuestions = lessonData?.quiz.questions.length || 0;
    const correctAnswers = Math.round((score / 100) * totalQuestions);
    const points = calculatePoints(correctAnswers, totalQuestions, isPerfect);

    const lessonScore: LessonScore = {
      lessonId,
      score,
      points,
      attempts: (progress.scores[lessonId]?.attempts || 0) + 1,
      completedAt: new Date(),
      isPerfect,
    };

    const newCompletedLessons = progress.completedLessons.includes(lessonId)
      ? progress.completedLessons
      : [...progress.completedLessons, lessonId];

    const newProgress = {
      ...progress,
      completedLessons: newCompletedLessons,
      scores: {
        ...progress.scores,
        [lessonId]: lessonScore,
      },
      totalPoints: progress.totalPoints + points,
      lastActive: new Date(),
    };

    setProgress(newProgress);

    // Sync to Firebase if user is logged in
    if (user && !progress.completedLessons.includes(lessonId)) {
      setIsSyncing(true);
      try {
        await syncLessonCompletion(user.uid, lessonId, points);
        console.log(`✅ Lesson ${lessonId} synced to Firebase`);
      } catch (error) {
        console.error('❌ Failed to sync lesson completion:', error);
      } finally {
        setIsSyncing(false);
      }
    }

    // Auto-unlock next lesson if passed
    if (score >= 80) {
      await unlockNextLesson(lessonId);
    }
  };

  const unlockNextLesson = async (currentLessonId: string) => {
    let nextLessonId: string | null = null;
    
    for (const module of modules) {
      const currentIndex = module.lessons.findIndex((l) => l.id === currentLessonId);
      if (currentIndex !== -1) {
        if (currentIndex < module.lessons.length - 1) {
          nextLessonId = module.lessons[currentIndex + 1].id;
        } else {
          const nextModule = modules.find((m) => m.order === module.order + 1);
          if (nextModule && nextModule.lessons.length > 0) {
            nextLessonId = nextModule.lessons[0].id;
          }
        }
        break;
      }
    }

    if (nextLessonId && !progress.unlockedLessons.includes(nextLessonId)) {
      setProgress((prev) => ({
        ...prev,
        unlockedLessons: [...prev.unlockedLessons, nextLessonId!],
        currentLesson: nextLessonId,
      }));
    }
  };

  const earnBadge = async (badgeId: string) => {
    if (!progress.earnedBadges.includes(badgeId)) {
      const newProgress = {
        ...progress,
        earnedBadges: [...progress.earnedBadges, badgeId],
      };
      setProgress(newProgress);

      // Sync to Firebase if user is logged in
      if (user) {
        setIsSyncing(true);
        try {
          await syncBadgeEarned(user.uid, badgeId);
          console.log(`✅ Badge ${badgeId} synced to Firebase`);
        } catch (error) {
          console.error('❌ Failed to sync badge:', error);
        } finally {
          setIsSyncing(false);
        }
      }
    }
  };

  const isLessonUnlocked = (lessonId: string): boolean => {
    return progress.unlockedLessons.includes(lessonId);
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return progress.completedLessons.includes(lessonId);
  };

  const getLessonScore = (lessonId: string): LessonScore | undefined => {
    return progress.scores[lessonId];
  };

  const resetProgress = async () => {
    setProgress(defaultProgress);
    await localforage.removeItem('userProgress');
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        updateProgress,
        completeLesson,
        unlockNextLesson,
        earnBadge,
        isLessonUnlocked,
        isLessonCompleted,
        getLessonScore,
        calculatePoints,
        resetProgress,
        isSyncing,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};