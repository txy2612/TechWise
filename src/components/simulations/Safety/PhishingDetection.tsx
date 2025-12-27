import { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';

interface PhishingDetectionProps {
  onComplete: () => void;
  language: 'en' | 'zh';
}

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  isPhishing: boolean;
  redFlags: string[];
}

export const PhishingDetection: React.FC<PhishingDetectionProps> = ({ onComplete, language }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const t = language === 'en' ? {
    title: 'Spot the Phishing Email',
    practiceMode: '⚠️ Practice Mode - Safe Simulation',
    instruction: 'Which email looks suspicious? Tap the one you think is a phishing attempt.',
    round: 'Round',
    of: 'of',
    score: 'Score',
    correct: 'Correct! Well spotted!',
    incorrect: 'Not quite. Let me explain...',
    redFlags: 'Red Flags:',
    next: 'Next Round',
    finish: 'See Results',
    finalScore: 'Final Score',
    congrats: 'Excellent work! You can spot phishing emails!',
    needsPractice: 'Good try! Remember to look for these red flags',
    continue: 'Continue',
    // Emails
    email1From: 'notifications@amazon.com',
    email1Subject: 'Your package has been delivered',
    email1Preview: 'Hi there! Your Amazon package #12345 has been delivered to your door.',
    email2From: 'urgent-action@amaz0n-security.com',
    email2Subject: 'URGENT: Verify your account NOW',
    email2Preview: 'Your account will be closed! Click here immediately to verify your payment info.',
    email3From: 'sarah.johnson@company.com',
    email3Subject: 'Meeting tomorrow at 2pm',
    email3Preview: 'Hi! Just confirming our meeting tomorrow at 2pm in the conference room.',
    email4From: 'no-reply@paypaI-secure.com',
    email4Subject: 'Unusual activity detected',
    email4Preview: 'We detected suspicious activity. Click to verify or your account will be suspended.',
    email5From: 'support@netflix.com',
    email5Subject: 'Your Netflix subscription',
    email5Preview: 'Thanks for being a member! Your next billing date is March 15th.',
    email6From: 'winner@prize-claim.net',
    email6Subject: 'You won $10,000!!!',
    email6Preview: 'Congratulations! You have been selected to win $10,000. Click to claim your prize now!',
    // Red flags
    flag1: 'Misspelled domain name (amaz0n instead of amazon)',
    flag2: 'Creates urgent panic ("NOW", "immediately")',
    flag3: 'Asks for sensitive information',
    flag4: 'Too good to be true (surprise prize)',
    flag5: 'Suspicious sender address',
    flag6: 'Strange character (PayPaI with capital I)',
  } : {
    title: '识别钓鱼电子邮件',
    practiceMode: '⚠️ 练习模式 - 安全模拟',
    instruction: '哪封电子邮件看起来可疑？点击您认为是钓鱼尝试的那封。',
    round: '回合',
    of: '/',
    score: '分数',
    correct: '正确！发现得好！',
    incorrect: '不太对。让我解释一下...',
    redFlags: '危险信号：',
    next: '下一回合',
    finish: '查看结果',
    finalScore: '最终分数',
    congrats: '干得好！您可以识别钓鱼电子邮件！',
    needsPractice: '不错的尝试！记住要注意这些危险信号',
    continue: '继续',
    // Emails
    email1From: 'notifications@amazon.com',
    email1Subject: '您的包裹已送达',
    email1Preview: '您好！您的亚马逊包裹 #12345 已送达您的门口。',
    email2From: 'urgent-action@amaz0n-security.com',
    email2Subject: '紧急：立即验证您的账户',
    email2Preview: '您的账户将被关闭！立即点击此处验证您的付款信息。',
    email3From: 'sarah.johnson@company.com',
    email3Subject: '明天下午2点的会议',
    email3Preview: '嗨！只是确认我们明天下午2点在会议室的会议。',
    email4From: 'no-reply@paypaI-secure.com',
    email4Subject: '检测到异常活动',
    email4Preview: '我们检测到可疑活动。点击验证，否则您的账户将被暂停。',
    email5From: 'support@netflix.com',
    email5Subject: '您的 Netflix 订阅',
    email5Preview: '感谢您成为会员！您的下一个账单日期是3月15日。',
    email6From: 'winner@prize-claim.net',
    email6Subject: '您赢得了10,000美元!!!',
    email6Preview: '恭喜！您已被选中赢得10,000美元。立即点击领取您的奖品！',
    // Red flags
    flag1: '域名拼写错误（amaz0n 而不是 amazon）',
    flag2: '制造紧急恐慌（"立即"、"马上"）',
    flag3: '要求提供敏感信息',
    flag4: '好得令人难以置信（意外奖品）',
    flag5: '可疑的发件人地址',
    flag6: '奇怪的字符（PayPaI 用大写 I）',
  };

  // 3 rounds of emails
  const rounds: Email[][] = [
    // Round 1: Easy
    [
      {
        id: 'safe1',
        from: t.email1From,
        subject: t.email1Subject,
        preview: t.email1Preview,
        isPhishing: false,
        redFlags: [],
      },
      {
        id: 'phishing1',
        from: t.email2From,
        subject: t.email2Subject,
        preview: t.email2Preview,
        isPhishing: true,
        redFlags: [t.flag1, t.flag2, t.flag3],
      },
    ],
    // Round 2: Medium
    [
      {
        id: 'safe2',
        from: t.email3From,
        subject: t.email3Subject,
        preview: t.email3Preview,
        isPhishing: false,
        redFlags: [],
      },
      {
        id: 'phishing2',
        from: t.email4From,
        subject: t.email4Subject,
        preview: t.email4Preview,
        isPhishing: true,
        redFlags: [t.flag6, t.flag2, t.flag3],
      },
    ],
    // Round 3: Hard
    [
      {
        id: 'safe3',
        from: t.email5From,
        subject: t.email5Subject,
        preview: t.email5Preview,
        isPhishing: false,
        redFlags: [],
      },
      {
        id: 'phishing3',
        from: t.email6From,
        subject: t.email6Subject,
        preview: t.email6Preview,
        isPhishing: true,
        redFlags: [t.flag4, t.flag5],
      },
    ],
  ];

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email.id);
    setShowFeedback(true);

    if (email.isPhishing) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentRound < rounds.length - 1) {
      setCurrentRound(currentRound + 1);
      setSelectedEmail(null);
      setShowFeedback(false);
    } else {
      setGameComplete(true);
    }
  };

  const currentEmails = rounds[currentRound];
  const selectedEmailData = currentEmails.find((e) => e.id === selectedEmail);

  if (gameComplete) {
    const percentage = (score / rounds.length) * 100;
    const passed = percentage >= 66; // 2 out of 3

    return (
      <div className="max-w-3xl mx-auto">
        {/* Practice Banner */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-5 py-3 rounded-xl mb-5 text-center shadow-md">
          <p className="text-xl font-bold">{t.practiceMode}</p>
        </div>

        {/* Results */}
        <div className="card p-10 text-center shadow-xl">
          <Shield className={`w-28 h-28 mx-auto mb-6 ${passed ? 'text-green-500' : 'text-orange-500'}`} />

          <h2 className="text-4xl font-extrabold text-gray-900 mb-5">
            {t.finalScore}
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 mb-6">
            <div className="text-7xl font-black text-blue-600 mb-3">
              {score}/{rounds.length}
            </div>
            <p className="text-2xl text-gray-700 font-medium">
              {Math.round(percentage)}%
            </p>
          </div>

          <div className={`p-6 rounded-2xl mb-6 ${passed ? 'bg-green-50' : 'bg-orange-50'}`}>
            <p className="text-xl font-bold" style={{ color: passed ? '#4CAF50' : '#FF9800' }}>
              {passed ? t.congrats : t.needsPractice}
            </p>
          </div>

          {/* Safety Tips */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-6 text-left border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-orange-500" />
              {t.redFlags}
            </h3>
            <ul className="space-y-3 text-xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>{t.flag1}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>{t.flag2}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>{t.flag3}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>{t.flag4}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onComplete}
            className="btn-primary w-full py-5 text-2xl font-black rounded-2xl shadow-lg hover:scale-[1.02] transition-transform"
          >
            {t.continue}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pb-10">
      {/* Practice Banner */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-5 py-3 rounded-xl mb-5 text-center shadow-sm">
        <p className="text-xl font-bold">{t.practiceMode}</p>
      </div>

      {/* Header */}
      <div className="card mb-6 p-8 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-black text-gray-900 flex items-center gap-4">
            <Shield className="w-12 h-12 text-blue-600" />
            {t.title}
          </h2>
          <div className="text-right">
            <div className="text-base font-medium text-gray-600">
              {t.round} {currentRound + 1} {t.of} {rounds.length}
            </div>
            <div className="text-2xl font-black text-blue-600">
              {t.score}: {score}
            </div>
          </div>
        </div>

        {!showFeedback && (
          <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
            <p className="text-xl font-bold text-gray-900 text-center">
              {t.instruction}
            </p>
          </div>
        )}
      </div>

      {/* Emails */}
      <div className="space-y-4 mb-6">
        {currentEmails.map((email) => (
          <div
            key={email.id}
            onClick={() => !showFeedback && handleEmailClick(email)}
            className={`card p-6 transition-all cursor-pointer ${!showFeedback ? 'hover:scale-[1.01] hover:shadow-xl' : ''
              } ${selectedEmail === email.id
                ? email.isPhishing
                  ? 'ring-4 ring-red-500 ring-opacity-50 border-red-500 bg-red-50'
                  : 'ring-4 ring-green-500 ring-opacity-50 border-green-500 bg-green-50'
                : showFeedback
                  ? 'opacity-40 grayscale-[0.2]'
                  : 'hover:border-2 hover:border-blue-300 border border-transparent shadow-sm'
              }`}
          >
            <div className="flex items-start gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors shadow-sm ${selectedEmail === email.id
                ? email.isPhishing
                  ? 'bg-red-200'
                  : 'bg-green-200'
                : 'bg-gray-100'
                }`}>
                <Mail className={`w-10 h-10 ${selectedEmail === email.id
                  ? email.isPhishing
                    ? 'text-red-600'
                    : 'text-green-600'
                  : 'text-gray-500'
                  }`} />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xl font-black text-gray-900">{email.from}</p>
                  {selectedEmail === email.id && (
                    email.isPhishing ? (
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    ) : (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    )
                  )}
                </div>
                <p className="text-lg font-bold text-gray-700 mb-2">{email.subject}</p>
                <p className="text-base text-gray-600 leading-relaxed font-medium">{email.preview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && selectedEmailData && (
        <div className="card mb-8 p-1 shadow-xl rounded-3xl">
          <div className={`flex items-start gap-6 p-8 rounded-[1.4rem] ${selectedEmailData.isPhishing ? 'bg-green-100/50' : 'bg-red-100/50'
            }`}>
            {selectedEmailData.isPhishing ? (
              <CheckCircle className="w-16 h-16 text-green-600 flex-shrink-0" />
            ) : (
              <XCircle className="w-16 h-16 text-red-600 flex-shrink-0" />
            )}

            <div className="flex-1">
              <h3 className="text-3xl font-black text-gray-900 mb-4">
                {selectedEmailData.isPhishing ? t.correct : t.incorrect}
              </h3>

              {selectedEmailData.isPhishing && selectedEmailData.redFlags.length > 0 && (
                <div>
                  <p className="text-xl font-black text-gray-800 mb-3 uppercase tracking-wider">{t.redFlags}</p>
                  <ul className="space-y-3">
                    {selectedEmailData.redFlags.map((flag, index) => (
                      <li key={index} className="text-lg text-gray-800 flex items-start gap-3 font-semibold">
                        <span className="text-red-500 text-2xl line-height-1 mt-[-2px]">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!selectedEmailData.isPhishing && (
                <p className="text-xl text-gray-700 font-bold leading-relaxed">
                  This email looks legitimate. The phishing email has suspicious signs like misspellings and urgent language.
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="btn-primary w-full py-6 text-2xl font-black rounded-2xl shadow-lg mt-6 hover:scale-[1.02] transition-transform"
          >
            {currentRound < rounds.length - 1 ? t.next : t.finish}
          </button>
        </div>
      )}
    </div>
  );
};