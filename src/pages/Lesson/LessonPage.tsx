import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../../contexts/ProgressContext';
import { getLessonById } from '../../data/modules';

const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { isLessonUnlocked, isLessonCompleted, completeLesson } = useProgress();
  const currentLang = i18n.language as 'en' | 'zh';

  if (!lessonId) {
    return <div>Lesson not found</div>;
  }

  const lessonData = getLessonById(lessonId);

  if (!lessonData) {
    return (
      <div className="card text-center">
        <h2 className="text-senior-xl font-bold text-gray-900 mb-4">
          Lesson Not Found
        </h2>
        <button onClick={() => navigate('/modules')} className="btn-primary">
          Back to Modules
        </button>
      </div>
    );
  }

  const { module, lesson } = lessonData;
  const unlocked = isLessonUnlocked(lessonId);
  const completed = isLessonCompleted(lessonId);

  if (!unlocked) {
    return (
      <div className="card text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-senior-xl font-bold text-gray-900 mb-4">
          Lesson Locked
        </h2>
        <p className="text-senior-base text-gray-600 mb-6">
          Complete the previous lesson to unlock this one!
        </p>
        <button onClick={() => navigate('/modules')} className="btn-primary">
          Back to Modules
        </button>
      </div>
    );
  }

  const handleCompleteLesson = async () => {
    // Simulate quiz completion with 90% score
    await completeLesson(lessonId, 90, false);
    navigate('/modules');
  };

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-4xl">{module.icon}</div>
          <div>
            <div className="text-senior-sm text-gray-600">
              {currentLang === 'en' ? module.titleEn : module.titleZh}
            </div>
            <h1 className="text-senior-xl font-bold text-gray-900">
              {currentLang === 'en' ? lesson.titleEn : lesson.titleZh}
            </h1>
          </div>
        </div>

        <p className="text-senior-base text-gray-600 mb-4">
          {currentLang === 'en' ? lesson.descriptionEn : lesson.descriptionZh}
        </p>

        <div className="flex items-center space-x-4 text-senior-sm text-gray-600">
          <span>⏱️ {lesson.estimatedMinutes} minutes</span>
          <span>📝 {lesson.contentType}</span>
          {completed && <span className="text-success-600 font-semibold">✅ Completed</span>}
        </div>
      </div>

      {/* Lesson Content Placeholder */}
      <div className="card">
        <h2 className="text-senior-lg font-bold text-gray-900 mb-4">
          Lesson Content
        </h2>
        <div className="bg-gray-100 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🎓</div>
          <p className="text-senior-base text-gray-600 mb-4">
            Lesson content will be displayed here with interactive simulations and tutorials.
          </p>
          <p className="text-senior-sm text-gray-500">
            This is a placeholder. Full lesson content will be implemented next.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card">
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/modules')}
            className="btn-secondary flex-1"
          >
            Back to Modules
          </button>
          <button
            onClick={handleCompleteLesson}
            className="btn-primary flex-1"
          >
            {completed ? 'Review Quiz' : 'Start Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
