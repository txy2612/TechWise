import React, { useState } from 'react';
import {
  GoogleLogo,
  GoogleSearchBar,
  GoogleSearchHeader,
  WeatherCard,
  VoiceInputModal
} from '../../common/GoogleComponents';
import { 
  InstructionHint, 
  AnimatedArrow,
  PracticeBanner
} from '../../common';
import { getLessonTexts, LESSON_KEYS } from '../../../data/lessonTexts_module2';

interface GoogleVoiceSearchProps {
  onComplete?: () => void;
  onBack?: () => void;
  language?: 'en' | 'zh';
}

const GoogleVoiceSearch: React.FC<GoogleVoiceSearchProps> = ({ 
  onComplete, 
  onBack,
  language = 'en' 
}) => {
  // ========== STATE ==========
  const [step, setStep] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [micActive, setMicActive] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // ========== TRANSLATIONS ==========
  const t = getLessonTexts(LESSON_KEYS.GOOGLE_VOICE_SEARCH, language) as any;

  const totalSteps = 3;

  // ========== HANDLERS ==========
  
  // Step 0 → Step 1: Tap microphone
  const handleMicTap = () => {
    if (step === 0) {
      setMicActive(true);
      setShowVoiceModal(true);
      setStep(1);
    }
  };

  // Step 1 → Step 2: Speak (simulated)
  const handleSpeak = () => {
    setShowVoiceModal(false);
    setMicActive(false);
    
    // Simulate typing "Weather" into search bar
    const word = t.searchQuery || 'Weather';
    let currentText = '';
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < word.length) {
        currentText += word[index];
        setSearchText(currentText);
        index++;
      } else {
        clearInterval(typingInterval);
        
        // Wait then show results
        setTimeout(() => {
          setShowResults(true);
          setStep(2);
        }, 500);
      }
    }, 100);
  };

  // Step 2 → Complete
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

              <div className="w-full max-w-2xl">
                {/* Step 0 & 1: Search bar with mic (NO tap search bar step!) */}
                <div className="relative">
                  <GoogleSearchBar
                    value={searchText}
                    placeholder={t.searchPlaceholder}
                    showMic={true}
                    micActive={micActive}
                    micPulsing={step === 0}
                    onMicTap={handleMicTap}
                  />
                  {step === 0 && (
                    <div className="absolute -right-16 top-1/2 -translate-y-1/2">
                      <AnimatedArrow direction="left" position="right" />
                    </div>
                  )}
                </div>
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

              {step === 2 && (
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

        {/* Voice Input Modal */}
        <VoiceInputModal
          visible={showVoiceModal}
          promptText={t.voicePrompt}
          onSpeak={handleSpeak}
          language={language}
        />
      </div>
    </div>
  );
};

export default GoogleVoiceSearch;
