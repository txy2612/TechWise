import { useEffect, useMemo, useState } from 'react';
import type { PointerEvent } from 'react';
import { module5Lesson1Texts } from '../../../data/lessonTexts_module5';
import { Lightbulb, Wifi, Sun, Hand, ArrowDown } from 'lucide-react';

type LessonProps = {
  onComplete: () => void;
  onBack?: () => void;
  language: 'en' | 'zh';
};

type Step = 0 | 1 | 2 | 3 | 4;
type HoverTarget = 'flash' | 'wifi' | 'bright' | null;

export default function ControlCenterBasics({ onComplete, onBack, language }: LessonProps) {
  const t = module5Lesson1Texts[language];
  const totalSteps = 5;

  const [step, setStep] = useState<Step>(0);
  const [opened, setOpened] = useState(false);

  const [flashOn, setFlashOn] = useState(false);
  const [wifiOn, setWifiOn] = useState(true);

  // default bright for seniors
  const [brightness, setBrightness] = useState(85);
  const [dragStartY, setDragStartY] = useState<number | null>(null);

  // hints
  const [showFlashHint, setShowFlashHint] = useState(true);
  const [showWifiHint, setShowWifiHint] = useState(true);
  const [showBrightHint, setShowBrightHint] = useState(true);

  // hover overlay target (for desktop mouse)
  const [hovered, setHovered] = useState<HoverTarget>(null);

  // brightness overlay must affect EVERYTHING
  const overlayOpacity = useMemo(() => {
    const darkness = (100 - brightness) / 100;
    return Math.min(0.85, Math.max(0, darkness));
  }, [brightness]);

  const stepText = useMemo(() => {
    if (step === 0) return t.step0;
    if (step === 1) return t.step1;
    if (step === 2) return t.step2;
    if (step === 3) return t.step3;
    return t.step4;
  }, [step, t]);

  // guide microcopy adjustments (Version 3)
  const guideLine = useMemo(() => {
    if (step === 1) return language === 'en' ? 'Tap this icon to turn on Flashlight.' : '点击此图标开启手电筒。';
    if (step === 2) return language === 'en' ? 'Tap this icon to turn Wi-Fi on/off.' : '点击此图标开启/关闭 Wi-Fi。';
    if (step === 3) return language === 'en' ? 'Drag the slider to change brightness.' : '拖动滑块调整屏幕亮度。';
    return stepText;
  }, [step, stepText, language]);

  // allow actions only after reaching the step
  const canTapFlashlight = opened && step >= 1;
  const canTapWifi = opened && step >= 2;
  const canUseBrightness = opened && step >= 3;

  // swipe down to open
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setDragStartY(e.clientY);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragStartY != null) {
      const deltaY = e.clientY - dragStartY;
      if (!opened && deltaY > 55) {
        setOpened(true);
        if (step === 0) setStep(1);
      }
    }
    setDragStartY(null);
  };

  const openControlCenter = () => {
    if (!opened) setOpened(true);
    if (step === 0) setStep(1);
  };

  // reset “show hint” when step changes
  useEffect(() => {
    if (step !== 1) setShowFlashHint(true);
    if (step !== 2) setShowWifiHint(true);
    if (step !== 3) setShowBrightHint(true);
    setHovered(null);
  }, [step]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <style>{`
        @keyframes swipeDownBig {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(50px); } /* ← increase amplitude here */
  100% { transform: translateY(0); }
}
          /* Slider thumb bigger */
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 30px;
            height: 30px;
            border-radius: 9999px;
            background: #1d4ed8;
            border: 4px solid #ffffff;
            box-shadow: 0 6px 16px rgba(0,0,0,0.18);
            cursor: pointer;
            margin-top: -12px;
          }
          input[type="range"]::-webkit-slider-runnable-track {
            height: 8px;
            border-radius: 9999px;
          }
          input[type="range"]::-moz-range-thumb {
            width: 30px;
            height: 30px;
            border-radius: 9999px;
            background: #1d4ed8;
            border: 4px solid #ffffff;
            box-shadow: 0 6px 16px rgba(0,0,0,0.18);
            cursor: pointer;
          }
          input[type="range"]::-moz-range-track {
            height: 8px;
            border-radius: 9999px;
          }

          /* Smooth pulse for blue badge */
          @keyframes softPulse {
            0%   { transform: translate(-50%, 0) scale(1); opacity: 1; }
            50%  { transform: translate(-50%, -2px) scale(1.04); opacity: 0.96; }
            100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
          }

          /* Slow drag demo (hand left <-> right) */
          @keyframes dragDemo {
            0%   { transform: translateX(-24px); opacity: 0.9; }
            50%  { transform: translateX(24px);  opacity: 1; }
            100% { transform: translateX(-24px); opacity: 0.9; }
          }
        `}</style>

        <div className="card space-y-6 p-6 md:p-8">
          {/* GUIDE BAR (2 lines allowed) */}
          <div className="flex items-start justify-between bg-blue-50 border-2 border-blue-300 rounded-2xl px-6 py-5">
            <p className="text-xl md:text-2xl font-semibold text-blue-900 leading-snug">
              <span className="font-bold">Guide:</span> <span className="font-medium">{guideLine}</span>
            </p>
            <div className="ml-4 bg-blue-600 text-white rounded-full px-5 py-2 text-lg font-bold shrink-0">
              {step + 1}/{totalSteps}
            </div>
          </div>

          {/* BACK ARROW ONLY (no duplicates) */}
          <button
            onClick={onBack ?? (() => window.history.back())}
            className="flex items-center gap-3 text-lg md:text-xl text-gray-700 hover:text-blue-700"
          >
            <span className="text-2xl md:text-3xl leading-none">←</span>
            <span>{t.back}</span>
          </button>

          <h2 className="text-3xl md:text-4xl font-bold">{t.title}</h2>

          {/* PHONE SIMULATION */}
          <div
            className="relative rounded-[36px] border-2 bg-white shadow-xl overflow-hidden"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            {/* ===== CONTENT (clickable) ===== */}
            <div className="relative z-10 p-8">
              {/* Step0: home screen simulation */}
              {!opened && step === 0 && (
                <div className="relative rounded-[28px] overflow-hidden border bg-gradient-to-br from-sky-100 via-indigo-100 to-rose-100 p-6">
                  {/* status bar */}
                  <div className="flex items-center justify-between text-gray-700 font-semibold">
                    <span>9:41</span>
                    <span className="text-sm">LTE ▮▮</span>
                  </div>

                  {/* top icons */}
                  <div className="mt-6 grid grid-cols-4 gap-6">
                    {[
                      { label: 'Gallery', bg: 'bg-rose-400' },
                      { label: 'Settings', bg: 'bg-slate-800' },
                      { label: 'Calendar', bg: 'bg-red-500' },
                      { label: 'Camera', bg: 'bg-black' },
                      { label: 'Phone', bg: 'bg-green-600' },
                      { label: 'Messages', bg: 'bg-emerald-500' },
                      { label: 'Maps', bg: 'bg-blue-600' },
                      { label: 'Clock', bg: 'bg-indigo-600' },
                    ].map((app) => (
                      <div key={app.label} className="flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-2xl ${app.bg} shadow`} />
                        <div className="mt-2 text-sm font-semibold text-gray-800">{app.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* swipe instruction box (bigger + longer distance feel) */}
                  <div className="mt-8 flex items-center justify-center">
                    <div className="relative w-full max-w-md bg-white/70 backdrop-blur border-2 border-white rounded-3xl px-8 py-6 shadow">
                      <div className="text-center text-xl md:text-2xl font-bold text-gray-900">
                        Swipe down to open
                        <br />
                        Control Center
                      </div>

                      {/* hand + downward arrow */}
<div className="absolute -top-40 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
  <Hand
    className="w-14 h-14 text-gray-500"
    style={{ animation: 'swipeDownBig 1.8s ease-in-out infinite' }}
  />
  <ArrowDown
    className="mt-1 w-8 h-8 text-gray-600"
    style={{ animation: 'swipeDownBig 1.8s ease-in-out infinite' }}
  />
</div>
                    </div>
                  </div>

                  {/* IMPORTANT: removed the extra bottom text (your request) */}
                </div>
              )}

              {/* Opened content */}
              {opened && (
                <div className="grid grid-cols-2 gap-6">
                  {/* FLASHLIGHT */}
                  <div className="relative">
                    {/* hover overlay on flashlight */}
                    {(step === 1 && (showFlashHint || hovered === 'flash')) && (
                      <div
  className="absolute top12 left-1/2 -translate-x-1/2 z-[999] px-6 py-2 rounded-xl
             text-white text-base md:text-lg font-semibold shadow-lg pointer-events-none"
  style={{ background: '#2563eb', animation: 'softPulse 1.2s ease-in-out infinite' }}
>
  Click here
</div>
                    )}

                    <button
                      disabled={!canTapFlashlight}
                      onMouseEnter={() => canTapFlashlight && setHovered('flash')}
                      onMouseLeave={() => setHovered(null)}
                      className={[
                        'w-full rounded-2xl border-2 p-7 flex flex-col items-center transition-all',
                        canTapFlashlight ? 'hover:scale-[1.02]' : 'opacity-50 cursor-not-allowed',
                        flashOn ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-gray-200',
                        step === 1 ? 'ring-4 ring-blue-200' : '',
                      ].join(' ')}
                      onClick={() => {
                        if (!canTapFlashlight) return;
                        setFlashOn((v) => !v);
                        setShowFlashHint(false);
                        if (step <= 1) setStep(2);
                      }}
                    >
                      <Lightbulb className={`w-14 h-14 mb-3 ${flashOn ? 'text-yellow-500' : 'text-gray-400'}`} />
                      <span className="text-xl font-semibold">{t.flashlight}</span>
                      <span className="text-lg text-gray-600 mt-1">{flashOn ? 'ON' : 'OFF'}</span>
                    </button>
                  </div>

                  {/* WIFI */}
                  <div className="relative">
                    {(step === 2 && (showWifiHint || hovered === 'wifi')) && (
                      <div
  className="absolute top12 left-1/2 -translate-x-1/2 z-[999] px-6 py-2 rounded-xl
             text-white text-base md:text-lg font-semibold shadow-lg pointer-events-none"
  style={{ background: '#2563eb', animation: 'softPulse 1.2s ease-in-out infinite' }}
>
  Click here
</div>
                    )}

                    <button
                      disabled={!canTapWifi}
                      onMouseEnter={() => canTapWifi && setHovered('wifi')}
                      onMouseLeave={() => setHovered(null)}
                      className={[
                        'w-full rounded-2xl border-2 p-7 flex flex-col items-center transition-all',
                        canTapWifi ? 'hover:scale-[1.02]' : 'opacity-50 cursor-not-allowed',
                        wifiOn ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200',
                        step === 2 ? 'ring-4 ring-blue-200' : '',
                      ].join(' ')}
                      onClick={() => {
                        if (!canTapWifi) return;
                        setWifiOn((v) => !v);
                        setShowWifiHint(false);
                        if (step <= 2) setStep(3);
                      }}
                    >
                      <Wifi className={`w-14 h-14 mb-3 ${wifiOn ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="text-xl font-semibold">{t.wifi}</span>
                      <span className="text-lg text-gray-600 mt-1">{wifiOn ? 'ON' : 'OFF'}</span>
                    </button>
                  </div>

                  {/* BRIGHTNESS */}
                  <div className="col-span-2 rounded-2xl border-2 border-gray-200 p-7 bg-white relative">
                    {step === 3 && showBrightHint && (
                      <div
                        className="absolute -top-12 left-1/2 px-6 py-2 rounded-xl text-white text-base md:text-lg font-semibold shadow-lg whitespace-nowrap"
                        style={{ background: '#2563eb', animation: 'softPulse 1.2s ease-in-out infinite' }}
                      >
                        Drag slowly →
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-4">
                      <Sun className="w-12 h-12 text-yellow-500" />
                      <div className="text-xl font-semibold">{t.brightness}</div>
                      <div className="ml-auto text-xl font-bold text-gray-800">{brightness}%</div>
                    </div>

                    <div className="relative">
                      <input
                        disabled={!canUseBrightness}
                        type="range"
                        min={10}
                        max={100}
                        value={brightness}
                        onChange={(e) => {
                          if (!canUseBrightness) return;
                          setBrightness(Number(e.target.value));
                          setShowBrightHint(false);
                          if (step <= 3) setStep(4);
                        }}
                        className="w-full appearance-none rounded-full"
                        style={{
                          height: '8px',
                          background: `linear-gradient(to right, #facc15 ${brightness}%, #e5e7eb ${brightness}%)`,
                        }}
                      />

                      {/* bubble */}
                      <div
                        className="absolute -top-14 transform -translate-x-1/2 bg-white border-2 px-4 py-2 rounded-2xl shadow text-lg font-bold"
                        style={{ left: `${brightness}%` }}
                      >
                        {brightness}%
                      </div>
                    </div>

                    {/* NEW: slow drag demo icon under slider (Version 3 request) */}
                    {step === 3 && showBrightHint && (
                      <div className="mt-6 flex items-center justify-center">
                        <div className="relative w-full max-w-sm h-14 rounded-2xl border bg-blue-50">
                          <div className="absolute left-1/2 top-1/2 -translate-y-1/2">
                            <Hand
                              className="w-10 h-10 text-blue-600"
                              style={{ animation: 'dragDemo 2.6s ease-in-out infinite' }}
                            />
                          </div>
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-800 font-semibold">
                            ←
                          </div>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-800 font-semibold">
                            →
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ===== BRIGHTNESS OVERLAY ABOVE EVERYTHING (does not block clicks) ===== */}
            <div
              className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
              style={{ backgroundColor: 'black', opacity: overlayOpacity }}
            />
          </div>

          {/* SINGLE PRIMARY BUTTON */}
          <button
            className="btn-primary w-full py-5 text-xl md:text-2xl font-semibold rounded-2xl"
            onClick={() => {
              if (!opened) {
                openControlCenter();
                return;
              }
              if (step >= 4) {
                onComplete();
                return;
              }
              setStep((s) => (s + 1) as Step);
            }}
          >
            {t.next}
          </button>
        </div>
      </div>
    </div>
  );
}