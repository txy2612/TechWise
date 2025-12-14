import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { modules } from '../data/modules';

const HomePage = () => {
  const { progress } = useProgress();

  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const progressPercentage = (completedCount / totalLessons) * 100;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="card">
        <h2 className="text-senior-2xl font-bold text-gray-900 mb-4">
          Welcome Back! 👋
        </h2>
        <p className="text-senior-base text-gray-600 mb-6">
          Continue your learning journey and master digital skills at your own pace.
        </p>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-senior-base font-semibold text-gray-700">
              Overall Progress
            </span>
            <span className="text-senior-lg font-bold text-primary-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          
          <div className="progress-bar h-3 mb-4">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-senior-xl font-bold text-primary-600">
                {completedCount}
              </div>
              <div className="text-senior-xs text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-senior-xl font-bold text-primary-600">
                {progress.totalPoints}
              </div>
              <div className="text-senior-xs text-gray-600">Points</div>
            </div>
            <div>
              <div className="text-senior-xl font-bold text-primary-600">
                {progress.earnedBadges.length}
              </div>
              <div className="text-senior-xs text-gray-600">Badges</div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      {progress.currentLesson && (
        <div className="card card-hover">
          <h3 className="text-senior-lg font-bold text-gray-900 mb-3">
            Continue Learning
          </h3>
          <Link
            to={`/lesson/${progress.currentLesson}`}
            className="btn-primary w-full text-center block"
          >
            Resume Lesson
          </Link>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/modules" className="card card-hover">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">📚</div>
            <div>
              <h3 className="text-senior-lg font-bold text-gray-900">
                Browse Modules
              </h3>
              <p className="text-senior-sm text-gray-600">
                {modules.length} modules available
              </p>
            </div>
          </div>
        </Link>

        <Link to="/progress" className="card card-hover">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">📊</div>
            <div>
              <h3 className="text-senior-lg font-bold text-gray-900">
                View Progress
              </h3>
              <p className="text-senior-sm text-gray-600">
                Track your achievements
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Badges */}
      {progress.earnedBadges.length > 0 && (
        <div className="card">
          <h3 className="text-senior-lg font-bold text-gray-900 mb-4">
            Recent Badges 🏆
          </h3>
          <div className="flex space-x-3 overflow-x-auto">
            {progress.earnedBadges.slice(-5).map((badgeId) => (
              <div
                key={badgeId}
                className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center text-3xl shadow-md"
              >
                🏅
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
