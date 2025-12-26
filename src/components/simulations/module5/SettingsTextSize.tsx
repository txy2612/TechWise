import { useMemo, useRef, useState } from 'react';
import { ArrowRight, Settings as SettingsIcon } from 'lucide-react';

type LessonProps = {
  onComplete: () => void;
  onBack?: () => void;
  language: 'en' | 'zh';
};

const texts = {
  en: {
    title: 'Settings – Personalization',
    step0: 'Tap the Settings app to begin.',
    step1: 'Choose a wallpaper (you can import your own photo).',
    step2: 'Use the slider to change text size.',
    step3: 'Choose a font style.',
    step4: 'All set! You personalized wallpaper, text size, and font.',
    next: 'Next',
    back: 'Back',
    done: 'Done',
    importLabel: 'Import',
    fontSans: 'Sans',
    fontSerif: 'Serif',
    fontMono: 'Monospace',
    previewHeader: 'Preview',
    previewBody: 'Your changes appear instantly.',
  },
  zh: {
    title: '设置 – 个性化',
    step0: '点击“设置”应用开始。',
    step1: '选择一个壁纸（也可以导入自己的照片）。',
    step2: '使用滑块调整文字大小。',
    step3: '选择字体样式。',
    step4: '完成！你已更改壁纸、文字大小和字体。',
    next: '下一步',
    back: '返回',
    done: '完成',
    importLabel: '导入',
    fontSans: '无衬线',
    fontSerif: '衬线体',
    fontMono: '等宽',
    previewHeader: '预览',
    previewBody: '更改会即时显示。',
  },
};

/**
 * ✅ PALER / SOFTER WALLPAPERS (text-friendly)
 */
const WALLPAPERS = [
  { id: 1, className: 'bg-gradient-to-br from-orange-100 via-pink-100 to-rose-100' },
  { id: 2, className: 'bg-gradient-to-br from-green-100 via-emerald-100 to-sky-100' },
  { id: 3, className: 'bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100' },
];

const SLIDER_MIN = 14;
const SLIDER_MAX = 28;

export default function SettingsPersonalization({ onComplete, onBack, language }: LessonProps) {
  const t = texts[language];
  const totalSteps = 5;

  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [wallpaperId, setWallpaperId] = useState(WALLPAPERS[0].id);
  const [uploadedWallpaper, setUploadedWallpaper] = useState<string | null>(null);

  // ✅ Make default bigger so preview isn't tiny
  const [textSize, setTextSize] = useState(22);

  const [fontStyle, setFontStyle] = useState<'sans' | 'serif' | 'mono'>('sans');

  const [showSettingsHint, setShowSettingsHint] = useState(true);
  const [showSizeHint, setShowSizeHint] = useState(true);

  const sliderRef = useRef<HTMLInputElement | null>(null);

  const guideText = useMemo(() => {
    if (step === 0) return t.step0;
    if (step === 1) return t.step1;
    if (step === 2) return t.step2;
    if (step === 3) return t.step3;
    return t.step4;
  }, [step, t]);

  const wallpaperClass = useMemo(() => {
    if (uploadedWallpaper) return '';
    return WALLPAPERS.find((w) => w.id === wallpaperId)?.className ?? '';
  }, [wallpaperId, uploadedWallpaper]);

  const fontClass = useMemo(() => {
    if (fontStyle === 'serif') return 'font-serif';
    if (fontStyle === 'mono') return 'font-mono';
    return 'font-sans';
  }, [fontStyle]);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedWallpaper(URL.createObjectURL(file));
  };

  const nextStep = () => {
    if (step < 4) setStep((s) => (s + 1) as any);
    else onComplete();
  };

  const bubbleLeftPct = useMemo(() => {
    const pct = ((textSize - SLIDER_MIN) * 100) / (SLIDER_MAX - SLIDER_MIN);
    return Math.max(0, Math.min(100, pct));
  }, [textSize]);

  const bubbleTranslateX = useMemo(() => {
    const centerOffset = (bubbleLeftPct - 50) / 50; // [-1..1]
    return `${-centerOffset * 16}px`;
  }, [bubbleLeftPct]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <style>{`
          @keyframes softPulse {
            0%   { transform: translateY(0) scale(1); opacity: 1; }
            50%  { transform: translateY(-2px) scale(1.04); opacity: 0.96; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
          }

          @keyframes iconPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.04); }
            100% { transform: scale(1); }
          }

          input[type="range"]::-webkit-slider-thumb{
            -webkit-appearance:none;
            appearance:none;
            width:26px;height:26px;border-radius:9999px;
            background:#2563eb;
            border:4px solid #fff;
            box-shadow:0 8px 18px rgba(0,0,0,0.18);
            cursor:pointer;
            margin-top:-10px;
          }
          input[type="range"]::-webkit-slider-runnable-track{
            height:8px;border-radius:9999px;
          }
          input[type="range"]::-moz-range-thumb{
            width:26px;height:26px;border-radius:9999px;
            background:#2563eb;border:4px solid #fff;
            box-shadow:0 8px 18px rgba(0,0,0,0.18);
            cursor:pointer;
          }
          input[type="range"]::-moz-range-track{
            height:8px;border-radius:9999px;
          }
        `}</style>

        <div className="card space-y-6 p-6 md:p-8">
          {/* GUIDE BAR */}
          <div className="flex items-start justify-between bg-blue-50 border-2 border-blue-300 rounded-2xl px-6 py-5">
            <p className="text-xl md:text-2xl font-semibold text-blue-900 leading-snug">
              <span className="font-bold">Guide:</span> {guideText}
            </p>
            <div className="bg-blue-600 text-white rounded-full px-5 py-2 text-lg font-bold">
              {step + 1}/{totalSteps}
            </div>
          </div>

          {/* BACK (single only) */}
          <button
            onClick={onBack ?? (() => window.history.back())}
            className="flex items-center gap-3 text-lg md:text-xl text-gray-700 hover:text-blue-700"
          >
            <span className="text-3xl">←</span>
            {t.back}
          </button>

          <h2 className="text-3xl md:text-4xl font-bold">{t.title}</h2>

          {/* STEP 0 */}
          {step === 0 && (
            <div className="relative flex justify-center">
              {/* ✅ Move hint to the SIDE + add arrow, keep it in front */}
              {showSettingsHint && (
                <div className="absolute left-1/2 -translate-x-[190px] top-6 z-50 flex items-center gap-3">
                  <div
                    className="bg-blue-600 text-white text-lg font-semibold shadow-lg rounded-2xl px-5 py-3"
                    style={{ animation: 'softPulse 1.2s ease-in-out infinite' }}
                  >
                    Click here
                  </div>
                  <ArrowRight
                    className="w-10 h-10 text-blue-600"
                    style={{ animation: 'softPulse 1.2s ease-in-out infinite' }}
                  />
                </div>
              )}

              <button
                className={[
                  'w-32 h-32 rounded-3xl border-2 bg-white flex flex-col items-center justify-center transition',
                  'hover:scale-105',
                  // ✅ Pulse / ring effect while hint is showing
                  showSettingsHint ? 'ring-4 ring-blue-300 shadow-lg' : '',
                ].join(' ')}
                style={showSettingsHint ? { animation: 'iconPulse 1.2s ease-in-out infinite' } : undefined}
                onClick={() => {
                  setShowSettingsHint(false);
                  setStep(1);
                }}
              >
                <SettingsIcon className="w-12 h-12 text-gray-700" />
                <span className="mt-2 text-lg font-semibold">{language === 'en' ? 'Settings' : '设置'}</span>
              </button>
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex gap-4">
                {WALLPAPERS.map((wp) => (
                  <button
                    key={wp.id}
                    className={`w-24 h-24 rounded-2xl border-2 ${wp.className} ${
                      wallpaperId === wp.id ? 'ring-4 ring-blue-400' : ''
                    }`}
                    onClick={() => {
                      setWallpaperId(wp.id);
                      setUploadedWallpaper(null);
                    }}
                    aria-label={`Wallpaper ${wp.id}`}
                  />
                ))}

                <label className="w-24 h-24 rounded-2xl border-2 flex items-center justify-center cursor-pointer font-semibold text-gray-700 hover:bg-white">
                  {t.importLabel}
                  <input type="file" hidden accept="image/*" onChange={handleImport} />
                </label>
              </div>

              <button className="btn-primary w-full py-5 text-xl" onClick={nextStep}>
                {t.next}
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6 relative">
              {showSizeHint && (
                <div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 px-6 py-2 rounded-xl text-white text-lg shadow"
                  style={{ background: '#2563eb', animation: 'softPulse 1.2s ease-in-out infinite' }}
                >
                  Drag to the right →
                </div>
              )}

              <div className="relative pt-8">
                <div
                  className="absolute -top-2 z-10"
                  style={{
                    left: `${bubbleLeftPct}%`,
                    transform: `translateX(-50%) translateX(${bubbleTranslateX})`,
                  }}
                >
                  <div className="bg-white border-2 border-gray-200 rounded-2xl px-4 py-2 shadow text-lg font-bold text-gray-800">
                    {textSize}px
                  </div>
                </div>

                <input
                  ref={sliderRef}
                  type="range"
                  min={SLIDER_MIN}
                  max={SLIDER_MAX}
                  value={textSize}
                  onChange={(e) => {
                    setTextSize(Number(e.target.value));
                    setShowSizeHint(false);
                  }}
                  className="w-full appearance-none rounded-full"
                  style={{
                    height: '8px',
                    background: `linear-gradient(to right, #93c5fd ${bubbleLeftPct}%, #e5e7eb ${bubbleLeftPct}%)`,
                  }}
                  aria-label="Text size"
                />
              </div>

              <button className="btn-primary w-full py-5 text-xl" onClick={nextStep}>
                {t.next}
              </button>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-4">
                {(['sans', 'serif', 'mono'] as const).map((f) => (
                  <button
                    key={f}
                    className={`rounded-2xl border-2 p-4 text-lg hover:bg-white transition ${
                      fontStyle === f ? 'ring-4 ring-blue-300' : ''
                    }`}
                    onClick={() => setFontStyle(f)}
                    aria-pressed={fontStyle === f}
                  >
                    {f === 'sans' && t.fontSans}
                    {f === 'serif' && t.fontSerif}
                    {f === 'mono' && t.fontMono}
                  </button>
                ))}
              </div>

              <button className="btn-primary w-full py-5 text-xl" onClick={nextStep}>
                {t.done}
              </button>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-green-800 text-lg font-semibold">
                {t.step4}
              </div>
              <button className="btn-primary w-full py-5 text-xl" onClick={onComplete}>
                {t.next}
              </button>
            </div>
          )}

          {/* PREVIEW */}
          {step >= 1 && (
            <div className="bg-gray-200 rounded-2xl p-4">
              <div
                className={`h-72 rounded-2xl ${wallpaperClass}`}
                style={{
                  backgroundImage: uploadedWallpaper ? `url(${uploadedWallpaper})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="h-full w-full flex flex-col items-center justify-center px-6 text-center">
                  {/* ✅ Bigger preview typography */}
                  <p className={`font-bold ${fontClass}`} style={{ fontSize: textSize + 6, lineHeight: 1.15 }}>
                    {t.previewHeader}
                  </p>
                  <p className={fontClass} style={{ fontSize: textSize + 2, lineHeight: 1.25, marginTop: 10 }}>
                    {t.previewBody}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}