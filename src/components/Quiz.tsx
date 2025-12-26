
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Quiz as QuizType } from '../types';
import { POINTS, PASSING_SCORE_PERCENTAGE } from '../types';

interface QuizProps {
  quiz: QuizType;
  moduleId: string;
  onComplete: (score: number, points: number) => void;
  language: 'en' | 'zh';
}

const Quiz: React.FC<QuizProps> = ({ quiz, moduleId, onComplete, language }) => {
  const [showEnding, setShowEnding] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [scoreData, setScoreData] = useState<{ score: number; points: number } | null>(null);
  const navigate = useNavigate();

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const totalQuestions = quiz.questions.length;

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setShowFeedback(false);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // directly calculate and show results
      calculateResults(answers);
      setShowEnding(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[quiz.questions[currentQuestionIndex + 1]?.id] || '');
      setShowFeedback(false);
    }
  };


  const handlePreviousQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[quiz.questions[currentQuestionIndex - 1]?.id] || '');
      setShowFeedback(false);
    }
  };

  const handleRetryQuiz = () => {
    setShowEnding(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setAnswers({});
    setShowResults(false);
    setShowReview(false);
    setShowFeedback(false);
    setIsCalculating(false);
    setScoreData(null);
  };

  const handleBackToModule = () => {
    // Call onComplete when user leaves
    if (scoreData) {
      onComplete(scoreData.score, scoreData.points);
    }
    navigate(`/module/${moduleId}`);
  };

  const calculateResults = (finalAnswers: Record<string, string>) => {
    let correctCount = 0;

    quiz.questions.forEach((q) => {
      if (Array.isArray(q.correctAnswer)) {
        if (q.correctAnswer.includes(finalAnswers[q.id])) {
          correctCount++;
        }
      } else {
        if (finalAnswers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      }
    });

    const scorePercentage = (correctCount / quiz.questions.length) * 100;
    const passed = scorePercentage >= PASSING_SCORE_PERCENTAGE;

    let points = POINTS.BASE_COMPLETION;
    points += correctCount * POINTS.PER_CORRECT_ANSWER;
    if (scorePercentage === 100) {
      points += POINTS.PERFECT_SCORE_BONUS;
    }

    if (passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#10B981', '#F59E0B'],
      });
    }

    // Store score data but DON'T call onComplete yet
    setScoreData({ score: scorePercentage, points });
    setShowResults(true);
  };

  const getIsCorrect = (questionId: string): boolean => {
    const question = quiz.questions.find((q) => q.id === questionId);
    if (!question) return false;

    if (Array.isArray(question.correctAnswer)) {
      return question.correctAnswer.includes(answers[questionId]);
    }
    return answers[questionId] === question.correctAnswer;
  };

  const isCurrentAnswerCorrect = () => {
    if (Array.isArray(currentQuestion.correctAnswer)) {
      return currentQuestion.correctAnswer.includes(selectedAnswer);
    }
    return selectedAnswer === currentQuestion.correctAnswer;
  };

  const correctCount = quiz.questions.filter((q) => getIsCorrect(q.id)).length;

  const texts = {
    en: {
      question: 'Question',
      of: 'of',
      checkAnswer: 'Check Answer',
      results: 'Quiz Complete!',
      score: 'You got',
      right: 'right.',
      reviewExplanations: 'Review Explanations',
      backToModule: 'Back to Module',
      retry: 'Retry Quiz',
      explanation: 'Explanation:',
      calculating: 'Calculating your score...',
    },
    zh: {
      question: '问题',
      of: '/',
      checkAnswer: '检查答案',
      results: '测验完成！',
      score: '您答对了',
      right: '题。',
      reviewExplanations: '查看解释',
      backToModule: '返回模块',
      retry: '重试测验',
      explanation: '解释：',
      calculating: '正在计算您的分数...',
    },
  };

  const t = texts[language];

  // ========================================
  // REVIEW PAGE
  // ========================================
  if (showReview) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t.reviewExplanations}
          </h2>

          <div className="space-y-6 mb-8">
            {quiz.questions.map((question, index) => {
              const isCorrect = getIsCorrect(question.id);
              const userAnswerId = answers[question.id];
              const correctAnswerId = Array.isArray(question.correctAnswer) 
                ? question.correctAnswer[0] 
                : question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className={`p-6 rounded-2xl border-2 ${
                    isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? (
                        <Check className="w-5 h-5 text-white" strokeWidth={3} />
                      ) : (
                        <X className="w-5 h-5 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-lg font-semibold text-gray-700">
                      {t.question} {index + 1}
                    </span>
                  </div>

                  <p className="text-xl font-semibold text-gray-900 mb-4">
                    {language === 'en' ? question.questionEn : question.questionZh}
                  </p>

                  <div className="mb-3">
                    <p className="text-lg text-gray-700">
                      <span className="font-semibold">
                        {language === 'en' ? 'Your answer: ' : '您的答案：'}
                      </span>
                      {language === 'en' 
                        ? question.options?.find(o => o.id === userAnswerId)?.textEn 
                        : question.options?.find(o => o.id === userAnswerId)?.textZh}
                    </p>
                  </div>

                  {!isCorrect && (
                    <div className="mb-3">
                      <p className="text-lg text-gray-700">
                        <span className="font-semibold text-green-700">
                          {language === 'en' ? 'Correct answer: ' : '正确答案：'}
                        </span>
                        {language === 'en' 
                          ? question.options?.find(o => o.id === correctAnswerId)?.textEn 
                          : question.options?.find(o => o.id === correctAnswerId)?.textZh}
                      </p>
                    </div>
                  )}

                  <div className={`p-4 rounded-xl ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                    <p className="text-lg font-semibold mb-2" style={{ color: isCorrect ? '#15803d' : '#991b1b' }}>
                      {t.explanation}
                    </p>
                    <p className="text-lg" style={{ color: isCorrect ? '#166534' : '#7f1d1d' }}>
                      {language === 'en' ? question.explanationEn : question.explanationZh}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setShowReview(false)}
            className="w-full py-5 px-6 bg-gray-600 hover:bg-gray-700 text-white text-2xl font-bold rounded-xl transition-colors"
          >
            {language === 'en' ? '← Back to Results' : '← 返回结果'}
          </button>
        </div>
      </div>
    );
  }

  // ========================================
  // MAIN QUESTION VIEW
  // ========================================
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">
                {t.question} {currentQuestionIndex + 1} {t.of} {totalQuestions}
              </span>
              <span className="text-lg font-semibold text-blue-600">
                {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              {language === 'en' ? currentQuestion.questionEn : currentQuestion.questionZh}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {currentQuestion.options?.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = Array.isArray(currentQuestion.correctAnswer)
                ? currentQuestion.correctAnswer.includes(option.id)
                : option.id === currentQuestion.correctAnswer;
              const showCorrect = showFeedback && isCorrect;
              const showIncorrect = showFeedback && isSelected && !isCorrect;

              return (
                <button
                  key={option.id}
                  onClick={() => !showFeedback && handleAnswerSelect(option.id)}
                  disabled={showFeedback}
                  className={`w-full p-6 text-left rounded-2xl border-2 transition-all text-xl font-medium ${
                    showCorrect
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : showIncorrect
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-300 bg-white text-gray-900 hover:border-blue-400 hover:bg-blue-50'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span>{language === 'en' ? option.textEn : option.textZh}</span>
                    {showCorrect && (
                      <div className="flex-shrink-0 ml-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" strokeWidth={3} />
                      </div>
                    )}
                    {showIncorrect && (
                      <div className="flex-shrink-0 ml-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <X className="w-5 h-5 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {showCorrect && (
                    <div className="mt-4 pt-4 border-t-2 border-green-300">
                      <p className="text-lg font-bold text-green-900 mb-2">
                        {t.explanation}
                      </p>
                      <p className="text-lg leading-relaxed text-green-800">
                        {language === 'en' ? currentQuestion.explanationEn : currentQuestion.explanationZh}
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Check Answer Button */}
          {!showFeedback && (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              className={`w-full py-4 px-6 text-xl font-semibold rounded-xl transition-all ${
                selectedAnswer
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {t.checkAnswer}
            </button>
          )}

          {/* Navigation Buttons */}
          {showFeedback && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePreviousQuestion}
                disabled={isFirstQuestion}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isFirstQuestion
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg'
                }`}
              >
                <ArrowLeft className="w-8 h-8" strokeWidth={2.5} />
              </button>

              <span className="text-2xl font-bold text-gray-700">
                {currentQuestionIndex + 1}/{totalQuestions}
              </span>

              <button
                onClick={handleNextQuestion}
                className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center transition-all shadow-lg"
              >
                {isLastQuestion ? (
                  <Check className="w-8 h-8" strokeWidth={2.5} />
                ) : (
                  <ArrowRight className="w-8 h-8" strokeWidth={2.5} />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================
          POPUP ENDING PAGE
          ======================================== */}
      {showEnding && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-6"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full">
            {/* Emoji */}
            <div className="text-center mb-4">
              <div className="text-7xl md:text-8xl">🎉</div>
            </div>

            {/* Header */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
              {t.results}
            </h2>

            {/* Score */}
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              {t.score} {correctCount}/{totalQuestions} {t.right}
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              {/* Review Explanations */}
              <button
                onClick={() => setShowReview(true)}
                className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl font-bold rounded-xl transition-colors"
              >
                {t.reviewExplanations}
              </button>

              {/* Retry and Back */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleRetryQuiz}
                  className="py-3 px-3 bg-gray-600 hover:bg-gray-700 text-white text-base md:text-lg font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{t.retry}</span>
                </button>

                <button
                  onClick={handleBackToModule}
                  className="py-3 px-3 bg-green-600 hover:bg-green-700 text-white text-base md:text-lg font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="truncate">{t.backToModule}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
