import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      modules: 'Modules',
      progress: 'My Progress',
      settings: 'Settings',
      backToModules: 'Back to Modules',
      back: 'Back',
      
      // Common
      start: 'Start',
      startModule: 'Start Module',
      continue: 'Continue',
      continueLearning: 'Continue Learning',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      complete: 'Complete',
      completeLesson: 'Complete Lesson',
      locked: 'Locked',
      unlocked: 'Unlocked',
      completed: 'Completed',
      resume: 'Resume',
      replay: 'Replay',
      points: 'points',
      
      // Progress
      progressLabel: 'Progress',
      totalPoints: 'Total Points',
      completedLessons: 'Completed Lessons',
      earnedBadges: 'Earned Badges',
      currentStreak: 'Day Streak',
      yourBadges: 'Your Badges',
      earned: 'earned',
      moduleCompleted: 'Module Completed!',
      greatJob: 'Great job! You\'ve completed all lessons.',
      allLessons: 'All Lessons',
      
      // Lesson
      estimatedTime: 'Estimated Time',
      minutes: 'minutes',
      startLesson: 'Start Lesson',
      continueLesson: 'Continue Lesson',
      retakeQuiz: 'Retake Quiz',
      skipLesson: 'I already know this - Skip to quiz',
      tutorial: 'This is a tutorial lesson. Content will be added here.',
      
      // Quiz
      quiz: 'Quiz',
      question: 'Question',
      of: 'of',
      yourScore: 'Your Score',
      passed: 'Passed!',
      failed: 'Try Again',
      perfectScore: 'Perfect Score!',
      bonusPoints: 'Bonus Points',
      quizPlaceholder: 'Quiz component will be implemented here',
      
      // Settings
      language: 'Language',
      english: 'English',
      chinese: 'Chinese',
      fontSize: 'Font Size',
      normal: 'Normal',
      large: 'Large',
      extraLarge: 'Extra Large',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      highContrast: 'High Contrast',
      sound: 'Sound Effects',
      autoPlay: 'Auto-play Videos',
      
      // Module names (keep as is - these are brand names)
      moduleGmail: 'Gmail Basics',
      moduleSearch: 'Google Search',
      moduleMaps: 'Google Maps',
      moduleSafety: 'Online Safety',
      moduleSmartphone: 'Smartphone Basics',
      moduleTools: 'Everyday Tools',
      
      // Messages
      unlockNextLesson: 'Complete this lesson to unlock the next one',
      completedAllLessons: 'Congratulations! You\'ve completed all lessons!',
      keepPracticing: 'Keep practicing to master your skills!',
    },
  },
  zh: {
    translation: {
      // Navigation
      home: '首页',
      modules: '课程模块',
      progress: '我的进度',
      settings: '设置',
      backToModules: '返回课程模块',
      back: '返回',
      
      // Common
      start: '开始',
      startModule: '开始课程模块',
      continue: '继续',
      continueLearning: '继续学习',
      next: '下一步',
      previous: '上一步',
      submit: '提交',
      complete: '完成',
      completeLesson: '完成课程',
      locked: '已锁定',
      unlocked: '已解锁',
      completed: '已完成',
      resume: '继续',
      replay: '重播',
      points: '积分',
      
      // Progress
      progressLabel: '进度',
      totalPoints: '总积分',
      completedLessons: '已完成课程',
      earnedBadges: '获得徽章',
      currentStreak: '连续天数',
      yourBadges: '您的徽章',
      earned: '已获得',
      moduleCompleted: '课程模块已完成！',
      greatJob: '太棒了！您已完成所有课程。',
      allLessons: '所有课程',
      
      // Lesson
      estimatedTime: '预计时间',
      minutes: '分钟',
      startLesson: '开始课程',
      continueLesson: '继续课程',
      retakeQuiz: '重新测验',
      skipLesson: '我已经知道了 - 跳到测验',
      tutorial: '这是一个教程课程。内容将在此处添加。',
      
      // Quiz
      quiz: '测验',
      question: '问题',
      of: '/',
      yourScore: '你的分数',
      passed: '通过！',
      failed: '再试一次',
      perfectScore: '满分！',
      bonusPoints: '奖励积分',
      quizPlaceholder: '测验组件将在此处实现',
      
      // Settings
      language: '语言',
      english: 'English',
      chinese: '中文',
      fontSize: '字体大小',
      normal: '正常',
      large: '大',
      extraLarge: '特大',
      theme: '主题',
      light: '浅色',
      dark: '深色',
      highContrast: '高对比度',
      sound: '音效',
      autoPlay: '自动播放视频',
      
      // Module names (keep English brand names for clarity)
      moduleGmail: 'Gmail 基础',
      moduleSearch: 'Google 搜索',
      moduleMaps: 'Google 地图',
      moduleSafety: '网络安全',
      moduleSmartphone: '智能手机基础',
      moduleTools: '日常工具',
      
      // Messages
      unlockNextLesson: '完成此课程以解锁下一课',
      completedAllLessons: '恭喜！你已完成所有课程！',
      keepPracticing: '继续练习以掌握技能！',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
