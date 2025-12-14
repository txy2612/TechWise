import React, { useState } from 'react';
import {
  GoogleLogo,
  GoogleSearchBar,
  SearchSuggestions,
  GoogleSearchHeader,
  GoogleTabs,
  SearchResultCard
} from '../../common/GoogleComponents';
import { 
  InstructionHint, 
  AnimatedArrow,
} from '../../common';
import { getLessonTexts, LESSON_KEYS } from '../../../data/lessonTexts_module2';

interface GoogleSearchBasicsTexts {
  lessonTitle: string;
  searchPlaceholder: string;
  step0: string;
  step1: string;
  step1Suggest: string;
  step2: string;
  completion: string;
  continueBtn: string;
  suggestions: string[];
  results: {
    icon: string;
    title: string;
    snippet: string;
    tag: string;
  }[];
}

interface GoogleSearchBasicsProps {
  onComplete?: () => void;
  language?: 'en' | 'zh';
}

const GoogleSearchBasics: React.FC<GoogleSearchBasicsProps> = ({ onComplete, language = 'en' }) => {
  const [step, setStep] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [fadeOpacity, setFadeOpacity] = useState(1);

  // Get translations
  const translations = getLessonTexts(
    LESSON_KEYS.GOOGLE_SEARCH_BASICS,
    language
  ) as GoogleSearchBasicsTexts;

  const totalSteps = 4;

  const handleSearchBarTap = () => {
    if (step === 0) {
      setStep(1);
    }
  };

  const handleTyping = (text: string) => {
    setSearchText(text);
    if (step === 1 && text.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchText(suggestion);
    setShowSuggestions(false);
    
    // Animate transition to results
    setFadeOpacity(0);
    setTimeout(() => {
      setFadeOpacity(1);
      setShowResults(true);
      setStep(2);
    }, 200);
  };

  const handleScroll = () => {
    if (step === 2) {
      setTimeout(() => {
        setStep(3);
      }, 1000);
    }
  };

  const handleContinue = () => {
    if (onComplete) onComplete();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div 
        className="flex-1 overflow-y-auto"
        onScroll={handleScroll}
      >
        <div className="p-4">
          {/* Instruction at Top */}
          {step === 0 && (
            <InstructionHint 
              text={translations.step0}
              currentStep={step}
              totalSteps={totalSteps}
              language={language}
            />
          )}
          {step === 1 && !showSuggestions && (
            <InstructionHint 
              text={translations.step1}
              currentStep={step}
              totalSteps={totalSteps}
              language={language}
            />
          )}
          {step === 1 && showSuggestions && (
            <InstructionHint 
              text={translations.step1Suggest}
              currentStep={step}
              totalSteps={totalSteps}
              language={language}
            />
          )}
          {step === 2 && !showResults && (
            <InstructionHint 
              text={translations.step2}
              currentStep={step}
              totalSteps={totalSteps}
              language={language}
            />
          )}
        </div>

        {!showResults ? (
          // Homepage
          <div 
            className="flex flex-col items-center px-5 pb-10"
            style={{ opacity: fadeOpacity, transition: 'opacity 0.3s' }}
          >
            <div className="mb-10">
              <GoogleLogo size="large" />
            </div>

            <div className="w-full max-w-2xl relative">
              {step === 0 && <AnimatedArrow direction="down" position="top" />}
              
              <div className={step === 0 ? 'pulse-border rounded-full' : ''}>
                <GoogleSearchBar
                  value={searchText}
                  onChangeText={handleTyping}
                  onPress={handleSearchBarTap}
                  placeholder={translations.searchPlaceholder || ''}
                  autoFocus={step >= 1}
                  showMic={true}
                />
              </div>

              {showSuggestions && (
                <div className="relative">
                  <SearchSuggestions
                    suggestions={translations.suggestions as string[]}
                    onSelect={handleSuggestionSelect}
                  />
                  <AnimatedArrow direction="down" position="top" />
                </div>
              )}
            </div>
          </div>
        ) : (
          // Results Page
          <div style={{ opacity: fadeOpacity, transition: 'opacity 0.3s' }}>
            <GoogleSearchHeader searchText={searchText} />
            <GoogleTabs activeTab="all" />

            {/* Results */}
            <div className="relative">
              {step === 2 && <AnimatedArrow direction="down" position="top" />}
              {(translations.results as any[]).map((result: any, index: number) => (
                <SearchResultCard
                  key={index}
                  icon={result.icon}
                  title={result.title}
                  snippet={result.snippet}
                  tag={result.tag}
                />
              ))}
            </div>

            {step === 3 && (
              <div className="p-4">
                <div className="bg-green-600 p-5 rounded-xl text-center">
                  <p className="text-base text-white mb-4">{translations.completion}</p>
                  <button 
                    onClick={handleContinue}
                    className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100"
                  >
                    {translations.continueBtn}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleSearchBasics;
