// Interactive Google Search tutorial with non-blocking overlays
import React, { useState, useRef } from 'react';
import { Search, Mic, Camera } from "lucide-react";
import { googleSearchTexts } from '../../../data/lessonTexts_module2';

interface GoogleSearchResult {
  title: string;
  titleZh: string;
  url: string;
  description: string;
  descriptionZh: string;
  type: 'recipe' | 'weather' | 'business' | 'general' | 'healthcare';
}

interface RealGoogleSearchProps {
  language?: 'en' | 'zh';
}

const RealGoogleSearch: React.FC<RealGoogleSearchProps> = ({ language = 'en' }) => {
  const [tutorialStep, setTutorialStep] = useState<string>('intro');
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const t = googleSearchTexts[language];

  // Predefined search results
  const predefinedResults: GoogleSearchResult[] = [
    {
      title: "ABC Soup Recipe - Easy and Nutritious",
      titleZh: "ABC汤食谱 - 简单营养",
      url: "recipe.com/abc-soup",
      description: "A simple and healthy soup recipe with potatoes, carrots, and corn. Perfect for seniors.",
      descriptionZh: "用土豆、胡萝卜和玉米制作的简单健康汤品。适合老年人。",
      type: 'recipe'
    },
    {
      title: "Weather Tomorrow - Kuala Lumpur",
      titleZh: "明天天气 - 吉隆坡",
      url: "https://weather.com",
      description: "Tomorrow's weather forecast: Sunny, 32°C. Perfect weather for outdoor activities.",
      descriptionZh: "明天天气预报：晴朗，32°C。适合户外活动的好天气。",
      type: 'weather'
    },
    {
      title: "Nearby Hospitals - Emergency Care",
      titleZh: "附近医院 - 急诊护理",
      url: "hospital-finder.com/nearby",
      description: "Find hospitals and urgent care centers near you. Emergency contact numbers and directions.",
      descriptionZh: "查找您附近的医院和紧急护理中心。紧急联系电话和路线。",
      type: 'healthcare'
    },
    {
      title: "How to Make Tea - Step by Step Guide",
      titleZh: "如何泡茶 - 步骤指南",
      url: "tea-guide.com/how-to-make",
      description: "Learn the perfect way to make tea with our easy step-by-step guide.",
      descriptionZh: "通过我们简单的分步指南，学习泡茶的完美方法。",
      type: 'general'
    }
  ];

  const commonSearches = [
    { en: "weather tomorrow", zh: "明天天气" },
    { en: "ABC soup recipe", zh: "ABC汤食谱" },
    { en: "hospital near me", zh: "附近医院" },
    { en: "how to make tea", zh: "如何泡茶" }
  ];

  const filteredResults = predefinedResults.filter(result => {
    const query = searchQuery.toLowerCase();
    const title = (language === "en" ? result.title : result.titleZh).toLowerCase();
    const description = (language === "en" ? result.description : result.descriptionZh).toLowerCase();
    
    // Special handling for hospital/clinic searches
    if ((query.includes('hospital') || query.includes('clinic') || query.includes('医院') || query.includes('near me')) && 
        result.type === 'healthcare') {
      return true;
    }
    
    return title.includes(query) || description.includes(query);
  });

  const handleSearchBarClick = () => {
    setIsSearchFocused(true);
    if (tutorialStep === 'tap-search-bar') {
      setTutorialStep('select-suggestion');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setIsSearchFocused(false);
    if (tutorialStep === 'select-suggestion') {
      setTutorialStep('view-results-hint');
    }
    setTimeout(() => {
      setShowResults(true);
    }, 300);
  };

  const handleResultClick = () => {
    if (tutorialStep === 'click-result') {
      setTutorialStep('complete');
    }
  };

  // ========== RENDER SCREENS ==========
  
  // Intro Screen
  if (tutorialStep === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl text-center">
          <div className="text-7xl mb-6">🔍</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t.introTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t.introText}
          </p>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left">
            <p className="font-bold text-lg text-gray-700 mb-4">{t.introFeatures}</p>
            <ul className="space-y-3 text-lg">
              <li>{t.feature1}</li>
              <li>{t.feature2}</li>
              <li>{t.feature3}</li>
            </ul>
          </div>

          <button
            onClick={() => setTutorialStep('tap-search-bar')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-xl transition-colors shadow-lg"
          >
            {t.startLesson} →
          </button>
        </div>
      </div>
    );
  }

  // Main Google Search Interface
  return (
    <div className="relative w-full h-screen bg-white">
      {/* Google Search Interface */}
      <div className="relative w-full h-full overflow-y-auto">
        
        {/* Google Logo and Search Header - Centered vertically */}
        <div
  className={`bg-white transition-all duration-500 ${
    showResults
      ? 'p-6 border-b border-gray-200'
      : 'min-h-screen flex items-center justify-center -translate-y-80'
  }`}
>
          <div className="max-w-2xl mx-auto w-full px-4">
            {/* Google Logo */}
            <div className="text-center mb-8">
              <div className="text-6xl font-normal tracking-tight">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
              </div>
            </div>

            {/* Search Bar Container - Always accessible */}
            <div className="relative z-40">
              <div 
                className={`relative rounded-full p-4 border-2 shadow-lg transition-all duration-300 cursor-pointer ${
                  tutorialStep === 'tap-search-bar'
                    ? 'border-yellow-400 ring-4 ring-yellow-400 animate-pulse' 
                    : isSearchFocused ? 'border-blue-500 shadow-xl' : 'border-gray-300 hover:shadow-xl'
                }`}
                onClick={handleSearchBarClick}
              >
                <div className="flex items-center gap-4">
                  <Search className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    placeholder={t.searchPlaceholder}
                    className="flex-1 outline-none text-lg font-normal bg-transparent placeholder-gray-500"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
                      title={t.voiceSearch}
                    >
                      <Mic className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
                      title={t.imageSearch}
                    >
                      <Camera className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Suggestions - Always accessible */}
              {isSearchFocused && (
                <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-2xl max-h-64 overflow-y-auto z-50 ${
                  tutorialStep === 'select-suggestion' ? 'ring-4 ring-green-400' : ''
                }`}>
                  <div className="p-2">
                    <div className="text-xs font-medium text-gray-500 px-3 py-2">
                      {t.popularSearches}
                    </div>
                    {commonSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(language === "en" ? search.en : search.zh)}
                        className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3"
                      >
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="text-base">
                          {language === "en" ? search.en : search.zh}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="flex-1 bg-white">
            <div className="max-w-2xl mx-auto p-6">
              <div className="text-sm text-gray-600 mb-4">
                {language === "en" 
                  ? `About ${filteredResults.length} results (0.45 seconds)`
                  : `找到约 ${filteredResults.length} 条结果 (用时 0.45 秒)`}
              </div>

              <div className="space-y-6">
                {filteredResults.map((result, index) => (
                  <div 
                    key={index} 
                    className="group"
                  >
                    {/* URL - Not highlighted */}
                    <div className="text-sm text-green-700 mb-1">
                      {result.url}
                    </div>
                    {/* Clickable result - This gets highlighted */}
                    <div 
                      onClick={handleResultClick}
                      className={`block hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors cursor-pointer ${
                        tutorialStep === 'click-result' ? 'ring-4 ring-orange-400 animate-pulse' : ''
                      }`}
                    >
                      <h3 className="text-xl font-medium text-blue-600 hover:underline mb-1">
                        {language === "en" ? result.title : result.titleZh}
                      </h3>
                      <p className="text-base text-gray-600">
                        {language === "en" ? result.description : result.descriptionZh}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Special Result Card - Hospital/Clinic with Map */}
                {(searchQuery.toLowerCase().includes('hospital') || 
                  searchQuery.toLowerCase().includes('clinic') ||
                  searchQuery.toLowerCase().includes('医院')) && (
                  <div 
                    onClick={handleResultClick}
                    className={`bg-red-50 rounded-lg p-4 border border-red-200 cursor-pointer hover:bg-red-100 transition-colors ${
                      tutorialStep === 'click-result' ? 'ring-4 ring-orange-400 animate-pulse' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">🏥</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          {language === "en" ? "Nearby Hospitals & Clinics" : "附近的医院和诊所"}
                        </h3>
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded-lg">
                            <p className="font-semibold text-gray-900">
                              {language === "en" ? "KPJ Damansara Specialist Hospital" : "KPJ白沙罗专科医院"}
                            </p>
                            <p className="text-sm text-gray-600">
                              📍 {language === "en" ? "2.5 km away • Open 24 hours" : "2.5公里 • 24小时营业"}
                            </p>
                            <p className="text-sm text-green-700">
                              ⭐ 4.5 {language === "en" ? "rating" : "评分"} • ☎️ 03-7722 2222
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded-lg">
                            <p className="font-semibold text-gray-900">
                              {language === "en" ? "Sunway Medical Centre" : "双威医疗中心"}
                            </p>
                            <p className="text-sm text-gray-600">
                              📍 {language === "en" ? "4.8 km away • Open 24 hours" : "4.8公里 • 24小时营业"}
                            </p>
                            <p className="text-sm text-green-700">
                              ⭐ 4.6 {language === "en" ? "rating" : "评分"} • ☎️ 03-7491 9191
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Special Result Card - Weather */}
                {searchQuery.toLowerCase().includes('weather') && (
                  <div 
                    onClick={handleResultClick}
                    className={`bg-blue-50 rounded-lg p-4 border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors ${
                      tutorialStep === 'click-result' ? 'ring-4 ring-orange-400 animate-pulse' : ''
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-2">
                      🌤️ {language === "en" ? "Weather Today" : "今日天气"}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-4xl font-bold text-blue-600">32°C</div>
                        <div className="text-base text-gray-600">
                          {language === "en" ? "Partly Cloudy" : "多云"}
                        </div>
                      </div>
                      <div className="text-base text-gray-600">
                        <div>{language === "en" ? "Humidity: 75%" : "湿度: 75%"}</div>
                        <div>{language === "en" ? "Wind: 12 km/h" : "风速: 12 km/h"}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Special Result Card - Recipe */}
                {searchQuery.toLowerCase().includes('abc soup') && (
                  <div 
                    onClick={handleResultClick}
                    className={`bg-green-50 rounded-lg p-4 border border-green-200 cursor-pointer hover:bg-green-100 transition-colors ${
                      tutorialStep === 'click-result' ? 'ring-4 ring-orange-400 animate-pulse' : ''
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-2">
                      🍲 {language === "en" ? "ABC Soup Recipe" : "ABC汤食谱"}
                    </h3>
                    <div className="text-base text-gray-700 space-y-2">
                      <div><strong>{language === "en" ? "Ingredients:" : "配料："}</strong> {language === "en" ? "Potato, Carrot, Corn, Pork ribs" : "土豆，胡萝卜，玉米，排骨"}</div>
                      <div><strong>{language === "en" ? "Cook time:" : "烹饪时间："}</strong> {language === "en" ? "45 minutes" : "45分钟"}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tutorial Overlays - Non-blocking, positioned at bottom */}
      
      {/* Step 1: Tap Search Bar */}
      {tutorialStep === 'tap-search-bar' && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-lg w-11/12">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-yellow-400">
            <div className="flex items-start gap-4">
              <div className="text-5xl">👆</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'en' ? 'Tap the Search Bar' : '点击搜索栏'}
                </h3>
                <p className="text-lg text-gray-700">
                  {language === 'en' 
                    ? 'Click on the search bar above to start searching!' 
                    : '点击上方的搜索栏开始搜索！'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Select Suggestion - Non-blocking */}
      {tutorialStep === 'select-suggestion' && isSearchFocused && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 max-w-lg w-11/12">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-green-400">
            <div className="flex items-start gap-4">
              <div className="text-5xl">💡</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'en' ? 'Pick a Topic' : '选择一个主题'}
                </h3>
                <p className="text-lg text-gray-700">
                  {language === 'en' 
                    ? 'Click on any suggestion above to search for it!' 
                    : '点击上方的任何建议进行搜索！'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: View Results Hint */}
      {tutorialStep === 'view-results-hint' && showResults && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-lg w-11/12">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-blue-400">
            <div className="flex items-start gap-4">
              <div className="text-5xl">✅</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'en' ? 'Great! Results Appeared' : '太好了！结果出现了'}
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  {language === 'en' 
                    ? 'You can now see the search results!' 
                    : '您现在可以看到搜索结果了！'}
                </p>
                <button
                  onClick={() => setTutorialStep('click-result')}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl transition-colors"
                >
                  {t.continue} →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Click Result */}
      {tutorialStep === 'click-result' && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-lg w-11/12">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-orange-400">
            <div className="flex items-start gap-4">
              <div className="text-5xl">🖱️</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'en' ? 'Click on a Result' : '点击一个结果'}
                </h3>
                <p className="text-lg text-orange-700">
                  {language === 'en' 
                    ? 'Tap on any blue link or card above to open it!' 
                    : '点击上方的任何蓝色链接或卡片打开它！'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Overlay */}
      {tutorialStep === 'complete' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl text-center">
            <div className="text-8xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t.congratulations}
            </h2>
            <p className="text-2xl text-gray-600 mb-8">
              {t.completeText}
            </p>
            
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <p className="text-xl font-semibold text-gray-900 mb-4">
                {language === 'en' ? 'What you learned:' : '您学到的内容：'}
              </p>
              <div className="space-y-2 text-left text-lg">
                <p className="text-gray-700">✓ {language === 'en' ? 'How to tap the search bar' : '如何点击搜索栏'}</p>
                <p className="text-gray-700">✓ {language === 'en' ? 'How to use search suggestions' : '如何使用搜索建议'}</p>
                <p className="text-gray-700">✓ {language === 'en' ? 'How to view search results' : '如何查看搜索结果'}</p>
                <p className="text-gray-700">✓ {language === 'en' ? 'How to click on results' : '如何点击结果'}</p>
              </div>
            </div>
            
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-xl transition-colors shadow-lg"
            >
              {t.finishLesson} ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealGoogleSearch;
