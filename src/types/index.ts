// Core data types for the elderly learning app

export interface Module {
  id: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
  icon: string;
  order: number;
  lessons: Lesson[];
  badge?: Badge;
}

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
  contentType: 'simulation' | 'tutorial' | 'practice';
  estimatedMinutes: number;
  steps: LessonStep[];
  quiz: Quiz;
  requiredScore: number; // 80% by default
}

export interface LessonStep {
  id: string;
  type: 'text' | 'image' | 'interactive' | 'video';
  contentEn: string;
  contentZh: string;
  imageUrl?: string;
  interactionType?: 'click' | 'type' | 'drag' | 'select';
  targetElement?: string;
  hint?: {
    en: string;
    zh: string;
  };
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: QuizQuestion[];
  passingScore: number; // Percentage (default 80)
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'interactive';
  questionEn: string;
  questionZh: string;
  options?: QuizOption[];
  correctAnswer: string | string[];
  explanationEn: string;
  explanationZh: string;
  points: number; // 5 points per correct answer
}

export interface QuizOption {
  id: string;
  textEn: string;
  textZh: string;
}

export interface Badge {
  id: string;
  nameEn: string;
  nameZh: string;
  descriptionEn: string;
  descriptionZh: string;
  icon: string;
  moduleId?: string;
  requirement: {
    type: 'complete-module' | 'perfect-score' | 'streak' | 'all-modules';
    value?: number;
  };
}

// User progress tracking
export interface UserProgress {
  userId: string;
  completedLessons: string[]; // Lesson IDs
  currentLesson: string | null;
  unlockedLessons: string[]; // Sequential unlocking
  scores: Record<string, LessonScore>; // Lesson ID -> Score
  earnedBadges: string[]; // Badge IDs
  totalPoints: number;
  lastActive: Date;
  streak: number;
  preferences: UserPreferences;
}

export interface LessonScore {
  lessonId: string;
  score: number; // Percentage
  points: number; // 30 base + 5 per correct + 20 perfect bonus
  attempts: number;
  completedAt: Date;
  isPerfect: boolean; // 100% score
}

export interface UserPreferences {
  language: 'en' | 'zh';
  fontSize: 'normal' | 'large' | 'extra-large';
  theme: 'light' | 'dark' | 'high-contrast';
  soundEnabled: boolean;
  autoPlayVideos: boolean;
}

// Points system constants
export const POINTS = {
  BASE_COMPLETION: 30,
  PER_CORRECT_ANSWER: 5,
  PERFECT_SCORE_BONUS: 20,
} as const;

// Passing score threshold
export const PASSING_SCORE_PERCENTAGE = 80;
