import { useRef, useState } from 'react';
import { module5Lesson4Texts } from '../../../data/lessonTexts_module5';
import {
  Hand as HandIcon,
  Trash2 as TrashIcon,
  CheckCircle2 as CheckIcon,
  ArrowDown,
} from 'lucide-react';

type LessonProps = {
  onComplete: () => void;
  onBack?: () => void;
  language: 'en' | 'zh';
};

type Mode = 'idle' | 'holding' | 'edit' | 'success';

export default function ManageAppsStorage({ onComplete, onBack, language }: LessonProps) {
  const t = module5Lesson4Texts[language];

  const [mode, setMode] = useState<Mode>('idle');
  const [installed, setInstalled] = useState(true);
  const [storageUsed, setStorageUsed] = useState(70);
  const [showHint, setShowHint] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Long press handlers
  const handlePressStart = () => {
    if (!installed) return;
    setMode('holding');
    timerRef.current = window.setTimeout(() => {
      setMode('edit');
    }, 2000);
  };

  const handlePressEnd = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      if (mode === 'holding') {
        setMode('idle');
        setShowHint(true);
        setTimeout(() => setShowHint(false), 2000);
      }
    }
  };

  const keepApp = () => {
    setMode('idle');
  };

  const uninstallApp = () => {
    setInstalled(false);
    setStorageUsed((s) => Math.max(0, s - 20));
    setMode('success');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-lg">
        <div className="card p-6 space-y-6">
          {/* Banner */}
          <div className="text-sm font-semibold text-blue-700 bg-blue-50 border rounded-xl px-4 py-2">
            {t.practiceMode}
          </div>

          <h2 className="text-2xl font-bold">{t.title}</h2>

          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-base">{t.instruction}</p>
            {showHint && (
              <p className="text-sm text-red-600 mt-2">{t.quickTapHint}</p>
            )}
          </div>

          {/* Phone UI */}
          <div className="relative border rounded-2xl bg-white shadow-lg p-6">
            {/* Bouncing finger icon */}
            {mode === 'idle' && installed && (
              <HandIcon className="absolute top-12 left-8 w-8 h-8 text-gray-400 animate-bounce" />
            )}

            {/* App grid */}
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, idx) => (
                <button
                  key={idx}
                  onMouseDown={handlePressStart}
                  onMouseUp={handlePressEnd}
                  onMouseLeave={handlePressEnd}
                  onTouchStart={handlePressStart}
                  onTouchEnd={handlePressEnd}
                  disabled={!installed}
                  className={`h-16 flex flex-col items-center justify-center border rounded-xl transition-transform ${
                    mode === 'edit' && idx === 0
                      ? 'animate-bounce'
                      : ''
                  } ${
                    !installed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm font-semibold">
                    {installed ? `App ${idx + 1}` : '—'}
                  </span>
                </button>
              ))}
            </div>

            {/* Storage bar */}
            <div className="mt-6">
              <p className="text-sm font-semibold">
                {t.storage}: {storageUsed}% {t.used}
              </p>
              <div className="h-3 w-full border rounded-full overflow-hidden mt-1">
                <div className="h-full bg-black" style={{ width: `${storageUsed}%` }} />
              </div>
            </div>

            {/* Edit mode buttons */}
            {mode === 'edit' && (
              <div className="mt-6 space-y-4">
                <p className="text-center text-gray-700">{t.editMode}</p>
                <div className="flex gap-4">
                  <button
                    className="btn-secondary flex-1 flex items-center justify-center gap-2"
                    onClick={keepApp}
                  >
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    {t.keep}
                  </button>
                  <button
                    className="btn-primary flex-1 flex items-center justify-center gap-2 animate-pulse"
                    onClick={uninstallApp}
                  >
                    <TrashIcon className="w-5 h-5 text-red-600" />
                    {t.uninstall}
                    <ArrowDown className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            )}

            {/* Success pop-up */}
            {mode === 'success' && (
  <div className="absolute inset-0 rounded-2xl bg-white/90 p-6 flex flex-col justify-center">
    <div className="max-w-sm w-full mx-auto space-y-4">
      <p className="text-lg font-semibold text-green-700 text-center">
        {t.success}
      </p>

      <div className="bg-white rounded-xl border p-4">
        <p className="text-sm font-semibold text-gray-800">
          {t.storage}: {storageUsed}% {t.used}
        </p>
        <div className="h-3 w-full border rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-black transition-all duration-700"
            style={{ width: `${storageUsed}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {language === 'en'
            ? 'Storage updated after uninstall.'
            : '卸载后存储空间已更新。'}
        </p>
      </div>

      <button
        className="btn-primary w-full"
        onClick={() => {
          setMode('idle');
          onComplete();
        }}
      >
        {t.done}
      </button>
    </div>
  </div>
)}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-4">
            <button
              className="btn-secondary flex-1"
              onClick={onBack ?? (() => window.history.back())}
            >
              {t.back}
            </button>
            <button
              className="btn-primary flex-1"
              onClick={() => {
                // Only advance if the uninstallation is complete
                if (mode === 'success' || !installed) onComplete();
              }}
            >
              {t.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}