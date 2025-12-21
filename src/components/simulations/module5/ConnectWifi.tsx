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
  signal: 0 | 1 | 2 | 3; // 0=weak,3=strong
  secure: boolean;
}

export default function ConnectWifi({ onComplete, onBack, language }: LessonProps) {
  const t = module5Lesson2Texts[language];

  // Sample networks
  const networks: Network[] = [
    { ssid: 'Home_WiFi',   signal: 3, secure: true },
    { ssid: 'UM-Student5G',  signal: 2, secure: true },
    { ssid: 'ZusCoffee',  signal: 1, secure: false },
    { ssid: 'FreeAirport', signal: 0, secure: false },
  ];

  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [selected, setSelected] = useState<Network | null>(null);
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [connecting, setConnecting] = useState(false);

  // Learners can connect as soon as a network is chosen:
  // for secure networks, they only need to *enter something*, no length requirement
  const canConnect = useMemo(() => {
    if (!selected) return false;
    if (!selected.secure) return true;
    return password.trim().length > 0; // any input is accepted
  }, [selected, password]);

  const handleConnect = async () => {
    if (!canConnect) return;
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setStep(3);
    }, 1500);
  };

  const signalIcon = (signal: Network['signal']) => {
    const colors = ['text-gray-400', 'text-red-500', 'text-yellow-500', 'text-green-500'];
    return <Wifi className={`w-6 h-6 ${colors[signal]}`} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-lg">
        <div className="card">
          {/* Banner */}
          <div className="mb-4 text-sm font-semibold text-blue-700 bg-blue-50 border rounded-xl px-4 py-2">
            {t.practiceMode}
          </div>

          <h2 className="text-2xl font-bold mb-4">{t.title}</h2>

          {/* Step indicator text */}
          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <p className="text-base">
              {step === 0 && t.step0}
              {step === 1 && t.step1}
              {step === 2 && t.step2}
              {step === 3 && t.success}
            </p>
          </div>

          {/* Step 0: choose a network */}
          {step === 0 && (
            <div className="space-y-3">
              {networks.map((net) => (
                <button
                  key={net.ssid}
                  className={`w-full rounded-xl border p-3 flex items-center justify-between hover:scale-[1.02] transition-transform ${
                    selected?.ssid === net.ssid ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => {
                    setSelected(net);
                    setStep(1);
                  }}
                >
                  <div className="flex items-center gap-3">
                    {signalIcon(net.signal)}
                    <span className="font-medium">{net.ssid}</span>
                  </div>
                  {net.secure && <span className="text-xs text-gray-500">🔒</span>}
                </button>
              ))}
            </div>
          )}

          {/* Step 1: enter password (or skip if open network) */}
          {step === 1 && selected && (
            <div className="space-y-4">
              {selected.secure ? (
                <>
                  <div className="flex items-center gap-3">
                    {signalIcon(selected.signal)}
                    <div>
                      <p className="font-medium">{selected.ssid}</p>
                      <p className="text-xs text-gray-500">{t.step1}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type={showPwd ? 'text' : 'password'}
                      placeholder={t.passwordPlaceholder}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border rounded-lg px-4 py-3 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                      onClick={() => setShowPwd((v) => !v)}
                    >
                      {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className="btn-secondary flex-1 hover:scale-105 transition-transform"
                      onClick={() => {
                        setSelected(null);
                        setPassword('');
                        setStep(0);
                      }}
                    >
                      {t.back}
                    </button>

                    <button
                      className={`flex-1 btn-primary hover:scale-105 transition-transform ${
                        !canConnect || connecting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={handleConnect}
                    >
                      {connecting ? <Loader className="w-5 h-5 animate-spin" /> : t.next}
                    </button>
                  </div>
                </>
              ) : (
                // Open network: no password required
                <>
                  <div className="flex items-center gap-3">
                    {signalIcon(selected.signal)}
                    <div>
                      <p className="font-medium">{selected.ssid}</p>
                      <p className="text-xs text-gray-500">{t.step1}</p>
                    </div>
                  </div>

                    <div className="flex gap-3">
                    <button
                      className="btn-secondary flex-1 hover:scale-105 transition-transform"
                      onClick={() => {
                        setSelected(null);
                        setPassword('');
                        setStep(0);
                      }}
                    >
                      {t.back}
                    </button>

                    <button
                      className={`flex-1 btn-primary hover:scale-105 transition-transform ${
                        connecting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={handleConnect}
                    >
                      {connecting ? <Loader className="w-5 h-5 animate-spin" /> : t.next}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 2: connecting... */}
          {step === 2 && connecting && (
            <div className="flex flex-col items-center space-y-4">
              <Loader className="w-10 h-10 animate-spin text-blue-500" />
              <p className="text-blue-600">{t.step2}</p>
            </div>
          )}

          {/* Step 3: connected */}
          {step === 3 && !connecting && (
            <>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-green-800">
                {t.success}
              </div>
              <button
                className="btn-primary w-full py-3 hover:scale-105 transition-transform"
                onClick={onComplete}
              >
                {t.next}
              </button>
            </>
          )}

          {/* Back button for all steps except final success */}
          {step !== 0 && step !== 3 && (
            <button
              onClick={onBack ?? (() => window.history.back())}
              className="btn-secondary w-full py-3 mt-6"
            >
              {t.back}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}