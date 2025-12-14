import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X } from 'lucide-react';
import type { Badge } from '../types';

interface BadgeModalProps {
  badge: Badge;
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'zh';
}

const BadgeModal: React.FC<BadgeModalProps> = ({ badge, isOpen, onClose, language }) => {
  useEffect(() => {
    if (isOpen) {
      // Fire confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FFA000', '#FF6F00'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FFA000', '#FF6F00'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const texts = {
    en: {
      title: 'Badge Unlocked!',
      congratulations: 'Congratulations!',
      earned: "You've earned a new badge!",
      close: 'Awesome!',
    },
    zh: {
      title: '徽章解锁！',
      congratulations: '恭喜！',
      earned: '你获得了新徽章！',
      close: '太棒了！',
    },
  };

  const t = texts[language];

  return (
    <div className="celebration-overlay" onClick={onClose}>
      <div
        className="card max-w-md mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Badge Icon */}
        <div className="text-center mb-6">
          <div className="badge-container mx-auto mb-4 float-up">
            <span className="badge-icon">{badge.icon}</span>
          </div>
          <h2 className="text-senior-2xl font-bold text-gray-900 mb-2">
            {t.title}
          </h2>
          <p className="text-senior-lg text-gold font-semibold">
            {t.congratulations}
          </p>
        </div>

        {/* Badge Details */}
        <div className="bg-gradient-to-br from-gold-50 to-yellow-50 rounded-2xl p-6 mb-6">
          <h3 className="text-senior-xl font-bold text-gray-900 mb-2 text-center">
            {language === 'en' ? badge.nameEn : badge.nameZh}
          </h3>
          <p className="text-senior-base text-gray-700 text-center">
            {language === 'en' ? badge.descriptionEn : badge.descriptionZh}
          </p>
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="btn-primary w-full">
          {t.close}
        </button>
      </div>
    </div>
  );
};

export default BadgeModal;
