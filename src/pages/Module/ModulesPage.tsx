import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { modules } from '../../data/modules';
import { useProgress } from '../../contexts/ProgressContext';

const ModulesPage = () => {
  const { i18n } = useTranslation();
  const { progress } = useProgress();
  const currentLang = i18n.language as 'en' | 'zh';

  const getModuleProgress = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return 0;

    const completedInModule = module.lessons.filter((lesson) =>
      progress.completedLessons.includes(lesson.id)
    ).length;

    return (completedInModule / module.lessons.length) * 100;
  };

  const getFirstUnlockedLesson = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return null;

    return module.lessons.find((lesson) =>
      progress.unlockedLessons.includes(lesson.id) &&
      !progress.completedLessons.includes(lesson.id)
    );
  };

  const isModuleLocked = (moduleId: string): boolean => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module || module.order === 1) return false;

    // Check if all lessons in previous module are completed
    const previousModule = modules.find((m) => m.order === module.order - 1);
    if (!previousModule) return false;

    const allPreviousCompleted = previousModule.lessons.every((lesson) =>
      progress.completedLessons.includes(lesson.id)
    );

    return !allPreviousCompleted;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <h1 className="text-senior-2xl font-bold text-gray-900 mb-2">
          Learning Modules
        </h1>
        <p className="text-senior-base text-gray-600">
          Choose a module to start learning. Complete lessons one by one to unlock the next!
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => {
          const progressPercent = getModuleProgress(module.id);
          const firstUnlockedLesson = getFirstUnlockedLesson(module.id);
          const locked = isModuleLocked(module.id);
          const completed = progressPercent === 100;

          return (
            <div
              key={module.id}
              className={`card ${locked ? 'opacity-60' : 'card-hover'}`}
            >
              {/* Module Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{module.icon}</div>
                  <div>
                    <h2 className="text-senior-lg font-bold text-gray-900">
                      {currentLang === 'en' ? module.titleEn : module.titleZh}
                    </h2>
                    <p className="text-senior-sm text-gray-600">
                      {module.lessons.length} lessons
                    </p>
                  </div>
                </div>
                {locked && (
                  <div className="text-2xl">🔒</div>
                )}
                {completed && (
                  <div className="text-2xl">✅</div>
                )}
              </div>

              {/* Module Description */}
              <p className="text-senior-sm text-gray-600 mb-4">
                {currentLang === 'en' ? module.descriptionEn : module.descriptionZh}
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-senior-xs text-gray-600">Progress</span>
                  <span className="text-senior-xs font-semibold text-primary-600">
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              {!locked && firstUnlockedLesson && (
                <Link
                  to={`/lesson/${firstUnlockedLesson.id}`}
                  className="btn-primary w-full text-center block"
                >
                  {completed ? 'Review' : 'Continue'}
                </Link>
              )}

              {locked && (
                <div className="btn-secondary w-full text-center cursor-not-allowed">
                  🔒 Complete previous module to unlock
                </div>
              )}

              {!locked && !firstUnlockedLesson && !completed && (
                <Link
                  to={`/lesson/${module.lessons[0].id}`}
                  className="btn-primary w-full text-center block"
                >
                  Start Module
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModulesPage;
