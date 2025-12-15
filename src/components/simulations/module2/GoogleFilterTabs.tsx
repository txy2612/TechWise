import React, { useState } from 'react';
import {
  GoogleSearchHeader,
  GoogleTabs,
  WeatherCard,
  ImageResults,
  NewsResults
} from '../../common/GoogleComponents';
import { 
  InstructionHint, 
  AnimatedArrow,
  PracticeBanner
} from '../../common';
import { getLessonTexts, LESSON_KEYS } from '../../../data/lessonTexts_module2';

interface GoogleFilterTabsProps {
  onComplete?: () => void;
  onBack?: () => void;
  language?: 'en' | 'zh';
}

const GoogleFilterTabs: React.FC<GoogleFilterTabsProps> = ({ 
  onComplete, 
  onBack,
  language = 'en' 
}) => {
  // ========== STATE ==========
  const [step, setStep] = useState(0);
  const [activeTab, setActiveTab] = useState<'all' | 'images' | 'news'>('all');

  // ========== TRANSLATIONS ==========
  const t = getLessonTexts(LESSON_KEYS.GOOGLE_FILTER_TABS, language) as any;

  const totalSteps = 3;

  // ========== HANDLERS ==========
  
  // Step 0 → Step 1: Tap Images tab
  const handleTabChange = (tab: 'all' | 'images' | 'news') => {
    setActiveTab(tab);
    
    if (step === 0 && tab === 'images') {
      setStep(1);
    } else if (step === 1 && tab === 'news') {
      setStep(2);
    }
  };

  // Step 2 → Complete: Tap refresh
  const handleRefresh = () => {
    if (step === 2) {
      // Show refresh animation
      const refreshBtn = document.querySelector('.refresh-btn');
      refreshBtn?.classList.add('animate-spin');
      
      setTimeout(() => {
        refreshBtn?.classList.remove('animate-spin');
        setStep(3);
      }, 1000);
    }
  };

  const handleComplete = () => {
    if (onComplete) onComplete();
  };

  // ========== RENDER ==========
  return (
    <div className="min-h-screen bg-gray-50">
      <PracticeBanner language={language} />

      <div className="max-w-6xl mx-auto p-6">
        <InstructionHint 
          text={t[`step${step}`]}
          currentStep={step}
          totalSteps={totalSteps}
          language={language}
        />

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-6">
          {/* Search Header (already searched) */}
          <GoogleSearchHeader searchText={t.searchQuery} />

          {/* Tabs with arrow on Images */}
          <div className="relative">
            <GoogleTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
            
            {step === 0 && (
              <div className="absolute top-12 left-40">
                <AnimatedArrow direction="up" position="bottom" />
              </div>
            )}
            
            {step === 1 && (
              <div className="absolute top-12 left-64">
                <AnimatedArrow direction="up" position="bottom" />
              </div>
            )}
          </div>

          {/* Content based on active tab */}
          <div className="p-6">
            {activeTab === 'all' && (
              <WeatherCard
                todayTemp={t.weatherTodayTemp}
                todayCondition={t.weatherTodayCondition}
                tomorrowTemp={t.weatherTomorrowTemp}
                tomorrowCondition={t.weatherTomorrowCondition}
                location={t.weatherLocation}
                updated={t.weatherUpdated}
                language={language}
              />
            )}

            {activeTab === 'images' && (
              <ImageResults language={language} />
            )}

            {activeTab === 'news' && (
              <NewsResults
                headline1={t.newsHeadline1}
                headline2={t.newsHeadline2}
                headline3={t.newsHeadline3}
                language={language}
              />
            )}

            {/* Refresh button (Step 2) */}
            {step === 2 && (
              <div className="mt-6 relative">
                <button
                  onClick={handleRefresh}
                  className="refresh-btn flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl border-2 border-blue-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="font-bold">{t.refreshButton}</span>
                </button>
                <div className="absolute -left-16 top-1/2 -translate-y-1/2">
                  <AnimatedArrow direction="right" position="left" />
                </div>
              </div>
            )}

            {/* Complete button (Step 3) */}
            {step === 3 && (
              <div className="mt-6">
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-4">
                  <p className="text-green-800 font-bold text-center">
                    ✅ {t.refreshSuccess}
                  </p>
                </div>
                <button 
                  onClick={handleComplete}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-md"
                >
                  {t.finishButton}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleFilterTabs;
