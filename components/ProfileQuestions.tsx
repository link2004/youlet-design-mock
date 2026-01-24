import React from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROFILE_QUESTIONS, ANSWER_OPTIONS, AnswerValue } from '../constants';

interface ProfileQuestionsProps {
  answers: Record<string, AnswerValue>;
  onAnswerChange: (questionId: string, answer: AnswerValue) => void;
}

const ProfileQuestions: React.FC<ProfileQuestionsProps> = ({ answers, onAnswerChange }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [animationPhase, setAnimationPhase] = React.useState<'idle' | 'exit' | 'enter'>('idle');
  const [slideDirection, setSlideDirection] = React.useState<'next' | 'prev'>('next');

  const totalCount = PROFILE_QUESTIONS.length;
  const currentQuestion = PROFILE_QUESTIONS[currentIndex];

  const goToNext = () => {
    if (currentIndex < totalCount - 1 && animationPhase === 'idle') {
      setSlideDirection('next');
      setAnimationPhase('exit');

      // Exit animation
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setAnimationPhase('enter');

        // Enter animation complete
        setTimeout(() => {
          setAnimationPhase('idle');
        }, 200);
      }, 200);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0 && animationPhase === 'idle') {
      setSlideDirection('prev');
      setAnimationPhase('exit');

      // Exit animation
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setAnimationPhase('enter');

        // Enter animation complete
        setTimeout(() => {
          setAnimationPhase('idle');
        }, 200);
      }, 200);
    }
  };

  const handleAnswer = (answer: AnswerValue) => {
    onAnswerChange(currentQuestion.id, answer);
    // Wait 0.2s before starting animation
    setTimeout(() => {
      goToNext();
    }, 200);
  };

  const getCardTransform = () => {
    if (animationPhase === 'idle') {
      return 'translate-x-0 opacity-100';
    }

    if (animationPhase === 'exit') {
      // Exit: slide out
      if (slideDirection === 'next') {
        return '-translate-x-full opacity-0'; // Go left
      } else {
        return 'translate-x-full opacity-0'; // Go right
      }
    }

    if (animationPhase === 'enter') {
      // Enter: start from opposite side, animate to center
      return 'translate-x-0 opacity-100';
    }

    return 'translate-x-0 opacity-100';
  };

  const getInitialPosition = () => {
    if (animationPhase === 'enter') {
      if (slideDirection === 'next') {
        return 'animate-slide-from-right';
      } else {
        return 'animate-slide-from-left';
      }
    }
    return '';
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

      {/* Question Card */}
      <div className="relative overflow-hidden">
        <div
          className={`bg-white dark:bg-neutral-900 rounded-2xl p-6 transition-all duration-200 ${getCardTransform()} ${getInitialPosition()}`}
          style={{
            transform: animationPhase === 'enter'
              ? undefined
              : undefined
          }}
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
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0 || animationPhase !== 'idle'}
          className={`p-2 rounded-full transition-colors ${
            currentIndex === 0
              ? 'text-neutral-300 dark:text-neutral-600'
              : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-400 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
          />
        </div>

        <button
          onClick={goToNext}
          disabled={currentIndex === totalCount - 1 || animationPhase !== 'idle'}
          className={`p-2 rounded-full transition-colors ${
            currentIndex === totalCount - 1
              ? 'text-neutral-300 dark:text-neutral-600'
              : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Percentage */}
      <div className="text-center mt-2">
        <span className="text-sm font-medium text-orange-500">
          {Math.round(((currentIndex + 1) / totalCount) * 100)}%
        </span>
      </div>

      <style>{`
        @keyframes slideFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideFromLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-from-right {
          animation: slideFromRight 0.2s ease-out forwards;
        }
        .animate-slide-from-left {
          animation: slideFromLeft 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProfileQuestions;
