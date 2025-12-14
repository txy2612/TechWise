import React, { useState } from 'react';
import {
  GoogleLogo,
  GoogleSearchBar,
  SearchSuggestions,
  GoogleSearchHeader,
  GoogleTabs,
} from '../../common/GoogleComponents';
import { InstructionHint, PracticeBanner, AnimatedArrow } from '../../common';
import { getLessonTexts, LESSON_KEYS } from '../../../data/lessonTexts_module2';


interface MapPin {
  name: string;
  distance: string;
  address: string;
}

interface NearestClinicSearchTexts {
  lessonTitle: string;
  scenario: string;
  step0: string;
  step1: string;
  step2: string;
  continueBtn: string;
  suggestions: string[];
  mapPins: MapPin[];
}


interface NearestClinicSearchProps {
  onComplete?: () => void;
  language?: 'en' | 'zh';
}

  // Get translations
const NearestClinicSearch: React.FC<NearestClinicSearchProps> = ({ onComplete, language = 'en' }) => {
  const [step, setStep] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [fadeOpacity, setFadeOpacity] = useState(1);

   const translations = getLessonTexts(
    LESSON_KEYS.NEAREST_CLINIC_SEARCH,
    language
  ) as NearestClinicSearchTexts;
  const commonTexts = getLessonTexts(LESSON_KEYS.COMMON, language);
  const totalSteps = 3;

  const handleSearchBarTap = () => {
    if (step === 0) {
      setShowSuggestions(true);
      setStep(1);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchText(suggestion);
    setShowSuggestions(false);
    setFadeOpacity(0);
    setTimeout(() => {
      setFadeOpacity(1);
      setShowMap(true);
      setStep(2);
    }, 200);
  };

  return (
    <div className="max-w-6xl mx-auto">

      <div className="bg-yellow-100 px-8 py-5 border-b border-yellow-400 text-2xl font-bold tracking-wide">
        🏥 Find the nearest clinic
      </div>

      <div className="p-4">
        {step === 0 && <InstructionHint text={translations.step0} currentStep={step} totalSteps={totalSteps} language={language} />}
        {step === 1 && <InstructionHint text={translations.step1} currentStep={step} totalSteps={totalSteps} language={language} />}
      </div>

      <div className="flex-1 overflow-y-auto">
        {!showMap ? (
          <div className="flex flex-col items-center px-5 pb-10" style={{ opacity: fadeOpacity, transition: 'opacity 0.3s' }}>
            <div className="mb-10"><GoogleLogo size="large" /></div>
            <div className="w-full max-w-2xl relative">
              {step === 0 && <AnimatedArrow direction="down" position="top" />}
              <div className={step === 0 ? 'pulse-border rounded-full' : ''}>
                <GoogleSearchBar
                  value={searchText}
                  onChangeText={setSearchText}
                  onPress={handleSearchBarTap}
                  placeholder={commonTexts.searchPlaceholder}
                  showMic={true}
                  className="text-lg"
                />
              </div>
              {showSuggestions && (
                <div className="relative">
                  {step === 1 && <AnimatedArrow direction="down" position="top" />}
                  <div className={step === 1 ? 'rounded-lg' : ''}>
                    <SearchSuggestions suggestions={translations.suggestions as string[]} onSelect={handleSuggestionSelect} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ opacity: fadeOpacity, transition: 'opacity 0.3s' }}>
            <GoogleSearchHeader searchText={searchText} />
            <GoogleTabs activeTab="all" />
            <div>
              <div className="h-64 bg-blue-50 m-4 rounded-xl relative border-2 border-blue-500 flex items-center justify-center">
                <div className="absolute top-4 left-4 text-xl font-bold text-blue-600">📍 {language === 'zh' ? '地图' : 'Map'}</div>
                {(translations.mapPins as any[]).map((pin: any, index: number) => (
                  <div key={index} className="absolute text-3xl" style={{ top: `${60 + index * 80}px`, left: `${40 + index * 60}px` }}>📍</div>
                ))}
              </div>
              <div className="p-4">
                {(translations.mapPins as any[]).map((clinic: any, index: number) => (
                  <div key={index} className="flex bg-white p-4 mb-3 rounded-xl border border-gray-200 shadow-sm">
                    <div className="mr-4"><span className="text-3xl">🏥</span></div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold mb-1">{clinic.name}</h3>
                      <p className="text-sm text-gray-600 mb-0.5">📍 {clinic.distance}</p>
                      <p className="text-sm text-gray-600">{clinic.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {step === 2 && (
              <div className="p-4">
                <button onClick={() => onComplete && onComplete()} className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700">
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

export default NearestClinicSearch;
