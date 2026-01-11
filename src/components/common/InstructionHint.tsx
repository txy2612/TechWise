import React from 'react';

interface InstructionHintProps {
  text: string;
  currentStep: number;
  totalSteps: number;
  language: 'en' | 'zh';
  pulsing?: boolean;
}

export function InstructionHint({ text, currentStep, totalSteps, language, pulsing = false }: InstructionHintProps) {
  const guideLabel = language === 'en' ? 'Guide: ' : '指南：';

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-400 rounded-2xl p-6 mb-6 shadow-lg ${pulsing ? 'pulse-border-smooth' : ''}`}>
      <div className="flex items-center justify-between gap-6">
        <p className="text-2xl font-bold text-gray-900 flex-1 leading-tight">
          <span className="text-blue-700">{guideLabel}</span>
          {text}
        </p>
        <div className="bg-blue-600 text-white px-6 py-3 rounded-full font-black text-2xl shadow-lg flex-shrink-0">
          {currentStep + 1}/{totalSteps}
        </div>
      </div>
    </div>
  );
}
