import { useState } from 'react';
import { ArrowLeft, Mail, Search, Settings, Menu, User, ArrowRight } from 'lucide-react';
import { gmailSignInNavTexts } from '../../../data/lessonTexts_module1';

interface GmailSignInNavProps {
  onComplete: () => void;
  onBack: () => void;
  language: 'en' | 'zh';
}

export function GmailSignInNav({ onComplete, onBack, language }: GmailSignInNavProps) {
  // ========== LANGUAGE ==========
  const t = gmailSignInNavTexts[language];

  // ========== LOGIC ==========
  const [currentStep, setCurrentStep] = useState(0);

  // Helper to get step title
  const getStepTitle = () => {
    const titleKey = `step${currentStep}Title` as keyof typeof t;
    return t[titleKey] as string;
  };

  // Helper to get step text
  const getStepText = () => {
    const textKey = `step${currentStep}Text` as keyof typeof t;
    return t[textKey] as string;
  };

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  // ========== UI ==========
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-medium">{t.back}</span>
        </button>

        {/* Instruction Card - Custom for this lesson (has title + text) */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-400 rounded-2xl p-8 mb-6 shadow-lg">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                {getStepTitle()}
              </h2>
              <p className="text-xl text-gray-800 leading-relaxed">
                {getStepText()}
              </p>
            </div>
            <div className="bg-blue-600 text-white px-6 py-3 rounded-full font-black text-2xl shadow-lg flex-shrink-0">
              {currentStep + 1}/9
            </div>
          </div>
        </div>

        {/* Visual Content - Step 0: Welcome */}
        {currentStep === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-9xl mb-8">📧</div>
            <h3 className="text-4xl font-black text-gray-900 mb-4">Gmail</h3>
            <p className="text-2xl text-gray-600 mb-8">
              {t.yourEmailAnywhere}
            </p>
          </div>
        )}

        {/* Visual Content - Step 1: Browser */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="bg-gray-100 rounded-xl p-8 border-2 border-gray-300">
              <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md pulse-border">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 bg-gray-100 h-10 rounded"></div>
                <div className="w-24 h-10 bg-gray-200 rounded"></div>
              </div>
              <div className="mt-8 text-center">
                <div className="text-8xl font-bold text-blue-600 mb-4">gmail.com</div>
                <div className="text-2xl text-gray-500">
                  {t.typeInBrowser}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visual Content - Step 2: Sign In */}
{currentStep === 2 && (
  <div className="bg-white rounded-2xl shadow-xl p-12">
    <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-300">
      {/* Mock browser header */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Mail className="w-8 h-8 text-red-500" />
          <span className="text-2xl font-bold">Gmail</span>
        </div>

        {/* Sign In area */}
        <div className="relative flex flex-col items-center">
          {/* Tooltip INSIDE the same box */}
          <div className="mb-2 flex flex-col items-center gap-1 pulse-arrow pointer-events-none">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-semibold whitespace-nowrap shadow-lg">
              {t.clickHere}
            </div>
            {/* arrow down to the button */}
            <ArrowRight className="w-8 h-8 text-blue-600 rotate-90" />
          </div>

          {/* Sign In Button */}
          <button
            type="button"
            className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg text-xl pulse-border ring-4 ring-blue-200"
            onClick={handleNext} // IMPORTANT: keeps your flow working
          >
            {t.signIn}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        {/* Visual Content - Steps 3-7: Gmail Interface */}
        {(currentStep >= 3 && currentStep <= 7) && (
          <div className="bg-white rounded-2xl shadow-xl overflow-visible">
            {/* Gmail Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between relative">
              <div className="flex items-center gap-4">
                <Menu className="w-6 h-6 text-gray-600" />
                <Mail className="w-8 h-8 text-red-500" />
                <span className="text-2xl font-semibold text-gray-900">Gmail</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
  
        {/* Search Bar */}
         <div className="relative">
           <div className={`${currentStep === 6 ? 'pulse-border ring-4 ring-blue-200 rounded-lg' : ''}`}>
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3">
          <Search className="w-6 h-6 text-gray-500" />
          <input
           type="text"
           placeholder={t.searchPlaceholder}
           className="bg-transparent text-lg outline-none w-80"
           readOnly
      />
    </div>
  </div>

        {currentStep === 6 && (
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pulse-arrow pointer-events-none">
           <ArrowRight className="w-10 h-10 text-blue-600 -rotate-90" />
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-semibold whitespace-nowrap shadow-lg">
          {t.searchHere}
        </div>
        </div>
        )}
    </div>
    </div>
                {/* Settings */}
           <div
           className={`relative p-3 rounded-full hover:bg-gray-100 ${
           currentStep === 7 ? "bg-blue-100 pulse-border ring-4 ring-blue-200" : ""
  }`}
>
  <Settings className="w-6 h-6 text-gray-600" />

  {currentStep === 7 && (
    <div className="absolute left-1/2 top-full -translate-x-1/2 mt-3 flex flex-col items-center gap-1 pointer-events-none z-50">
      {/* Arrow pointing UP to the settings icon */}
      <ArrowRight className="w-8 h-8 text-blue-600 -rotate-90" />

      {/* Label */}
      <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-semibold whitespace-nowrap shadow-lg">
        {t.settings}
      </div>
    </div>
  )}
</div>
                
                
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="flex" style={{ height: '500px' }}>
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 relative overflow-visible">
                <div className="space-y-2">
                  <div className={`relative ${currentStep === 4 ? 'pulse-border ring-4 ring-blue-200 rounded-xl' : ''}`}>
                    <button className="w-full flex items-center gap-3 px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-md">
                      <Mail className="w-6 h-6" />
                      {t.compose}
                    </button>
                    {currentStep === 4 && (
             <div className="absolute left-full top-1/2 -translate-y-1/2 -mt-4 flex items-center gap-2 pulse-arrow pointer-events-none z-50">
             <ArrowRight className="w-9 h-9 text-blue-600 rotate-180" />
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-semibold whitespace-nowrap shadow-lg">
            {t.writeEmail}
        </div>
       </div>
  )}
</div>
                  <div className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                    📥 {t.inbox}
                  </div>
                  <div className="px-4 py-3 text-gray-700 rounded-lg opacity-50">
                    ⭐ {t.starred}
                  </div>
                  <div className="px-4 py-3 text-gray-700 rounded-lg opacity-50">
                    📤 {t.sent}
                  </div>
                  <div className="px-4 py-3 text-gray-700 rounded-lg opacity-50">
                    📝 {t.drafts}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className={`flex-1 overflow-auto relative ${currentStep === 5 ? 'bg-blue-50' : ''}`}>
                <div className={`divide-y divide-gray-200 ${currentStep === 5 ? 'pulse-border ring-4 ring-blue-200' : ''}`}>
                  {/* Sample Email 1 */}
                  <div className="p-6 hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-semibold">JS</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900">{t.email1From}</span>
                          <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                        <div className="font-semibold text-gray-900 mb-1">{t.email1Subject}</div>
                        <div className="text-gray-600">{t.email1Preview}</div>
                      </div>
                    </div>
                  </div>

                  {/* Sample Email 2 */}
                  <div className="p-6 hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold">SL</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900">{t.email2From}</span>
                          <span className="text-sm text-gray-500">1 day ago</span>
                        </div>
                        <div className="font-semibold text-gray-900 mb-1">{t.email2Subject}</div>
                        <div className="text-gray-600">{t.email2Preview}</div>
                      </div>
                    </div>
                  </div>

                  {/* Sample Email 3 */}
                  <div className="p-6 hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-semibold">TN</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900">{t.email3From}</span>
                          <span className="text-sm text-gray-500">3 days ago</span>
                        </div>
                        <div className="font-semibold text-gray-900 mb-1">{t.email3Subject}</div>
                        <div className="text-gray-600">{t.email3Preview}</div>
                      </div>
                    </div>
                  </div>
                </div>
                {currentStep === 5 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pulse-arrow">
                    <div className="bg-blue-500 text-white px-6 py-4 rounded-xl text-2xl font-bold shadow-2xl">
                      {t.emailsAppearHere}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Visual Content - Step 8: Success */}
        {currentStep === 8 && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-9xl mb-8">🎉</div>
            <h3 className="text-4xl font-black text-gray-900 mb-6">{getStepTitle()}</h3>
            <p className="text-2xl text-gray-600 mb-8">{getStepText()}</p>
          </div>
        )}

        {/* Navigation Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleNext}
            className="flex items-center gap-3 px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-2xl shadow-lg transition-all"
          >
            {currentStep === 8 ? t.completeButton : t.nextButton}
            <ArrowRight className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes pulse-arrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .pulse-arrow {
          animation: pulse-arrow 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse-border {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
          }
          50% { 
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.2);
          }
        }
        .pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
