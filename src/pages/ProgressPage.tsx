import { useProgress } from '../contexts/ProgressContext';
import { modules, badges } from '../data/modules';

const ProgressPage = () => {
  const { progress } = useProgress();

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedPercentage = (progress.completedLessons.length / totalLessons) * 100;

  const earnedBadgeObjects = badges.filter((b) =>
    progress.earnedBadges.includes(b.id)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <h1 className="text-senior-2xl font-bold text-gray-900 mb-2">
          My Progress
        </h1>
        <p className="text-senior-base text-gray-600">
          Track your learning journey and achievements
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-4xl mb-2">📚</div>
          <div className="text-senior-xl font-bold text-primary-600">
            {progress.completedLessons.length}
          </div>
          <div className="text-senior-xs text-gray-600">Lessons Completed</div>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-2">⭐</div>
          <div className="text-senior-xl font-bold text-primary-600">
            {progress.totalPoints}
          </div>
          <div className="text-senior-xs text-gray-600">Total Points</div>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-senior-xl font-bold text-primary-600">
            {progress.earnedBadges.length}
          </div>
          <div className="text-senior-xs text-gray-600">Badges Earned</div>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-2">🔥</div>
          <div className="text-senior-xl font-bold text-primary-600">
            {progress.streak}
          </div>
          <div className="text-senior-xs text-gray-600">Day Streak</div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="card">
        <h2 className="text-senior-lg font-bold text-gray-900 mb-4">
          Overall Progress
        </h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-senior-base text-gray-600">
            {progress.completedLessons.length} of {totalLessons} lessons
          </span>
          <span className="text-senior-base font-bold text-primary-600">
            {Math.round(completedPercentage)}%
          </span>
        </div>
        <div className="progress-bar h-3">
          <div
            className="progress-bar-fill"
            style={{ width: `${completedPercentage}%` }}
          />
        </div>
      </div>

      {/* Module Progress */}
      <div className="card">
        <h2 className="text-senior-lg font-bold text-gray-900 mb-4">
          Module Progress
        </h2>
        <div className="space-y-4">
          {modules.map((module) => {
            const completedInModule = module.lessons.filter((lesson) =>
              progress.completedLessons.includes(lesson.id)
            ).length;
            const moduleProgress = (completedInModule / module.lessons.length) * 100;

            return (
              <div key={module.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{module.icon}</span>
                    <span className="text-senior-sm font-semibold text-gray-700">
                      {module.titleEn}
                    </span>
                  </div>
                  <span className="text-senior-sm font-semibold text-primary-600">
                    {completedInModule}/{module.lessons.length}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${moduleProgress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="card">
        <h2 className="text-senior-lg font-bold text-gray-900 mb-4">
          Earned Badges ({earnedBadgeObjects.length}/{badges.length})
        </h2>
        {earnedBadgeObjects.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {earnedBadgeObjects.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center text-4xl shadow-lg mb-2">
                  {badge.icon}
                </div>
                <span className="text-senior-xs font-semibold text-gray-700">
                  {badge.nameEn}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-5xl mb-3">🏅</div>
            <p className="text-senior-base">
              Complete lessons to earn badges!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
