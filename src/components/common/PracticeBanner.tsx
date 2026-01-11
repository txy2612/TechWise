import React from 'react';

interface PracticeBannerProps {
  language: 'en' | 'zh';
}

export function PracticeBanner({ language }: PracticeBannerProps) {
  const text = language === 'en'
    ? 'Practice Mode - Safe Simulation'
    : '练习模式 - 安全模拟';

  return (
    <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 text-center shadow-sm rounded-2xl mx-4 mt-4">
      <p className="text-sm font-semibold">
        ⚠️ {text}
      </p>
    </div>
  );
}
