// GoogleMapsFindingPlaces.tsx - Module 3, Lesson 1: Finding Places
// REDESIGNED: Simulation-first with non-blocking hints

import React, { useState, useEffect } from 'react';
import { Search, Plus, Minus, ArrowRight, Check } from 'lucide-react';

interface GoogleMapsFindingPlacesProps {
  onComplete: () => void;
  language: 'en' | 'zh';
}

type Step =
  | 'intro'
  | 'try-search'
  | 'try-zoom-in'
  | 'try-zoom-out'
  | 'try-satellite'
  | 'try-map-view'
  | 'free-explore'
  | 'complete';

const GoogleMapsFindingPlaces: React.FC<GoogleMapsFindingPlacesProps> = ({ onComplete, language }) => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapSrc, setMapSrc] = useState('');
  const [viewMode, setViewMode] = useState<'roadmap' | 'satellite'>('roadmap');
  const [zoomLevel, setZoomLevel] = useState(12); // Start at City View
  const [hasSearched, setHasSearched] = useState(false);
  const [hasZoomedIn, setHasZoomedIn] = useState(false);
  const [hasZoomedOut, setHasZoomedOut] = useState(false);
  const [hasSwitchedToSatellite, setHasSwitchedToSatellite] = useState(false);

  // Animation Phase: 'idle' | 'zooming-in' | 'ready-to-zoom-in' | 'ready-to-zoom-out' | 'zooming-out'
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'zooming-in' | 'ready-to-zoom-in' | 'ready-to-zoom-out' | 'zooming-out'>('idle');

  const t = language === 'en' ? {
    // Intro
    introTitle: 'Finding Places with Google Maps',
    introText: 'Learn by doing! Follow the hints to explore Google Maps.',
    startLesson: 'Start Exploring',

    // Hints
    hintSearch: 'Try searching for "Starbucks" or any place you like!',
    hintZoomIn: 'Click + to zoom in and see closer',
    hintZoomOut: 'Click - to zoom out and see wider area',
    hintSatellite: 'Click 🛰️ to see real satellite photos',
    hintMapView: 'Click 🗺️ to switch back to map view',
    hintExplore: 'Great! Now try searching for other places on your own.',

    // Progress
    completed: 'Completed',

    // Complete
    congratulations: 'Well Done!',
    completeText: 'You explored Google Maps! You can now find any place you need.',
    skillsLearned: 'What you learned:',
    skill1: '✓ Search for locations',
    skill2: '✓ Zoom in and out',
    skill3: '✓ Switch between map and satellite views',
    completeLesson: 'Complete Lesson',

    // UI
    searchPlaceholder: 'Search for places... (e.g. Starbucks, bank, clinic)',
    search: 'Search',
    finish: 'Finish Lesson',
  } : {
    // Intro
    introTitle: '使用谷歌地图查找地点',
    introText: '通过实践学习！按照提示探索谷歌地图。',
    startLesson: '开始探索',

    // Hints
    hintSearch: '尝试搜索"星巴克"或任何您喜欢的地方！',
    hintZoomIn: '点击 + 放大以看得更近',
    hintZoomOut: '点击 - 缩小以看更广的区域',
    hintSatellite: '点击 🛰️ 查看真实的卫星照片',
    hintMapView: '点击 🗺️ 切换回地图视图',
    hintExplore: '太好了！现在尝试自己搜索其他地方。',

    // Progress
    completed: '已完成',

    // Complete
    congratulations: '做得好！',
    completeText: '您已探索了谷歌地图！现在您可以找到任何需要的地方。',
    skillsLearned: '您学到的内容：',
    skill1: '✓ 搜索位置',
    skill2: '✓ 放大和缩小',
    skill3: '✓ 在地图和卫星视图之间切换',
    completeLesson: '完成课程',

    // UI
    searchPlaceholder: '搜索地点...',
    search: '搜索',
    finish: '完成课程',
  };

  // Generate Google Maps Embed URL
  const generateMapUrl = (query: string, mapType: string, zoom: number) => {
    const encodedQuery = encodeURIComponent(query || 'New York, NY');
    const baseParams = [
      `q=${encodedQuery}`,
      `z=${zoom}`,
      `t=${mapType === 'satellite' ? 'k' : 'm'}`,
      `hl=${language}`
    ].join('&');
    return `https://maps.google.com/maps?${baseParams}&output=embed`;
  };

  // Update map when parameters change
  useEffect(() => {
    const query = searchQuery || 'Times Square, New York, NY';
    setMapSrc(generateMapUrl(query, viewMode, zoomLevel));
  }, [searchQuery, viewMode, zoomLevel, language]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setMapSrc(generateMapUrl(searchQuery, viewMode, zoomLevel));
      setHasSearched(true);
      if (currentStep === 'try-search') {
        setTimeout(() => setCurrentStep('try-zoom-in'), 1000);
      }
    }
  };

  const handleZoomIn = () => {
    if (zoomLevel >= 20 || animationPhase !== 'idle') return;

    // 1. Instantly Update Map (Zoom In) & Set Scale 0.5 (Wider View via 200% size)
    setZoomLevel(prev => Math.min(20, prev + 2));
    setAnimationPhase('ready-to-zoom-in');

    // 2. Start Zoom-In Animation (Scale 0.5 -> 1)
    setTimeout(() => {
      setAnimationPhase('zooming-in');
      setHasZoomedIn(true);

      // 3. Reset to Idle after animation
      setTimeout(() => {
        setAnimationPhase('idle');
        if (currentStep === 'try-zoom-in') {
          setTimeout(() => setCurrentStep('try-zoom-out'), 500);
        }
      }, 1500);
    }, 50);
  };

  const handleZoomOut = () => {
    if (zoomLevel <= 8 || animationPhase !== 'idle') return;

    // 1. Instantly Update Map (Zoom Out) & Set Scale 2 (No Animation)
    // This loads the wider map but shows it "zoomed in" so it looks same as before
    setZoomLevel(prev => Math.max(8, prev - 2));
    setAnimationPhase('ready-to-zoom-out');

    // 2. Start Zoom-Out Animation (Scale 2 -> 1)
    setTimeout(() => {
      setAnimationPhase('zooming-out');
      setHasZoomedOut(true);

      // 3. Reset to Idle after animation
      setTimeout(() => {
        setAnimationPhase('idle');
        if (currentStep === 'try-zoom-out') {
          setTimeout(() => setCurrentStep('try-satellite'), 500);
        }
      }, 1500);
    }, 50);
  };

  const handleSatelliteToggle = () => {
    setViewMode('satellite');
    setHasSwitchedToSatellite(true);
    if (currentStep === 'try-satellite') {
      setTimeout(() => setCurrentStep('try-map-view'), 500);
    }
  };

  const handleMapToggle = () => {
    setViewMode('roadmap');
    if (currentStep === 'try-map-view') {
      setTimeout(() => setCurrentStep('free-explore'), 500);
    }
  };

  // ========================================
  // INTRO SCREEN
  // ========================================
  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex justify-center items-start p-6 pt-20">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg p-12">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">🗺️</div>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            {t.introTitle}
          </h2>

          <p className="text-2xl text-gray-600 text-center mb-8">
            {t.introText}
          </p>

          <button
            onClick={() => setCurrentStep('try-search')}
            className="w-full py-5 px-8 bg-green-600 hover:bg-green-700 text-white text-2xl font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-3"
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex justify-center items-start p-6 pt-20">
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

          <div className="bg-green-50 rounded-2xl p-6 mb-8">
            <p className="text-xl font-semibold text-gray-900 mb-4">{t.skillsLearned}</p>
            <div className="space-y-2">
              <p className="text-lg text-gray-700">{t.skill1}</p>
              <p className="text-lg text-gray-700">{t.skill2}</p>
              <p className="text-lg text-gray-700">{t.skill3}</p>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-5 px-8 bg-green-600 hover:bg-green-700 text-white text-2xl font-bold rounded-xl transition-colors shadow-lg"
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
  const FloatingHint = ({ text, position }: { text: string; position: React.CSSProperties }) => (
    <div
      key={text}
      className="absolute z-50 bg-yellow-400 text-gray-900 px-6 py-4 rounded-2xl shadow-2xl font-bold text-lg max-w-sm"
      style={{
        ...position,
        animation: 'bounce-subtle 1.5s ease-in-out infinite'
      }}
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
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${hasSearched ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
            {hasSearched ? <Check className="w-5 h-5" /> : '1️⃣'}
            <span className="font-semibold">{language === 'en' ? 'Search' : '搜索'}</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${hasZoomedIn ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
            {hasZoomedIn ? <Check className="w-5 h-5" /> : '2️⃣'}
            <span className="font-semibold">{language === 'en' ? 'Zoom In' : '放大'}</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${hasZoomedOut ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
            {hasZoomedOut ? <Check className="w-5 h-5" /> : '3️⃣'}
            <span className="font-semibold">{language === 'en' ? 'Zoom Out' : '缩小'}</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${hasSwitchedToSatellite ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
            {hasSwitchedToSatellite ? <Check className="w-5 h-5" /> : '4️⃣'}
            <span className="font-semibold">{language === 'en' ? 'Satellite View' : '卫星视图'}</span>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border-4 border-green-500 shadow-2xl">

          {/* Search Bar */}
          <div className="absolute top-4 left-4 right-4 z-40">
            <div className={`bg-white rounded-2xl p-4 shadow-xl border-2 ${currentStep === 'try-search' ? 'border-blue-500 highlight-pulse' : 'border-gray-200'}`}>
              <div className="flex items-center gap-4">
                <Search className="w-8 h-8 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchQuery(val);
                    if ((val.toLowerCase().includes('starbucks') || val.includes('星巴克')) && !hasSearched) {
                      setHasSearched(true);
                      if (currentStep === 'try-search') {
                        setTimeout(() => setCurrentStep('try-zoom-in'), 1000);
                      }
                    }
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={t.searchPlaceholder}
                  className="flex-1 outline-none text-xl font-medium bg-transparent placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Floating Hints - Non-blocking */}
          {currentStep === 'try-search' && (
            <FloatingHint
              text={t.hintSearch}
              position={{ top: '110px', left: '20px' }}
            />
          )}

          {currentStep === 'try-zoom-in' && (
            <FloatingHint
              text={t.hintZoomIn}
              position={{ right: '140px', top: '140px' }}
            />
          )}

          {currentStep === 'try-zoom-out' && (
            <FloatingHint
              text={t.hintZoomOut}
              position={{ right: '120px', top: '300px' }}
            />
          )}

          {currentStep === 'try-satellite' && (
            <FloatingHint
              text={t.hintSatellite}
              position={{ right: '120px', top: '400px' }}
            />
          )}

          {currentStep === 'try-map-view' && (
            <FloatingHint
              text={t.hintMapView}
              position={{ right: '120px', top: '400px' }}
            />
          )}

          {currentStep === 'free-explore' && (
            <FloatingHint
              text={t.hintExplore}
              position={{ top: '110px', left: '20px' }}
            />
          )}

          {/* Zoom Controls */}
          <div className="absolute right-4 top-32 flex flex-col gap-3 z-30">
            <button
              onClick={handleZoomIn}
              className={`w-16 h-16 rounded-2xl shadow-xl bg-white hover:bg-gray-50 border-2 border-gray-300 transition-all hover:scale-110 
                ${currentStep === 'try-zoom-in' ? 'border-blue-500 highlight-pulse' : ''}`}
            >
              <Plus className="w-10 h-10 text-green-600 mx-auto" />
            </button>
            <div className="bg-white rounded-xl p-2 shadow-xl border-2 border-gray-200 text-center">
              <div className="text-lg font-bold text-gray-900">{zoomLevel}x</div>
            </div>
            <button
              onClick={handleZoomOut}
              className={`w-16 h-16 rounded-2xl shadow-xl bg-white hover:bg-gray-50 border-2 border-gray-300 transition-all hover:scale-110 
                ${currentStep === 'try-zoom-out' ? 'border-blue-500 highlight-pulse' : ''}`}
            >
              <Minus className="w-10 h-10 text-green-600 mx-auto" />
            </button>
          </div>

          {/* View Toggle */}
          <div className="absolute right-4 top-96 z-30">
            <div className="bg-white rounded-2xl p-3 shadow-xl border-2 border-gray-200">
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleMapToggle}
                  className={`w-20 h-12 rounded-xl font-bold transition-all ${viewMode === 'roadmap'
                    ? 'bg-green-600 text-white scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } ${currentStep === 'try-map-view' ? 'highlight-pulse border-2 border-blue-500' : ''}`}
                >
                  🗺️
                </button>
                <button
                  onClick={handleSatelliteToggle}
                  className={`w-20 h-12 rounded-xl font-bold transition-all ${viewMode === 'satellite'
                    ? 'bg-green-600 text-white scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } ${currentStep === 'try-satellite' ? 'highlight-pulse border-2 border-blue-500' : ''}`}
                >
                  🛰️
                </button>
              </div>
            </div>
          </div>


          {/* Google Maps Iframe wrapper for smooth zoom */}
          <div className="w-full h-full overflow-hidden relative rounded-xl">
            <div
              className={`origin-center box-border
                ${['idle', 'ready-to-zoom-out', 'zooming-out'].includes(animationPhase) ? 'w-full h-full relative' : ''}
                ${['ready-to-zoom-in', 'zooming-in'].includes(animationPhase) ? 'w-[200%] h-[200%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}

                ${animationPhase === 'ready-to-zoom-in' ? 'scale-50 transition-none' : ''}
                ${animationPhase === 'zooming-in' ? 'scale-100 transition-transform duration-[1500ms] ease-in-out' : ''}
                
                ${animationPhase === 'ready-to-zoom-out' ? 'scale-[2] transition-none' : ''}
                ${animationPhase === 'zooming-out' ? 'scale-100 transition-transform duration-[1500ms] ease-in-out' : ''}
                ${animationPhase === 'idle' ? 'scale-100' : ''}
              `}
            >
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl w-full h-full"
                title="Google Maps"
              />
            </div>
          </div>
        </div>

        {/* Finish Button (only in free-explore) */}
        {
          currentStep === 'free-explore' && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setCurrentStep('complete')}
                className="px-12 py-4 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-xl transition-colors shadow-lg"
              >
                {t.finish} →
              </button>
            </div>
          )
        }
      </div >
    </div >
  );
};

export default GoogleMapsFindingPlaces;
