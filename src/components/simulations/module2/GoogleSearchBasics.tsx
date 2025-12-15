import React, { useState } from 'react';
import {
  GoogleLogo,
  GoogleSearchBar,
  GoogleSearchHeader,
  WeatherCard,
  SearchSuggestions
} from '../../common/GoogleComponents';
import { 
  InstructionHint, 
  AnimatedArrow,
  PracticeBanner
} from '../../common';
import { getLessonTexts, LESSON_KEYS } from '../../../data/lessonTexts_module2';

interface GoogleSearchBasicsProps {
  onComplete?: () => void;
  onBack?: () => void;
  language?: 'en' | 'zh';
}

const GoogleSearchBasics: React.FC<GoogleSearchBasicsProps> = ({ 
  onComplete, 
  onBack,
  language = 'en' 
}) => {
  // ========== STATE ==========
  const [step, setStep] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // ========== TRANSLATIONS ==========
  const t = getLessonTexts(LESSON_KEYS.GOOGLE_SEARCH_BASICS, language) as any;

  const totalSteps = 4;

  // Suggestions data
  const suggestions = [
    { icon: '☀️', text: t.suggestionWeather },
    { icon: '📰', text: t.suggestionNews },
    { icon: '🏥', text: t.suggestionClinic },
    { icon: '🍳', text: t.suggestionRecipe }
  ];

  // ========== HANDLERS ==========
  
  // Step 0 → Step 1: Tap search bar, show autocomplete
  const handleSearchBarTap = () => {
    if (step === 0) {
      setShowSuggestions(true);
      setStep(1);
    }
  };

  // Step 1 → Step 2: Select suggestion
  const handleSuggestionSelect = (text: string) => {
    if (step === 1) {
      setSearchText(text);
      setShowSuggestions(false);
      setStep(2);
    }
  };

  // Step 2 → Step 3: Tap search button
  const handleSearch = () => {
    if (step === 2) {
      setShowResults(true);
      setStep(3);
    }
  };

  // Step 3 → Complete
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

        {!showResults ? (
          // ========== HOMEPAGE VIEW ==========
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-6">
            <div className="flex flex-col items-center px-8 py-12">
              <div className="mb-12">
                <GoogleLogo size="large" />
              </div>

              <div className="w-full max-w-2xl relative">
                {/* Step 0: Tap search bar */}
                {step === 0 && (
                  <div className="relative">
                    <div className="pulse-border rounded-full">
                      <GoogleSearchBar
                        value={searchText}
                        onPress={handleSearchBarTap}
                        placeholder={t.searchPlaceholder}
                        showMic={false}
                      />
                    </div>
                    <AnimatedArrow direction="down" position="top" />
                  </div>
                )}

                {/* Step 1: Show suggestions, select one */}
                {step === 1 && (
                  <div className="relative">
                    <GoogleSearchBar
                      value={searchText}
                      placeholder={t.searchPlaceholder}
                      showMic={false}
                    />
                    
                    <SearchSuggestions
                      suggestions={suggestions}
                      onSelect={handleSuggestionSelect}
                    />
                    
                    <div className="absolute -top-16 left-1/4">
                      <AnimatedArrow direction="down" position="top" />
                    </div>
                  </div>
                )}

                {/* Step 2: Tap search button */}
                {step === 2 && (
                  <div className="relative">
                    <div className="flex items-center gap-4 bg-white border-2 border-gray-300 rounded-full px-6 py-4 shadow-md">
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        value={searchText}
                        readOnly
                        className="flex-1 text-lg outline-none bg-transparent"
                      />
                      <button
                        onClick={handleSearch}
                        className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full pulse-scale"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute -right-16 top-1/2 -translate-y-1/2">
                      <AnimatedArrow direction="left" position="right" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // ========== RESULTS VIEW ==========
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-6">
            <GoogleSearchHeader searchText={searchText} />
            
            <div className="p-6">
              <WeatherCard
                todayTemp={t.weatherTodayTemp}
                todayCondition={t.weatherTodayCondition}
                tomorrowTemp={t.weatherTomorrowTemp}
                tomorrowCondition={t.weatherTomorrowCondition}
                location={t.weatherLocation}
                updated={t.weatherUpdated}
                language={language}
              />

              {step === 3 && (
                <div className="mt-6">
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
        )}
      </div>
    </div>
  );
};

export default GoogleSearchBasics;
