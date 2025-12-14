import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Quiz as QuizType, QuizQuestion } from '../types';
import { POINTS, PASSING_SCORE_PERCENTAGE } from '../types';

interface QuizProps {
  quiz: QuizType;
  moduleId: string;
  onComplete: (score: number, points: number) => void;
  language: 'en' | 'zh';
}

const Quiz: React.FC<QuizProps> = ({ quiz, moduleId, onComplete, language }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const navigate = useNavigate();

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    // Save answer
    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate results
      calculateResults(newAnswers);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
    }
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

    // Calculate points
    let points = POINTS.BASE_COMPLETION;
    points += correctCount * POINTS.PER_CORRECT_ANSWER;
    if (scorePercentage === 100) {
      points += POINTS.PERFECT_SCORE_BONUS;
    }

    // Show confetti if passed
    if (passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#1976D2', '#4CAF50'],
      });
    }

    setShowResults(true);
    onComplete(scorePercentage, points);
  };

  const getIsCorrect = (questionId: string): boolean => {
    const question = quiz.questions.find((q) => q.id === questionId);
    if (!question) return false;

    if (Array.isArray(question.correctAnswer)) {
      return question.correctAnswer.includes(answers[questionId]);
    }
    return answers[questionId] === question.correctAnswer;
  };

  const correctCount = quiz.questions.filter((q) => getIsCorrect(q.id)).length;
  const scorePercentage = (correctCount / quiz.questions.length) * 100;
  const passed = scorePercentage >= PASSING_SCORE_PERCENTAGE;

  const texts = {
    en: {
      question: 'Question',
      of: 'of',
      next: 'Next',
      submit: 'Submit Quiz',
      showAnswer: 'Show Explanation',
      correct: 'Correct!',
      incorrect: 'Incorrect',
      results: 'Quiz Results',
      score: 'Your Score',
      passed: 'Congratulations! You passed!',
      failed: 'Keep practicing. You can retake this quiz.',
      retry: 'Retry Quiz',
      continue: 'Continue',
    },
    zh: {
      question: '问题',
      of: '/',
      next: '下一个',
      submit: '提交测验',
      showAnswer: '显示解释',
      correct: '正确！',
      incorrect: '不正确',
      results: '测验结果',
      score: '你的分数',
      passed: '恭喜！你通过了！',
      failed: '继续练习。你可以重新参加这个测验。',
      retry: '重试测验',
      continue: '继续',
    },
  };

  const t = texts[language];

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="card text-center">
          <div className="text-6xl mb-6">
            {passed ? '🎉' : '📚'}
          </div>

          <h2 className="text-senior-2xl font-bold text-gray-900 mb-4">
            {t.results}
          </h2>

          {/* Score Display */}
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-12 h-12 text-gold" />
              <span className="text-6xl font-bold text-primary">
                {Math.round(scorePercentage)}%
              </span>
            </div>
            <p className="text-senior-lg text-gray-700">
              {correctCount} {t.of} {quiz.questions.length} {t.correct.toLowerCase()}
            </p>
          </div>

          {/* Pass/Fail Message */}
          <div className={`p-6 rounded-xl mb-6 ${passed ? 'bg-success-50' : 'bg-red-50'}`}>
            <p className="text-senior-lg font-semibold mb-2" style={{ color: passed ? '#4CAF50' : '#EF5350' }}>
              {passed ? t.passed : t.failed}
            </p>
            {!passed && (
              <p className="text-senior-base text-gray-600">
                You need {PASSING_SCORE_PERCENTAGE}% to pass.
              </p>
            )}
          </div>

          {/* Review Answers */}
          <div className="space-y-4 mb-6 text-left">
            {quiz.questions.map((question) => {
              const isCorrect = getIsCorrect(question.id);
              const userAnswer = answers[question.id];

              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-xl border-2 ${
                    isCorrect ? 'border-success bg-success-50' : 'border-red-400 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <p className="text-senior-base font-semibold text-gray-900">
                      {language === 'en' ? question.questionEn : question.questionZh}
                    </p>
                  </div>
                  <p className="text-senior-sm text-gray-700 ml-9">
                    {language === 'en' ? question.explanationEn : question.explanationZh}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!passed && (
              <button
                onClick={() => window.location.reload()}
                className="btn-secondary flex-1"
              >
                {t.retry}
              </button>
            )}
            <button
              onClick={() => navigate(`/module/${moduleId}`)}
              className="btn-primary flex-1"
            >
              {t.continue}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-senior-base font-semibold text-gray-700">
              {t.question} {currentQuestionIndex + 1} {t.of} {quiz.questions.length}
            </span>
            <span className="text-senior-base text-primary">
              {Math.round(((currentQuestionIndex) / quiz.questions.length) * 100)}%
            </span>
          </div>
          <div className="progress-bar h-2">
            <div
              className="progress-bar-fill"
              style={{ width: `${(currentQuestionIndex / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-senior-xl font-bold text-gray-900 mb-6">
            {language === 'en' ? currentQuestion.questionEn : currentQuestion.questionZh}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`w-full p-5 text-left rounded-xl border-2 transition-all text-senior-base ${
                  selectedAnswer === option.id
                    ? 'border-primary bg-primary-50'
                    : 'border-gray-300 bg-white hover:border-primary-300'
                }`}
              >
                {language === 'en' ? option.textEn : option.textZh}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="btn-secondary"
            disabled={!selectedAnswer}
          >
            {t.showAnswer}
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="btn-primary"
          >
            {isLastQuestion ? t.submit : t.next}
          </button>
        </div>

        {/* Explanation (if shown) */}
        {showExplanation && selectedAnswer && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-primary">
            <p className="text-senior-base text-gray-800">
              {language === 'en' ? currentQuestion.explanationEn : currentQuestion.explanationZh}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
