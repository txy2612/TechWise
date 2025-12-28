

export const googleSearchTexts = {
  en: {
    // Intro
    introTitle: 'Learning Google Search',
    introText: 'Master the art of searching for information online!',
    introFeatures: 'You will learn to:',
    feature1: '🔍 Type search queries',
    feature2: '💡 Use search suggestions',
    feature3: '🎤 Understand voice and image search',
    feature4: '📄 Read and click search results',
    startLesson: 'Start Lesson',
    
    // Step 1: Search Bar
    step1Title: 'This is the Search Bar',
    step1Text: 'Type any question or topic you want to learn about here.',
    step1Example: 'Try: "weather tomorrow", "ABC soup recipe", or "hospital near me"',
    continue: 'Continue',
    
    // Step 2: Search Demo
    step2Hint: 'Type "weather tomorrow" and press Enter or click Google Search →',
    searchPlaceholder: 'Search Google or type a URL',
    googleSearch: 'Google Search',
    feelingLucky: "I'm Feeling Lucky",
    
    // Step 3: Suggestions
    step3Title: 'Search Suggestions',
    step3Text: 'When you click the search bar, Google shows popular searches. Click any suggestion to search quickly!',
    
    // Step 4: View Results
    step4Text: 'Great! These are your search results. Each result shows a title, website, and description.',
    step4Hint: 'Scroll down to see more results →',
    
    // Step 5: Voice & Image
    step5Text: 'These buttons let you search by voice or image.',
    step5Hint: 'Voice search: Speak your question. Image search: Upload a picture to find similar images.',
    voiceSearch: 'Search by voice',
    imageSearch: 'Search by image',
    
    // Step 6: Click Results
    step6Text: 'Click on any blue title to open that website.',
    step6Hint: 'Try clicking on the first result! →',
    
    // Other UI
    popularSearches: 'Popular searches:',
    
    // Complete
    congratulations: 'Well Done!',
    completeText: 'You now know how to search for anything on Google!',
    finishLesson: 'Finish Lesson',
  },
  zh: {
    // Intro
    introTitle: '学习 Google 搜索',
    introText: '掌握在线搜索信息的技巧！',
    introFeatures: '您将学习：',
    feature1: '🔍 输入搜索查询',
    feature2: '💡 使用搜索建议',
    feature3: '🎤 了解语音和图片搜索',
    feature4: '📄 阅读和点击搜索结果',
    startLesson: '开始课程',
    
    // Step 1: Search Bar
    step1Title: '这是搜索栏',
    step1Text: '在这里输入您想了解的任何问题或主题。',
    step1Example: '试试："明天天气"、"ABC汤食谱"或"附近医院"',
    continue: '继续',
    
    // Step 2: Search Demo
    step2Hint: '输入"明天天气"并按回车或点击谷歌搜索 →',
    searchPlaceholder: '搜索谷歌或输入网址',
    googleSearch: '谷歌搜索',
    feelingLucky: '手气不错',
    
    // Step 3: Suggestions
    step3Title: '搜索建议',
    step3Text: '当您点击搜索栏时，谷歌会显示热门搜索。点击任何建议即可快速搜索！',
    
    // Step 4: View Results
    step4Text: '太好了！这些是您的搜索结果。每个结果显示标题、网站和描述。',
    step4Hint: '向下滚动查看更多结果 →',
    
    // Step 5: Voice & Image
    step5Text: '这些按钮让您通过语音或图片进行搜索。',
    step5Hint: '语音搜索：说出您的问题。图片搜索：上传图片以查找相似图片。',
    voiceSearch: '语音搜索',
    imageSearch: '以图搜图',
    
    // Step 6: Click Results
    step6Text: '点击任何蓝色标题以打开该网站。',
    step6Hint: '试试点击第一个结果！→',
    
    // Other UI
    popularSearches: '热门搜索：',
    
    // Complete
    congratulations: '做得好！',
    completeText: '您现在知道如何在谷歌上搜索任何内容了！',
    finishLesson: '完成课程',
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
  GOOGLE_VOICE_SEARCH,
  GOOGLE_FILTER_TABS,
};

export const getLessonTexts = (key: string, language: 'en' | 'zh') => {
  return lessonTexts[key as keyof typeof lessonTexts]?.[language] || {};
};

export const LESSON_KEYS = {
  GOOGLE_VOICE_SEARCH: 'GOOGLE_VOICE_SEARCH',
  GOOGLE_FILTER_TABS: 'GOOGLE_FILTER_TABS',
};