
export const GOOGLE_SEARCH_BASICS = {
  en: {
    // Steps (only 4 steps now!)
    step0: "Tap the search bar to start searching.",
    step1: "Great! These are suggestions. Tap 'Weather' to search for it.",
    step2: "Perfect! Now tap the search button (magnifying glass) to search.",
    step3: "Excellent! Google found the weather for you.",

    // UI
    searchPlaceholder: "Search Google or type URL",
    finishButton: "Finish Lesson",

    // Autocomplete Suggestions
    suggestionWeather: "Weather",
    suggestionNews: "News",
    suggestionClinic: "Nearest clinic",
    suggestionRecipe: "Cooking recipe",

    // Weather Result
    weatherTodayTemp: "28°C",
    weatherTodayCondition: "Sunny",
    weatherTomorrowTemp: "26°C",
    weatherTomorrowCondition: "Cloudy",
    weatherLocation: "Bukit Mertajam, Penang",
    weatherUpdated: "Updated 2 hours ago",
  },

  zh: {
    // Steps
    step0: "点击搜索栏开始搜索。",
    step1: '太好了！这些是建议。点击"天气"进行搜索。',
    step2: "完美！现在点击搜索按钮（放大镜）进行搜索。",
    step3: "太棒了！谷歌为您找到了天气信息。",

    // UI
    searchPlaceholder: "搜索谷歌或输入网址",
    finishButton: "完成课程",

    // Autocomplete Suggestions
    suggestionWeather: "天气",
    suggestionNews: "新闻",
    suggestionClinic: "最近的诊所",
    suggestionRecipe: "烹饪食谱",

    // Weather Result
    weatherTodayTemp: "28°C",
    weatherTodayCondition: "晴朗",
    weatherTomorrowTemp: "26°C",
    weatherTomorrowCondition: "多云",
    weatherLocation: "武吉美达，槟城",
    weatherUpdated: "2小时前更新",
  }
};

// ========================================
// LESSON 2: GOOGLE VOICE SEARCH
// ========================================
export const GOOGLE_VOICE_SEARCH = {
  en: {
    // Steps (only 3 steps now!)
    step0: "You can search by voice! Tap the microphone icon 🎤",
    step1: "Perfect! Now speak into your device.",
    step2: "Excellent! Google heard you and found the weather.",

    // UI
    searchPlaceholder: "Search Google or type URL",
    finishButton: "Finish Lesson",

    // Voice
    voicePrompt: "Say: \"Weather\"",
    searchQuery: "Weather",

    // Weather Result
    weatherTodayTemp: "28°C",
    weatherTodayCondition: "Sunny",
    weatherTomorrowTemp: "26°C",
    weatherTomorrowCondition: "Cloudy",
    weatherLocation: "Bukit Mertajam, Penang",
    weatherUpdated: "Updated 2 hours ago",
  },

  zh: {
    // Steps
    step0: "您可以使用语音搜索！点击麦克风图标 🎤",
    step1: "完美！现在对着您的设备说话。",
    step2: "太棒了！谷歌听到了您的话并找到了天气信息。",

    // UI
    searchPlaceholder: "搜索谷歌或输入网址",
    finishButton: "完成课程",

    // Voice
    voicePrompt: '说："天气"',
    searchQuery: "天气",

    // Weather Result
    weatherTodayTemp: "28°C",
    weatherTodayCondition: "晴朗",
    weatherTomorrowTemp: "26°C",
    weatherTomorrowCondition: "多云",
    weatherLocation: "武吉美达，槟城",
    weatherUpdated: "2小时前更新",
  }
};

// ========================================
// LESSON 3: GOOGLE FILTER TABS
// ========================================
export const GOOGLE_FILTER_TABS = {
  en: {
    // Steps (only 3 steps!)
    step0: "Google has different types of results. Try tapping 'Images' to see pictures.",
    step1: "Great! Now try tapping 'News' to see news articles.",
    step2: "Perfect! You can refresh results by tapping the refresh button.",
    step3: "Excellent! You learned how to switch between different result types.",

    // UI
    searchQuery: "Weather",
    refreshButton: "Refresh Results",
    refreshSuccess: "Results refreshed!",
    finishButton: "Finish Lesson",

    // Weather Result (for All tab)
    weatherTodayTemp: "28°C",
    weatherTodayCondition: "Sunny",
    weatherTomorrowTemp: "26°C",
    weatherTomorrowCondition: "Cloudy",
    weatherLocation: "Bukit Mertajam, Penang",
    weatherUpdated: "Updated 2 hours ago",

    // News Results
    newsHeadline1: "Local Weather Patterns Changing",
    newsHeadline2: "Temperature Records This Week",
    newsHeadline3: "Climate Update for Malaysia",
  },

  zh: {
    // Steps
    step0: '谷歌有不同类型的结果。尝试点击"图片"查看图片。',
    step1: '太好了！现在尝试点击"新闻"查看新闻文章。',
    step2: "完美！您可以通过点击刷新按钮来刷新结果。",
    step3: "太棒了！您学会了如何切换不同类型的结果。",

    // UI
    searchQuery: "天气",
    refreshButton: "刷新结果",
    refreshSuccess: "结果已刷新！",
    finishButton: "完成课程",

    // Weather Result (for All tab)
    weatherTodayTemp: "28°C",
    weatherTodayCondition: "晴朗",
    weatherTomorrowTemp: "26°C",
    weatherTomorrowCondition: "多云",
    weatherLocation: "武吉美达，槟城",
    weatherUpdated: "2小时前更新",

    // News Results
    newsHeadline1: "当地天气模式变化",
    newsHeadline2: "本周温度记录",
    newsHeadline3: "马来西亚气候更新",
  }
};


export const lessonTexts = {
  GOOGLE_SEARCH_BASICS,
  GOOGLE_VOICE_SEARCH,
  GOOGLE_FILTER_TABS,
};

export const getLessonTexts = (key: string, language: 'en' | 'zh') => {
  return lessonTexts[key as keyof typeof lessonTexts]?.[language] || {};
};

export const LESSON_KEYS = {
  GOOGLE_SEARCH_BASICS: 'GOOGLE_SEARCH_BASICS',
  GOOGLE_VOICE_SEARCH: 'GOOGLE_VOICE_SEARCH',
  GOOGLE_FILTER_TABS: 'GOOGLE_FILTER_TABS',
};