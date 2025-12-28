// GoogleNavigation.tsx - Module 3, Lesson 3: Understanding Navigation
// REDESIGNED: Simulation-first with non-blocking hints

import React, { useState, useEffect } from 'react';
import { Navigation, Volume2, X, Menu, ArrowRight, Check } from 'lucide-react';

interface GoogleNavigationProps {
  onComplete: () => void;
  language: 'en' | 'zh';
}

type Step = 
  | 'intro'
  | 'start-navigation'
  | 'watch-instruction'
  | 'acknowledge-turn'
  | 'follow-route'
  | 'arrival'
  | 'complete';

interface NavigationState {
  currentInstruction: string;
  currentInstructionZh: string;
  distanceRemaining: number;
  streetName: string;
  streetNameZh: string;
  arrow: 'right' | 'left' | 'straight' | 'arrival';
  timeRemaining: string;
  eta: string;
}

const GoogleNavigation: React.FC<GoogleNavigationProps> = ({ onComplete, language }) => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [navigationStarted, setNavigationStarted] = useState(false);
  const [hasAcknowledgedInstruction, setHasAcknowledgedInstruction] = useState(false);
  const [hasFollowedRoute, setHasFollowedRoute] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);

  const [navState, setNavState] = useState<NavigationState>({
    currentInstruction: 'Turn right in 500m',
    currentInstructionZh: '在500米后右转',
    distanceRemaining: 500,
    streetName: 'Main Street',
    streetNameZh: '主街',
    arrow: 'right',
    timeRemaining: '8 min',
    eta: '3:45 PM'
  });

  const t = language === 'en' ? {
    // Intro
    introTitle: 'Understanding Navigation',
    introText: 'Learn by doing! Follow the hints to understand how GPS navigation works.',
    startLesson: 'Start Navigation',

    // Hints
    hintStart: 'Click "Start Navigation" to begin your route',
    hintInstruction: 'This shows your next turn and how far away it is',
    hintAcknowledge: 'Click "Got It!" when you understand the instruction',
    hintFollow: 'Watch as the route guides you. Click "Continue" when ready.',
    hintArrival: 'You\'ve arrived! This is how navigation ends.',
    
    // Complete
    congratulations: 'Perfect!',
    completeText: 'You now understand how GPS navigation works!',
    skillsLearned: 'What you learned:',
    skill1: '✓ How to read turn instructions',
    skill2: '✓ What the distance numbers mean',
    skill3: '✓ How to follow the blue route line',
    skill4: '✓ When you\'ve arrived at your destination',
    completeLesson: 'Complete Lesson',

    // UI
    startNav: 'Start Navigation',
    gotIt: 'Got It!',
    continue: 'Continue',
    arriving: 'Arriving at destination',
    youArrived: 'You have arrived',
    finish: 'Finish Lesson',
    
    // Navigation elements
    to: 'to',
    volume: 'Volume',
    menu: 'Menu',
  } : {
    // Intro
    introTitle: '理解导航',
    introText: '通过实践学习！按照提示了解GPS导航的工作原理。',
    startLesson: '开始导航',

    // Hints
    hintStart: '点击"开始导航"以开始您的路线',
    hintInstruction: '这显示您的下一个转弯以及距离有多远',
    hintAcknowledge: '当您理解指示时点击"明白了！"',
    hintFollow: '观察路线如何引导您。准备好后点击"继续"。',
    hintArrival: '您已到达！这就是导航结束的方式。',
    
    // Complete
    congratulations: '完美！',
    completeText: '您现在了解GPS导航的工作原理了！',
    skillsLearned: '您学到的内容：',
    skill1: '✓ 如何阅读转弯指示',
    skill2: '✓ 距离数字的含义',
    skill3: '✓ 如何跟随蓝色路线',
    skill4: '✓ 何时到达目的地',
    completeLesson: '完成课程',

    // UI
    startNav: '开始导航',
    gotIt: '明白了！',
    continue: '继续',
    arriving: '即将到达目的地',
    youArrived: '您已到达',
    finish: '完成课程',
    
    // Navigation elements
    to: '前往',
    volume: '音量',
    menu: '菜单',
  };

  // Simulate navigation progression
  const segments = [
    {
      instruction: 'Turn right in 500m',
      instructionZh: '在500米后右转',
      street: 'Main Street',
      streetZh: '主街',
      arrow: 'right' as const,
      distance: 500
    },
    {
      instruction: 'Continue straight for 800m',
      instructionZh: '直行800米',
      street: 'Main Street',
      streetZh: '主街',
      arrow: 'straight' as const,
      distance: 800
    },
    {
      instruction: 'Turn left in 300m',
      instructionZh: '在300米后左转',
      street: 'Park Avenue',
      streetZh: '公园大道',
      arrow: 'left' as const,
      distance: 300
    },
    {
      instruction: 'Arriving at destination',
      instructionZh: '即将到达目的地',
      street: 'Starbucks Coffee',
      streetZh: '星巴克咖啡',
      arrow: 'arrival' as const,
      distance: 0
    }
  ];

  useEffect(() => {
    if (navigationStarted && currentStep === 'follow-route') {
      const interval = setInterval(() => {
        setNavState(prev => {
          if (prev.distanceRemaining > 0) {
            return {
              ...prev,
              distanceRemaining: Math.max(0, prev.distanceRemaining - 50)
            };
          }
          return prev;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [navigationStarted, currentStep]);

  // Check if reached turn
  useEffect(() => {
    if (navState.distanceRemaining === 0 && currentSegment < segments.length - 1) {
      setTimeout(() => {
        const nextSegment = currentSegment + 1;
        setCurrentSegment(nextSegment);
        setNavState({
          currentInstruction: segments[nextSegment].instruction,
          currentInstructionZh: segments[nextSegment].instructionZh,
          distanceRemaining: segments[nextSegment].distance,
          streetName: segments[nextSegment].street,
          streetNameZh: segments[nextSegment].streetZh,
          arrow: segments[nextSegment].arrow,
          timeRemaining: '5 min',
          eta: '3:45 PM'
        });
      }, 1000);
    } else if (navState.distanceRemaining === 0 && currentSegment === segments.length - 1) {
      setTimeout(() => {
        setCurrentStep('arrival');
      }, 1000);
    }
  }, [navState.distanceRemaining, currentSegment]);

  const handleStartNavigation = () => {
    setNavigationStarted(true);
    setCurrentStep('watch-instruction');
  };

  const handleAcknowledgeInstruction = () => {
    setHasAcknowledgedInstruction(true);
    setCurrentStep('follow-route');
  };

  // ========================================
  // INTRO SCREEN
  // ========================================
  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-6">
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
            onClick={() => setCurrentStep('start-navigation')}
            className="w-full py-5 px-8 bg-purple-600 hover:bg-purple-700 text-white text-2xl font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-3"
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-6">
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

          <div className="bg-purple-50 rounded-2xl p-6 mb-8">
            <p className="text-xl font-semibold text-gray-900 mb-4">{t.skillsLearned}</p>
            <div className="space-y-2">
              <p className="text-lg text-gray-700">{t.skill1}</p>
              <p className="text-lg text-gray-700">{t.skill2}</p>
              <p className="text-lg text-gray-700">{t.skill3}</p>
              <p className="text-lg text-gray-700">{t.skill4}</p>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-5 px-8 bg-purple-600 hover:bg-purple-700 text-white text-2xl font-bold rounded-xl transition-colors shadow-lg"
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
      className="absolute z-50 bg-yellow-400 text-gray-900 px-6 py-4 rounded-2xl shadow-2xl font-bold text-lg max-w-md animate-bounce"
      style={position}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">👉</span>
        <span>{text}</span>
      </div>
    </div>
  );

  // Get arrow icon
  const getArrowIcon = (arrow: string) => {
    switch (arrow) {
      case 'right': return '↱';
      case 'left': return '↰';
      case 'straight': return '↑';
      case 'arrival': return '📍';
      default: return '↑';
    }
  };

  // ========================================
  // MAIN NAVIGATION VIEW
  // ========================================
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Tracker */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex flex-wrap gap-4 justify-center">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${navigationStarted ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-500'}`}>
            {navigationStarted ? <Check className="w-5 h-5" /> : '1️⃣'}
            <span className="font-semibold">{language === 'en' ? 'Start' : '开始'}</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${hasAcknowledgedInstruction ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-500'}`}>
            {hasAcknowledgedInstruction ? <Check className="w-5 h-5" /> : '2️⃣'}
            <span className="font-semibold">{language === 'en' ? 'Understand' : '理解'}</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep === 'arrival' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-500'}`}>
            {currentStep === 'arrival' ? <Check className="w-5 h-5" /> : '3️⃣'}
            <span className="font-semibold">{language === 'en' ? 'Arrive' : '到达'}</span>
          </div>
        </div>

        {/* Navigation Interface */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-500">
          
          {/* Header */}
          <div className="bg-white px-6 py-4 flex items-center justify-between border-b-2 border-gray-200">
            <div className="flex items-center gap-4">
              <Volume2 className="w-6 h-6 text-gray-600" />
              <span className="text-sm text-gray-500">{t.volume}</span>
            </div>
            <div className="flex items-center gap-4">
              <Menu className="w-6 h-6 text-gray-600" />
              <X className="w-6 h-6 text-gray-600" />
            </div>
          </div>

          {/* Instruction Panel */}
          <div className="relative bg-white px-8 py-10 border-b-4 border-gray-200">
            {/* Arrow Icon */}
            <div className="text-center mb-4">
              <div className="text-8xl text-purple-600 font-bold">
                {getArrowIcon(navState.arrow)}
              </div>
            </div>

            {/* Distance */}
            <div className="text-center mb-2">
              <div className="text-6xl font-bold text-gray-900">
                {navState.distanceRemaining}m
              </div>
            </div>

            {/* Instruction */}
            <div className="text-center mb-2">
              <div className="text-2xl font-semibold text-gray-700">
                {language === 'en' ? navState.currentInstruction : navState.currentInstructionZh}
              </div>
            </div>

            {/* Street Name */}
            <div className="text-center">
              <div className="text-xl text-gray-500">
                {language === 'en' ? navState.streetName : navState.streetNameZh}
              </div>
            </div>

            {/* Hint for instruction */}
            {currentStep === 'watch-instruction' && (
              <FloatingHint 
                text={t.hintInstruction}
                position={{ top: '20px', left: '50%', transform: 'translateX(-50%)' }}
              />
            )}
          </div>

          {/* Map View (Simplified) */}
          <div className="relative bg-gray-300 h-[300px] overflow-hidden">
            {/* Road */}
            <svg className="absolute inset-0 w-full h-full">
              {/* Blue route line */}
              <line x1="50%" y1="100%" x2="50%" y2="0%" stroke="#4285F4" strokeWidth="8" />
              {/* Gray road */}
              <rect x="45%" y="0" width="10%" height="100%" fill="#888" />
              {/* White lane markings */}
              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="20,20" />
            </svg>

            {/* Blue dot (your location) */}
            <div 
              className="absolute w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"
              style={{ 
                left: 'calc(50% - 12px)', 
                bottom: currentStep === 'follow-route' ? `${100 - (navState.distanceRemaining / 5)}%` : '20px',
                transition: 'bottom 0.5s ease-out'
              }}
            />

            {/* Destination pin */}
            <div 
              className="absolute text-4xl"
              style={{ left: 'calc(50% - 20px)', top: '10px' }}
            >
              📍
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="bg-white px-8 py-6 border-t-2 border-gray-200">
            <div className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">{navState.timeRemaining}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">2.1 km</span>
              </div>
              <div className="text-gray-600">
                {navState.eta}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-8 py-6">
            {currentStep === 'start-navigation' && (
              <div className="relative">
                <button
                  onClick={handleStartNavigation}
                  className="w-full py-4 px-8 bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold rounded-xl transition-colors shadow-lg"
                >
                  {t.startNav}
                </button>
                <FloatingHint 
                  text={t.hintStart}
                  position={{ bottom: '80px', left: '50%', transform: 'translateX(-50%)' }}
                />
              </div>
            )}

            {currentStep === 'watch-instruction' && (
              <div className="relative">
                <button
                  onClick={handleAcknowledgeInstruction}
                  className="w-full py-4 px-8 bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold rounded-xl transition-colors shadow-lg"
                >
                  {t.gotIt}
                </button>
                <FloatingHint 
                  text={t.hintAcknowledge}
                  position={{ bottom: '80px', left: '50%', transform: 'translateX(-50%)' }}
                />
              </div>
            )}

            {currentStep === 'follow-route' && navState.distanceRemaining > 0 && (
              <div className="text-center">
                <div className="text-lg text-gray-600 mb-2">
                  {language === 'en' ? 'Following route...' : '跟随路线...'}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${100 - (navState.distanceRemaining / 5)}%` }}
                  />
                </div>
              </div>
            )}

            {currentStep === 'arrival' && (
              <div className="relative">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">🎉</div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {t.youArrived}
                  </div>
                  <div className="text-lg text-gray-600">
                    Starbucks Coffee
                  </div>
                </div>
                <button
                  onClick={() => setCurrentStep('complete')}
                  className="w-full py-4 px-8 bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold rounded-xl transition-colors shadow-lg"
                >
                  {t.finish} →
                </button>
                <FloatingHint 
                  text={t.hintArrival}
                  position={{ top: '-80px', left: '50%', transform: 'translateX(-50%)' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleNavigation;
