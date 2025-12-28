// GoogleMapsDirections.tsx - Module 3, Lesson 2: Getting Directions
// REDESIGNED: Simulation-first with non-blocking hints

import React, { useState, useEffect } from 'react';
import { Search, Navigation, MapPin, ArrowRight, Check } from 'lucide-react';

interface GoogleMapsDirectionsProps {
  onComplete: () => void;
  language: 'en' | 'zh';
}

type Step = 
  | 'intro'
  | 'search-destination'
  | 'set-starting-point'
  | 'choose-transport'
  | 'free-explore'
  | 'complete';

const GoogleMapsDirections: React.FC<GoogleMapsDirectionsProps> = ({ onComplete, language }) => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [destination, setDestination] = useState('');
  const [startPoint, setStartPoint] = useState('');
  const [mapSrc, setMapSrc] = useState('');
  const [showDirectionsMode, setShowDirectionsMode] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<'driving' | 'walking' | 'transit' | null>(null);
  const [hasSearchedDestination, setHasSearchedDestination] = useState(false);
  const [hasSetStartPoint, setHasSetStartPoint] = useState(false);
  const [hasChosenTransport, setHasChosenTransport] = useState(false);

  const t = language === 'en' ? {
    // Intro
    introTitle: 'Getting Directions',
    introText: 'Learn by doing! Follow the hints to get directions on Google Maps.',
    startLesson: 'Start Learning',

    // Hints
    hintDestination: 'Search for where you want to go, like "McDonald\'s Times Square"',
    hintStartPoint: 'Type your starting location, like "Central Park"',
    hintTransport: 'Choose how you\'ll travel: 🚗 driving, 🚶 walking, or 🚌 transit',
    hintExplore: 'Great! Now try planning other trips on your own.',
    
    // Complete
    congratulations: 'Excellent Work!',
    completeText: 'You can now get directions to anywhere on Google Maps!',
    skillsLearned: 'What you learned:',
    skill1: '✓ Set your destination',
    skill2: '✓ Choose your starting point',
    skill3: '✓ Select transportation mode',
    completeLesson: 'Complete Lesson',

    // UI
    searchPlaceholder: 'Where do you want to go?',
    startPlaceholder: 'Where are you starting from?',
    search: 'Search',
    driving: 'Driving',
    walking: 'Walking',
    transit: 'Transit',
    finish: 'Finish Lesson',
  } : {
    // Intro
    introTitle: '获取路线',
    introText: '通过实践学习！按照提示在谷歌地图上获取路线。',
    startLesson: '开始学习',

    // Hints
    hintDestination: '搜索您想去的地方，如"时代广场麦当劳"',
    hintStartPoint: '输入您的起始位置，如"中央公园"',
    hintTransport: '选择您的出行方式：🚗 驾车、🚶 步行或 🚌 公交',
    hintExplore: '太好了！现在尝试自己规划其他行程。',
    
    // Complete
    congratulations: '做得好！',
    completeText: '您现在可以在谷歌地图上获取到任何地方的路线！',
    skillsLearned: '您学到的内容：',
    skill1: '✓ 设置目的地',
    skill2: '✓ 选择起点',
    skill3: '✓ 选择交通方式',
    completeLesson: '完成课程',

    // UI
    searchPlaceholder: '您想去哪里？',
    startPlaceholder: '您从哪里出发？',
    search: '搜索',
    driving: '驾车',
    walking: '步行',
    transit: '公交',
    finish: '完成课程',
  };

  // Generate Google Maps URL with directions
  const generateDirectionsUrl = (from: string, to: string) => {
    const encodedFrom = encodeURIComponent(from || 'Central Park, New York');
    const encodedTo = encodeURIComponent(to || 'Times Square, New York');
    return `https://maps.google.com/maps?saddr=${encodedFrom}&daddr=${encodedTo}&hl=${language}&output=embed`;
  };

  const generateSearchUrl = (query: string) => {
    const encoded = encodeURIComponent(query);
    return `https://maps.google.com/maps?q=${encoded}&hl=${language}&output=embed`;
  };

  // Update map
  useEffect(() => {
    if (showDirectionsMode && destination && startPoint) {
      setMapSrc(generateDirectionsUrl(startPoint, destination));
    } else if (destination) {
      setMapSrc(generateSearchUrl(destination));
    }
  }, [destination, startPoint, showDirectionsMode, language]);

  const handleSearchDestination = () => {
    if (destination.trim()) {
      setMapSrc(generateSearchUrl(destination));
      setHasSearchedDestination(true);
      setShowDirectionsMode(true);
      setTimeout(() => setCurrentStep('set-starting-point'), 1000);
    }
  };

  const handleSetStartPoint = () => {
    if (startPoint.trim()) {
      setHasSetStartPoint(true);
      setTimeout(() => setCurrentStep('choose-transport'), 500);
    }
  };

  const handleTransportSelect = (mode: 'driving' | 'walking' | 'transit') => {
    setSelectedTransport(mode);
    setHasChosenTransport(true);
    setTimeout(() => setCurrentStep('free-explore'), 500);
  };

  // ========================================
  // INTRO SCREEN
  // ========================================
  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg p-12">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">🧭</div>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            {t.introTitle}
          </h2>

          <p className="text-2xl text-gray-600 text-center mb-8">
            {t.introText}
          </p>

          <button
            onClick={() => setCurrentStep('search-destination')}
            className="w-full py-5 px-8 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-3"
          >
            {t.startLesson}
            <ArrowRight className="w-8 h-8" />
          </button>
        </div>
      </div>
    );
  }

  // ========================================
  // COMPLETE SCREEN
  // ========================================
  if (currentStep === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg p-12">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">🎉</div>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            {t.congratulations}
          </h2>

          <p className="text-2xl text-gray-600 text-center mb-8">
            {t.completeText}
          </p>

          <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <p className="text-xl font-semibold text-gray-900 mb-4">{t.skillsLearned}</p>
            <div className="space-y-2">
              <p className="text-lg text-gray-700">{t.skill1}</p>
              <p className="text-lg text-gray-700">{t.skill2}</p>
              <p className="text-lg text-gray-700">{t.skill3}</p>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-5 px-8 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-xl transition-colors shadow-lg"
          >
            {t.completeLesson}
          </button>
        </div>
      </div>
    );
  }

  // ========================================
  // FLOATING HINT COMPONENT
  // ========================================
  const FloatingHint = ({ text, position }: { text: string; position: { top?: string; bottom?: string; left?: string; right?: string } }) => (
    <div 
      className="absolute z-50 bg-yellow-400 text-gray-900 px-6 py-4 rounded-2xl shadow-2xl font-bold text-lg max-w-sm animate-bounce"
      style={position}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">👉</span>
        <span>{text}</span>
      </div>
    </div>
  );

  // ========================================
  // MAIN MAP VIEW WITH NON-BLOCKING HINTS
  // ========================================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Progress Checklist */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex flex-wrap gap-4 justify-center">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${hasSearchedDestination ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>
            {hasSearchedDestination ? <Check className="w-5 h-5" /> : '1️⃣'}
            <span className="font-semibold">{language === 'en' ? 'Destination' : '目的地'}</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${hasSetStartPoint ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>
            {hasSetStartPoint ? <Check className="w-5 h-5" /> : '2️⃣'}
            <span className="font-semibold">{language === 'en' ? 'Starting Point' : '起点'}</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${hasChosenTransport ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>
            {hasChosenTransport ? <Check className="w-5 h-5" /> : '3️⃣'}
            <span className="font-semibold">{language === 'en' ? 'Transport' : '交通方式'}</span>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border-4 border-blue-500 shadow-2xl">
          
          {/* Search/Directions Interface */}
          {!showDirectionsMode ? (
            // Search Mode
            <div className="absolute top-4 left-4 right-4 z-40">
              <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-gray-200">
                <div className="flex items-center gap-4">
                  <Search className="w-8 h-8 text-blue-600" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchDestination()}
                    placeholder={t.searchPlaceholder}
                    className="flex-1 outline-none text-xl font-medium bg-transparent placeholder-gray-500"
                  />
                  <button
                    onClick={handleSearchDestination}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl"
                  >
                    🔍 {t.search}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Directions Mode
            <div className="absolute top-4 left-4 right-4 z-40">
              <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-blue-400">
                <div className="space-y-3">
                  {/* Starting Point */}
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      A
                    </div>
                    <input
                      type="text"
                      value={startPoint}
                      onChange={(e) => setStartPoint(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSetStartPoint()}
                      placeholder={t.startPlaceholder}
                      className="flex-1 outline-none text-lg font-medium bg-gray-50 p-2 rounded-lg"
                    />
                    {!hasSetStartPoint && startPoint.trim() && (
                      <button
                        onClick={handleSetStartPoint}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg"
                      >
                        ✓ Set
                      </button>
                    )}
                  </div>
                  
                  {/* Destination */}
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                      B
                    </div>
                    <input
                      type="text"
                      value={destination}
                      disabled
                      className="flex-1 outline-none text-lg font-medium bg-gray-100 p-2 rounded-lg text-gray-600"
                    />
                  </div>
                </div>

                {/* Transport Mode Selection */}
                {currentStep === 'choose-transport' || currentStep === 'free-explore' ? (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleTransportSelect('driving')}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                          selectedTransport === 'driving'
                            ? 'bg-blue-600 text-white scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        🚗 {t.driving}
                      </button>
                      <button
                        onClick={() => handleTransportSelect('walking')}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                          selectedTransport === 'walking'
                            ? 'bg-blue-600 text-white scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        🚶 {t.walking}
                      </button>
                      <button
                        onClick={() => handleTransportSelect('transit')}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                          selectedTransport === 'transit'
                            ? 'bg-blue-600 text-white scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        🚌 {t.transit}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {/* Floating Hints - Non-blocking */}
          {currentStep === 'search-destination' && (
            <FloatingHint 
              text={t.hintDestination} 
              position={{ top: '100px', left: '50%', transform: 'translateX(-50%)' }} 
            />
          )}

          {currentStep === 'set-starting-point' && (
            <FloatingHint 
              text={t.hintStartPoint} 
              position={{ top: '20px', left: '50px' }} 
            />
          )}

          {currentStep === 'choose-transport' && (
            <FloatingHint 
              text={t.hintTransport} 
              position={{ top: '180px', left: '50%', transform: 'translateX(-50%)' }} 
            />
          )}

          {currentStep === 'free-explore' && (
            <FloatingHint 
              text={t.hintExplore} 
              position={{ top: '100px', left: '50%', transform: 'translateX(-50%)' }} 
            />
          )}

          {/* Google Maps Iframe */}
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
            title="Google Maps Directions"
          />
        </div>

        {/* Finish Button (only in free-explore) */}
        {currentStep === 'free-explore' && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentStep('complete')}
              className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-xl transition-colors shadow-lg"
            >
              {t.finish} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleMapsDirections;
