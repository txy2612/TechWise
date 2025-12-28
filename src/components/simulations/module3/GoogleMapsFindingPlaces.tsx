// GoogleMapsFindingPlaces.tsx - Module 3, Lesson 1: Finding Places
// REDESIGNED: Simulation-first with non-blocking hints

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Plus, Minus, ArrowRight, Check } from 'lucide-react';

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
  const [zoomLevel, setZoomLevel] = useState(15);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasZoomedIn, setHasZoomedIn] = useState(false);
  const [hasZoomedOut, setHasZoomedOut] = useState(false);
  const [hasSwitchedToSatellite, setHasSwitchedToSatellite] = useState(false);

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
    searchPlaceholder: 'Search for places...',
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
    setZoomLevel(Math.min(20, zoomLevel + 2));
    setHasZoomedIn(true);
    if (currentStep === 'try-zoom-in') {
      setTimeout(() => setCurrentStep('try-zoom-out'), 500);
    }
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(8, zoomLevel - 2));
    setHasZoomedOut(true);
    if (currentStep === 'try-zoom-out') {
      setTimeout(() => setCurrentStep('try-satellite'), 500);
    }
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
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
            <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-gray-200">
              <div className="flex items-center gap-4">
                <Search className="w-8 h-8 text-green-600 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={t.searchPlaceholder}
                  className="flex-1 outline-none text-xl font-medium bg-transparent placeholder-gray-500"
                />
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-xl transition-colors"
                >
                  🔍 {t.search}
                </button>
              </div>
            </div>
          </div>

          {/* Floating Hints - Non-blocking */}
          {currentStep === 'try-search' && (
            <FloatingHint 
              text={t.hintSearch} 
              position={{ top: '100px', left: '50%', transform: 'translateX(-50%)' }} 
            />
          )}

          {currentStep === 'try-zoom-in' && (
            <FloatingHint 
              text={t.hintZoomIn} 
              position={{ right: '120px', bottom: '280px' }} 
            />
          )}

          {currentStep === 'try-zoom-out' && (
            <FloatingHint 
              text={t.hintZoomOut} 
              position={{ right: '120px', bottom: '200px' }} 
            />
          )}

          {currentStep === 'try-satellite' && (
            <FloatingHint 
              text={t.hintSatellite} 
              position={{ right: '120px', bottom: '160px' }} 
            />
          )}

          {currentStep === 'try-map-view' && (
            <FloatingHint 
              text={t.hintMapView} 
              position={{ right: '120px', bottom: '100px' }} 
            />
          )}

          {currentStep === 'free-explore' && (
            <FloatingHint 
              text={t.hintExplore} 
              position={{ top: '100px', left: '50%', transform: 'translateX(-50%)' }} 
            />
          )}

          {/* View Toggle */}
          <div className="absolute right-4 bottom-32 z-30">
            <div className="bg-white rounded-2xl p-3 shadow-xl border-2 border-gray-200">
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleMapToggle}
                  className={`w-20 h-12 rounded-xl font-bold transition-all ${
                    viewMode === 'roadmap' 
                      ? 'bg-green-600 text-white scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🗺️
                </button>
                <button
                  onClick={handleSatelliteToggle}
                  className={`w-20 h-12 rounded-xl font-bold transition-all ${
                    viewMode === 'satellite' 
                      ? 'bg-green-600 text-white scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🛰️
                </button>
              </div>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute right-4 bottom-52 flex flex-col gap-3 z-30">
            <button
              onClick={handleZoomIn}
              className="w-16 h-16 rounded-2xl shadow-xl bg-white hover:bg-gray-50 border-2 border-gray-300 transition-all hover:scale-110"
            >
              <Plus className="w-10 h-10 text-green-600 mx-auto" />
            </button>
            <div className="bg-white rounded-xl p-2 shadow-xl border-2 border-gray-200 text-center">
              <div className="text-lg font-bold text-gray-900">{zoomLevel}x</div>
            </div>
            <button
              onClick={handleZoomOut}
              className="w-16 h-16 rounded-2xl shadow-xl bg-white hover:bg-gray-50 border-2 border-gray-300 transition-all hover:scale-110"
            >
              <Minus className="w-10 h-10 text-green-600 mx-auto" />
            </button>
          </div>

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
            title="Google Maps"
          />
        </div>

        {/* Finish Button (only in free-explore) */}
        {currentStep === 'free-explore' && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentStep('complete')}
              className="px-12 py-4 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-xl transition-colors shadow-lg"
            >
              {t.finish} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleMapsFindingPlaces;
