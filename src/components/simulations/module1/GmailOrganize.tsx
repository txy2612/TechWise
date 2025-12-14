import React, { useState } from 'react';
import { ArrowLeft, Mail, Star, Archive, Trash2, ArrowRight } from 'lucide-react';
import { 
  InstructionHint, 
  PracticeBanner
} from '../../common';
import { gmailOrganizeTexts } from '../../../data/lessonTexts_module1';

interface GmailOrganizeProps {
  onComplete: () => void;
  onBack: () => void;
  language: 'en' | 'zh';
}

export function GmailOrganize({ onComplete, onBack, language }: GmailOrganizeProps) {
  // ========== LANGUAGE ==========
  const t = gmailOrganizeTexts[language];

  // ========== LOGIC ==========
  const [currentStep, setCurrentStep] = useState(0);
  const [email1Starred, setEmail1Starred] = useState(false);
  const [email2Archived, setEmail2Archived] = useState(false);
  const [email3Deleted, setEmail3Deleted] = useState(false);

  // Helper to get step text
  const getStepText = () => {
    const stepKey = `step${currentStep}` as keyof typeof t;
    return t[stepKey] as string;
  };

  const handleStar = () => {
    if (currentStep === 0) {
      setEmail1Starred(true);
      setCurrentStep(1);
    }
  };

  const handleArchive = () => {
    if (currentStep === 1) {
      setEmail2Archived(true);
      setCurrentStep(2);
    }
  };

  const handleDelete = () => {
    if (currentStep === 2) {
      setEmail3Deleted(true);
      setCurrentStep(3);
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
          totalSteps={4}
          language={language}
        />

        {/* Gmail Interface */}
        {currentStep < 3 && (
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

              {/* Main Content - Email List */}
              <div className="flex-1 overflow-auto">
                <div className="divide-y divide-gray-200">
                  {/* Email 1 - Star */}
                  {!email1Starred && (
                    <div className={`p-6 transition-all ${currentStep === 0 ? 'bg-blue-50 pulse-border ring-4 ring-blue-200' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold">DJ</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-gray-900">{t.email1From}</span>
                            <span className="text-sm text-gray-500">1 hour ago</span>
                          </div>
                          <div className="font-semibold text-gray-900 mb-1">{t.email1Subject}</div>
                          <div className="text-gray-600">{t.email1Preview}</div>
                        </div>
                        <div className="relative flex gap-2 flex-shrink-0">
                          <button
                            onClick={handleStar}
                            className={`p-3 rounded-lg transition-all ${
                              currentStep === 0 ? 'bg-yellow-100 hover:bg-yellow-200' : 'hover:bg-gray-100'
                            }`}
                          >
                            <Star className={`w-6 h-6 ${currentStep === 0 ? 'text-yellow-500' : 'text-gray-400'}`} />
                          </button>
                          {currentStep === 0 && (
                            <div className="absolute left-[-16.5px] top-12 pulse-arrow">
                              <div className="flex flex-col items-center">
                                <ArrowRight className="w-8 h-8 text-blue-600 -rotate-90" />
                                <div className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold mt-1 whitespace-nowrap">
                                  {t.clickStar}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {email1Starred && (
                    <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500">
                      <div className="flex items-center gap-4">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <span className="text-lg font-bold text-gray-900">{t.email1Subject}</span>
                        <span className="text-gray-600 text-sm">({t.starAction})</span>
                      </div>
                    </div>
                  )}

                  {/* Email 2 - Archive */}
                  {!email2Archived && (
                    <div className={`p-6 transition-all ${currentStep === 1 ? 'bg-blue-50 pulse-border ring-4 ring-blue-200' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold">BA</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-gray-900">{t.email2From}</span>
                            <span className="text-sm text-gray-500">2 days ago</span>
                          </div>
                          <div className="font-semibold text-gray-900 mb-1">{t.email2Subject}</div>
                          <div className="text-gray-600">{t.email2Preview}</div>
                        </div>
                        <div className="relative flex gap-2 flex-shrink-0">
                          <button
                            onClick={handleArchive}
                            disabled={currentStep !== 1}
                            className={`p-3 rounded-lg transition-all ${
                              currentStep === 1 ? 'bg-green-100 hover:bg-green-200' : 'hover:bg-gray-100 opacity-50'
                            }`}
                          >
                            <Archive className={`w-6 h-6 ${currentStep === 1 ? 'text-green-600' : 'text-gray-400'}`} />
                          </button>
                          {currentStep === 1 && (
                            <div className="absolute left-[-13px] top-12 pulse-arrow">
                              <div className="flex flex-col items-center">
                                <ArrowRight className="w-8 h-8 text-blue-600 -rotate-90" />
                                <div className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm font-semibold mt-1 whitespace-nowrap">
                                  {t.clickArchive}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {email2Archived && (
                    <div className="p-6 bg-green-50 border-l-4 border-green-500">
                      <div className="flex items-center gap-4">
                        <Archive className="w-6 h-6 text-green-600" />
                        <span className="text-lg font-bold text-gray-900">{t.email2Subject}</span>
                        <span className="text-gray-600 text-sm">({t.archiveAction})</span>
                      </div>
                    </div>
                  )}

                  {/* Email 3 - Delete */}
                  {!email3Deleted && (
                    <div className={`p-6 transition-all ${currentStep === 2 ? 'bg-blue-50 pulse-border ring-4 ring-blue-200' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-300 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold">SS</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-gray-900">{t.email3From}</span>
                            <span className="text-sm text-gray-500">5 days ago</span>
                          </div>
                          <div className="font-semibold text-gray-900 mb-1">{t.email3Subject}</div>
                          <div className="text-gray-600">{t.email3Preview}</div>
                        </div>
                        <div className="relative flex gap-2 flex-shrink-0">
                          <button
                            onClick={handleDelete}
                            disabled={currentStep !== 2}
                            className={`p-3 rounded-lg transition-all ${
                              currentStep === 2 ? 'bg-red-100 hover:bg-red-200' : 'hover:bg-gray-100 opacity-50'
                            }`}
                          >
                            <Trash2 className={`w-6 h-6 ${currentStep === 2 ? 'text-red-600' : 'text-gray-400'}`} />
                          </button>
                          {currentStep === 2 && (
                            <div className="absolute left-[-23px] top-12 pulse-arrow">
                              <div className="flex flex-col items-center">
                                <ArrowRight className="w-8 h-8 text-blue-600 -rotate-90" />
                                <div className="bg-blue-500 text-white px-2.5 py-1 rounded-lg text-sm font-semibold mt-1 whitespace-nowrap">
                                  {t.clickDelete}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {email3Deleted && (
                    <div className="p-6 bg-red-50 border-l-4 border-red-500">
                      <div className="flex items-center gap-4">
                        <Trash2 className="w-6 h-6 text-red-600" />
                        <span className="text-lg font-bold text-gray-900">{t.email3Subject}</span>
                        <span className="text-gray-600 text-sm">({t.deleteAction})</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-9xl mb-8">🎉</div>
              <h3 className="text-4xl font-black text-gray-900 mb-6">{t.success}</h3>
              <p className="text-2xl text-gray-600 mb-8">{t.successMessage}</p>
            </div>

            {/* Tips Cards */}
            <div className="grid grid-cols-3 gap-6">
              {/* Star Tip */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                  <h4 className="text-xl font-bold text-gray-900">{t.tip1Title}</h4>
                </div>
                <p className="text-lg text-gray-700">{t.tip1Text}</p>
              </div>

              {/* Archive Tip */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <Archive className="w-8 h-8 text-green-600" />
                  <h4 className="text-xl font-bold text-gray-900">{t.tip2Title}</h4>
                </div>
                <p className="text-lg text-gray-700">{t.tip2Text}</p>
              </div>

              {/* Delete Tip */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
                <div className="flex items-center gap-3 mb-3">
                  <Trash2 className="w-8 h-8 text-red-600" />
                  <h4 className="text-xl font-bold text-gray-900">{t.tip3Title}</h4>
                </div>
                <p className="text-lg text-gray-700">{t.tip3Text}</p>
              </div>
            </div>

            {/* Complete Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={onComplete}
                className="flex items-center gap-3 px-12 py-5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-2xl shadow-lg transition-all"
              >
                {t.continueButton}
                <ArrowRight className="w-7 h-7" />
              </button>
            </div>
          </div>
        )}
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
            border-width: 2px;
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
          }
          50% { 
            border-width: 2px;
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.15);
          }
        }
        .pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
