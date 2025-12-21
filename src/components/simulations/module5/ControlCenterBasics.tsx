import { useMemo, useState } from 'react';
import { module5Lesson1Texts } from '../../../data/lessonTexts_module5';
import { Lightbulb, Wifi, Sun } from 'lucide-react';

type LessonProps = {
  onComplete: () => void;
  onBack?: () => void;
  language: 'en' | 'zh';
};

type Step = 0 | 1 | 2 | 3 | 4;

export default function ControlCenterBasics({ onComplete, onBack, language }: LessonProps) {
  const t = module5Lesson1Texts[language];
  const [step, setStep] = useState<Step>(0);
  const [opened, setOpened] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [wifiOn, setWifiOn] = useState(true);
  const [brightness, setBrightness] = useState(70);
  const [dragStartY, setDragStartY] = useState<number | null>(null);

  // dark overlay: lower brightness → darker screen
  const overlayOpacity = useMemo(() => {
    const darkness = 1 - brightness / 100;
    return Math.min(0.75, Math.max(0, darkness * 0.8));
  }, [brightness]);

  const stepText = useMemo(() => {
    switch (step) {
      case 0: return t.step0;
      case 1: return t.step1;
      case 2: return t.step2;
      case 3: return t.step3;
      default: return t.step4;
    }
  }, [step, t]);

  // limit what you can click depending on the step
  const canTapFlashlight = opened && step >= 1;
  const canTapWifi       = opened && step >= 2;
  const canUseBrightness = opened && step >= 3;

  // swipe handling for realistic pull‑down
  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStartY(e.clientY);
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartY != null) {
      const deltaY = e.clientY - dragStartY;
      if (!opened && deltaY > 50) {
        setOpened(true);
        if (step === 0) setStep(1);
      }
    }
    setDragStartY(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-lg">
        <div className="card">
          <div className="mb-4 text-sm font-semibold text-blue-700 bg-blue-50 border rounded-xl px-4 py-2">
            {t.practiceMode}
          </div>
          <h2 className="text-2xl font-bold mb-4">{t.title}</h2>
          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <p className="text-base">{stepText}</p>
          </div>

          {/* phone simulation */}
          <div
            className="relative rounded-[30px] border bg-white shadow-lg p-6 overflow-hidden"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            {/* overlay for brightness */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[30px]"
              style={{ background: 'black', opacity: overlayOpacity }}
            />

            {!opened ? (
              <div className="text-center space-y-4">
                <p className="text-base">{t.step0}</p>
                <p className="text-sm text-gray-500">(Swipe down to open)</p>
                <button
                  className="btn-primary w-full py-3"
                  onClick={() => {
                    setOpened(true);
                    if (step === 0) setStep(1);
                  }}
                >
                  {t.next}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {/* Flashlight button */}
                <button
                  disabled={!canTapFlashlight}
                  className={`rounded-xl border p-4 flex flex-col items-center transition-transform duration-200 ${
                    !canTapFlashlight ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                  }`}
                  onClick={() => {
                    setFlashOn((v) => !v);
                    if (step <= 1) setStep(2);
                  }}
                >
                  <Lightbulb
                    className={`w-8 h-8 mb-2 transition-colors ${flashOn ? 'text-yellow-500' : 'text-gray-400'}`}
                  />
                  <span className="text-sm font-medium">{t.flashlight}</span>
                  <span className="text-xs text-gray-500">{flashOn ? 'ON' : 'OFF'}</span>
                </button>

                {/* Wi‑Fi button */}
                <button
                  disabled={!canTapWifi}
                  className={`rounded-xl border p-4 flex flex-col items-center transition-transform duration-200 ${
                    !canTapWifi ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                  }`}
                  onClick={() => {
                    setWifiOn((v) => !v);
                    if (step <= 2) setStep(3);
                  }}
                >
                  <Wifi
                    className={`w-8 h-8 mb-2 transition-colors ${wifiOn ? 'text-blue-500' : 'text-gray-400'}`}
                  />
                  <span className="text-sm font-medium">{t.wifi}</span>
                  <span className="text-xs text-gray-500">{wifiOn ? 'ON' : 'OFF'}</span>
                </button>

                {/* Brightness slider row */}
                <div className="col-span-2 flex items-center gap-4 border rounded-xl p-4">
                  <Sun className="w-6 h-6 text-yellow-500 shrink-0" />
                  <span className="font-medium text-sm">{t.brightness}</span>
                  {/* slider wrapper with gradient track */}
                  <div className="flex-1 relative">
                    <input
                      disabled={!canUseBrightness}
                      type="range"
                      min={10}
                      max={100}
                      value={brightness}
                      onChange={(e) => {
                        setBrightness(Number(e.target.value));
                        if (step <= 3) setStep(4);
                      }}
                      className="w-full appearance-none h-2 rounded-full"
                      style={{
                        background: `linear-gradient(to right, #facc15 ${brightness}%, #e5e7eb ${brightness}%)`,
                      }}
                    />
                    {/* percentage bubble over thumb */}
                    <div
                      className="absolute top-[-0.5rem] transform -translate-x-1/2 bg-white border text-xs px-2 py-1 rounded-md shadow"
                      style={{ left: `${brightness}%` }}
                    >
                      {brightness}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* navigation buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onBack ?? (() => window.history.back())}
              className="btn-secondary flex-1"
            >
              {t.back}
            </button>
            <button
              onClick={() => {
                if (!opened) {
                  setOpened(true);
                  if (step === 0) setStep(1);
                  return;
                }
                if (step >= 4) {
                  onComplete();
                } else {
                  setStep((s) => (s + 1) as Step);
                }
              }}
              className="btn-primary flex-1"
            >
              {t.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}