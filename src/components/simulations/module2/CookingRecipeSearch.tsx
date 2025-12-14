import React, { useState } from 'react';
import { InstructionHint, PracticeBanner, AnimatedArrow } from '../../common';
import {
  GoogleLogo,
  GoogleSearchBar,
  GoogleSearchHeader,
  GoogleTabs,
  SearchResultCard
} from '../../common/GoogleComponents';
import { getLessonTexts, LESSON_KEYS } from '../../../data/lessonTexts_module2';
import googleMicIcon from '../../assets/google-mic.png';

interface CookingRecipeSearchTexts {
  lessonTitle: string;
  scenario: string;
  step0: string;
  step1: string;
  completion: string;
  continueBtn: string;
  hintLabel: string;
  searchTerm: string;
  results: {
    icon: string;
    title: string;
    snippet: string;
    tag: string;
    url?: string;
  }[];
}

interface CookingRecipeSearchProps {
  onComplete?: () => void;
  language?: 'en' | 'zh';
}


const CookingRecipeSearch: React.FC<CookingRecipeSearchProps> = ({ onComplete, language = 'en' }) => {
  const [step, setStep] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [fadeOpacity, setFadeOpacity] = useState(1);

  const translations = getLessonTexts(
    LESSON_KEYS.COOKING_RECIPE_SEARCH,
    language
  ) as CookingRecipeSearchTexts;
  const commonTexts = getLessonTexts(LESSON_KEYS.COMMON, language);
  const targetText = translations.searchTerm as string;
  const totalSteps = 3;

  const handleTyping = (text: string) => {
    setSearchText(text);
    if (step === 0 && text.toLowerCase().includes(targetText.toLowerCase())) {
      setTimeout(() => {
        setFadeOpacity(0);
        setTimeout(() => {
          setFadeOpacity(1);
          setShowResults(true);
          setStep(1);
        }, 200);
      }, 500);
    }
  };

  const handleScroll = () => {
    if (step === 1) {
      setTimeout(() => setStep(2), 1000);
    }
  };

  return (
     <div className="max-w-6xl mx-auto">

      <div className="bg-yellow-100 px-8 py-5 border-b border-yellow-400 text-2xl font-bold tracking-wide">
        🍳 Cooking Recipe Search
      </div>

      <div className="p-4">
        {step === 0 && <InstructionHint text={translations.step0} currentStep={step} totalSteps={totalSteps} language={language} />}
        {step === 1 && <InstructionHint text={translations.step1} currentStep={step} totalSteps={totalSteps} language={language} />}
      </div>

      <div className="max-h-[70vh] overflow-y-auto p-4" onScroll={handleScroll}>
        {!showResults ? (
          <div className="flex flex-col items-center px-5 pb-10" style={{ opacity: fadeOpacity, transition: 'opacity 0.3s' }}>
            <div className="mb-10"><GoogleLogo size="large" /></div>
            <div className="w-full max-w-2xl relative">
              {step === 0 && <AnimatedArrow direction="down" position="top" />}
              <div className={step === 0 ? 'pulse-border rounded-full' : ''}>
                <GoogleSearchBar value={searchText} onChangeText={handleTyping} placeholder={commonTexts.searchPlaceholder} autoFocus={true} showMic={true} />
              </div>
              {step === 0 && (
                <div className="bg-yellow-50 p-5 rounded-xl mt-4 border-2 border-yellow-500 shadow-md">
                  <p className="text-xl text-gray-800 font-semibold text-center">
                    💡 {translations.hintLabel}: "{targetText}"
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ opacity: fadeOpacity, transition: 'opacity 0.3s' }}>
            <GoogleSearchHeader searchText={searchText} />
            <GoogleTabs activeTab="all" />
            <div className="relative">
              {step === 1 && <AnimatedArrow direction="down" position="top" />}
              {(translations.results as any[]).map((result: any, index: number) => (
                <SearchResultCard key={index} icon={result.icon} title={result.title} snippet={result.snippet} tag={result.tag} url={result.url} />
              ))}
            </div>
            {step === 2 && (
              <div className="p-4">
                <div className="bg-green-50 p-5 rounded-xl text-center border-2 border-green-600">
                  <div className="text-5xl mb-3">✅</div>
                  <p className="text-base font-medium" style={{ color: '#137333' }}>{translations.completion}</p>
                </div>
                <button onClick={() => onComplete && onComplete()} className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 mt-4">
                  {translations.continueBtn}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CookingRecipeSearch;
