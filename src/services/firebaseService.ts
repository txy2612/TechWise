// src/services/firebaseService.ts
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  increment,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface UserProgress {
  completedLessons: string[];
  totalPoints: number;
  earnedBadges: string[];
  currentStreak: number;
  lastActivityDate: string;
  createdAt: any;
  updatedAt: any;
}

/**
 * Initialize user progress document in Firestore
 */
export const initializeUserProgress = async (userId: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      completedLessons: [],
      totalPoints: 0,
      earnedBadges: [],
      currentStreak: 0,
      lastActivityDate: new Date().toISOString(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }
};

/**
 * Load user progress from Firestore
 */
export const loadUserProgress = async (userId: string): Promise<UserProgress | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserProgress;
    }
    
    return null;
  } catch (error) {
    console.error('Error loading user progress:', error);
    return null;
  }
};

/**
 * Mark a lesson as completed in Firestore
 */
export const syncLessonCompletion = async (
  userId: string, 
  lessonId: string, 
  points: number
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    
    await updateDoc(userRef, {
      completedLessons: arrayUnion(lessonId),
      totalPoints: increment(points),
      lastActivityDate: new Date().toISOString(),
      updatedAt: serverTimestamp()
    });

    console.log(`✅ Lesson ${lessonId} synced to Firebase`);
  } catch (error) {
    console.error('Error syncing lesson completion:', error);
    throw error;
  }
};

/**
 * Add a badge to user's earned badges
 */
export const syncBadgeEarned = async (
  userId: string, 
  badgeId: string
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    
    await updateDoc(userRef, {
      earnedBadges: arrayUnion(badgeId),
      updatedAt: serverTimestamp()
    });

    console.log(`🏆 Badge ${badgeId} synced to Firebase`);
  } catch (error) {
    console.error('Error syncing badge:', error);
    throw error;
  }
};

/**
 * Update user's streak
 */
export const syncStreak = async (
  userId: string, 
  streak: number
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    
    await updateDoc(userRef, {
      currentStreak: streak,
      updatedAt: serverTimestamp()
    });

    console.log(`🔥 Streak ${streak} synced to Firebase`);
  } catch (error) {
    console.error('Error syncing streak:', error);
    throw error;
  }
};

/**
 * Sync entire progress state to Firebase
 */
export const syncEntireProgress = async (
  userId: string,
  progress: {
    completedLessons: string[];
    totalPoints: number;
    earnedBadges: string[];
    currentStreak: number;
  }
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    
    await updateDoc(userRef, {
      ...progress,
      lastActivityDate: new Date().toISOString(),
      updatedAt: serverTimestamp()
    });

    console.log('✅ Full progress synced to Firebase');
  } catch (error) {
    console.error('Error syncing full progress:', error);
    throw error;
  }
};

/**
 * Check if user needs to sync progress
 * (useful for offline/online detection)
 */
export const needsSync = (
  localProgress: UserProgress,
  cloudProgress: UserProgress
): boolean => {
  // Compare arrays and numbers
  const lessonsDifferent = 
    JSON.stringify(localProgress.completedLessons.sort()) !== 
    JSON.stringify(cloudProgress.completedLessons.sort());
  
  const pointsDifferent = localProgress.totalPoints !== cloudProgress.totalPoints;
  
  const badgesDifferent = 
    JSON.stringify(localProgress.earnedBadges.sort()) !== 
    JSON.stringify(cloudProgress.earnedBadges.sort());

  return lessonsDifferent || pointsDifferent || badgesDifferent;
};

/**
 * Merge local and cloud progress (in case of conflicts)
 */
export const mergeProgress = (
  localProgress: UserProgress,
  cloudProgress: UserProgress
): UserProgress => {
  // Merge completed lessons (union of both)
  const completedLessons = [
    ...new Set([
      ...localProgress.completedLessons,
      ...cloudProgress.completedLessons
    ])
  ];

  // Take maximum points
  const totalPoints = Math.max(
    localProgress.totalPoints,
    cloudProgress.totalPoints
  );

  // Merge badges (union of both)
  const earnedBadges = [
    ...new Set([
      ...localProgress.earnedBadges,
      ...cloudProgress.earnedBadges
    ])
  ];

  // Take maximum streak
  const currentStreak = Math.max(
    localProgress.currentStreak,
    cloudProgress.currentStreak
  );

  return {
    completedLessons,
    totalPoints,
    earnedBadges,
    currentStreak,
    lastActivityDate: new Date().toISOString(),
    createdAt: cloudProgress.createdAt,
    updatedAt: cloudProgress.updatedAt
  };
};