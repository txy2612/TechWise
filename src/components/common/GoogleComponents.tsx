import React from 'react';

interface GoogleLogoProps {
  size?: 'large' | 'small';
}

interface GoogleSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
  placeholder: string;
  autoFocus?: boolean;
  showMic?: boolean;
}

interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

interface GoogleSearchHeaderProps {
  searchText: string;
}

interface GoogleTabsProps {
  activeTab: string;
  onTabPress?: (tabId: string) => void;
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

// Google Search Bar Component
export const GoogleSearchBar: React.FC<GoogleSearchBarProps> = ({ 
  value, 
  onChangeText, 
  onPress, 
  placeholder,
  autoFocus = false,
  showMic = true 
}) => {
  return (
    <div 
      onClick={onPress}
      className="flex items-center bg-white rounded-full border border-gray-300 px-4 py-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <span className="text-xl mr-3">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="flex-1 text-base outline-none"
        style={{ color: '#202124' }}
      />
      {showMic && (
        <button className="p-1">
          <span className="text-xl">🎤</span>
        </button>
      )}
    </div>
  );
};

// Search Suggestions Dropdown
export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="bg-white rounded-lg mt-2 shadow-lg">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => onSelect(suggestion)}
          className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
        >
          <span className="text-base mr-3 text-gray-600">🔍</span>
          <span className="text-base" style={{ color: '#202124' }}>{suggestion}</span>
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

// Google Tabs Component
export const GoogleTabs: React.FC<GoogleTabsProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'all', label: 'All', icon: '' },
    { id: 'images', label: 'Images', icon: '📷' },
    { id: 'news', label: 'News', icon: '📰' },
    { id: 'videos', label: 'Videos', icon: '' },
    { id: 'more', label: 'More ▼', icon: '' }
  ];

  return (
    <div className="flex bg-white px-4 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabPress && onTabPress(tab.id)}
          className={`py-3 px-3 mr-2 text-sm ${
            activeTab === tab.id 
              ? 'text-blue-600 font-semibold border-b-3 border-blue-600' 
              : 'text-gray-600'
          }`}
          style={activeTab === tab.id ? { borderBottom: '3px solid #4285F4' } : {}}
        >
          {tab.icon && `${tab.icon} `}{tab.label}
        </button>
      ))}
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
