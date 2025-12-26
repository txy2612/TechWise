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

  // ✅ CHANGE: Wi-Fi starts OFF (so user clicks to turn it ON)
  const [wifiOn, setWifiOn] = useState(false);

  const [brightness, setBrightness] = useState(85);

  // swipe tracking (TOP ONLY)
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragAllowed, setDragAllowed] = useState(false);

  // hints
  const [showFlashHint, setShowFlashHint] = useState(true);
  const [showWifiHint, setShowWifiHint] = useState(true);
  const [showBrightHint, setShowBrightHint] = useState(true);

  // hover overlay target (desktop)
  const [hovered, setHovered] = useState<HoverTarget>(null);

  // wifi tap feedback pulse
  const [wifiPulse, setWifiPulse] = useState(false);

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

  const guideLine = useMemo(() => {
    if (step === 1) return language === 'en' ? 'Tap this icon to turn on Flashlight.' : '点击此图标开启手电筒。';
    if (step === 2) return language === 'en' ? 'Tap this icon to turn Wi-Fi on.' : '点击此图标开启 Wi-Fi。';
    if (step === 3) return language === 'en' ? 'Drag the slider to change brightness.' : '拖动滑块调整屏幕亮度。';
    return stepText;
  }, [step, stepText, language]);

  const canTapFlashlight = opened && step >= 1;
  const canTapWifi = opened && step >= 2;
  const canUseBrightness = opened && step >= 3;

  // Swipe must start from TOP only
  const TOP_SWIPE_ZONE_PX = 90;
  const OPEN_THRESHOLD_PX = 140;

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const yInside = e.clientY - rect.top;

    if (!opened && yInside <= TOP_SWIPE_ZONE_PX) {
      setDragAllowed(true);
      setDragStartY(e.clientY);
    } else {
      setDragAllowed(false);
      setDragStartY(null);
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragStartY != null && dragAllowed) {
      const deltaY = e.clientY - dragStartY;
      if (!opened && deltaY > OPEN_THRESHOLD_PX) {
        setOpened(true);
        if (step === 0) setStep(1);
      }
    }
    setDragStartY(null);
    setDragAllowed(false);
  };

  const openControlCenter = () => {
    if (!opened) setOpened(true);
    if (step === 0) setStep(1);
  };

  useEffect(() => {
    if (step !== 1) setShowFlashHint(true);
    if (step !== 2) setShowWifiHint(true);
    if (step !== 3) setShowBrightHint(true);
    setHovered(null);
  }, [step]);

  const triggerWifiPulse = () => {
    setWifiPulse(true);
    window.setTimeout(() => setWifiPulse(false), 450);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <style>{`
          @keyframes dragDemo {
            0%   { transform: translateX(-22px); opacity: 0.9; }
            50%  { transform: translateX(22px);  opacity: 1; }
            100% { transform: translateX(-22px); opacity: 0.9; }
          }
          @keyframes swipeDownBig {
            0%   { transform: translateY(0); opacity: 0.95; }
            45%  { transform: translateY(120px); opacity: 1; }
            100% { transform: translateY(0); opacity: 0.95; }
          }
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
          @keyframes softPulse {
            0%   { transform: translateY(0) scale(1); opacity: 1; }
            50%  { transform: translateY(-2px) scale(1.04); opacity: 0.96; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
          }
          @keyframes tapPulse {
            0% { box-shadow: 0 0 0 0 rgba(29,78,216,0.45); }
            70% { box-shadow: 0 0 0 14px rgba(29,78,216,0); }
            100% { box-shadow: 0 0 0 0 rgba(29,78,216,0); }
          }
        `}</style>

        <div className="card space-y-6 p-6 md:p-8">
          <div className="flex items-start justify-between bg-blue-50 border-2 border-blue-300 rounded-2xl px-6 py-5">
            <p className="text-xl md:text-2xl font-semibold text-blue-900 leading-snug">
              <span className="font-bold">Guide:</span> <span className="font-medium">{guideLine}</span>
            </p>
            <div className="ml-4 bg-blue-600 text-white rounded-full px-5 py-2 text-lg font-bold shrink-0">
              {step + 1}/{totalSteps}
            </div>
          </div>

          <button
            onClick={onBack ?? (() => window.history.back())}
            className="flex items-center gap-3 text-lg md:text-xl text-gray-700 hover:text-blue-700"
          >
            <span className="text-2xl md:text-3xl leading-none">←</span>
            <span>{t.back}</span>
          </button>

          <h2 className="text-3xl md:text-4xl font-bold">{t.title}</h2>

          <div
            className="relative rounded-[36px] border-2 bg-white shadow-xl overflow-hidden"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            {!opened && (
              <div className="absolute top-0 left-0 right-0 h-[90px] z-30 pointer-events-none">
                <div className="mx-auto mt-3 w-28 h-2 rounded-full bg-gray-300/80" />
                <div className="mt-2 text-center text-sm font-semibold text-gray-600">
                  {language === 'en' ? 'Swipe down from the top' : '从顶部向下滑动'}
                </div>

                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <Hand className="w-12 h-12 text-gray-500" style={{ animation: 'swipeDownBig 1.8s ease-in-out infinite' }} />
                  <ArrowDown className="mt-1 w-7 h-7 text-gray-600" style={{ animation: 'swipeDownBig 1.8s ease-in-out infinite' }} />
                </div>
              </div>
            )}

            <div className="relative z-10 p-8">
              {!opened && step === 0 && (
                <div className="relative rounded-[28px] overflow-hidden border bg-gradient-to-br from-sky-100 via-indigo-100 to-rose-100 p-6">
                  <div className="flex items-center justify-between text-gray-700 font-semibold">
                    <span>9:41</span>
                    <span className="text-sm">LTE ▮▮</span>
                  </div>

                  <div className="mt-14 grid grid-cols-4 gap-6">
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
                </div>
              )}

              {opened && (
                <div className="grid grid-cols-2 gap-6">
                  {/* FLASHLIGHT */}
                  <div className="relative">
                    {(step === 1 && (showFlashHint || hovered === 'flash')) && (
                      <div className="absolute -top-3 left-3 z-[999] pointer-events-none">
                        <div
                          className="px-4 py-2 rounded-xl text-white text-base md:text-lg font-semibold shadow-lg"
                          style={{ background: '#2563eb', animation: 'softPulse 1.2s ease-in-out infinite' }}
                        >
                          Click here
                        </div>
                        <div className="pl-2 pt-1">
                          <ArrowDown className="w-5 h-5 text-blue-700" />
                        </div>
                      </div>
                    )}

                    <button
                      disabled={!canTapFlashlight}
                      onMouseEnter={() => canTapFlashlight && setHovered('flash')}
                      onMouseLeave={() => setHovered(null)}
                      className={[
                        'w-full rounded-2xl border-2 p-7 flex flex-col items-center transition-all',
                        canTapFlashlight ? 'hover:scale-[1.02]' : 'opacity-50 cursor-not-allowed',
                        flashOn ? 'bg-yellow-50 border-yellow-400' : 'bg-white border-gray-200',
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
                      <span className="text-lg text-gray-700 mt-1">{flashOn ? 'ON' : 'OFF'}</span>
                    </button>
                  </div>

                  {/* WIFI */}
                  <div className="relative">
                    {(step === 2 && (showWifiHint || hovered === 'wifi')) && (
                      <div className="absolute -top-3 right-3 z-[999] pointer-events-none text-right">
                        <div
                          className="inline-block px-4 py-2 rounded-xl text-white text-base md:text-lg font-semibold shadow-lg"
                          style={{ background: '#2563eb', animation: 'softPulse 1.2s ease-in-out infinite' }}
                        >
                          Click here
                        </div>
                        <div className="flex justify-end pt-1 pr-2">
                          <ArrowDown className="w-5 h-5 text-blue-700" />
                        </div>
                      </div>
                    )}

                    <button
                      disabled={!canTapWifi}
                      onMouseEnter={() => canTapWifi && setHovered('wifi')}
                      onMouseLeave={() => setHovered(null)}
                      className={[
                        'w-full rounded-2xl border-2 p-7 flex flex-col items-center transition-all',
                        canTapWifi ? 'hover:scale-[1.02] active:scale-[0.99]' : 'opacity-50 cursor-not-allowed',
                        // ✅ clearer ON vs OFF
                        wifiOn ? 'bg-blue-200 border-blue-700' : 'bg-white border-gray-200',
                        step === 2 ? 'ring-4 ring-blue-300' : '',
                      ].join(' ')}
                      style={
                        wifiPulse
                          ? { animation: 'tapPulse 0.45s ease-out', transform: 'scale(1.03)' }
                          : undefined
                      }
                      onClick={() => {
                        if (!canTapWifi) return;

                        // ✅ logic: user turns Wi-Fi ON (initially OFF)
                        triggerWifiPulse();
                        setWifiOn(true);

                        setShowWifiHint(false);
                        if (step <= 2) setStep(3);
                      }}
                    >
                      <div className="relative z-10 flex flex-col items-center">
                        <Wifi className={`w-14 h-14 mb-3 ${wifiOn ? 'text-blue-900' : 'text-gray-400'}`} />
                        <span className="text-xl font-bold text-gray-900">{t.wifi}</span>
                        <span
                          className="text-lg mt-1 font-semibold"
                          style={{ color: wifiOn ? '#1d4ed8' : '#6b7280' }}
                        >
                          {wifiOn ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* BRIGHTNESS */}
                  <div className="col-span-2 rounded-2xl border-2 border-gray-200 p-7 bg-white relative">
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

                      <div
                        className="absolute -top-14 transform -translate-x-1/2 bg-white border-2 px-4 py-2 rounded-2xl shadow text-lg font-bold"
                        style={{ left: `${brightness}%` }}
                      >
                        {brightness}%
                      </div>

                      {step === 3 && showBrightHint && (
                        <>
                          <div className="mt-4 flex items-center justify-center pointer-events-none">
                            <Hand className="w-12 h-12 text-gray-500" style={{ animation: 'dragDemo 2.4s ease-in-out infinite' }} />
                          </div>
                          <div className="mt-4 flex justify-center">
                            <span
                              className="inline-block px-5 py-2 rounded-xl text-white text-base md:text-lg font-semibold shadow-lg"
                              style={{ background: '#2563eb', animation: 'softPulse 1.2s ease-in-out infinite' }}
                            >
                              {language === 'en' ? 'Drag slowly →' : '慢慢拖动 →'}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
              style={{ backgroundColor: 'black', opacity: overlayOpacity }}
            />
          </div>

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