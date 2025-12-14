// Module 2: Navigating the Web - Lesson Texts
// Bilingual support: English (en) and Chinese (zh)

interface SearchResult {
  icon: string;
  title: string;
  snippet: string;
  tag: string;
  url?: string;
}

interface NewsArticle {
  source: string;
  time: string;
  title: string;
  snippet: string;
}

interface MapPin {
  name: string;
  distance: string;
  address: string;
}

interface LessonTexts {
  lessonTitle: string;
  searchPlaceholder?: string;
  [key: string]: any;
}

interface AllLessonTexts {
  googleSearchBasics: {
    en: LessonTexts;
    zh: LessonTexts;
  };
  searchFiltersAndTabs: {
    en: LessonTexts;
    zh: LessonTexts;
  };
  nearestClinicSearch: {
    en: LessonTexts;
    zh: LessonTexts;
  };
  cookingRecipeSearch: {
    en: LessonTexts;
    zh: LessonTexts;
  };
  common: {
    en: {
      continue: string;
      next: string;
      back: string;
      complete: string;
      tryAgain: string;
      searchPlaceholder: string;
    };
    zh: {
      continue: string;
      next: string;
      back: string;
      complete: string;
      tryAgain: string;
      searchPlaceholder: string;
    };
  };
}

export const lessonTexts: AllLessonTexts = {
  // ============================================
  // LESSON 0: Google Search Basics
  // ============================================
  googleSearchBasics: {
    en: {
      lessonTitle: "Lesson 1: Google Search Basics",
      searchPlaceholder: "Search Google or type a URL",
      
      // Step instructions
      step0: "Tap the search bar to begin.",
      step1: "Type a keyword, like 'weather today'.",
      step1Suggest: "Tap one suggestion or press Enter.",
      step2: "Scroll down to see more results.",
      completion: "Great! You've learned how to search on Google.",
      continueBtn: "Continue →",

      // Search suggestions
      suggestions: [
        "weather today",
        "weather tomorrow",
        "weather in KL"
      ],

      // Search results
      results: [
        {
          icon: "🌤️",
          title: "Weather today in Kuala Lumpur",
          snippet: "27°C, partly cloudy. Forecast: light rain in the evening.",
          tag: "Weather"
        },
        {
          icon: "📰",
          title: "Local weather updates – The Star",
          snippet: "Rain expected this weekend, temperatures steady around 28°C.",
          tag: "News"
        },
        {
          icon: "🌦️",
          title: "Malaysia Weather Forecast",
          snippet: "Get accurate weather predictions for your area.",
          tag: "Weather"
        }
      ]
    },

    zh: {
      lessonTitle: "第1课：Google 搜索基础",
      searchPlaceholder: "搜索 Google 或输入网址",
      
      // Step instructions
      step0: "点击搜索栏开始。",
      step1: "输入关键词，例如 '今天天气'。",
      step1Suggest: "点击一个建议或按回车键。",
      step2: "向下滚动查看更多结果。",
      completion: "太好了！您已经学会如何在 Google 上搜索。",
      continueBtn: "继续 →",

      // Search suggestions
      suggestions: [
        "今天天气",
        "明天天气",
        "吉隆坡天气"
      ],

      // Search results
      results: [
        {
          icon: "🌤️",
          title: "吉隆坡今天天气",
          snippet: "27°C，部分多云。预报：傍晚有小雨。",
          tag: "天气"
        },
        {
          icon: "📰",
          title: "本地天气更新 – 星报",
          snippet: "本周末预计有雨，气温稳定在28°C左右。",
          tag: "新闻"
        },
        {
          icon: "🌦️",
          title: "马来西亚天气预报",
          snippet: "获取您所在地区的准确天气预测。",
          tag: "天气"
        }
      ]
    }
  },

  // ============================================
  // LESSON 1: Using Search Filters & Tabs
  // ============================================
  searchFiltersAndTabs: {
    en: {
      lessonTitle: "Lesson 2: Using Search Filters & Tabs",
      
      // Step instructions
      step0: "Let's explore different ways to view search results.",
      step1: "Tap '📷 Images' to see pictures.",
      step1Result: "Images show pictures related to your search. You can tap any image to see it bigger.",
      step2: "Now tap '📰 News' to see news articles.",
      step2Result: "News shows recent articles. Notice the time stamps - '2 hours ago', '5 hours ago'.",
      step3: "Tap the ➕ button to open a new tab. This lets you search for something else without losing this page.",
      step3Result: "A new blank page opens. Your previous search is still in the first tab. You can switch between tabs anytime.",
      step4: "Tap the 🔄 button to refresh (reload) the page. This is useful to see updated information.",
      step4Result: "Page refreshed! Use this when you want to check for new updates.",
      
      // Summary
      summaryTitle: "What You Learned:",
      summaryImages: "Images",
      summaryNews: "News",
      summaryNewTab: "New Tab",
      summaryRefresh: "Refresh",
      summaryPoint1: "• Switch tabs to see different results",
      summaryPoint2: "• Open new tabs to search multiple things at once",
      summaryPoint3: "• Refresh to get updated information",
      continueBtn: "Continue →",

      // News articles
      newsArticles: [
        {
          source: "The Star",
          time: "2 hours ago",
          title: "Heavy rain expected this weekend",
          snippet: "Meteorological Department warns of..."
        },
        {
          source: "New Straits Times",
          time: "5 hours ago",
          title: "Temperature to drop in KL area",
          snippet: "Cooler weather expected as monsoon..."
        },
        {
          source: "Bernama",
          time: "1 day ago",
          title: "Weekly weather forecast released",
          snippet: "Partly cloudy conditions with..."
        }
      ],

      // Weather images (emojis)
      weatherImages: ["🌤️", "☁️", "🌧️", "🌈", "⛅", "🌦️", "🌩️", "🌞"]
    },

    zh: {
      lessonTitle: "第2课：使用搜索过滤器和标签页",
      
      // Step instructions
      step0: "让我们探索查看搜索结果的不同方式。",
      step1: "点击 '📷 图片' 查看图片。",
      step1Result: "图片显示与您搜索相关的图片。您可以点击任何图片放大查看。",
      step2: "现在点击 '📰 新闻' 查看新闻文章。",
      step2Result: "新闻显示最新文章。注意时间戳 - '2小时前'、'5小时前'。",
      step3: "点击 ➕ 按钮打开新标签页。这样您可以搜索其他内容而不会丢失此页面。",
      step3Result: "打开一个新的空白页面。您之前的搜索仍在第一个标签页中。您可以随时切换标签页。",
      step4: "点击 🔄 按钮刷新（重新加载）页面。这对查看更新信息很有用。",
      step4Result: "页面已刷新！当您想查看新更新时使用此功能。",
      
      // Summary
      summaryTitle: "您学到的内容：",
      summaryImages: "图片",
      summaryNews: "新闻",
      summaryNewTab: "新标签页",
      summaryRefresh: "刷新",
      summaryPoint1: "• 切换标签页查看不同结果",
      summaryPoint2: "• 打开新标签页同时搜索多个内容",
      summaryPoint3: "• 刷新以获取更新信息",
      continueBtn: "继续 →",

      // News articles
      newsArticles: [
        {
          source: "星报",
          time: "2小时前",
          title: "本周末预计有大雨",
          snippet: "气象局警告..."
        },
        {
          source: "新海峡时报",
          time: "5小时前",
          title: "吉隆坡地区气温将下降",
          snippet: "季风来临预计天气转凉..."
        },
        {
          source: "马新社",
          time: "1天前",
          title: "每周天气预报发布",
          snippet: "部分多云天气..."
        }
      ],

      // Weather images (emojis)
      weatherImages: ["🌤️", "☁️", "🌧️", "🌈", "⛅", "🌦️", "🌩️", "🌞"]
    }
  },

  // ============================================
  // LESSON 2 CARD 1: Nearest Clinic Search
  // ============================================
  nearestClinicSearch: {
    en: {
      lessonTitle: "Lesson 3: Practice - Finding Nearby Places",
      scenario: "You need to find the nearest clinic.",
      
      // Step instructions
      step0: "Tap the search bar.",
      step1: "Tap 'nearest clinic' from the list.",
      step2: "These pins show locations you can visit.",
      continueBtn: "Next",

      // Search suggestions
      suggestions: [
        "nearest clinic",
        "clinic near me",
        "clinic opening hours"
      ],

      // Map location pins
      mapPins: [
        {
          name: "Klinik Kesihatan Klang",
          distance: "0.5 km",
          address: "Jalan Meru"
        },
        {
          name: "Poliklinik Sentosa",
          distance: "1.2 km",
          address: "Taman Sentosa"
        },
        {
          name: "Klinik Dr. Lee",
          distance: "1.8 km",
          address: "Bandar Bukit Tinggi"
        }
      ]
    },

    zh: {
      lessonTitle: "第3课：练习 - 查找附近地点",
      scenario: "您需要找到最近的诊所。",
      
      // Step instructions
      step0: "点击搜索栏。",
      step1: "从列表中点击 '最近的诊所'。",
      step2: "这些图钉显示您可以访问的位置。",
      continueBtn: "下一个练习 →",

      // Search suggestions
      suggestions: [
        "最近的诊所",
        "附近的诊所",
        "诊所营业时间"
      ],

      // Map location pins
      mapPins: [
        {
          name: "巴生卫生诊所",
          distance: "0.5 公里",
          address: "默鲁路"
        },
        {
          name: "双威综合诊所",
          distance: "1.2 公里",
          address: "双威花园"
        },
        {
          name: "李医生诊所",
          distance: "1.8 公里",
          address: "武吉丁宜市镇"
        }
      ]
    }
  },

  // ============================================
  // LESSON 2 CARD 2: Cooking Recipe Search
  // ============================================
  cookingRecipeSearch: {
    en: {
      lessonTitle: "Lesson 3: Practice - Finding Information",
      scenario: "You want to cook dinner.",
      
      // Step instructions
      step0: "Type 'easy chicken recipes' in the search bar.",
      step1: "Browse through the recipe results.",
      completion: "Excellent! You can now search for information you need.",
      continueBtn: "Complete Lesson →",
      hintLabel: "Hint",

      // Search term
      searchTerm: "easy chicken recipes",

      // Recipe results
      results: [
        {
          icon: "🍗",
          title: "Easy chicken curry recipe",
          snippet: "Quick 30-minute recipe with simple ingredients.",
          tag: "Recipe",
          url: "cookingtoday.com"
        },
        {
          icon: "🥘",
          title: "Healthy chicken soup",
          snippet: "Low-fat, high-protein dinner option.",
          tag: "Recipe",
          url: "healthymeals.com"
        },
        {
          icon: "🍛",
          title: "Malaysian chicken rendang",
          snippet: "Traditional spicy chicken dish with rich flavors.",
          tag: "Recipe",
          url: "malaysiankitchen.com"
        }
      ]
    },

    zh: {
      lessonTitle: "第3课：练习 - 查找信息",
      scenario: "您想做晚餐。",
      
      // Step instructions
      step0: "在搜索栏中输入 '简单鸡肉食谱'。",
      step1: "浏览食谱结果。",
      completion: "太棒了！您现在可以搜索所需的信息。",
      continueBtn: "完成课程 →",
      hintLabel: "提示",

      // Search term
      searchTerm: "简单鸡肉食谱",

      // Recipe results
      results: [
        {
          icon: "🍗",
          title: "简单咖喱鸡食谱",
          snippet: "30分钟快速食谱，简单食材。",
          tag: "食谱",
          url: "cookingtoday.com"
        },
        {
          icon: "🥘",
          title: "健康鸡汤",
          snippet: "低脂高蛋白晚餐选择。",
          tag: "食谱",
          url: "healthymeals.com"
        },
        {
          icon: "🍛",
          title: "马来西亚仁当鸡",
          snippet: "传统香辣鸡肉菜肴，风味浓郁。",
          tag: "食谱",
          url: "malaysiankitchen.com"
        }
      ]
    }
  },

  // ============================================
  // COMMON TEXTS (shared across lessons)
  // ============================================
  common: {
    en: {
      continue: "Continue",
      next: "Next",
      back: "Back",
      complete: "Complete",
      tryAgain: "Try Again",
      searchPlaceholder: "Search Google or type a URL"
    },
    zh: {
      continue: "继续",
      next: "下一步",
      back: "返回",
      complete: "完成",
      tryAgain: "再试一次",
      searchPlaceholder: "搜索 Google 或输入网址"
    }
  }
};

// Helper function to get texts for a specific lesson and language
export const getLessonTexts = (lessonKey: keyof AllLessonTexts, language: 'en' | 'zh' = 'en') => {
  return lessonTexts[lessonKey]?.[language] || lessonTexts[lessonKey]?.en;
};

// Export individual lesson keys for easy access
export const LESSON_KEYS = {
  GOOGLE_SEARCH_BASICS: 'googleSearchBasics' as const,
  SEARCH_FILTERS_AND_TABS: 'searchFiltersAndTabs' as const,
  NEAREST_CLINIC_SEARCH: 'nearestClinicSearch' as const,
  COOKING_RECIPE_SEARCH: 'cookingRecipeSearch' as const,
  COMMON: 'common' as const
};
