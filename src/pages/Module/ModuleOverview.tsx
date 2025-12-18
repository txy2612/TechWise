import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle, Lock, PlayCircle, Check, Play, RotateCcw, ArrowRight } from 'lucide-react';
import { modules, getModuleById } from '../../data/modules';
import { useProgress } from '../../contexts/ProgressContext';
import { AnimatedCheckmark } from '../../components/common/AnimatedCheckmark';

const ModuleOverview = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const { progress } = useProgress();
  const currentLang = i18n.language as 'en' | 'zh';

  const module = getModuleById(moduleId || '');

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-senior-lg text-gray-600">Module not found</p>
          <button onClick={() => navigate('/')} className="btn-primary mt-4">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getFirstUncompletedLesson = () => {
    return module.lessons.find((lesson) => !progress.completedLessons.includes(lesson.id));
  };

  const isLessonLocked = (lessonOrder: number): boolean => {
    if (lessonOrder === 1) return false;
    
    const previousLesson = module.lessons.find((l) => l.order === lessonOrder - 1);
    return previousLesson ? !progress.completedLessons.includes(previousLesson.id) : false;
  };

  const moduleProgress = Math.round(
    (module.lessons.filter((l) => progress.completedLessons.includes(l.id)).length /
      module.lessons.length) *
      100
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full px-8 mx-auto max-w-screen-2xl">
        {/* Back Button - Bigger */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 text-xl font-bold text-primary hover:text-primary-700 mb-8 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all"
        >
          <ArrowLeft className="w-7 h-7" />
          {t('backToModules')}
        </button>

        {/* Module Header */}
        <div className="card mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-7xl">{module.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl font-black text-gray-900 mb-3">
                {currentLang === 'en' ? module.titleEn : module.titleZh}
              </h1>
              <p className="text-xl font-semibold text-gray-700">
                {currentLang === 'en' ? module.descriptionEn : module.descriptionZh}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-bold text-gray-700">{t('progressLabel')}</span>
              <span className="text-2xl font-black text-primary">
                {moduleProgress}% {t('complete')}
              </span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${moduleProgress}%`,
                  background: 'linear-gradient(90deg, #FBBC04 0%, #34A853 50%, #4285F4 100%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Lesson List */}
        <div className="card">
          <h2 className="text-3xl font-black text-gray-900 mb-8">
            {t('allLessons')}
          </h2>

          <div className="space-y-3">
            {module.lessons.map((lesson) => {
              const completed = progress.completedLessons.includes(lesson.id);
              const current = !completed && !isLessonLocked(lesson.order);
              const locked = isLessonLocked(lesson.order);

              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    // Allow replaying completed lessons OR starting unlocked lessons
                    if (!locked || completed) {
                      navigate(`/lesson/${lesson.id}`);
                    }
                  }}
                  className={`
                    flex items-center gap-6 p-6 rounded-xl transition-all duration-300
                    ${locked && !completed 
                      ? 'bg-gray-100 opacity-50 cursor-not-allowed' 
                      : completed
                        ? 'bg-green-50 cursor-pointer hover:bg-green-100'
                        : current
                          ? 'bg-blue-50 cursor-pointer border-4 border-blue-500 shadow-lg ring-4 ring-blue-200'
                          : 'bg-white hover:bg-blue-50 cursor-pointer shadow-md hover:shadow-lg hover:border-2 hover:border-blue-300'
                    }
                  `}
                >
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {completed ? (
                      <div>
                        <AnimatedCheckmark size="small" />
                      </div>
                    ) : locked ? (
                      <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
                        <Lock className="w-7 h-7 text-gray-500" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                        <Play className="w-7 h-7 text-blue-600 ml-1" />
                      </div>
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${locked && !completed ? 'text-gray-400' : 'text-gray-900'}`}>
                      {currentLang === 'en' ? lesson.titleEn : lesson.titleZh}
                    </h3>
                    <p className={`text-base font-medium ${locked && !completed ? 'text-gray-300' : 'text-gray-600'}`}>
                      {lesson.estimatedMinutes} {t('minutes')}
                    </p>
                  </div>

                  {/* Action Button */}
                  {completed ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/lesson/${lesson.id}`);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-green-100 hover:bg-green-200 text-green-700 font-bold rounded-xl transition-all"
                    >
                      <RotateCcw className="w-5 h-5" />
                      <span className="text-base">
                        {t('replay')}
                      </span>
                    </button>
                  ) : !locked ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/lesson/${lesson.id}`);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-md"
                    >
                      <span className="text-base">
                        {t('start')}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Continue Button - Bigger */}
          <div className="mt-8">
            {getFirstUncompletedLesson() ? (
              <button
                onClick={() => navigate(`/lesson/${getFirstUncompletedLesson()?.id}`)}
                className="w-full py-5 px-8 bg-blue-500 hover:bg-blue-600 text-white font-black text-2xl rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                {moduleProgress > 0 ? t('continueLearning') : t('startModule')}
              </button>
            ) : (
              <div className="text-center py-10">
                <div className="text-8xl mb-6">🎉</div>
                <p className="text-3xl font-black text-green-600 mb-3">
                  {t('moduleCompleted')}
                </p>
                <p className="text-xl font-semibold text-gray-700">
                  {t('greatJob')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleOverview;
