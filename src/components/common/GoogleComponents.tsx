import React from 'react';

interface GoogleLogoProps {
  size?: 'large' | 'small';
}


interface GoogleSearchHeaderProps {
  searchText: string;
}

interface SearchResultCardProps {
  icon: string;
  title: string;
  snippet: string;
  tag?: string;
  url?: string;
}

interface BrowserTab {
  id: number;
  title: string;
  active: boolean;
}

interface BrowserTabBarProps {
  tabs: BrowserTab[];
  activeTabId: number;
  onTabPress: (tabId: number) => void;
  onNewTab: () => void;
}
interface GoogleTabsProps {
  activeTab: 'all' | 'images' | 'news';
  onTabChange: (tab: 'all' | 'images' | 'news') => void;
}

interface RefreshButtonProps {
  onPress: () => void;
}

interface InstructionBubbleProps {
  text: string;
  arrow?: string;
}

interface ImageGridProps {
  images: string[];
}

interface NewsArticle {
  source: string;
  time: string;
  title: string;
  snippet: string;
}

interface NewsListProps {
  articles: NewsArticle[];
}

interface VoiceInputModalProps {
  visible: boolean;
  promptText: string;
  onSpeak: () => void;
  language: 'en' | 'zh';
}

interface NewsCardProps {
  headline1: string;
  headline2: string;
  headline3: string;
  source: string;
  updated: string;
  language: 'en' | 'zh';
}

interface SearchSuggestionsProps {
  suggestions: Array<{
    icon: string;
    text: string;
  }>;
  onSelect: (text: string) => void;
}


export const GoogleTabs: React.FC<GoogleTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'all', label: 'All', icon: '🔍' },
    { id: 'images', label: 'Images', icon: '🖼️' },
    { id: 'news', label: 'News', icon: '📰' }
  ];

  return (
    <div className="flex gap-6 px-6 py-4 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as 'all' | 'images' | 'news')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-lg transition-all ${
            activeTab === tab.id
              ? 'text-blue-600 bg-blue-50 border-b-4 border-blue-600'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-2xl">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// ========================================
// IMAGE RESULTS
// ========================================
interface ImageResultsProps {
  language: 'en' | 'zh';
}

export const ImageResults: React.FC<ImageResultsProps> = ({ language }) => {
  const images = [
    { emoji: '☀️', label: language === 'en' ? 'Sunny Day' : '晴天' },
    { emoji: '🌤️', label: language === 'en' ? 'Partly Cloudy' : '局部多云' },
    { emoji: '🌧️', label: language === 'en' ? 'Rainy Day' : '雨天' },
    { emoji: '⛈️', label: language === 'en' ? 'Thunder Storm' : '雷暴' },
    { emoji: '🌈', label: language === 'en' ? 'Rainbow' : '彩虹' },
    { emoji: '❄️', label: language === 'en' ? 'Snowy' : '下雪' }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {language === 'en' ? 'Weather Images' : '天气图片'}
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <span className="text-6xl">{image.emoji}</span>
            <span className="font-semibold text-gray-700">{image.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const NewsCard: React.FC<NewsCardProps> = ({
  headline1,
  headline2,
  headline3,
  source,
  updated,
  language
}) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
        <span className="text-4xl">📰</span>
        <h3 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Latest News' : '最新新闻'}
        </h3>
      </div>

      <div className="space-y-4">
        <div className="pb-4 border-b border-gray-200">
          <p className="text-xl font-bold text-gray-900 mb-2">{headline1}</p>
          <p className="text-sm text-gray-500">{source} • 2 hours ago</p>
        </div>

        <div className="pb-4 border-b border-gray-200">
          <p className="text-xl font-bold text-gray-900 mb-2">{headline2}</p>
          <p className="text-sm text-gray-500">{source} • 4 hours ago</p>
        </div>

        <div className="pb-4 border-b border-gray-200">
          <p className="text-xl font-bold text-gray-900 mb-2">{headline3}</p>
          <p className="text-sm text-gray-500">{source} • 6 hours ago</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">{updated}</p>
    </div>
  );
};

// ========================================
// RECIPES CARD (NEW)
// ========================================
interface RecipesCardProps {
  recipe1Title: string;
  recipe1Time: string;
  recipe2Title: string;
  recipe2Time: string;
  recipe3Title: string;
  recipe3Time: string;
  language: 'en' | 'zh';
}

export const RecipesCard: React.FC<RecipesCardProps> = ({
  recipe1Title,
  recipe1Time,
  recipe2Title,
  recipe2Time,
  recipe3Title,
  recipe3Time,
  language
}) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
        <span className="text-4xl">🍳</span>
        <h3 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Popular Recipes' : '热门食谱'}
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
          <div className="w-20 h-20 bg-orange-100 rounded-xl flex items-center justify-center text-3xl">
            🥘
          </div>
          <div className="flex-1">
            <p className="text-xl font-bold text-gray-900">{recipe1Title}</p>
            <p className="text-gray-600">⏱️ {recipe1Time}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
          <div className="w-20 h-20 bg-green-100 rounded-xl flex items-center justify-center text-3xl">
            🥗
          </div>
          <div className="flex-1">
            <p className="text-xl font-bold text-gray-900">{recipe2Title}</p>
            <p className="text-gray-600">⏱️ {recipe2Time}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-red-100 rounded-xl flex items-center justify-center text-3xl">
            🍰
          </div>
          <div className="flex-1">
            <p className="text-xl font-bold text-gray-900">{recipe3Title}</p>
            <p className="text-gray-600">⏱️ {recipe3Time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface HealthCardProps {
  tip1: string;
  tip2: string;
  tip3: string;
  source: string;
  language: 'en' | 'zh';
}

export const HealthCard: React.FC<HealthCardProps> = ({
  tip1,
  tip2,
  tip3,
  source,
  language
}) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
        <span className="text-4xl">🏥</span>
        <h3 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Health Tips' : '健康提示'}
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
          <span className="text-2xl">💧</span>
          <div className="flex-1">
            <p className="text-xl text-gray-900">{tip1}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
          <span className="text-2xl">🚶</span>
          <div className="flex-1">
            <p className="text-xl text-gray-900">{tip2}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
          <span className="text-2xl">😴</span>
          <div className="flex-1">
            <p className="text-xl text-gray-900">{tip3}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        {language === 'en' ? 'Source:' : '来源：'} {source}
      </p>
    </div>
  );
};


export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  visible,
  promptText,
  onSpeak,
  language
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        {/* Microphone Icon with Pulse */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
            <GoogleMicIcon className="w-20 h-20 relative z-10" />
          </div>
        </div>

        {/* Listening Dots */}
        <div className="flex justify-center gap-2 mb-6">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
        </div>

        {/* Listening Text */}
        <p className="text-center text-gray-600 text-lg mb-6">
          {language === 'en' ? 'Listening...' : '正在聆听...'}
        </p>

        {/* Prompt */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-center">
          <p className="text-2xl font-bold text-gray-900">{promptText}</p>
        </div>

        {/* Tap to Speak Button */}
        <button
          onClick={onSpeak}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-xl font-bold text-xl shadow-lg flex items-center justify-center gap-3 transition-all"
        >
          <GoogleMicIcon className="w-20 h-20 relative z-10" />
          {language === 'en' ? 'TAP TO SPEAK NOW' : '点击开始说话'}
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          {language === 'en' ? '(Simulates voice input)' : '(模拟语音输入)'}
        </p>
      </div>
    </div>
  );
};

interface WeatherCardProps {
  todayTemp: string;
  todayCondition: string;
  tomorrowTemp: string;
  tomorrowCondition: string;
  location: string;
  updated: string;
  language: 'en' | 'zh';
}

interface TopicButtonsProps {
  topics: Array<{
    emoji: string;
    label: string;
    value: string;
  }>;
  onSelect: (value: string) => void;
  selectedTopic?: string;
}


export const WeatherCard: React.FC<WeatherCardProps> = ({
  todayTemp,
  todayCondition,
  tomorrowTemp,
  tomorrowCondition,
  location,
  updated,
  language
}) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
        <span className="text-4xl">☀️</span>
        <h3 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Weather' : '天气'}
        </h3>
      </div>

      {/* Today */}
      <div className="mb-4">
        <p className="text-gray-600 font-semibold mb-1">
          {language === 'en' ? 'Today:' : '今天：'}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-5xl font-black text-blue-600">{todayTemp}</span>
          <span className="text-2xl text-gray-700">{todayCondition}</span>
        </div>
      </div>

      {/* Tomorrow */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <p className="text-gray-600 font-semibold mb-1">
          {language === 'en' ? 'Tomorrow:' : '明天：'}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-700">{tomorrowTemp}</span>
          <span className="text-xl text-gray-600">{tomorrowCondition}</span>
        </div>
      </div>

      {/* Location & Updated */}
      <div className="space-y-2">
        <p className="text-gray-600 flex items-center gap-2">
          <span>📍</span>
          <span className="font-semibold">{location}</span>
        </p>
        <p className="text-sm text-gray-500">{updated}</p>
      </div>
    </div>
  );
};
interface GoogleSearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  showMic?: boolean;           // NEW
  micActive?: boolean;         // NEW
  micPulsing?: boolean;        // NEW
  onMicTap?: () => void;       // NEW
}


const GoogleMicIcon: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Blue top */}
      <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z" fill="#4285F4"/>
      
      {/* Red curve left */}
      <path d="M17 11C17 13.76 14.76 16 12 16C9.24 16 7 13.76 7 11H5C5 14.53 7.61 17.43 11 17.92V21H13V17.92C16.39 17.43 19 14.53 19 11H17Z" fill="#EA4335"/>
      
      {/* Yellow curve right - adjusted */}
      <path d="M17 11C17 13.76 14.76 16 12 16C9.24 16 7 13.76 7 11" stroke="#FBBC04" strokeWidth="2" fill="none"/>
      
      {/* Green base */}
      <rect x="11" y="18" width="2" height="3" fill="#34A853"/>
    </svg>
  );
};


export const GoogleSearchBar: React.FC<GoogleSearchBarProps> = ({
  value = '',
  onChangeText,
  onPress,
  placeholder = 'Search Google',
  autoFocus = false,
  showMic = false,
  micActive = false,
  micPulsing = false,
  onMicTap
}) => {
  return (
    <div 
      className="flex items-center gap-4 bg-white border border-gray-300 hover:border-gray-400 rounded-full px-6 py-4 shadow-md cursor-pointer transition-all"
      onClick={onPress}
    >
      {/* Search Icon */}
      <svg className="w-6 h-6 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChangeText?.(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="flex-1 text-lg outline-none bg-transparent"
        readOnly={!onChangeText}
      />

      {/* Microphone Icon */}
      {showMic && (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onMicTap?.();
          }}
          className={`relative cursor-pointer flex-shrink-0 ${micPulsing ? 'animate-pulse-scale' : ''}`}
        >
          {/* Pulsing background when active */}
          {micActive && (
            <div className="absolute inset-0 -m-2 bg-red-500/20 rounded-full animate-ping"></div>
          )}
          
          {/* Microphone SVG */}
          <GoogleMicIcon className="w-6 h-6 relative z-10" />
        </div>
      )}
    </div>
  );
};


// Google Logo Component
export const GoogleLogo: React.FC<GoogleLogoProps> = ({ size = 'large' }) => {
  const fontSize = size === 'large' ? '72px' : '32px';
  
  return (
    <div style={{ fontSize, fontWeight: 'bold' }}>
      <span style={{ color: '#4285F4' }}>G</span>
      <span style={{ color: '#EA4335' }}>o</span>
      <span style={{ color: '#FBBC04' }}>o</span>
      <span style={{ color: '#4285F4' }}>g</span>
      <span style={{ color: '#34A853' }}>l</span>
      <span style={{ color: '#EA4335' }}>e</span>
    </div>
  );
};

// Search Suggestions Dropdown
export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="bg-white rounded-lg mt-2 shadow-lg">
      {suggestions.map((suggestion, index) => (
        <div
          onClick={() => onSelect(suggestion.text)}
          className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
        >
          <span className="text-2xl">{suggestion.icon}</span>
          <span className="text-lg text-gray-900">{suggestion.text}</span>
        </div>
      ))}
    </div>
  );
};

// Google Search Header (for results page)
export const GoogleSearchHeader: React.FC<GoogleSearchHeaderProps> = ({ searchText }) => {
  return (
    <div className="flex items-center p-4 bg-white border-b border-gray-200">
      <GoogleLogo size="small" />
      <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 ml-4">
        <span className="text-sm mr-3 text-gray-600">🔍</span>
        <span className="text-sm flex-1" style={{ color: '#202124' }}>{searchText}</span>
      </div>
    </div>
  );
};

// Search Result Card
export const SearchResultCard: React.FC<SearchResultCardProps> = ({ icon, title, snippet, tag, url }) => {
  return (
    <div className="flex p-4 bg-white border-b border-gray-100">
      <div className="mr-3">
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="flex-1">
        {tag && <div className="text-xs text-gray-600 mb-1">{tag}</div>}
        {url && <div className="text-xs text-gray-600 mb-0.5">{url}</div>}
        <h3 className="text-lg font-semibold mb-1" style={{ color: '#1A0DAB' }}>{title}</h3>
        <p className="text-sm leading-5" style={{ color: '#4D5156' }}>{snippet}</p>
      </div>
    </div>
  );
};

// Browser Tab Bar
export const BrowserTabBar: React.FC<BrowserTabBarProps> = ({ tabs, activeTabId, onTabPress, onNewTab }) => {
  return (
    <div className="bg-gray-200 pt-2">
      <div className="flex px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabPress(tab.id)}
            className={`px-4 py-2 rounded-t-lg mr-1 text-sm max-w-[150px] truncate ${
              activeTabId === tab.id ? 'bg-white' : 'bg-gray-400'
            }`}
            style={{ color: '#202124' }}
          >
            {tab.title || 'New Tab'}
          </button>
        ))}
        <button onClick={onNewTab} className="px-2 py-2">
          <span className="text-base text-gray-600">➕</span>
        </button>
      </div>
    </div>
  );
};

// Refresh Button
export const RefreshButton: React.FC<RefreshButtonProps> = ({ onPress }) => {
  return (
    <button onClick={onPress} className="p-2">
      <span className="text-xl text-gray-600">🔄</span>
    </button>
  );
};

// Instruction Bubble
export const InstructionBubble: React.FC<InstructionBubbleProps> = ({ text, arrow = '↓' }) => {
  return (
    <div className="bg-blue-50 p-4 m-4 rounded-xl border-l-4 border-blue-500">
      <div className="text-2xl text-blue-600 mb-2">{arrow}</div>
      <p className="text-base leading-6" style={{ color: '#202124' }}>{text}</p>
    </div>
  );
};

// Image Grid (for Images tab)
export const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="flex flex-wrap p-2">
      {images.map((image, index) => (
        <div key={index} className="w-1/4 aspect-square p-1">
          <div className="flex items-center justify-center h-full">
            <span className="text-5xl">{image}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// News List (for News tab)
export const NewsList: React.FC<NewsListProps> = ({ articles }) => {
  return (
    <div className="p-2">
      {articles.map((article, index) => (
        <div key={index} className="flex bg-white p-4 mb-2 rounded-lg border border-gray-200">
          <span className="text-2xl mr-3">📰</span>
          <div className="flex-1">
            <div className="text-xs text-gray-600 mb-1">{article.source} - {article.time}</div>
            <h3 className="text-base font-semibold mb-1" style={{ color: '#202124' }}>{article.title}</h3>
            <p className="text-sm leading-5" style={{ color: '#4D5156' }}>{article.snippet}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

interface NewsResultsProps {
  headline1: string;
  headline2: string;
  headline3: string;
  language: 'en' | 'zh';
}

export const NewsResults: React.FC<NewsResultsProps> = ({
  headline1,
  headline2,
  headline3,
  language
}) => {
  const articles = [
    { emoji: '🌦️', headline: headline1, time: '2h ago' },
    { emoji: '📊', headline: headline2, time: '4h ago' },
    { emoji: '🌍', headline: headline3, time: '6h ago' }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {language === 'en' ? 'Weather News' : '天气新闻'}
      </h3>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{article.emoji}</span>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {article.headline}
                </h4>
                <p className="text-gray-500 text-sm">
                  {language === 'en' ? 'Published' : '发布于'} {article.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TopicButtons: React.FC<TopicButtonsProps> = ({
  topics,
  onSelect,
  selectedTopic
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {topics.map((topic, index) => (
        <button
          key={index}
          onClick={() => onSelect(topic.value)}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
            selectedTopic === topic.value
              ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
              : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'
          }`}
        >
          <span className="text-6xl mb-3">{topic.emoji}</span>
          <span className="text-xl font-bold text-gray-900">{topic.label}</span>
        </button>
      ))}
    </div>
  );
};

