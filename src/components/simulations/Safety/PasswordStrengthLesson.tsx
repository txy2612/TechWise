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
  
  // CRITICAL FIX: Ensure we only attempt to grab 'en' or 'zh' keys
  // This prevents crashes if language is passed as 'en-US' or undefined
  const safeLang = language.startsWith('zh') ? 'zh' : 'en';
  const t = PASSWORD_STRENGTH_LESSON[safeLang];

  // Logic to advance steps based on user input
  useEffect(() => {
    const lowerPass = password.toLowerCase();

    if (step === 0 && lowerPass === 'apple') {
      setTimeout(() => setStep(1), 500);
    } 
    else if (step === 1 && lowerPass.includes('apple') && lowerPass.includes('pie')) {
      setTimeout(() => setStep(2), 500);
    }
    else if (step === 2 && password.includes('@') && lowerPass.includes('pie')) {
      setTimeout(() => setStep(3), 500);
    }
    else if (step === 3 && password.includes('@') && /\d/.test(password)) {
      setShowSuccess(true);
    }
  }, [password, step]);

  const getStepText = () => {
    switch(step) {
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
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.inputPlaceholder}
              className="w-full text-4xl p-6 rounded-2xl border-4 border-blue-100 focus:border-blue-500 outline-none transition-all font-mono text-center tracking-wider"
              disabled={showSuccess}
            />
         {step === 0 && password.length === 0 && (
            // Wrapper moves the reference point down (top-12), so the arrow sits closer to the input
            <div className="absolute w-full top-12 z-10 pointer-events-none">
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
              className={`h-full transition-all duration-1000 ease-out ${getStrengthColor()}`}
              style={{ width: `${((step + 1) / 4) * 100}%` }}
            ></div>
          </div>
          <div className="text-right font-bold text-xl text-gray-600">
             {t.strengthLabel} <span className={`${step === 3 ? 'text-green-600' : 'text-gray-500'}`}>{getStrengthText()}</span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <RequirementItem checked={step > 0} text={safeLang === 'en' ? 'Use a word' : '使用单词'} />
            <RequirementItem checked={step > 1} text={safeLang === 'en' ? 'Make it long' : '加长密码'} />
            <RequirementItem checked={step > 2} text={safeLang === 'en' ? 'Add symbol (@)' : '添加符号 (@)'} />
            <RequirementItem checked={step > 3} text={safeLang === 'en' ? 'Add number' : '添加数字'} />
          </div>

        </div>
      </div>
    </div>
  );
};

const RequirementItem = ({ checked, text }: { checked: boolean, text: string }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${checked ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'}`}>
    {checked ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
    <span className="font-bold">{text}</span>
  </div>
);