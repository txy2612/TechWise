import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getLessonById } from '../../data/modules';
import { useProgress } from '../../contexts/ProgressContext';

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
    // Move to next step or show quiz
    if (currentStep < (lesson.steps?.length || 0) - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(`/module/${module.id}`);
    }
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

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="w-full px-8 mx-auto max-w-screen-2xl">
          <div className="card">
            <h2 className="text-senior-xl font-bold text-gray-900 mb-4">{t('quiz')}</h2>
            <p className="text-senior-base text-gray-600 mb-6">
              {t('quizPlaceholder')}
            </p>
            <button
              onClick={() => {
                // Mark lesson as complete
                updateProgress({ completedLessons: [...progress.completedLessons, lesson.id] });
                navigate(`/module/${module.id}`);
              }}
              className="btn-primary w-full"
            >
              {t('completeLesson')}
            </button>
          </div>
        </div>
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
          
          {/* Skip Button - Bigger and More Prominent */}
          <button
            onClick={() => {
              if (confirm(t('skipLesson'))) {
                setShowQuiz(true);
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
