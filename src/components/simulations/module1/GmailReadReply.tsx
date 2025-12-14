import React, { useState } from 'react';
import { ArrowLeft, Reply, Paperclip, Send, Mail, Star, Archive, Trash2, ArrowRight, ArrowDown } from 'lucide-react';
import { 
  InstructionHint, 
  PracticeBanner
} from '../../common';
import { gmailReadReplyTexts } from '../../../data/lessonTexts_module1';

interface GmailReadReplyProps {
  onComplete: () => void;
  onBack: () => void;
  language: 'en' | 'zh';
}

export function GmailReadReply({ onComplete, onBack, language }: GmailReadReplyProps) {
  // ========== LANGUAGE ==========
  const t = gmailReadReplyTexts[language];

  // ========== LOGIC ==========
  const [currentStep, setCurrentStep] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [hasAttachment, setHasAttachment] = useState(false);

  // Helper to get step text
  const getStepText = () => {
    const stepKey = `step${currentStep}` as keyof typeof t;
    return t[stepKey] as string;
  };

  const handleEmailClick = () => {
    if (currentStep === 0) {
      setIsReading(true);
      setCurrentStep(1);
    }
  };

  const handleReplyClick = () => {
    if (currentStep === 1) {
      setIsReplying(true);
      setReplyText(t.autoReplyText);
      setCurrentStep(2);
      setTimeout(() => setCurrentStep(3), 1000);
    }
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  const handleAttachClick = () => {
    if (currentStep === 3) {
      setHasAttachment(true);
      setCurrentStep(4);
    }
  };

  const handleSend = () => {
    if (currentStep >= 4) {
      setCurrentStep(5);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  // ========== UI ==========
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Practice Banner */}
      <PracticeBanner language={language} />

      {/* Instruction Card */}
      <div className="max-w-7xl mx-auto p-6">
        <InstructionHint
          text={getStepText()}
          currentStep={currentStep}
          totalSteps={6}
          language={language}
        />

        {/* Gmail Interface */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Gmail Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-base font-medium">{t.back}</span>
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <Mail className="w-8 h-8 text-red-500" />
              <span className="text-xl font-semibold text-gray-900">Gmail</span>
            </div>
            <button className="px-6 py-2 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all">
              {t.compose}
            </button>
          </div>

          <div className="flex" style={{ height: '600px' }}>
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
              <div className="space-y-2">
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
            <div className="flex-1 overflow-auto">
              {!isReading ? (
                /* Email List */
                <div className="divide-y divide-gray-200">
                  {/* Sample Email 1 */}
                  <div className="p-6 opacity-50 border-2 border-transparent">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-semibold">JS</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900">{t.sampleEmail1From}</span>
                          <span className="text-sm text-gray-500">1 day ago</span>
                        </div>
                        <div className="font-semibold text-gray-900 mb-1">{t.sampleEmail1Subject}</div>
                        <div className="text-gray-600">{t.sampleEmail1Preview}</div>
                      </div>
                    </div>
                  </div>

                  {/* Mom's Email - TARGET */}
                  <div 
                    onClick={handleEmailClick}
                    className={`relative p-6 cursor-pointer transition-all ${
                      currentStep === 0 
                        ? 'bg-blue-50 pulse-highlight' 
                        : 'hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold">M</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900">{t.sampleEmail2From}</span>
                          <span className="text-sm text-gray-500">{t.emailDate}</span>
                        </div>
                        <div className="font-semibold text-gray-900 mb-1">{t.emailSubject}</div>
                        <div className="text-gray-600">{t.sampleEmail2Preview}</div>
                      </div>
                      {currentStep === 0 && (
                        <div className="flex-shrink-0 ml-2 pulse-arrow">
                          <ArrowRight className="w-8 h-8 text-blue-600" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sample Email 3 */}
                  <div className="p-6 opacity-50 border-2 border-transparent">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-semibold">N</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900">{t.sampleEmail3From}</span>
                          <span className="text-sm text-gray-500">3 days ago</span>
                        </div>
                        <div className="font-semibold text-gray-900 mb-1">{t.sampleEmail3Subject}</div>
                        <div className="text-gray-600">{t.sampleEmail3Preview}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Email Reading View */
                <div className="p-8">
                  {/* Email Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.emailSubject}</h2>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-pink-300 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-lg">M</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 text-lg">{t.emailFrom}</div>
                        <div className="text-gray-600">{t.emailDate}</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <Star className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <Archive className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <Trash2 className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Email Body */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <div className="space-y-4 text-lg text-gray-800">
                      <p>{t.emailBody1}</p>
                      <p>{t.emailBody2}</p>
                      <p>{t.emailBody3}</p>
                      <p>{t.emailBody4}</p>
                      <p>{t.emailBody5}</p>
                    </div>
                  </div>

                  {/* Reply Button */}
                  {!isReplying && (
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleReplyClick}
                        disabled={currentStep < 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-lg transition-all ${
                          currentStep >= 1
                            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Reply className="w-5 h-5" />
                        {t.replyButton}
                      </button>
                      {currentStep === 1 && (
                        <div className="pulse-arrow">
                          <ArrowLeft className="w-8 h-8 text-blue-600" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Reply Compose */}
                  {isReplying && (
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                      <div className="mb-4">
                        <span className="text-gray-600 font-semibold">To: Mom</span>
                      </div>
                      <textarea
                        value={replyText}
                        onChange={handleReplyChange}
                        placeholder={t.replyPlaceholder}
                        className={`w-full h-40 p-4 border-2 rounded-lg resize-none text-lg focus:outline-none transition-all ${
                          currentStep === 2 ? 'border-blue-500 ring-4 ring-blue-200' : 'border-gray-300 focus:border-blue-400'
                        }`}
                      />
                      
                      {/* Attachment & Send */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Attachment button */}
                        <div className="relative">
                          {currentStep === 3 && (
                            <div className="absolute left-1/2 -translate-x-1/2 -top-14 flex flex-col items-center pulse-arrow-down">
                              <div className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
                                {t.clickHere}
                              </div>
                              <ArrowDown className="w-8 h-8 text-blue-600 mt-1" />
                            </div>
                          )}
                          <button
                            onClick={handleAttachClick}
                            className={`p-3 rounded-lg transition-all ${
                              currentStep === 3
                                ? 'bg-blue-100 hover:bg-blue-200 ring-2 ring-blue-400'
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            <Paperclip className={`w-6 h-6 ${currentStep === 3 ? 'text-blue-600' : 'text-gray-600'}`} />
                          </button>
                          {hasAttachment && (
                            <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        
                        {/* Send button */}
                        <div className="flex items-center gap-3">
                          {currentStep === 4 && (
                            <div className="pulse-arrow">
                              <ArrowRight className="w-8 h-8 text-blue-600" />
                            </div>
                          )}
                          <button
                            onClick={handleSend}
                            disabled={currentStep < 4}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-lg transition-all ${
                              currentStep >= 4
                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <Send className="w-5 h-5" />
                            {t.sendButton}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Success Message */}
                  {currentStep === 5 && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md">
                        <div className="text-6xl mb-4">✅</div>
                        <h3 className="text-3xl font-black text-gray-900 mb-4">{t.success}</h3>
                        <p className="text-xl text-gray-700 mb-6">{t.successMessage}</p>
                        <button
                          onClick={onComplete}
                          className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-lg"
                        >
                          {t.continueButton}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for pulse animation */}
      <style>{`
        @keyframes pulse-arrow {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(8px); opacity: 0.7; }
        }
        .pulse-arrow {
          animation: pulse-arrow 1.2s ease-in-out infinite;
        }
        
        @keyframes pulse-arrow-down {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(4px); opacity: 0.7; }
        }
        .pulse-arrow-down {
          animation: pulse-arrow-down 1.2s ease-in-out infinite;
        }
        
        @keyframes pulse-highlight {
          0%, 100% { 
            box-shadow: inset 0 0 0 2px #3B82F6, 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% { 
            box-shadow: inset 0 0 0 2px #3B82F6, 0 0 0 8px rgba(59, 130, 246, 0.2);
          }
        }
        .pulse-highlight {
          animation: pulse-highlight 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
