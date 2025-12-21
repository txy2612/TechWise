import { useState, useMemo } from 'react';
import {
  Settings as SettingsIcon,
  Upload,
  TextCursorInput,
} from 'lucide-react';


const texts = {
  en: {
    title: 'Settings – Personalization',
    practiceMode: 'Practice Mode - Safe Simulation',
    step0: 'Tap the Settings app to begin.',
    step1: 'Choose a wallpaper (you can import your own):',
    step2: 'Use the slider to change text size.',
    step3: 'Choose a font style:',
    step4: 'All set! You’ve personalized your phone.',
    next: 'Next',
    back: 'Back',
    done: 'Done',
    fontSans: 'Sans',
    fontSerif: 'Serif',
    fontMono: 'Monospace',
    previewHeader: 'Preview',
    previewBody: 'Your changes will appear instantly here.',
    importLabel: 'Import',
  },
  zh: {
    title: '设置 – 个性化',
    practiceMode: '练习模式 - 安全模拟',
    step0: '点击“设置”应用开始。',
    step1: '选择一个壁纸（或导入您自己的）：',
    step2: '使用滑块调整文字大小。',
    step3: '选择字体样式：',
    step4: '完成！您已经个性化了手机。',
    next: '下一步',
    back: '返回',
    done: '完成',
    fontSans: '无衬线',
    fontSerif: '衬线体',
    fontMono: '等宽',
    previewHeader: '预览',
    previewBody: '更改会即时显示在这里。',
    importLabel: '导入',
  },
};

type LessonProps = {
  onComplete: () => void;
  onBack?: () => void;
  language: 'en' | 'zh';
};

// Preset gradient wallpapers
const WALLPAPERS = [
  { id: 1, className: 'bg-gradient-to-r from-orange-400 via-red-500 to-pink-500' },
  { id: 2, className: 'bg-gradient-to-r from-green-400 to-blue-500' },
  { id: 3, className: 'bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600' },
];

export default function SettingsPersonalization({ onComplete, onBack, language }: LessonProps) {
  const t = texts[language];

  // Steps: 0 = tap Settings, 1 = wallpaper, 2 = text size, 3 = font, 4 = success
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);

  // Wallpaper state (preset or custom)
  const [wallpaperId, setWallpaperId] = useState<number>(WALLPAPERS[0].id);
  const [uploadedWallpaper, setUploadedWallpaper] = useState<string | null>(null);

  // Text size
  const [textSize, setTextSize] = useState(16);

  // Font style
  const [fontStyle, setFontStyle] = useState<'sans' | 'serif' | 'mono'>('sans');

  // Handle custom wallpaper import
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedWallpaper(url);
      setWallpaperId(0); // custom image
    }
  };

  // Determine background class or image
  const wallpaperClass = useMemo(() => {
    if (uploadedWallpaper) return '';
    const preset = WALLPAPERS.find((wp) => wp.id === wallpaperId);
    return preset?.className ?? '';
  }, [wallpaperId, uploadedWallpaper]);

  // Font style class
  const fontClass = useMemo(() => {
    switch (fontStyle) {
      case 'serif':
        return 'font-serif';
      case 'mono':
        return 'font-mono';
      default:
        return 'font-sans';
    }
  }, [fontStyle]);

  // Advance to next step
  const nextStep = () => {
    if (step < 3) setStep((s) => (s + 1) as any);
    else if (step === 3) setStep(4);
    else onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-lg">
        <div className="card space-y-6 p-6">
          {/* Banner */}
          <div className="text-sm font-semibold text-blue-700 bg-blue-50 border rounded-xl px-4 py-2">
            {t.practiceMode}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold">{t.title}</h2>

          {/* Instruction text */}
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-base">
              {step === 0 && t.step0}
              {step === 1 && t.step1}
              {step === 2 && t.step2}
              {step === 3 && t.step3}
            </p>
          </div>

          {/* Step 0: Settings icon */}
          {step === 0 && (
            <div className="flex justify-center">
              <button
                className="rounded-2xl border w-24 h-24 flex flex-col items-center justify-center hover:bg-gray-50 transition-transform hover:scale-105"
                onClick={() => setStep(1)}
              >
                <SettingsIcon className="w-10 h-10 text-gray-700" />
                <span className="text-sm mt-2">{language === 'en' ? 'Settings' : '设置'}</span>
              </button>
            </div>
          )}

          {/* Step 1: Wallpaper selection */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex gap-3">
                {WALLPAPERS.map((wp) => (
                  <button
                    key={wp.id}
                    className={`w-20 h-20 rounded-xl border-2 ${wp.className} ${wallpaperId === wp.id ? 'ring-4 ring-blue-500' : ''}`}
                    onClick={() => {
                      setWallpaperId(wp.id);
                      setUploadedWallpaper(null);
                    }}
                  />
                ))}
                {/* Import button */}
                <label className="w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center text-xs text-gray-600 cursor-pointer hover:bg-gray-50">
                  {t.importLabel}
                  <input type="file" accept="image/*" onChange={handleImport} className="hidden" />
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  className="btn-secondary flex-1"
                  onClick={onBack ?? (() => window.history.back())}
                >
                  {t.back}
                </button>
                <button
                  className="btn-primary flex-1"
                  onClick={nextStep}
                >
                  {t.next}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Text size slider */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="range"
                  min={14}
                  max={28}
                  value={textSize}
                  onChange={(e) => setTextSize(Number(e.target.value))}
                  className="w-full appearance-none h-2 rounded-full"
                  style={{
                    background: `linear-gradient(to right, #93c5fd ${((textSize - 14) * 100) / 14}%, #e5e7eb ${((textSize - 14) * 100) / 14}%)`,
                  }}
                />
                <div
                  className="absolute -top-5 left-[calc((var(--value)-14)/(28-14)*100%)] transform -translate-x-1/2 text-xs px-2 py-0.5 bg-white border rounded-md"
                  style={{ '--value': textSize } as React.CSSProperties}
                >
                  {textSize}px
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="btn-secondary flex-1"
                  onClick={() => setStep(1)}
                >
                  {t.back}
                </button>
                <button
                  className="btn-primary flex-1"
                  onClick={nextStep}
                >
                  {t.next}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Font style selection */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {(['sans', 'serif', 'mono'] as const).map((f) => (
                  <button
                    key={f}
                    className={`rounded-xl border p-3 text-center hover:bg-gray-50 transition-transform hover:scale-105 ${
                      fontStyle === f ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setFontStyle(f)}
                  >
                    {f === 'sans' && t.fontSans}
                    {f === 'serif' && t.fontSerif}
                    {f === 'mono' && t.fontMono}
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  className="btn-secondary flex-1"
                  onClick={() => setStep(2)}
                >
                  {t.back}
                </button>
                <button
                  className="btn-primary flex-1"
                  onClick={nextStep}
                >
                  {t.done}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-800">
                {t.step4}
              </div>
              <button
                className="btn-primary w-full py-3 hover:scale-105 transition-transform"
                onClick={onComplete}
              >
                {t.next}
              </button>
              <button
                className="btn-secondary w-full py-3 mt-4"
                onClick={onBack ?? (() => window.history.back())}
              >
                {t.back}
              </button>
            </>
          )}

          {/* Phone preview on steps 1–3 */}
          {step >= 1 && step <= 3 && (
            <div className="bg-gray-200 rounded-xl p-4 mt-4">
              <div
                className={`h-60 rounded-lg overflow-hidden ${wallpaperClass}`}
                style={{ backgroundImage: uploadedWallpaper ? `url(${uploadedWallpaper})` : undefined }}
              >
                {/* overlay */}
                <div className="h-full w-full flex flex-col justify-center items-center bg-black bg-opacity-30">
                  <p className={`font-bold ${fontClass}`} style={{ fontSize: `${textSize}px` }}>
                    {t.previewHeader}
                  </p>
                  <p className={`${fontClass}`} style={{ fontSize: `${textSize}px` }}>
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