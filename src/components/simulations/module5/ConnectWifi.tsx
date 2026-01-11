import { useMemo, useState } from 'react';
import { module5Lesson2Texts } from '../../../data/lessonTexts_module5';
import { Wifi, Eye, EyeOff, Loader } from 'lucide-react';

type LessonProps = {
  onComplete: () => void;
  onBack?: () => void;
  language: 'en' | 'zh';
};

interface Network {
  ssid: string;
  signal: 0 | 1 | 2 | 3;
  secure: boolean;
}

export default function ConnectWifi({ onComplete, onBack, language }: LessonProps) {
  const t = module5Lesson2Texts[language];
  const totalSteps = 4;

  // ✅ Removed UM-Student5G, removed extra networks if you want it cleaner
  const networks: Network[] = [
    { ssid: 'Home_WiFi', signal: 3, secure: true },
    { ssid: 'ZusCoffee', signal: 1, secure: false },
    { ssid: 'FreeAirport', signal: 0, secure: false },
  ];

  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [selected, setSelected] = useState<Network | null>(null);
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [connecting, setConnecting] = useState(false);

  // Hints: only one "Click here" for Home_WiFi on step 0
  const [showHomeHint, setShowHomeHint] = useState(true);

  const canConnect = useMemo(() => {
    if (!selected) return false;
    if (!selected.secure) return true;
    return password.trim().length > 0;
  }, [selected, password]);

  const guideText = useMemo(() => {
    if (step === 0) return language === 'en' ? 'Tap your Wi-Fi network.' : '点击你的 Wi-Fi 网络。';
    if (step === 1) return language === 'en' ? 'Type your password, then tap Next.' : '输入密码，然后点击下一步。';
    if (step === 2) return language === 'en' ? 'Connecting…' : '正在连接…';
    return language === 'en' ? 'Connected!' : '已连接！';
  }, [step, language]);

  const wifiExplain = useMemo(() => {
    if (language === 'en') {
      return (
        <>
          <p className="font-bold text-xl md:text-2xl text-gray-900">What is Wi-Fi?</p>
          <p className="mt-2 text-lg md:text-xl text-gray-800 leading-relaxed">
            Wi-Fi is like invisible internet “air.” It lets your phone go online without using a cable.
          </p>
          <p className="mt-2 text-lg md:text-xl text-gray-800 leading-relaxed">
            You can use it at home, cafés, or airports to watch videos, read news, and message family.
          </p>
        </>
      );
    }
    return (
      <>
        <p className="font-bold text-xl md:text-2xl text-gray-900">什么是 Wi-Fi？</p>
        <p className="mt-2 text-lg md:text-xl text-gray-800 leading-relaxed">
          Wi-Fi 就像“看不见的网络空气”，让手机不用插线也能上网。
        </p>
        <p className="mt-2 text-lg md:text-xl text-gray-800 leading-relaxed">
          你可以在家、咖啡店、机场使用它来看片、看新闻、和家人聊天。
        </p>
      </>
    );
  }, [language]);

  const handleConnect = () => {
    if (!canConnect) return;
    setConnecting(true);
    setStep(2);
    setTimeout(() => {
      setConnecting(false);
      setStep(3);
    }, 1500);
  };

  const signalIcon = (signal: Network['signal']) => {
    const colors = ['text-gray-400', 'text-red-500', 'text-yellow-500', 'text-green-500'];
    return <Wifi className={`w-7 h-7 ${colors[signal]}`} />;
  };

  const goBackOnce = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <style>{`
          @keyframes softPulse {
            0%   { transform: translate(-50%, 0) scale(1); opacity: 1; }
            50%  { transform: translate(-50%, -2px) scale(1.03); opacity: 0.95; }
            100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
          }
        `}</style>

        <div className="card space-y-6 p-6 md:p-8">
          {/* GUIDE BAR */}
          <div className="flex items-start justify-between bg-blue-50 border-2 border-blue-300 rounded-2xl px-6 py-5">
            <p className="text-xl md:text-2xl font-semibold text-blue-900 leading-snug">
              <span className="font-bold">Guide:</span> <span className="font-medium">{guideText}</span>
            </p>
            <div className="ml-4 bg-blue-600 text-white rounded-full px-5 py-2 text-lg font-bold shrink-0">
              {step + 1}/{totalSteps}
            </div>
          </div>

          {/* SINGLE BACK BUTTON (no duplicates) */}
          <button
            onClick={goBackOnce}
            className="flex items-center gap-3 text-lg md:text-xl text-gray-700 hover:text-blue-700"
          >
            <span className="text-2xl md:text-3xl leading-none">←</span>
            <span>{t.back}</span>
          </button>

          <h2 className="text-3xl md:text-4xl font-bold">{t.title}</h2>

          {/* Step 0: BIG Wi-Fi explanation box */}
          {step === 0 && (
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
              {wifiExplain}
            </div>
          )}

          {/* STEP TEXT CARD (elder-friendly) */}
          {step !== 3 && (
            <div className="bg-gray-100 rounded-2xl p-5 md:p-6">
              <p className="text-lg md:text-xl">
                {step === 0 && t.step0}
                {step === 1 && t.step1}
                {step === 2 && t.step2}
              </p>
            </div>
          )}

          {/* STEP 0: choose network */}
          {step === 0 && (
            <div className="space-y-4">
              {networks.map((net) => {
                const isHome = net.ssid === 'Home_WiFi';
                return (
                  <div key={net.ssid} className="relative overflow-visible">
                    {isHome && showHomeHint && (
                      <div
                        className="absolute -top-2 left-1/2 z-[60] px-6 py-2 rounded-xl text-white text-base md:text-lg font-semibold shadow-lg whitespace-nowrap"
                        style={{ background: '#2563eb', animation: 'softPulse 1.1s ease-in-out infinite' }}
                      >
                        Click here
                      </div>
                    )}

                    <button
                      className={[
                        'w-full rounded-2xl border-2 px-5 py-4 flex items-center justify-between transition-all',
                        'hover:scale-[1.01]',
                        selected?.ssid === net.ssid ? 'ring-4 ring-blue-200 border-blue-300' : 'border-gray-200 bg-white',
                        isHome && showHomeHint ? 'ring-4 ring-blue-200 border-blue-300' : '',
                      ].join(' ')}
                      onClick={() => {
                        setSelected(net);
                        setStep(1);
                        setShowHomeHint(false);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        {signalIcon(net.signal)}
                        <div className="text-left">
                          <div className="text-xl md:text-2xl font-semibold">{net.ssid}</div>
                          <div className="text-sm md:text-base text-gray-500">
                            {net.secure
                              ? (language === 'en' ? 'Secure network' : '安全网络')
                              : (language === 'en' ? 'Open network' : '开放网络')}
                          </div>
                        </div>
                      </div>

                      {net.secure && <span className="text-sm md:text-base text-gray-500">🔒</span>}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 1: Password */}
          {step === 1 && selected && (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                {signalIcon(selected.signal)}
                <div>
                  <p className="text-2xl font-bold">{selected.ssid}</p>
                  {/* ✅ removed redundant practice sentence */}
                </div>
              </div>

              {selected.secure ? (
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    placeholder={language === 'en' ? 'Type your password' : '请输入你的密码'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-2xl px-5 py-5 pr-16 text-xl md:text-2xl focus:outline-none focus:ring-4 focus:ring-blue-200"
                  />

                  {/* ✅ removed “Type here” hint overlay */}

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-5 flex items-center text-gray-600"
                    onClick={() => setShowPwd((v) => !v)}
                    aria-label={language === 'en' ? 'Show password' : '显示密码'}
                  >
                    {showPwd ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
                  </button>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-2xl p-5 text-lg">
                  {language === 'en' ? 'No password needed for this network.' : '此网络不需要密码。'}
                </div>
              )}

              {/* ✅ removed the bottom Back button (only top Back remains) */}
              <button
                className={[
                  'btn-primary w-full py-5 text-xl md:text-2xl rounded-2xl',
                  !canConnect || connecting ? 'opacity-50 cursor-not-allowed' : '',
                ].join(' ')}
                onClick={handleConnect}
                disabled={!canConnect || connecting}
              >
                {connecting ? <Loader className="w-7 h-7 animate-spin inline-block" /> : t.next}
              </button>
            </div>
          )}

          {/* STEP 2: connecting */}
          {step === 2 && (
            <div className="flex flex-col items-center space-y-4 py-8">
              <Loader className="w-12 h-12 animate-spin text-blue-500" />
              <p className="text-xl md:text-2xl text-blue-700 font-semibold">{t.step2}</p>
            </div>
          )}

          {/* STEP 3: success */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 text-green-800 text-lg md:text-xl">
                {t.success}
              </div>
              <button className="btn-primary w-full py-5 text-xl md:text-2xl rounded-2xl" onClick={onComplete}>
                {t.next}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}