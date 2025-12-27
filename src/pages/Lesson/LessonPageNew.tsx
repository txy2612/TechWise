
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getLessonById } from '../../data/modules';
import { useProgress } from '../../contexts/ProgressContext';
import Quiz from '../../components/Quiz';

// Import lesson simulations
//Module 1
import GmailCompose from '../../components/simulations/module1/GmailComposeRealistic';
import { GmailReadReply } from '../../components/simulations/module1/GmailReadReply';
import { GmailSignInNav } from '../../components/simulations/module1/GmailSignInNav';
import { GmailOrganize } from '../../components/simulations/module1/GmailOrganize';
//Module 2
import GoogleSearchBasics from '../../components/simulations/module2/GoogleSearchBasics';
import GoogleVoiceSearch from '../../components/simulations/module2/GoogleVoiceSearch';
import GoogleFilterTabs from '../../components/simulations/module2/GoogleFilterTabs';
//Module 5
import ControlCenterBasics from '../../components/simulations/module5/ControlCenterBasics';
import ConnectWifi from '../../components/simulations/module5/ConnectWifi';
import SettingsTextSize from '../../components/simulations/module5/SettingsTextSize';
import ManageAppsStorage from '../../components/simulations/module5/ManageAppsStorage';

const LessonPageNew = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const { progress, updateProgress } = useProgress();
  const currentLang = i18n.language as 'en' | 'zh';

  const [currentStep, setCurrentStep] = useState(0);
  const [showQuizIntro, setShowQuizIntro] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const lessonData = getLessonById(lessonId || '');

  if (!lessonData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-senior-lg text-gray-600">Lesson not found</p>
          <button onClick={() => navigate('/')} className="btn-primary mt-4">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { module, lesson } = lessonData;

  const handleStepComplete = () => {
    // Move to next step or show quiz intro
    if (currentStep < (lesson.steps?.length || 0) - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowQuizIntro(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(`/module/${module.id}`);
    }
  };

  const handleStartQuiz = () => {
    setShowQuizIntro(false);
    setShowQuiz(true);
  };

  // NEW: Handle skip quiz
  const handleSkipQuiz = () => {
    // Mark lesson as complete with 0 points
    updateProgress({ 
      completedLessons: [...progress.completedLessons, lesson.id],
      totalPoints: progress.totalPoints || 0  // No quiz points added
    });
    navigate(`/module/${module.id}`);
  };

  // Render appropriate simulation/content based on lesson type
  const renderLessonContent = () => {
    // Special handling for interactive lessons
    if (lesson.id === 'lesson-gmail-1') {
      return <GmailSignInNav onComplete={handleStepComplete} onBack={() => navigate(-1)} language={currentLang} />;
    }
    
    if (lesson.id === 'lesson-gmail-2') {
      return <GmailCompose onComplete={handleStepComplete} language={currentLang} />;
    }
    
    if (lesson.id === 'lesson-gmail-3') {
      return <GmailReadReply onComplete={handleStepComplete} onBack={() => navigate(-1)} language={currentLang} />;
    }
    
    if (lesson.id === 'lesson-gmail-4') {
      return <GmailOrganize onComplete={handleStepComplete} onBack={() => navigate(-1)} language={currentLang} />;
    }

    // MODULE 2 (Web Navigation)
    if (lesson.id === 'lesson-search-1') {
      return <GoogleSearchBasics onComplete={handleStepComplete} language={currentLang} />;
    }
    
    if (lesson.id === 'lesson-search-2') {
      return <GoogleVoiceSearch onComplete={handleStepComplete} language={currentLang} />;
    }
    
    if (lesson.id === 'lesson-search-3') {
      return <GoogleFilterTabs onComplete={handleStepComplete} language={currentLang} />;
    }

    // MODULE 5 (Smartphone Basics)
    if (lesson.id === 'lesson-smartphone-1') {
      return <ControlCenterBasics onComplete={handleStepComplete} onBack={() => navigate(-1)} language={currentLang} />;
    }

    if (lesson.id === 'lesson-smartphone-2') {
      return <ConnectWifi onComplete={handleStepComplete} onBack={() => navigate(-1)} language={currentLang} />;
    }

    if (lesson.id === 'lesson-smartphone-3') {
      return <SettingsTextSize onComplete={handleStepComplete} onBack={() => navigate(-1)} language={currentLang} />;
    }

    if (lesson.id === 'lesson-smartphone-4') {
      return <ManageAppsStorage onComplete={handleStepComplete} onBack={() => navigate(-1)} language={currentLang} />;
    }

    // Default tutorial/practice content
    return (
      <div className="card w-full px-8 mx-auto max-w-screen-2xl">
        <div className="mb-8">
          <h2 className="text-senior-xl font-bold text-gray-900 mb-4">
            {currentLang === 'en' ? lesson.titleEn : lesson.titleZh}
          </h2>
          <p className="text-senior-base text-gray-600">
            {currentLang === 'en' ? lesson.descriptionEn : lesson.descriptionZh}
          </p>
        </div>

        {/* Tutorial Content Placeholder */}
        <div className="bg-gray-50 rounded-xl p-8 mb-6">
          <p className="text-senior-base text-gray-700">
            {t('tutorial')}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button onClick={handleBack} className="btn-secondary">
            {t('back')}
          </button>
          <button onClick={handleStepComplete} className="btn-primary">
            {t('continue')}
          </button>
        </div>
      </div>
    );
  };

  // QUIZ INTRO SCREEN (UPDATED WITH SKIP BUTTON)
  if (showQuizIntro) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg p-12 text-center">
          <div className="text-8xl mb-6">📝</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {currentLang === 'en' ? 'Lesson Complete!' : '课程完成！'}
          </h2>
          <p className="text-2xl text-gray-600 mb-4">
            {currentLang === 'en' 
              ? 'Ready to test what you learned?' 
              : '准备测试您学到的知识了吗？'}
          </p>
          <p className="text-xl text-gray-500 mb-10">
            {currentLang === 'en'
              ? `${lesson.quiz?.questions?.length || 0} quick questions`
              : `${lesson.quiz?.questions?.length || 0} 个快速问题`}
          </p>
          
          {/* Primary Button: Start Quiz */}
          <button
            onClick={handleStartQuiz}
            className="w-full py-5 px-8 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-xl transition-colors shadow-lg mb-4"
          >
            {currentLang === 'en' ? 'Start Quiz' : '开始测验'}
          </button>

          {/* Secondary Button: Skip Quiz */}
          <button
            onClick={handleSkipQuiz}
            className="w-full py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 text-lg font-semibold rounded-xl transition-colors"
          >
            {currentLang === 'en' ? 'Skip Quiz' : '跳过测验'}
          </button>

          {/* Info Text */}
          <p className="text-lg text-gray-500 mt-4">
            {currentLang === 'en'
              ? 'Skipping the quiz will complete the lesson but you won\'t earn quiz points'
              : '跳过测验将完成课程，但您不会获得测验积分'}
          </p>
        </div>
      </div>
    );
  }

  // QUIZ VIEW
  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Quiz
          quiz={lesson.quiz}
          moduleId={module.id}
          onComplete={(score, points) => {
            // Mark lesson as complete with quiz points
            updateProgress({ 
              completedLessons: [...progress.completedLessons, lesson.id],
              totalPoints: (progress.totalPoints || 0) + points
            });
            navigate(`/module/${module.id}`);
          }}
          language={currentLang}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="w-full px-8 mx-auto max-w-screen-2xl mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-senior-base text-primary hover:text-primary-700 mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
          {t('back')}
        </button>

        {/* Progress Dots */}
        {lesson.steps && lesson.steps.length > 0 && (
          <div className="step-dots">
            {lesson.steps.map((_, index) => (
              <div
                key={index}
                className={`step-dot ${index === currentStep ? 'active' : ''} ${
                  index < currentStep ? 'completed' : ''
                }`}
              />
            ))}
          </div>
        )}

        {/* Lesson Title */}
        <div className="text-center mb-4">
          <h1 className="text-senior-xl font-bold text-gray-900">
            {currentLang === 'en' ? lesson.titleEn : lesson.titleZh}
          </h1>
          <p className="text-senior-sm text-gray-600">
            {currentLang === 'en' ? module.titleEn : module.titleZh}
          </p>
          
          {/* Skip Lesson Button */}
          <button
            onClick={() => {
              if (confirm(t('skipLesson'))) {
                setShowQuizIntro(true);
              }
            }}
            className="mt-4 px-6 py-3 text-senior-base text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-2 border-blue-300 rounded-lg font-semibold transition-all"
          >
            ⚡ {t('skipLesson')}
          </button>
        </div>
      </div>

      {/* Lesson Content */}
      {renderLessonContent()}
    </div>
  );
};

export default LessonPageNew;
