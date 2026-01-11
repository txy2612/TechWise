import { useMemo, useRef, useState } from 'react';
import { module5Lesson4Texts } from '../../../data/lessonTexts_module5';
import { Hand as HandIcon, Trash2 as TrashIcon, CheckCircle2 as CheckIcon } from 'lucide-react';

type LessonProps = {
  onComplete: () => void;
  onBack?: () => void;
  language: 'en' | 'zh';
};

type Mode = 'idle' | 'holding' | 'edit' | 'removing' | 'removed' | 'success';

export default function ManageAppsStorage({ onComplete, onBack, language }: LessonProps) {
  const t = module5Lesson4Texts[language];
  const totalSteps = 4;

  const [mode, setMode] = useState<Mode>('idle');

  // App state
  const [installed, setInstalled] = useState(true);

  // Storage state
  const [storageUsed, setStorageUsed] = useState(70);

  // Hint for quick tap
  const [showHint, setShowHint] = useState(false);

  // For the disappearing animation (tile 1)
  const [removingApp, setRemovingApp] = useState(false);

  const timerRef = useRef<number | null>(null);

  const handlePressStart = () => {
    if (!installed) return;
    if (mode !== 'idle') return;

    setMode('holding');

    timerRef.current = window.setTimeout(() => {
      setMode('edit');
      timerRef.current = null;
    }, 2000);
  };

  const handlePressEnd = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;

      // quick tap -> show hint
      if (mode === 'holding') {
        setMode('idle');
        setShowHint(true);
        window.setTimeout(() => setShowHint(false), 1800);
      }
    }
  };

  const keepApp = () => {
    setMode('idle');
  };

  /**
   * ✅ NEW uninstall sequence (2 screens):
   * 1) removing: tile animates out + storage reduces simultaneously
   * 2) removed: empty slot visible (NO popup yet)
   * 3) success: popup overlay is LAST screen
   */
  const uninstallApp = () => {
    if (!installed) return;

    setMode('removing');
    setRemovingApp(true);

    // Storage reduces immediately (bar animates due to transition)
    setStorageUsed((s) => Math.max(0, s - 20));

    // After tile disappear animation ends -> show "app disappeared" screen (empty slot)
    window.setTimeout(() => {
      setInstalled(false);
      setRemovingApp(false);
      setMode('removed');
    }, 650);

    // Then popup as LAST screen
    window.setTimeout(() => {
      setMode('success');
    }, 1250);
  };

  const handleDone = () => {
    setMode('idle');
    window.setTimeout(() => {
      onComplete();
    }, 800);
  };

  const guideText = useMemo(() => {
    if (mode === 'idle' || mode === 'holding') return t.instruction;
    if (mode === 'edit') return t.editMode;
    if (mode === 'removing') return language === 'en' ? 'Removing app…' : '正在删除应用…';
    if (mode === 'removed') return language === 'en' ? 'App removed.' : '应用已删除。';
    return t.success;
  }, [mode, t, language]);

  const stepNumber = useMemo(() => {
    // 1: long press, 2: edit mode, 3: app disappears, 4: popup success
    if (mode === 'idle' || mode === 'holding') return 1;
    if (mode === 'edit') return 2;
    if (mode === 'removing' || mode === 'removed') return 3;
    if (mode === 'success') return 4;
    return 1;
  }, [mode]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <style>{`
          @keyframes ringPulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.45); }
            70% { box-shadow: 0 0 0 14px rgba(37, 99, 235, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
          }
          @keyframes wiggle {
            0%, 100% { transform: rotate(-1deg); }
            50% { transform: rotate(1deg); }
          }

          /* ✅ Tile disappears */
          @keyframes appDisappear {
            0%   { transform: scale(1); opacity: 1; filter: blur(0px); }
            70%  { transform: scale(0.92); opacity: 0.35; filter: blur(0.5px); }
            100% { transform: scale(0.86); opacity: 0; filter: blur(1px); }
          }
        `}</style>

        <div className="card space-y-6 p-6 md:p-8">
          {/* GUIDE BAR */}
          <div className="flex items-start justify-between bg-blue-50 border-2 border-blue-300 rounded-2xl px-6 py-5">
            <p className="text-xl md:text-2xl font-semibold text-blue-900 leading-snug">
              <span className="font-bold">Guide:</span> <span className="font-medium">{guideText}</span>
            </p>
            <div className="ml-4 bg-blue-600 text-white rounded-full px-5 py-2 text-lg font-bold shrink-0">
              {stepNumber}/{totalSteps}
            </div>
          </div>

          {/* BACK (single only) */}
          <button
            onClick={onBack ?? (() => window.history.back())}
            className="flex items-center gap-3 text-lg md:text-xl text-gray-700 hover:text-blue-700"
          >
            <span className="text-2xl md:text-3xl leading-none">←</span>
            <span>{t.back}</span>
          </button>

          <h2 className="text-3xl md:text-4xl font-bold">{t.title}</h2>

          {/* Instruction box */}
          <div className="bg-gray-100 rounded-2xl p-5">
            <p className="text-lg md:text-xl">{t.instruction}</p>
            {showHint && (
              <p className="text-base md:text-lg text-red-600 mt-3 font-semibold">{t.quickTapHint}</p>
            )}
          </div>

          {/* Phone UI */}
          <div className="relative border-2 rounded-[28px] bg-white shadow-xl p-7 overflow-hidden">
            {/* subtle cue only in idle */}
            {mode === 'idle' && installed && (
              <HandIcon className="absolute top-10 left-10 w-10 h-10 text-gray-400 animate-bounce" />
            )}

            {/* App grid */}
            <div className="grid grid-cols-3 gap-5">
              {Array.from({ length: 9 }).map((_, idx) => {
                const isTarget = idx === 0;

                // Empty slot (after uninstall)
                if (isTarget && !installed) {
                  return (
                    <div
                      key={idx}
                      className="h-20 md:h-24 rounded-2xl border-2 border-gray-200/70 bg-transparent flex items-center justify-center relative"
                      aria-label="Empty home screen slot"
                    >
                      <div className="absolute inset-2 rounded-xl bg-white/40" />
                      <div className="relative w-10 h-10 rounded-2xl bg-gray-200/40" />
                    </div>
                  );
                }

                const shouldPulseTarget = (mode === 'idle' || mode === 'holding') && isTarget && installed;
                const targetRemovingNow = isTarget && installed && mode === 'removing' && removingApp;

                return (
                  <button
                    key={idx}
                    onMouseDown={isTarget && mode === 'idle' ? handlePressStart : undefined}
                    onMouseUp={isTarget && mode === 'holding' ? handlePressEnd : undefined}
                    onMouseLeave={isTarget && mode === 'holding' ? handlePressEnd : undefined}
                    onTouchStart={isTarget && mode === 'idle' ? handlePressStart : undefined}
                    onTouchEnd={isTarget && mode === 'holding' ? handlePressEnd : undefined}
                    disabled={(isTarget ? !installed : false) || mode === 'removing' || mode === 'removed' || mode === 'success'}
                    className={[
                      'h-20 md:h-24 rounded-2xl border-2 flex flex-col items-center justify-center transition-all',
                      isTarget && !installed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50',
                      mode === 'edit' && isTarget ? 'animate-[wiggle_0.45s_ease-in-out_infinite]' : '',
                      shouldPulseTarget ? 'ring-4 ring-blue-200' : '',
                    ].join(' ')}
                    style={{
                      ...(shouldPulseTarget ? { animation: 'ringPulse 1.5s ease-out infinite' } : {}),
                      ...(targetRemovingNow ? { animation: 'appDisappear 650ms ease-in forwards' } : {}),
                    }}
                  >
                    <span className="text-base md:text-lg font-semibold">{`App ${idx + 1}`}</span>
                    {isTarget && installed && (
                      <span className="text-xs md:text-sm text-gray-500 mt-1">
                        {language === 'en' ? '(Try this one)' : '（试试这个）'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Storage bar (reduces during removing/removed, with animation) */}
            <div className="mt-7">
              <p className="text-base md:text-lg font-semibold">
                {t.storage}: {storageUsed}% {t.used}
              </p>
              <div className="h-4 w-full border rounded-full overflow-hidden mt-2 bg-white">
                <div
                  className="h-full bg-black transition-all duration-700"
                  style={{ width: `${storageUsed}%` }}
                />
              </div>
            </div>

            {/* Edit mode actions */}
            {mode === 'edit' && (
              <div className="mt-7 space-y-5">
                <p className="text-center text-gray-700 text-lg md:text-xl font-medium">{t.editMode}</p>

                <div className="flex gap-4">
                  <button
                    className="btn-secondary flex-1 flex items-center justify-center gap-2 text-lg md:text-xl"
                    onClick={keepApp}
                  >
                    <CheckIcon className="w-6 h-6 text-green-600" />
                    {t.keep}
                  </button>

                  <button
                    className="btn-primary flex-1 flex items-center justify-center gap-2 text-lg md:text-xl"
                    onClick={uninstallApp}
                    style={{ animation: 'ringPulse 1.5s ease-out infinite' }}
                  >
                    <TrashIcon className="w-6 h-6 text-red-200" />
                    {t.uninstall}
                  </button>
                </div>
              </div>
            )}

            {/* ✅ LAST screen: Success popup overlay */}
            {mode === 'success' && (
              <div className="absolute inset-0 rounded-[28px] bg-white p-7 flex flex-col justify-center">
                <div className="max-w-md w-full mx-auto space-y-5">
                  <p className="text-2xl md:text-3xl font-bold text-green-700 text-center">{t.success}</p>

                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <p className="text-lg md:text-xl font-bold text-gray-900">
                      {t.storage}: {storageUsed}% {t.used}
                    </p>

                    <div className="h-4 w-full border rounded-full overflow-hidden mt-3 bg-white">
                      <div
                        className="h-full bg-black transition-all duration-700"
                        style={{ width: `${storageUsed}%` }}
                      />
                    </div>

                    <p className="text-base md:text-lg text-gray-800 mt-3 font-medium">
                      {language === 'en'
                        ? 'App removed. Saved space for phone storage.'
                        : '应用已删除，已节省手机存储空间。'}
                    </p>
                  </div>

                  <button
                    className="btn-primary w-full py-5 text-lg md:text-xl font-semibold rounded-2xl"
                    onClick={handleDone}
                  >
                    {t.done}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}