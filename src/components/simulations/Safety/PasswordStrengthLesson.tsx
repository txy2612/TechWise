import React, { useState, useEffect } from 'react';
import { InstructionHint, PracticeBanner, AnimatedArrow } from '../../common';
import { PASSWORD_STRENGTH_LESSON } from '../../../data/lessonTexts_module4';
import { AnimatedCheckmark } from '../../common/AnimatedCheckmark';
import { Check, X } from 'lucide-react';

interface PasswordStrengthLessonProps {
  onComplete: () => void;
  language: 'en' | 'zh';
}

export const PasswordStrengthLesson: React.FC<PasswordStrengthLessonProps> = ({
  onComplete,
  language
}) => {
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  // Target word for the lesson
  const targetWord = 'password';
  const lowerPass = password.toLowerCase();

  // Show autocomplete if currently typing matches target start, and isn't full word yet
  // Also ensures we have at least 1 char typed
  const showAutocomplete = password.length > 0 &&
    password.length < targetWord.length &&
    targetWord.startsWith(lowerPass);

  // New Feature: Random symbol hint after "password" is fully typed
  // We'll store a random symbol in state so it persists
  const [suggestedSymbol, setSuggestedSymbol] = useState('');
  const [suggestedNumber, setSuggestedNumber] = useState('');

  // Initialize or reset symbol
  useEffect(() => {
    if (!suggestedSymbol) {
      const symbols = ['!', '@', '#', '$', '%', '&', '*'];
      setSuggestedSymbol(symbols[Math.floor(Math.random() * symbols.length)]);
    }
    if (!suggestedNumber) {
      setSuggestedNumber(Math.floor(Math.random() * 10).toString());
    }
  }, []);

  const showSymbolHint = lowerPass === 'password';
  const showNumberHint = lowerPass === 'password' + suggestedSymbol;

  // Calculate remaining string for padding arithmetic
  // If showing symbol hint, we treat remaining chars as 0 for the main word alignment logic,
  // because "password" is fully typed and already centered.
  const remainingChars = showAutocomplete ? targetWord.length - password.length : 0;
  const remainingText = showAutocomplete ? targetWord.slice(password.length) : '';

  // CRITICAL FIX: Ensure we only attempt to grab 'en' or 'zh' keys
  // This prevents crashes if language is passed as 'en-US' or undefined
  const safeLang = language.startsWith('zh') ? 'zh' : 'en';
  const t = PASSWORD_STRENGTH_LESSON[safeLang];

  // --- UPDATED DETECTION LOGIC ---
  useEffect(() => {
    const lowerPass = password.toLowerCase();

    // Step 0: User types "password"
    if (step === 0 && lowerPass === 'password') {
      setTimeout(() => setStep(1), 500);
    }
    // Step 1: Detect at least 8 characters (Must still contain base word to be valid progress)
    else if (step === 1 && password.length >= 8 && lowerPass.includes('password')) {
      setTimeout(() => setStep(2), 500);
    }
    // Step 2: Detect Special Character (Must still be 8+ chars)
    else if (step === 2 && password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setTimeout(() => setStep(3), 500);
    }
    // Step 3: Detect Number (Must still have special char & 8+ chars)
    else if (step === 3 && password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password) && /\d/.test(password)) {
      setShowSuccess(true);
    }

    // Reset symbol if we reset (e.g. somehow clearing input completely, though logic mostly additive here)
    if (password === '') {
      const symbols = ['!', '@', '#', '$', '%', '&', '*'];
      setSuggestedSymbol(symbols[Math.floor(Math.random() * symbols.length)]);
      setSuggestedNumber(Math.floor(Math.random() * 10).toString());
    }

  }, [password, step]);
  // -------------------------------

  const getStepText = () => {
    switch (step) {
      case 0: return t.step0;
      case 1: return t.step1;
      case 2: return t.step2;
      case 3: return t.step3;
      default: return t.successMessage;
    }
  };

  const getStrengthColor = () => {
    if (step < 1) return 'bg-red-500';
    if (step < 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (step < 1) return t.weak;
    if (step < 3) return t.medium;
    return t.strong;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <PracticeBanner language={safeLang} />

      <div className="p-6 max-w-2xl mx-auto w-full flex-1 flex flex-col">

        <InstructionHint
          text={showSuccess ? t.successMessage : getStepText()}
          currentStep={step}
          totalSteps={4}
          language={safeLang}
          pulsing={!showSuccess}
        />

        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100 flex-1 flex flex-col justify-center relative">

          {showSuccess && (
            <div className="absolute inset-0 bg-green-50/95 z-10 flex flex-col items-center justify-center rounded-3xl">
              <AnimatedCheckmark />
              <h2 className="text-3xl font-bold text-green-800 mb-6">{t.strong}</h2>
              <button
                onClick={onComplete}
                className="btn-primary text-xl px-8 py-4 pulse-scale"
              >
                {t.finishButton}
              </button>
            </div>
          )}

          <div className="mb-8 relative">
            <label className="block text-gray-500 font-bold mb-2 text-lg">
              {t.passwordLabel}
            </label>

            {/* Input container with autocomplete hint overlay */}
            <div className="relative">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.inputPlaceholder}
                className={`w-full text-4xl p-6 rounded-2xl border-4 border-blue-100 focus:border-blue-500 outline-none font-mono text-center tracking-wider ${!showSuccess ? 'pulse-border-smooth' : ''
                  }`}
                disabled={showSuccess}
                style={{
                  // calculated padding to shift center left by width of remaining chars
                  // Includes 0.05em per char to account for tracking-wider (approx 1.1ch total per char)
                  paddingRight: showAutocomplete ? `calc(1.5rem + ${remainingChars}ch + ${remainingChars} * 0.05em)` : '1.5rem',
                  // Compensation for number hint alignment:
                  // When showNumberHint is true, input is 'password@' (length 9).
                  // We want 'password' (length 8) to be centered.
                  // So we need to shift the visual center RIGHT by half the width of added char '@'.
                  // Adding paddingLeft effectively shifts content to the right.
                  paddingLeft: showNumberHint ? `calc(1.5rem + 1ch + 0.05em)` : '1.5rem'
                }}
              />

              {/* Autocomplete hint overlay - shows remainder of "password" */}
              {/* OR the symbol hint if password is typed */}
              {(showAutocomplete || showSymbolHint || showNumberHint) && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative flex items-center justify-center text-4xl font-mono tracking-wider">
                    {/* 
                         If Autocomplete (user typing):
                         Center the full target word "password". 
                         The typed part matches input (transparent). 
                         The rest is grey.
                         
                         If Symbol Hint (user finished "password"):
                         The word "password" is center. 
                         The symbol hangs off the right.
                     */}

                    {showAutocomplete ? (
                      <>
                        <span className="text-transparent">{password}</span>
                        <span className="text-gray-400">{remainingText}</span>
                      </>
                    ) : showSymbolHint ? (
                      <div className="relative">
                        <span className="text-transparent">password</span>
                        <span className="absolute left-full text-gray-400">{suggestedSymbol}</span>
                      </div>
                    ) : (
                      // showNumberHint
                      <div className="relative">
                        <span className="text-transparent">password</span>
                        <span className="absolute left-full top-0 h-full flex items-center">
                          <span className="text-transparent">{suggestedSymbol}</span>
                          <span className="text-gray-400">{suggestedNumber}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {step === 0 && (
              // FIXED: Added 'flex justify-center' to center the arrow horizontally
              // Kept 'top-8' to position it relative to the input box (moved down from top-4)
              <div className="absolute w-full top-6 z-10 pointer-events-none flex justify-center">
                <AnimatedArrow
                  direction="down"
                  position="top"
                  label={safeLang === 'en' ? 'Type here' : '在此输入'}
                />
              </div>
            )}
          </div>

          <div className="bg-gray-200 rounded-full h-6 w-full overflow-hidden mb-4">
            <div
              className={`h-full transition-all duration-1000 ease-out strength-bar-shimmer ${getStrengthColor()}`}
              style={{ width: `${((step + 1) / 4) * 100}%` }}
            ></div>
          </div>
          <div className="text-right font-bold text-xl text-gray-600">
            {t.strengthLabel} <span
              className="shimmer-text font-bold"
              style={{ '--shimmer-color': step < 1 ? '#ef4444' : step < 3 ? '#eab308' : '#22c55e' } as React.CSSProperties}
            >
              {getStrengthText()}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <RequirementItem checked={step > 0} text={safeLang === 'en' ? 'Use a word' : '使用单词'} pulsing={step === 0} />
            <RequirementItem checked={step > 1} text={safeLang === 'en' ? 'At least 8 characters' : '至少8个字母'} pulsing={step === 1} />
            <RequirementItem checked={step > 2} text={safeLang === 'en' ? 'Add symbol (@)' : '添加符号 (@)'} pulsing={step === 2} />
            <RequirementItem checked={step > 3} text={safeLang === 'en' ? 'Add number' : '添加数字'} pulsing={step === 3} />
          </div>

        </div>
      </div>
    </div>
  );
};

const RequirementItem = ({ checked, text, pulsing }: { checked: boolean, text: string, pulsing?: boolean }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl transition-all border-2 
    ${checked
      ? 'bg-green-100 border-transparent text-green-800'
      : pulsing
        ? 'bg-blue-50 border-blue-400 text-blue-800 pulse-blue-glow shadow-md'
        : 'bg-gray-100 border-transparent text-gray-400'
    }`}>
    {checked ? <Check className="w-6 h-6" /> : <X className={`w-6 h-6 ${pulsing ? 'text-blue-500' : ''}`} />}
    <span className="font-bold">{text}</span>
  </div>
);