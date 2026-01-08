import React, { useState, useEffect } from 'react';
import { InstructionHint, PracticeBanner } from '../../common';
import { FAKE_WEBSITE_LESSON } from '../../../data/lessonTexts_module4';
import { AnimatedCheckmark } from '../../common/AnimatedCheckmark';
import { AlertTriangle, ShoppingCart, Unlock, ArrowRight } from 'lucide-react';

interface FakeWebsiteLessonProps {
  onComplete: () => void;
  language: 'en' | 'zh';
}

export const FakeWebsiteLesson: React.FC<FakeWebsiteLessonProps> = ({
  onComplete,
  language
}) => {
  const safeLang = language.startsWith('zh') ? 'zh' : 'en';
  // SAFETY CHECK: Ensure the lesson text exists before trying to use it
  const lessonData = FAKE_WEBSITE_LESSON;
  if (!lessonData || !lessonData[safeLang]) {
    return (
      <div className="p-8 text-center text-red-600">
        <h2 className="text-xl font-bold">Error Loading Lesson Data</h2>
        <p>Could not find text data for language: {safeLang}</p>
        <p>Please check src/data/lessonTexts_module4.ts</p>
      </div>
    );
  }
  const t = FAKE_WEBSITE_LESSON[safeLang];

  // 1: URL, 2: Price, 3: Grammar
  const [foundFlags, setFoundFlags] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dismissedFeedback, setDismissedFeedback] = useState<number[]>([]);

  const toggleFlag = (id: number) => {
    if (foundFlags.includes(id)) return; // Already found

    // Enforce sequential order
    const currentTarget = [1, 2, 3].find(i => !foundFlags.includes(i));
    if (id !== currentTarget) return;

    setFoundFlags([...foundFlags, id]);
  };

  const dismissFeedback = (id: number) => {
    if (!dismissedFeedback.includes(id)) {
      setDismissedFeedback([...dismissedFeedback, id]);
    }
  };

  const nextTarget = [1, 2, 3].find(id => !foundFlags.includes(id));

  const ArrowIndicator = () => (
    <div className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
      <div className="pulse-arrow">
        <ArrowRight className="w-12 h-12 text-blue-600 rotate-180 filter drop-shadow-md pulse-blue-filter" />
      </div>
    </div>
  );

  const isFound = (id: number) => foundFlags.includes(id);
  const shouldShowFeedback = (id: number) => isFound(id) && !dismissedFeedback.includes(id) && !showSuccess;

  useEffect(() => {
    if (foundFlags.length === 3) {
      // Delay success overlay until after the last feedback bubble disappears (3s + buffer)
      setTimeout(() => setShowSuccess(true), 3500);
    }
  }, [foundFlags]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <PracticeBanner language={safeLang} />

      <div className="p-6 max-w-2xl mx-auto w-full flex-1 flex flex-col">

        {/* Progress Hint */}
        {/* Progress Hint */}
        <InstructionHint
          text={showSuccess ? t.guideSuccess : t.guide}
          currentStep={foundFlags.length > 0 ? foundFlags.length - 1 : -1}
          totalSteps={3}
          language={safeLang}
          pulsing={!showSuccess}
        />

        {/* FAKE BROWSER CONTAINER */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 flex-1 flex flex-col relative mt-4">

          {/* Browser Toolbar */}
          <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center gap-3 rounded-t-3xl relative">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>

            {/* 1. SUSPICIOUS URL */}
            <div
              onClick={() => toggleFlag(1)}
              className={`relative flex-1 p-2 rounded-lg text-base flex items-center gap-2 cursor-pointer transition-all border-2 ${isFound(1)
                ? 'bg-green-100 border-green-500 text-green-800'
                : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
            >
              <Unlock className="w-4 h-4 text-red-500" />
              <span className="truncate">
                <span className="font-bold text-red-600">http</span>
                {t.url.replace(/^http/, '')}
              </span>

              {/* Fraud URL feedback bubble - inside URL container */}
              {shouldShowFeedback(1) && (
                <div
                  onClick={() => dismissFeedback(1)}
                  className="absolute left-0 top-full mt-3 bg-green-600 text-white text-lg font-bold px-5 py-3 rounded-2xl shadow-2xl z-50 w-72 text-center leading-tight cursor-pointer hover:bg-green-700 transition-colors animate-pop-in"
                >
                  {t.flag1Feedback.split(/[!！]/).map((part, i) => (
                    part.trim() && (
                      <React.Fragment key={i}>
                        {part}{i === 0 ? (t.flag1Feedback.includes('！') ? '！' : '!') : ''}
                        {i === 0 && <br />}
                      </React.Fragment>
                    )
                  ))}
                </div>
              )}
            </div>

            {nextTarget === 1 && <ArrowIndicator />}
          </div>

          {/* Website Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Fake Nav */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <div className="font-bold text-xl italic">{t.browserTitle}</div>
              <div className="flex gap-4">
                <span className="hidden sm:block">{t.navHome}</span>
                <span className="font-bold text-yellow-300 animate-pulse">{t.navDeals}</span>
                <ShoppingCart className="w-6 h-6" />
              </div>
            </div>

            {/* Product Section */}
            <div className="p-6 flex flex-col items-center">
              {/* Fake Product Image */}
              <div className="w-64 h-64 bg-gray-200 rounded-xl mb-6 flex items-center justify-center relative">
                <span className="text-6xl">📱</span>
                <div className="absolute top-0 right-0 bg-red-600 text-white font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                  -95% OFF
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{t.productTitle}</h2>

              {/* 2. SUSPICIOUS PRICE */}
              <div
                onClick={() => toggleFlag(2)}
                className={`relative w-full max-w-sm p-4 rounded-xl border-2 cursor-pointer mb-6 text-center transition-all ${isFound(2) ? 'bg-green-100 border-green-500' : 'bg-red-50 border-red-100 hover:border-red-300'
                  }`}
              >
                <div className="text-gray-400 line-through text-lg">{t.productOldPrice}</div>
                <div className="text-4xl font-extrabold text-red-600">{t.productPrice}</div>

                {/* Price fraud feedback bubble - positioned above to avoid overlap */}
                {shouldShowFeedback(2) && (
                  <div
                    onClick={() => dismissFeedback(2)}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-20 bg-green-600 text-white text-lg font-bold px-5 py-3 rounded-2xl shadow-2xl z-50 w-72 text-center leading-tight cursor-pointer hover:bg-green-700 transition-colors animate-pop-in"
                  >
                    {t.flag2Feedback.split(/[!！]/).map((part, i) => (
                      part.trim() && (
                        <React.Fragment key={i}>
                          {part}{i === 0 ? (t.flag2Feedback.includes('！') ? '！' : '!') : ''}
                          {i === 0 && <br />}
                        </React.Fragment>
                      )
                    ))}
                  </div>
                )}

                {nextTarget === 2 && <ArrowIndicator />}
              </div>

              {/* 3. BUY NOW BUTTON - The trap! */}
              <div className="relative w-full max-w-xs">
                <button
                  onClick={() => toggleFlag(3)}
                  className={`w-full py-4 rounded-full text-xl font-bold transition-all ${isFound(3)
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                    }`}
                >
                  {t.buyButton}
                </button>

                {/* Buy button warning bubble - positioned below */}
                {shouldShowFeedback(3) && (
                  <div
                    onClick={() => dismissFeedback(3)}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-4 bg-green-600 text-white text-lg font-bold px-6 py-4 rounded-2xl shadow-2xl z-50 text-center w-72 leading-tight cursor-pointer hover:bg-green-700 transition-colors animate-pop-in"
                  >
                    {t.flag3Feedback.split(/[!！]/).map((part, i) => (
                      part.trim() && (
                        <React.Fragment key={i}>
                          {part}{i === 0 ? (t.flag3Feedback.includes('！') ? '！' : '!') : ''}
                          {i === 0 && <br />}
                        </React.Fragment>
                      )
                    ))}
                  </div>
                )}

                {nextTarget === 3 && <ArrowIndicator />}
              </div>
            </div>
          </div>

          {/* Success Overlay */}
          {showSuccess && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 z-20 flex justify-center items-start p-6 pt-12 rounded-3xl overflow-auto">
              <div className="max-w-lg w-full bg-white rounded-3xl shadow-lg p-10">
                <div className="text-center mb-6">
                  <div className="text-7xl mb-4">🎉</div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                  {t.guideSuccess}
                </h2>

                <p className="text-xl text-gray-600 text-center mb-6">
                  {safeLang === 'en'
                    ? "You've learned to spot fake websites!"
                    : "您已学会识别假冒网站！"}
                </p>

                <button
                  onClick={onComplete}
                  className="w-full py-4 px-8 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-xl transition-colors shadow-lg"
                >
                  {t.finishButton}
                </button>
              </div>
            </div>
          )}

          {/* Footer Flags Counter */}
          <div className="bg-gray-50 p-5 border-t border-gray-200 flex justify-between items-center rounded-b-3xl">
            <span className="font-bold text-gray-500 text-base">{t.flagsFound}</span>
            <div className="flex gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-10 h-10 flex items-center justify-center ${foundFlags.includes(i) ? '' : 'bg-yellow-200 rounded-full text-yellow-700'
                  }`}>
                  {foundFlags.includes(i) ? (
                    <div style={{ transform: 'scale(0.5)' }}>
                      <AnimatedCheckmark />
                    </div>
                  ) : (
                    <AlertTriangle className="w-6 h-6" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};