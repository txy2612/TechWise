import React, { useState, useEffect } from 'react';
import { InstructionHint, PracticeBanner } from '../../common';
import { PRIVACY_SETTINGS_LESSON } from '../../../data/lessonTexts_module4';
import { AnimatedCheckmark } from '../../common/AnimatedCheckmark';
import { Lock, Globe, MapPin, Eye, ShieldAlert, ShieldCheck } from 'lucide-react';

interface PrivacySettingsLessonProps {
  onComplete: () => void;
  language: 'en' | 'zh';
}

export const PrivacySettingsLesson: React.FC<PrivacySettingsLessonProps> = ({
  onComplete,
  language
}) => {
  const safeLang = language.startsWith('zh') ? 'zh' : 'en';
  const t = PRIVACY_SETTINGS_LESSON[safeLang];

  // State for the 3 settings. Initial state is UNSAFE.
  const [isProfilePrivate, setProfilePrivate] = useState(false); // false = Public
  const [isLocationOff, setLocationOff] = useState(false);       // false = On
  const [isAdsBlocked, setAdsBlocked] = useState(false);         // false = Allowed

  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate progress (0 to 3)
  const safeCount = [isProfilePrivate, isLocationOff, isAdsBlocked].filter(Boolean).length;

  useEffect(() => {
    if (safeCount === 3) {
      setTimeout(() => setShowSuccess(true), 800);
    }
  }, [safeCount]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <PracticeBanner language={safeLang} />

      <div className="p-6 max-w-2xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Instruction Hint */}
        <InstructionHint 
          text={showSuccess ? t.guideSuccess : t.guide}
          currentStep={safeCount - 1} 
          totalSteps={3}
          language={safeLang}
        />

        {/* Settings Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 flex-1 flex flex-col relative overflow-hidden">
          
          {/* Header */}
          <div className="bg-gray-50 p-6 border-b border-gray-100 flex items-center gap-3">
             <div className="bg-blue-100 p-2 rounded-full">
               <Lock className="w-6 h-6 text-blue-600" />
             </div>
             <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
          </div>

          <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
            
            {/* Setting 1: Profile Visibility */}
            <SettingRow 
              icon={<Globe className={`w-6 h-6 ${isProfilePrivate ? 'text-green-600' : 'text-orange-500'}`} />}
              title={t.setting1Title}
              desc={t.setting1Desc}
              isSafe={isProfilePrivate}
              unsafeLabel={t.optionPublic}
              safeLabel={t.optionPrivate}
              statusLabelSafe={t.safeLabel}
              statusLabelUnsafe={t.unsafeLabel}
              onToggle={() => setProfilePrivate(!isProfilePrivate)}
            />

            {/* Setting 2: Location */}
            <SettingRow 
              icon={<MapPin className={`w-6 h-6 ${isLocationOff ? 'text-green-600' : 'text-orange-500'}`} />}
              title={t.setting2Title}
              desc={t.setting2Desc}
              isSafe={isLocationOff}
              unsafeLabel={t.optionOn}
              safeLabel={t.optionOff}
              statusLabelSafe={t.safeLabel}
              statusLabelUnsafe={t.unsafeLabel}
              onToggle={() => setLocationOff(!isLocationOff)}
            />

            {/* Setting 3: Ads */}
            <SettingRow 
              icon={<Eye className={`w-6 h-6 ${isAdsBlocked ? 'text-green-600' : 'text-orange-500'}`} />}
              title={t.setting3Title}
              desc={t.setting3Desc}
              isSafe={isAdsBlocked}
              unsafeLabel={t.optionAllow}
              safeLabel={t.optionBlock}
              statusLabelSafe={t.safeLabel}
              statusLabelUnsafe={t.unsafeLabel}
              onToggle={() => setAdsBlocked(!isAdsBlocked)}
            />

          </div>

          {/* Success Overlay */}
          {showSuccess && (
            <div className="absolute inset-0 bg-green-50/95 z-20 flex flex-col items-center justify-center rounded-3xl">
              <AnimatedCheckmark />
              <h2 className="text-3xl font-bold text-green-800 mb-6 text-center px-4">{t.successMessage}</h2>
              <button 
                onClick={onComplete}
                className="btn-primary text-xl px-8 py-4 pulse-scale"
              >
                {t.finishButton}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Sub-component for a single setting row
interface SettingRowProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  isSafe: boolean;
  unsafeLabel: string;
  safeLabel: string;
  statusLabelSafe: string;
  statusLabelUnsafe: string;
  onToggle: () => void;
}

const SettingRow: React.FC<SettingRowProps> = ({ 
  icon, title, desc, isSafe, unsafeLabel, safeLabel, statusLabelSafe, statusLabelUnsafe, onToggle 
}) => {
  return (
    <div className={`border-2 rounded-2xl p-4 transition-all duration-300 ${isSafe ? 'border-green-100 bg-green-50/30' : 'border-orange-100 bg-white'}`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full mt-1 ${isSafe ? 'bg-green-100' : 'bg-orange-100'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-gray-500 text-sm mb-3">{desc}</p>
          
          <button 
            onClick={onToggle}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 flex justify-between items-center transition-all ${
              isSafe 
                ? 'bg-green-500 border-green-500 text-white shadow-md' 
                : 'bg-white border-orange-300 text-gray-700 hover:bg-orange-50'
            }`}
          >
            <span className="font-bold text-lg">
              {isSafe ? safeLabel : unsafeLabel}
            </span>
            <div className="flex items-center gap-2 bg-black/10 px-2 py-1 rounded-lg">
              {isSafe ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
              <span className="text-xs font-black uppercase tracking-wider">
                {isSafe ? statusLabelSafe : statusLabelUnsafe}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};