import React, { useState } from 'react';
import {
  GoogleSearchHeader,
  GoogleTabs,
  SearchResultCard,
  BrowserTabBar,
  RefreshButton,
  ImageGrid,
  NewsList,
  GoogleLogo,
  GoogleSearchBar
} from '../../common/GoogleComponents';
import { getLessonTexts, LESSON_KEYS } from '../../../data/lessonTexts_module2';
import { 
  InstructionHint, 
  AnimatedArrow
} from '../../common';

interface SearchFiltersAndTabsProps {
  onComplete?: () => void;
  language?: 'en' | 'zh';
}

interface BrowserTab {
  id: number;
  title: string;
  active: boolean;
}

interface NewsArticle {
  source: string;
  time: string;
  title: string;
  snippet: string;
}

interface SearchFiltersAndTabsTexts {
  lessonTitle: string;
  step0?: string;
  step1: string;
  step1Result: string;
  step2: string;
  step2Result: string;
  step3: string;
  step3Result: string;
  step4: string;
  step4Result: string;
  summaryTitle: string;
  summaryImages: string;
  summaryNews: string;
  summaryNewTab: string;
  summaryRefresh: string;
  summaryPoint1: string;
  summaryPoint2: string;
  summaryPoint3: string;
  continueBtn: string;
  weatherImages: string[];
  newsArticles: NewsArticle[];
  results?: {
    icon: string;
    title: string;
    snippet: string;
    tag: string;
  }[];
}

const SearchFiltersAndTabs: React.FC<SearchFiltersAndTabsProps> = ({ onComplete, language = 'en' }) => {
  const [step, setStep] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [browserTabs, setBrowserTabs] = useState<BrowserTab[]>([
    { id: 1, title: 'weather today', active: true }
  ]);
  const [activeBrowserTab, setActiveBrowserTab] = useState(1);
  const [fadeOpacity, setFadeOpacity] = useState(1);
  const [refreshRotation, setRefreshRotation] = useState(0);

  const translations = getLessonTexts(
    LESSON_KEYS.SEARCH_FILTERS_AND_TABS,
    language
  ) as SearchFiltersAndTabsTexts;
  const commonTexts = getLessonTexts(LESSON_KEYS.COMMON, language);

  const totalSteps = 5;
  const weatherResults = (translations.results as any[])?.slice(0, 2) || [];

  const handleTabPress = (tabId: string) => {
    if (step === 0 && tabId === 'images') {
      setFadeOpacity(0);
      setTimeout(() => {
        setActiveTab('images');
        setFadeOpacity(1);
        setStep(1);
      }, 200);
    } else if (step === 1 && tabId === 'news') {
      setFadeOpacity(0);
      setTimeout(() => {
        setActiveTab('news');
        setFadeOpacity(1);
        setStep(2);
      }, 200);
    } else {
      setActiveTab(tabId);
    }
  };

  const handleNewTab = () => {
    if (step === 2) {
      const newTab: BrowserTab = { id: browserTabs.length + 1, title: '', active: true };
      setBrowserTabs([...browserTabs, newTab]);
      setActiveBrowserTab(newTab.id);
      setActiveTab('all');
      setStep(3);
    }
  };

  const handleRefresh = () => {
    if (step === 3) {
      setFadeOpacity(0.5);
      setRefreshRotation(360);
      setTimeout(() => {
        setFadeOpacity(1);
        setRefreshRotation(0);
        setStep(4);
      }, 1000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">

      <div className="p-4">
        {step === 0 && <InstructionHint text={translations.step1} currentStep={step} totalSteps={totalSteps} language={language} />}
        {step === 1 && <InstructionHint text={translations.step2} currentStep={step} totalSteps={totalSteps} language={language} />}
        {step === 2 && <InstructionHint text={translations.step3} currentStep={step} totalSteps={totalSteps} language={language} />}
        {step === 3 && <InstructionHint text={translations.step4} currentStep={step} totalSteps={totalSteps} language={language} />}
      </div>

      <div className="bg-gray-200 relative">
        {step === 2 && <AnimatedArrow direction="down" position="top" />}
        <div className={step === 2 ? 'pulse-border' : ''}>
          <BrowserTabBar tabs={browserTabs} activeTabId={activeBrowserTab} onTabPress={setActiveBrowserTab} onNewTab={handleNewTab} />
        </div>
        <div className="flex px-4 py-2 bg-white border-b border-gray-200 relative">
          {step === 3 && <AnimatedArrow direction="down" position="top" />}
          <div className={step === 3 ? 'pulse-scale' : ''} style={{ transform: `rotate(${refreshRotation}deg)`, transition: 'transform 0.6s' }}>
            <RefreshButton onPress={handleRefresh} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div style={{ opacity: fadeOpacity, transition: 'opacity 0.3s' }}>
          {activeBrowserTab === browserTabs.length && browserTabs.length > 1 ? (
            <div className="flex flex-col items-center pt-24 px-5">
              <GoogleLogo size="large" />
              <div className="w-full max-w-2xl mt-10">
                <GoogleSearchBar value="" onChangeText={() => {}} placeholder={commonTexts.searchPlaceholder} showMic={true} />
              </div>
            </div>
          ) : (
            <>
              <GoogleSearchHeader searchText="weather today" />
              <div className="relative">
                {step === 0 && <AnimatedArrow direction="down" position="top" />}
                {step === 1 && <AnimatedArrow direction="down" position="top" />}
                <div className={(step === 0 || step === 1) ? 'pulse-border' : ''}>
                  <GoogleTabs activeTab={activeTab} onTabPress={handleTabPress} />
                </div>
              </div>

              {activeTab === 'all' && <div>{weatherResults.map((result: any, index: number) => <SearchResultCard key={index} {...result} />)}</div>}
              {activeTab === 'images' && <ImageGrid images={translations.weatherImages as string[]} />}
              {activeTab === 'news' && <NewsList articles={translations.newsArticles as any[]} />}
            </>
          )}

          {step === 4 && (
            <div className="p-4">
              <div className="bg-white p-5 rounded-xl border-2 border-blue-500">
                <h2 className="text-lg font-bold text-center mb-5">{translations.summaryTitle}</h2>
                <div className="flex justify-around mb-5">
                  {['📷', '📰', '➕', '🔄'].map((emoji, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl mb-2">{emoji}</div>
                      <div className="text-xs text-gray-600">{[translations.summaryImages, translations.summaryNews, translations.summaryNewTab, translations.summaryRefresh][i]}</div>
                    </div>
                  ))}
                </div>
                <div className="mb-5">
                  <p className="text-sm mb-2">{translations.summaryPoint1}</p>
                  <p className="text-sm mb-2">{translations.summaryPoint2}</p>
                  <p className="text-sm mb-2">{translations.summaryPoint3}</p>
                </div>
                <button onClick={() => onComplete && onComplete()} className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700">
                  {translations.continueBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFiltersAndTabs;
