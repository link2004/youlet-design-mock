import React from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROFILE_QUESTIONS, ANSWER_OPTIONS, AnswerValue } from '../constants';

interface ProfileQuestionsProps {
  answers: Record<string, AnswerValue>;
  onAnswerChange: (questionId: string, answer: AnswerValue) => void;
}

const ProfileQuestions: React.FC<ProfileQuestionsProps> = ({ answers, onAnswerChange }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [slideDirection, setSlideDirection] = React.useState<'left' | 'right'>('right');

  const answeredCount = Object.keys(answers).length;
  const totalCount = PROFILE_QUESTIONS.length;
  const progressPercent = (answeredCount / totalCount) * 100;

  const currentQuestion = PROFILE_QUESTIONS[currentIndex];

  const goToNext = () => {
    if (currentIndex < totalCount - 1 && !isAnimating) {
      setSlideDirection('right');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0 && !isAnimating) {
      setSlideDirection('left');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const handleAnswer = (answer: AnswerValue) => {
    onAnswerChange(currentQuestion.id, answer);
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      goToNext();
    }, 300);
  };

  const getCircleStyle = (position: number, isSelected: boolean) => {
    if (!isSelected) {
      return 'bg-neutral-200 dark:bg-neutral-700';
    }

    switch (position) {
      case 1:
        return 'bg-cyan-400';
      case 2:
        return 'bg-cyan-300';
      case 3:
        return 'bg-neutral-400 dark:bg-neutral-500';
      case 4:
        return 'bg-orange-300';
      case 5:
        return 'bg-orange-400';
      default:
        return 'bg-neutral-200';
    }
  };

  const getCircleSize = (position: number) => {
    switch (position) {
      case 1:
      case 5:
        return 'w-12 h-12';
      case 2:
      case 4:
        return 'w-10 h-10';
      case 3:
        return 'w-9 h-9';
      default:
        return 'w-10 h-10';
    }
  };

  return (
    <div className="px-6 pb-8">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={20} className="text-orange-400" />
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
          AI Learning Questions
        </h2>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {currentIndex + 1} / {totalCount}
          </span>
          <span className="text-sm font-medium text-orange-500">
            {answeredCount} answered
          </span>
        </div>
        <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="relative overflow-hidden">
        <div
          className={`bg-white dark:bg-neutral-900 rounded-2xl p-6 transition-all duration-200 ${
            isAnimating
              ? slideDirection === 'right'
                ? '-translate-x-full opacity-0'
                : 'translate-x-full opacity-0'
              : 'translate-x-0 opacity-100'
          }`}
        >
          {/* Question */}
          <p className="text-base font-medium text-neutral-900 dark:text-white mb-8 text-center leading-relaxed">
            {currentQuestion.question}
          </p>

          {/* Answer Circles */}
          <div className="flex items-center justify-center gap-4">
            {ANSWER_OPTIONS.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`${getCircleSize(option.position)} ${getCircleStyle(option.position, isSelected)} rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
                    isSelected ? 'ring-2 ring-offset-2 ring-neutral-400 dark:ring-offset-neutral-900' : ''
                  }`}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex justify-between mt-4 text-xs text-neutral-400 dark:text-neutral-500 px-2">
            <span>Disagree</span>
            <span>Agree</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentIndex === 0
              ? 'text-neutral-300 dark:text-neutral-600'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <ChevronLeft size={18} />
          Back
        </button>

        {/* Dots indicator */}
        <div className="flex gap-1">
          {PROFILE_QUESTIONS.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                idx === currentIndex
                  ? 'bg-orange-400'
                  : answers[PROFILE_QUESTIONS[idx].id]
                  ? 'bg-orange-200 dark:bg-orange-900'
                  : 'bg-neutral-300 dark:bg-neutral-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentIndex === totalCount - 1}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentIndex === totalCount - 1
              ? 'text-neutral-300 dark:text-neutral-600'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          Skip
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProfileQuestions;
