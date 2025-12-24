import { useEffect, useMemo, useState } from 'react';
import type { PointerEvent } from 'react';
import { module5Lesson1Texts } from '../../../data/lessonTexts_module5';
import { Lightbulb, Wifi, Sun, Hand } from 'lucide-react';

type LessonProps = {
  onComplete: () => void;
  onBack?: () => void;
  language: 'en' | 'zh';
};

type Step = 0 | 1 | 2 | 3 | 4;

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

  // show hints until user interacts
  const [showFlashHint, setShowFlashHint] = useState(true);
  const [showWifiHint, setShowWifiHint] = useState(true);
  const [showBrightHint, setShowBrightHint] = useState(true);

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
      if (!opened && deltaY > 50) {
        setOpened(true);
        if (step === 0) setStep(1);
      }
    }
    setDragStartY(null);
  };

  // optional: if user taps Next at step0, open anyway
  const openControlCenter = () => {
    if (!opened) setOpened(true);
    if (step === 0) setStep(1);
  };

  // when user interacts, hide the hint for that control
  useEffect(() => {
    if (step !== 1) setShowFlashHint(true);
    if (step !== 2) setShowWifiHint(true);
    if (step !== 3) setShowBrightHint(true);
  }, [step]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Local styles for slider thumb + smooth hint pulse + home screen icons */}
        <style>{`
          /* Make range thumb larger (Chrome/Safari/Edge) */
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 28px;
            height: 28px;
            border-radius: 9999px;
            background: #1d4ed8;
            border: 4px solid #ffffff;
            box-shadow: 0 6px 16px rgba(0,0,0,0.18);
            cursor: pointer;
            margin-top: -12px; /* aligns thumb with 4px track */
          }
          input[type="range"]::-webkit-slider-runnable-track {
            height: 8px;
            border-radius: 9999px;
          }

          /* Firefox */
          input[type="range"]::-moz-range-thumb {
            width: 28px;
            height: 28px;
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

          /* Smooth pulse (not flicker) for hint boxes */
          @keyframes softPulse {
            0%   { transform: translate(-50%, 0) scale(1);   opacity: 1; }
            50%  { transform: translate(-50%, -2px) scale(1.03); opacity: 0.95; }
            100% { transform: translate(-50%, 0) scale(1);   opacity: 1; }
          }

          /* Home screen: app icon bounce (subtle) */
          @keyframes iconFloat {
            0% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
            100% { transform: translateY(0); }
          }
        `}</style>

        <div className="card space-y-6 p-6 md:p-8">
          {/* GUIDE BAR (allow 2 lines) */}
          <div className="flex items-start justify-between bg-blue-50 border-2 border-blue-300 rounded-2xl px-6 py-5">
            <p className="text-xl md:text-2xl font-semibold text-blue-900 leading-snug">
              <span className="font-bold">Guide:</span> <span className="font-medium">{stepText}</span>
            </p>
            <div className="ml-4 bg-blue-600 text-white rounded-full px-5 py-2 text-lg font-bold shrink-0">
              {step + 1}/{totalSteps}
            </div>
          </div>

          {/* BACK ARROW ONLY */}
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
              {/* CLOSED STATE: HOME SCREEN (Step 0) */}
              {!opened && step === 0 && (
                <div className="relative">
                  {/* wallpaper */}
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-sky-200 via-indigo-100 to-pink-100" />

                  {/* status bar */}
                  <div className="relative z-10 flex items-center justify-between px-2 pt-1 text-sm text-gray-700">
                    <span className="font-semibold">9:41</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">LTE</span>
                      <span className="inline-block w-5 h-2 rounded-full border border-gray-500 relative overflow-hidden">
                        <span className="absolute right-0 top-0 h-full w-3 bg-gray-700" />
                      </span>
                    </div>
                  </div>

                  {/* app grid */}
                  <div className="relative z-10 mt-6 grid grid-cols-4 gap-5 px-4 pb-24">
                    {[
                      { name: language === 'en' ? 'Gallery' : '相册', bg: 'bg-rose-500' },
                      { name: language === 'en' ? 'Settings' : '设置', bg: 'bg-gray-700' },
                      { name: language === 'en' ? 'Calendar' : '日历', bg: 'bg-red-500' },
                      { name: language === 'en' ? 'Camera' : '相机', bg: 'bg-zinc-900' },
                      { name: language === 'en' ? 'Phone' : '电话', bg: 'bg-green-600' },
                      { name: language === 'en' ? 'Messages' : '信息', bg: 'bg-emerald-500' },
                      { name: language === 'en' ? 'Maps' : '地图', bg: 'bg-blue-600' },
                      { name: language === 'en' ? 'Clock' : '时钟', bg: 'bg-indigo-600' },
                    ].map((app, i) => (
                      <div
                        key={app.name}
                        className="flex flex-col items-center gap-2 select-none"
                        style={{ animation: `iconFloat 3.2s ease-in-out ${i * 0.08}s infinite` }}
                      >
                        <div className={`w-14 h-14 rounded-2xl ${app.bg} shadow-md`} />
                        <div className="text-xs font-medium text-gray-800">{app.name}</div>
                      </div>
                    ))}
                  </div>

                  {/* dock */}
                  <div className="absolute left-4 right-4 bottom-4 z-10 rounded-3xl bg-white/60 backdrop-blur border border-white/60 px-6 py-4">
                    <div className="grid grid-cols-4 gap-6">
                      {[
                        { bg: 'bg-green-600', label: language === 'en' ? 'Phone' : '电话' },
                        { bg: 'bg-emerald-500', label: language === 'en' ? 'Chat' : '信息' },
                        { bg: 'bg-blue-600', label: language === 'en' ? 'Browser' : '浏览器' },
                        { bg: 'bg-purple-600', label: language === 'en' ? 'Music' : '音乐' },
                      ].map((d) => (
                        <div key={d.label} className="flex flex-col items-center gap-2">
                          <div className={`w-14 h-14 rounded-2xl ${d.bg} shadow-md`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* swipe hint overlay */}
                  <Hand className="absolute top-16 left-[45%] w-14 h-14 text-gray-500 animate-bounce z-20" />
                  <div className="absolute top-40 left-1/2 -translate-x-1/2 -translate-y-1/4 z-20 bg-white/80 backdrop-blur border border-white/70 rounded-2xl px-6 py-3 shadow-lg">
                    <p className="text-lg md:text-xl text-gray-800 font-semibold text-center">
                      {language === 'en' ? 'Swipe down to open Control Center' : '向下滑动打开控制中心'}
                    </p>
                  </div>

                
                </div>
              )}

              {/* OPENED STATE: CONTROL CENTER */}
              {opened && (
                <div className="grid grid-cols-2 gap-6">
                  {/* FLASHLIGHT */}
                  <div className="relative">
                    {step === 1 && showFlashHint && (
                      <div
                        className="absolute -top-2 left-1/2 px-6 py-2 rounded-xl text-white text-base md:text-lg font-semibold shadow-lg"
                        style={{
                          background: '#2563eb',
                          animation: 'softPulse 1.1s ease-in-out infinite',
                        }}
                      >
                        Click here
                      </div>
                    )}

                    <button
                      disabled={!canTapFlashlight}
                      className={[
                        "w-full rounded-2xl border-2 p-7 flex flex-col items-center transition-all",
                        canTapFlashlight ? "hover:scale-[1.02]" : "opacity-50 cursor-not-allowed",
                        flashOn ? "bg-yellow-50 border-yellow-300" : "bg-white border-gray-200",
                        step === 1 && showFlashHint ? "ring-4 ring-blue-200" : ""
                      ].join(" ")}
                      onClick={() => {
                        if (!canTapFlashlight) return;
                        setFlashOn(v => !v);
                        setShowFlashHint(false);
                        if (step <= 1) setStep(2);
                      }}
                    >
                      <Lightbulb className={`w-14 h-14 mb-3 ${flashOn ? "text-yellow-500" : "text-gray-400"}`} />
                      <span className="text-xl font-semibold">{t.flashlight}</span>
                      <span className="text-lg text-gray-600 mt-1">{flashOn ? "ON" : "OFF"}</span>
                    </button>
                  </div>

                  {/* WIFI */}
                  <div className="relative">
                    {step === 2 && showWifiHint && (
                      <div
                        className="absolute -top-2 left-1/2 px-6 py-2 rounded-xl text-white text-base md:text-lg font-semibold shadow-lg"
                        style={{
                          background: '#2563eb',
                          animation: 'softPulse 1.1s ease-in-out infinite',
                        }}
                      >
                        Click here
                      </div>
                    )}

                    <button
                      disabled={!canTapWifi}
                      className={[
                        "w-full rounded-2xl border-2 p-7 flex flex-col items-center transition-all",
                        canTapWifi ? "hover:scale-[1.02]" : "opacity-50 cursor-not-allowed",
                        wifiOn ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200",
                        step === 2 && showWifiHint ? "ring-4 ring-blue-200" : ""
                      ].join(" ")}
                      onClick={() => {
                        if (!canTapWifi) return;
                        setWifiOn(v => !v);
                        setShowWifiHint(false);
                        if (step <= 2) setStep(3);
                      }}
                    >
                      <Wifi className={`w-14 h-14 mb-3 ${wifiOn ? "text-blue-600" : "text-gray-400"}`} />
                      <span className="text-xl font-semibold">{t.wifi}</span>
                      <span className="text-lg text-gray-600 mt-1">{wifiOn ? "ON" : "OFF"}</span>
                    </button>
                  </div>

                  {/* BRIGHTNESS */}
                  <div className="col-span-2 rounded-2xl border-2 border-gray-200 p-7 bg-white relative">
                    {step === 3 && showBrightHint && (
                      <div
                        className="absolute -top-12 left-1/2 px-6 py-2 rounded-xl text-white text-base md:text-lg font-semibold shadow-lg whitespace-nowrap"
                        style={{
                          background: '#2563eb',
                          animation: 'softPulse 1.1s ease-in-out infinite',
                        }}
                      >
                        Drag to the right →
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
                  </div>
                </div>
              )}

              {/* If closed but step moved (edge case), show simple message */}
              {!opened && step !== 0 && (
                <div className="text-center py-14">
                  <p className="text-xl md:text-2xl font-medium text-gray-900">
                    {language === 'en' ? 'Swipe down to open Control Center.' : '向下滑动打开控制中心。'}
                  </p>
                </div>
              )}
            </div>

            {/* ===== BRIGHTNESS OVERLAY ABOVE EVERYTHING (does not block clicks) ===== */}
            <div
              className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
              style={{
                backgroundColor: 'black',
                opacity: overlayOpacity,
              }}
            />
          </div>

          {/* SINGLE PRIMARY BUTTON */}
          <button
            className="btn-primary w-full py-5 text-xl md:text-2xl font-semibold rounded-2xl"
            onClick={() => {
              // step0: open first
              if (!opened) {
                openControlCenter();
                return;
              }

              // finished
              if (step >= 4) {
                onComplete();
                return;
              }

              // advance
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