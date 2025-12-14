import { useState } from 'react';
import { ArrowRight, X, Minimize2, Maximize2, Send, Paperclip, Image as ImageIcon, Link2 } from 'lucide-react';
import { GmailLogo } from '../../common/GoogleLogos';
import { 
  InstructionHint, 
  AnimatedArrow
} from '../../common';
import { gmailComposeRealisticTexts } from '../../../data/lessonTexts_module1';

interface GmailComposeRealisticProps {
  onComplete: () => void;
  language: 'en' | 'zh';
}

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const GmailComposeRealistic: React.FC<GmailComposeRealisticProps> = ({ onComplete, language }) => {
  // ========== LANGUAGE ==========
  const t = gmailComposeRealisticTexts[language];

  // ========== LOGIC ==========
  const [currentStep, setCurrentStep] = useState<Step>(0);
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const canProceed = () => {
    if (currentStep === 1) return toEmail.length > 0;
    if (currentStep === 2) return subject.length > 0;
    if (currentStep === 3) return body.length > 0;
    return true;
  };

  const handleNext = () => {
    if (canProceed()) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handleComposeClick = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    }
  };

  const handleFileSelect = (file: string) => {
    setSelectedFile(file);
    setCurrentStep(5);
  };

  const handleSend = () => {
    if (currentStep === 5) {
      setShowSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2500);
    }
  };

  // Helper to get step text
  const getStepText = () => {
    const stepKey = `step${currentStep}` as keyof typeof t;
    return t[stepKey] as string;
  };

  // ========== UI ==========
  return (
    <div className="max-w-6xl mx-auto">
      {/* Practice Mode Banner - Same as original (amber/orange) */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 font-semibold px-4 py-2 rounded-lg mb-4 text-center shadow-sm">
        <span className="text-senior-sm">⚡ {t.practiceMode}</span>
      </div>

      {/* Instruction Card */}
      <InstructionHint
        text={getStepText()}
        currentStep={currentStep}
        totalSteps={6}
        language={language}
      />

      {/* STEP 0: Gmail Inbox View */}
      {currentStep === 0 && (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Gmail Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GmailLogo size={40} />
              <span className="text-2xl font-normal text-gray-700">Gmail</span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder={t.searchMail}
                className="w-96 px-4 py-2 bg-gray-100 rounded-lg text-senior-sm"
                disabled
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-white p-4 border-r border-gray-200">
              {/* Compose Button - HIGHLIGHTED */}
              <div className="relative">
                <button
                  onClick={handleComposeClick}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-gray-900 font-semibold py-4 px-6 rounded-2xl flex items-center gap-3 shadow-lg transition-all ring-4 ring-blue-300 animate-pulse"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                  <span className="text-senior-base">{t.compose}</span>
                </button>
                
                {/* Pulsing Arrow */}
                <AnimatedArrow direction="right" position="right" />
              </div>

              {/* Menu Items */}
              <div className="mt-4 space-y-1">
                <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-r-full">
                  <span className="text-xl">📥</span>
                  <span className="text-senior-base font-semibold">{t.inbox}</span>
                  <span className="ml-auto text-sm text-gray-600">1,164</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-r-full">
                  <span className="text-xl">⭐</span>
                  <span className="text-senior-sm">{t.starred}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-r-full">
                  <span className="text-xl">⏰</span>
                  <span className="text-senior-sm">{t.snoozed}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-r-full">
                  <span className="text-xl">📤</span>
                  <span className="text-senior-sm">{t.sent}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-r-full">
                  <span className="text-xl">📝</span>
                  <span className="text-senior-sm">{t.drafts}</span>
                </div>
              </div>
            </div>

            {/* Email List (Fake) */}
            <div className="flex-1 bg-white">
              <div className="p-4 space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg opacity-50">
                    <input type="checkbox" className="w-5 h-5" disabled />
                    <span className="text-xl">⭐</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{t.sampleSender} {i}</p>
                      <p className="text-sm text-gray-600">{t.emailSubject} - {t.emailPreview}</p>
                    </div>
                    <span className="text-xs text-gray-400">2h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEPS 1-5: Compose Window */}
      {currentStep >= 1 && !showSuccess && (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-3xl mx-auto">
          {/* Compose Header */}
          <div className="bg-gray-100 px-6 py-3 flex items-center justify-between border-b border-gray-300">
            <h3 className="text-senior-lg font-semibold text-gray-900">{t.newMessage}</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-200 rounded">
                <Minimize2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <Maximize2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Compose Body */}
          <div className="p-6">
            {/* To Field */}
            <div className="border-b border-gray-200 pb-3 mb-3 relative">
              <div className="flex items-center gap-3">
                <label className="text-senior-base text-gray-600 w-16">{t.to}</label>
                <input
                  type="email"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  placeholder={t.toPlaceholder}
                  className={`flex-1 text-senior-base outline-none ${currentStep === 1 ? 'bg-yellow-50' : ''}`}
                  autoFocus={currentStep === 1}
                />
              </div>
              {currentStep === 1 && (
                <AnimatedArrow direction="right" position="right" />
              )}
            </div>

            {/* Subject Field */}
            <div className="border-b border-gray-200 pb-3 mb-3 relative">
              <div className="flex items-center gap-3">
                <label className="text-senior-base text-gray-600 w-16">{t.subject}</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={t.subjectPlaceholder}
                  className={`flex-1 text-senior-base outline-none ${currentStep === 2 ? 'bg-yellow-50' : ''}`}
                  autoFocus={currentStep === 2}
                  disabled={currentStep < 2}
                />
              </div>
              {currentStep === 2 && (
                <AnimatedArrow direction="right" position="right" />
              )}
            </div>

            {/* Body Field */}
            <div className="mb-6 relative">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={t.messagePlaceholder}
                rows={10}
                className={`w-full text-senior-base outline-none resize-none ${currentStep === 3 ? 'bg-yellow-50' : ''}`}
                autoFocus={currentStep === 3}
                disabled={currentStep < 3}
              />
              {currentStep === 3 && (
                <AnimatedArrow direction="right" position="right" />
              )}
            </div>

            {/* Attachment Display */}
            {selectedFile && (
              <div className="mb-4 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Paperclip className="w-5 h-5 text-gray-600" />
                <span className="text-senior-sm text-gray-700">{selectedFile}</span>
              </div>
            )}

            {/* Toolbar */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4 relative">
                {/* Send Button */}
                <button
                  onClick={handleSend}
                  disabled={currentStep !== 5}
                  className={`
                    px-6 py-3 rounded-lg font-semibold text-senior-base flex items-center gap-2 transition-all
                    ${currentStep === 5
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  <Send className="w-5 h-5" />
                  {t.send}
                </button>
                {currentStep === 5 && (
                  <AnimatedArrow direction="right" position="left" />
                )}

                {/* Attachment Button */}
                <div className="relative">
                  <button
                    onClick={() => currentStep === 4 && handleNext()}
                    disabled={currentStep < 4}
                    className={`
                      p-3 rounded-lg transition-all
                      ${currentStep === 4 ? 'bg-blue-100 ring-4 ring-blue-300' : 'hover:bg-gray-100'}
                      ${currentStep < 4 ? 'opacity-30 cursor-not-allowed' : ''}
                    `}
                  >
                    <Paperclip className="w-6 h-6 text-gray-600" />
                  </button>
                  {currentStep === 4 && (
                    <AnimatedArrow direction="down" position="bottom" label={t.selectFile} />
                  )}
                </div>

                <button className="p-3 rounded-lg hover:bg-gray-100" disabled>
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </button>
                <button className="p-3 rounded-lg hover:bg-gray-100" disabled>
                  <Link2 className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Next Button */}
              {currentStep >= 1 && currentStep <= 3 && (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`
                    px-8 py-3 rounded-xl font-bold text-senior-base flex items-center gap-2 transition-all shadow-lg
                    ${canProceed()
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {t.next}
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* File Picker Modal */}
      {currentStep === 4 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-senior-xl font-bold text-gray-900 mb-6">
              {t.selectFile}
            </h3>
            <div className="space-y-3">
              {['photo.jpg', 'document.pdf', 'presentation.pptx'].map((file) => (
                <button
                  key={file}
                  onClick={() => handleFileSelect(file)}
                  className="w-full p-5 text-left bg-gray-50 hover:bg-blue-50 rounded-xl transition-all border-2 border-transparent hover:border-blue-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📄</span>
                    <span className="text-senior-base font-semibold">{file}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-12 max-w-lg mx-4 text-center shadow-2xl animate-bounce">
            <div className="text-8xl mb-6">🎉</div>
            <h2 className="text-senior-2xl font-bold text-green-600 mb-4">
              {t.success}
            </h2>
            <p className="text-senior-lg text-gray-600">
              {t.successMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GmailComposeRealistic;
