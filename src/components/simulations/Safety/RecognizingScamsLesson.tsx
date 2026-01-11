import React, { useState, useEffect } from 'react';
import { InstructionHint, PracticeBanner } from '../../common';
import { RECOGNIZING_SCAMS_LESSON } from '../../../data/lessonTexts_module4';
import { AlertTriangle, Mail, User, ArrowRight } from 'lucide-react';
import { SelectableItemCard } from '../../common/SelectableItemCard';
import { AnimatedCheckmark } from '../../common/AnimatedCheckmark';

// Add this styling component
const SuccessAnimationStyles = () => (
  <style>{`
    .checkmark-circle {
      stroke-dasharray: 166;
      stroke-dashoffset: 166;
      stroke-width: 2;
      stroke-miterlimit: 10;
      stroke: #16a34a; /* green-600 */
      fill: none;
      animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
    }
    .checkmark-check {
      transform-origin: 50% 50%;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      stroke: #16a34a; /* green-600 */
      stroke-width: 3;
      fill: none;
      animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
    }
    @keyframes stroke {
      100% { stroke-dashoffset: 0; }
    }
  `}</style>
);

interface RecognizingScamsLessonProps {
  onComplete: () => void;
  language: 'en' | 'zh';
}

export const RecognizingScamsLesson: React.FC<RecognizingScamsLessonProps> = ({
  onComplete,
  language
}) => {
  // Safe language fallback
  const safeLang = language.startsWith('zh') ? 'zh' : 'en';
  const t = RECOGNIZING_SCAMS_LESSON[safeLang];


  // Track which flags have been found (1: Sender, 2: Body, 3: Link)
  const [foundFlags, setFoundFlags] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Toggle flag function
  const toggleFlag = (id: number) => {
    if (foundFlags.includes(id)) return; // Already found

    // Enforce sequential order
    const nextTarget = [1, 2, 3].find(i => !foundFlags.includes(i));
    if (id !== nextTarget) return;

    setFoundFlags([...foundFlags, id]);
  };

  // Check for completion
  useEffect(() => {
    if (foundFlags.length === 3) {
      setTimeout(() => setShowSuccess(true), 1000);
    }
  }, [foundFlags]);

  // Helper to check if a specific flag is active
  const isFound = (id: number) => foundFlags.includes(id);

  // Determine next target to highlight (1 -> 2 -> 3)
  const nextTarget = [1, 2, 3].find(id => !foundFlags.includes(id));

  const ArrowIndicator = () => (
    <div className="absolute -right-7 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
      <div className="pulse-arrow">
        <ArrowRight className="w-12 h-12 text-blue-600 rotate-180 filter drop-shadow-md pulse-blue-filter" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <PracticeBanner language={safeLang} />

      <div className="p-6 max-w-2xl mx-auto w-full flex-1 flex flex-col">

        {/* Instruction Hint */}
        <InstructionHint
          text={showSuccess ? t.successMessage : t.guide}
          currentStep={foundFlags.length - 1}
          totalSteps={3}
          language={safeLang}
          pulsing={!showSuccess}
        />

        {/* Email Card Simulation */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 flex-1 flex flex-col relative overflow-hidden">

          {/* Email Header UI */}
          <div className="bg-yellow-50 p-4 border-b border-yellow-100 flex items-center gap-3">
            <Mail className="w-6 h-6 text-yellow-600" />
            <div className="font-bold text-yellow-800 whitespace-pre-line">{t.intro}</div>
          </div>

          <div className="p-8 flex-1 flex flex-col gap-6">

            {/* 1. SUSPICIOUS SENDER */}

            {/* 1. SUSPICIOUS SENDER */}
            <div className="relative">
              <SelectableItemCard
                title={t.emailSenderName}
                // We pass the feedback logic into the subtitle prop
                subtitle={
                  isFound(1)
                    ? <span className="text-green-700 font-bold">{t.flag1Feedback}</span>
                    : `<${t.emailSenderAddr}>`
                }
                icon={<User className="w-7 h-7" />} // Passing the User icon for the avatar
                isSelected={isFound(1)}
                onClick={() => toggleFlag(1)}
              />
              {nextTarget === 1 && <ArrowIndicator />}
            </div>

            {/* 2. URGENT SUBJECT & BODY */}
            <div
              // REMOVED onClick from here
              // REMOVED cursor-pointer from here
              className={`p-4 rounded-xl border-2 transition-all relative ${isFound(2) ? 'bg-green-50 border-green-500' : 'bg-white border-transparent'
                }`}
            >
              {nextTarget === 2 && <ArrowIndicator />}
              {/* ADDED onClick and cursor-pointer to the H2 title only */}
              <h2
                onClick={() => toggleFlag(2)}
                className="text-2xl font-bold text-red-600 mb-2 cursor-pointer hover:opacity-70 transition-opacity decoration-red-600 underline-offset-4 hover:underline"
                title="Click to flag this"
              >
                {t.emailSubject}
              </h2>

              {/* Body text is no longer clickable */}
              <p className="text-xl text-gray-800 mb-2">{t.emailBody1}</p>
              <p className="text-xl text-gray-800">
                {t.emailBody2}
              </p>

              {isFound(2) && <p className="text-green-700 font-bold mt-2"> ✅ {t.flag2Feedback}</p>}
            </div>

            {/* 3. SUSPICIOUS LINK */}
            <div className="mt-4 relative">
              {nextTarget === 3 && <ArrowIndicator />}
              <button
                onClick={(e) => { e.preventDefault(); toggleFlag(3); }}
                className={`w-3/4 mx-auto block p-4 rounded-xl border-2 text-center text-xl font-bold transition-all ${isFound(3)
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                  }`}
              >
                {isFound(3) ? `✅ ${t.flag3Feedback}` : t.emailLink}
              </button>
            </div>

          </div>

          {/* Success Overlay */}
          {showSuccess && (
            <div className="absolute inset-0 bg-green-50/95 z-20 flex flex-col items-center justify-center rounded-3xl">
              {/* Animated Success Tick */}
              <AnimatedCheckmark />
              <h2 className="text-3xl font-bold text-green-800 mb-6 whitespace-pre-line text-center">{t.successMessage}</h2>
              <button
                onClick={onComplete}
                className="btn-primary text-xl px-8 py-4 pulse-scale"
              >
                {t.finishButton}
              </button>
            </div>
          )}

          {/* Progress Footer */}
          <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
            <span className="font-bold text-gray-500">{t.flagsFound}</span>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-8 h-8 flex items-center justify-center ${foundFlags.includes(i) ? '' : 'bg-yellow-200 rounded-full text-yellow-700'
                  }`}>
                  {foundFlags.includes(i) ? (
                    <div style={{ transform: 'scale(0.4)' }}>
                      <AnimatedCheckmark />
                    </div>
                  ) : (
                    <AlertTriangle className="w-5 h-5" />
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