import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Search, Map, Shield, Smartphone, Wrench, Lock, Trophy } from 'lucide-react';
import { GmailLogo, GoogleSearchLogo, GoogleMapsLogo } from '../components/common/GoogleLogos';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { modules } from '../data/modules';

const Dashboard = () => {
  const { user } = useAuth();
  const { progress } = useProgress();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language as 'en' | 'zh';

  // Module color configuration
  // Module colors from provided palette images
  const moduleColors: Record<string, { bg: string; card: string; button: string; buttonText: string; progress: string }> = {
    'module-gmail': { 
      bg: '#FDF6E3',        // Cream/off-white (Image 2 top)
      card: '#FDF6E3',      
      button: '#F26B1F',    // Orange (Image 2 bottom)
      buttonText: '#FFFFFF', 
      progress: '#F26B1F'
    },
    'module-search': { 
      bg: '#E3F2FD',        // Light blue (Image 1 top)
      card: '#E3F2FD',      
      button: '#4A90E2',    // Rich blue (Image 1 bottom)
      buttonText: '#FFFFFF',
      progress: '#4A90E2'
    },
    'module-maps': { 
      bg: '#E0F7F4',        // Light cyan (Image 5)
      card: '#E0F7F4',      
      button: '#009688',    // Teal green (Image 6)
      buttonText: '#FFFFFF',
      progress: '#009688'
    },
    'module-safety': { 
      bg: '#FADADD',        // Light pink (Image 3 top)
      card: '#FADADD',      
      button: '#E57373',    // Coral red (Image 3 bottom)
      buttonText: '#FFFFFF',
      progress: '#E57373'
    },
    'module-smartphone': { 
      bg: '#FFF9C4',        // Pale yellow (Image 4 top)
      card: '#FFF9C4',      
      button: '#FFB74D',    // Yellow-orange (Image 4 bottom)
      buttonText: '#333333', // Dark text for yellow
      progress: '#FFB74D'
    },
    'module-tools': { 
      bg: '#F3E5F5',        // Soft purple (Image 7)
      card: '#F3E5F5',      
      button: '#AB47BC',    // Rich purple (Image 8)
      buttonText: '#FFFFFF',
      progress: '#AB47BC'
    },
  };

  // Module icon mapping - Bigger icons
  const moduleIcons: Record<string, React.ReactNode> = {
    'module-gmail': <GmailLogo size={64} />,
    'module-search': <GoogleSearchLogo size={64} />,
    'module-maps': <GoogleMapsLogo size={64} />,
    'module-safety': <Shield className="w-16 h-16" />,
    'module-smartphone': <Smartphone className="w-16 h-16" />,
    'module-tools': <Wrench className="w-16 h-16" />,
  };

  const getModuleProgress = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return 0;

    const completedInModule = module.lessons.filter((lesson) =>
      progress.completedLessons.includes(lesson.id)
    ).length;

    return Math.round((completedInModule / module.lessons.length) * 100);
  };

  const isModuleLocked = (moduleId: string): boolean => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module || module.order === 1) return false;

    const previousModule = modules.find((m) => m.order === module.order - 1);
    if (!previousModule) return false;

    const allPreviousCompleted = previousModule.lessons.every((lesson) =>
      progress.completedLessons.includes(lesson.id)
    );

    return !allPreviousCompleted;
  };

  const handleModuleClick = (moduleId: string) => {
    if (!isModuleLocked(moduleId)) {
      navigate(`/module/${moduleId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full px-8 mx-auto max-w-screen-2xl">
        {/* Header with Language Toggle */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-senior-2xl font-bold text-gray-900">
              {t('modules')}
            </h1>

        
          {/*Original language toggle (before UI alignment fix) 
            Language Toggle - Modern Slider
            <div className="flex items-center gap-3">
              <span className={`text-base font-semibold transition-colors ${currentLang === 'en' ? 'text-blue-600' : 'text-gray-400'}`}>
                EN
              </span>
              <button
                onClick={() => i18n.changeLanguage(currentLang === 'en' ? 'zh' : 'en')}
                className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                  currentLang === 'zh' ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                    currentLang === 'zh' ? 'left-9' : 'left-1'
                  }`}
                />
              </button>
              <span className={`text-base font-semibold transition-colors ${currentLang === 'zh' ? 'text-blue-600' : 'text-gray-400'}`}>
                中文
              </span>
            </div> */}

          {/* Updated language toggle (after UI alignment fix)*/}
  <div className="flex items-center justify-end gap-2">
   <span
    className={`text-sm font-semibold leading-none transition-colors ${
      currentLang === 'en' ? 'text-blue-600' : 'text-gray-400'
    }`}
   >
    EN
   </span>

  <button
   type="button"
   onClick={() => i18n.changeLanguage(currentLang === 'en' ? 'zh' : 'en')}
   className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors duration-200 ${
    currentLang === 'zh' ? 'bg-blue-500' : 'bg-gray-300'
   }`}
   aria-label="Toggle language"
 >
  <span
    className={`absolute top-1 left-1 h-10 w-10 rounded-full bg-white shadow-md transition-transform duration-200 ${
      currentLang === 'zh' ? 'translate-x-12' : 'translate-x-0'
    }`}
  />
</button>

  <span
    className={`text-sm font-semibold leading-none transition-colors ${
      currentLang === 'zh' ? 'text-blue-600' : 'text-gray-400'
    }`}
  >
    中文
  </span>
</div>
          </div> 
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 text-senior-base">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-gold" />
                <span className="font-bold text-primary">{progress.totalPoints}</span>
                <span className="text-gray-600">{t('points')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        {progress.earnedBadges.length > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 shadow-md border-2 border-amber-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-senior-lg font-bold text-gray-900 flex items-center gap-2">
                <Trophy className="w-7 h-7 text-amber-500" />
                {t('yourBadges')}
              </h2>
              <span className="text-senior-base text-gray-600">
                {progress.earnedBadges.length} {t('earned')}
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              {progress.earnedBadges.slice(0, 8).map((badgeId) => (
                <div
                  key={badgeId}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-3xl shadow-lg animate-bounce"
                  title={badgeId}
                >
                  🏆
                </div>
              ))}
              {progress.earnedBadges.length > 8 && (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-senior-base font-bold text-gray-600">
                  +{progress.earnedBadges.length - 8}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Module Cards - 3 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const progressPercent = getModuleProgress(module.id);
            const locked = isModuleLocked(module.id);
            const icon = moduleIcons[module.id];
            const colors = moduleColors[module.id] || moduleColors['module-gmail'];
            const isCompleted = progressPercent === 100;

            return (
              <div
                key={module.id}
                onClick={() => !locked && handleModuleClick(module.id)}
                style={{ backgroundColor: colors.bg }}
                className={`
                  relative rounded-xl transition-all duration-300
                  ${locked 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'cursor-pointer hover:scale-[1.02] hover:-translate-y-1'
                  }
                `}
              >
                {/* Lock Icon - Top Right (for locked modules only) */}
                {locked && (
                  <div className="absolute top-4 right-4 z-10">
                    <Lock className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                {/* Card Content - Vertical centered layout like image */}
                <div
                  className="rounded-2xl p-8"
                  style={{
                    backgroundColor: colors.card,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  {/* Lock Overlay for Locked Modules */}
                  {locked && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/50 rounded-2xl backdrop-blur-sm">
                      <div className="bg-white/90 rounded-full p-12 shadow-2xl">
                        <Lock className="w-24 h-24 text-gray-400" />
                      </div>
                    </div>
                  )}

                  {/* Vertical centered layout: Icon square → Title → Progress → Button */}
                  <div className="flex flex-col items-start space-y-6">
                    {/* Icon in rounded square - WHITE background */}
                    <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-md">
                      {icon}
                    </div>

                    {/* Title */}
                    <h2 className="font-black text-gray-900" style={{ fontSize: '24px', fontWeight: '900' }}>
                      {currentLang === 'en' ? module.titleEn : module.titleZh}
                    </h2>

                    {/* Progress section */}
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-semibold" style={{ fontSize: '18px' }}>
                          {currentLang === 'en' ? 'Progress' : '进度'}
                        </span>
                        <span className="font-black" style={{ fontSize: '20px' }}>
                          {isCompleted 
                            ? (currentLang === 'en' ? 'Completed' : '已完成')
                            : `${progressPercent}%`
                          }
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="h-3 bg-white/60 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${progressPercent}%`,
                            backgroundColor: colors.progress
                          }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    {!locked && (
                      <button
                        style={{
                          backgroundColor: colors.button,
                          color: colors.buttonText,
                          fontSize: '20px',
                          fontWeight: '700',
                          borderRadius: '12px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        }}
                        className="w-full py-3 px-6 transition-all hover:brightness-110 hover:shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleModuleClick(module.id);
                        }}
                      >
                        {progressPercent > 0 
                          ? (currentLang === 'en' ? 'Continue' : '继续')
                          : (currentLang === 'en' ? 'Start Module' : '开始课程')
                        }
                      </button>
                    )}

                    {locked && (
                      <button
                        style={{
                          backgroundColor: '#BDBDBD',
                          color: '#757575',
                          fontSize: '20px',
                          fontWeight: '700',
                          borderRadius: '12px',
                        }}
                        className="w-full py-3 px-6 cursor-not-allowed"
                        disabled
                      >
                        🔒 {currentLang === 'en' ? 'Locked' : '已锁定'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
