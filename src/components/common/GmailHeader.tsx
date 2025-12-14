import React from 'react';
import { ArrowLeft, Mail } from 'lucide-react';

interface GmailHeaderProps {
  onBack?: () => void;
  language: 'en' | 'zh';
  showCompose?: boolean;
  onCompose?: () => void;
}

export function GmailHeader({ 
  onBack, 
  language,
  showCompose = false,
  onCompose
}: GmailHeaderProps) {
  const t = language === 'en' ? {
    back: 'Back',
    compose: 'Compose'
  } : {
    back: '返回',
    compose: '撰写'
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {onBack && (
          <>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-base font-medium">{t.back}</span>
            </button>
            <div className="h-8 w-px bg-gray-300"></div>
          </>
        )}
        <Mail className="w-8 h-8 text-red-500" />
        <span className="text-xl font-semibold text-gray-900">Gmail</span>
      </div>
      {showCompose && (
        <button 
          onClick={onCompose}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
        >
          {t.compose}
        </button>
      )}
    </div>
  );
}
