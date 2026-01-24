import React from 'react';
import { Sparkles } from 'lucide-react';
import { PROFILE_QUESTIONS, ANSWER_OPTIONS, AnswerValue } from '../constants';

interface ProfileQuestionsProps {
  answers: Record<string, AnswerValue>;
  onAnswerChange: (questionId: string, answer: AnswerValue) => void;
}

const ProfileQuestions: React.FC<ProfileQuestionsProps> = ({ answers, onAnswerChange }) => {
  const answeredCount = Object.keys(answers).length;
  const totalCount = PROFILE_QUESTIONS.length;
  const progressPercent = (answeredCount / totalCount) * 100;

  const getCircleStyle = (position: number, isSelected: boolean) => {
    // Position 1-2: Disagree (cyan/light blue)
    // Position 3: Neutral (gray)
    // Position 4-5: Agree (orange)
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
    // Outer circles are larger
    switch (position) {
      case 1:
      case 5:
        return 'w-10 h-10';
      case 2:
      case 4:
        return 'w-8 h-8';
      case 3:
        return 'w-7 h-7';
      default:
        return 'w-8 h-8';
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
            {answeredCount} of {totalCount} answered
          </span>
          <span className="text-sm font-medium text-orange-500">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">
          Answer more questions to help AI understand you better
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {PROFILE_QUESTIONS.map((q, index) => {
          const selectedAnswer = answers[q.id];

          return (
            <div key={q.id} className="bg-white dark:bg-neutral-900 rounded-xl p-4">
              {/* Question */}
              <p className="text-sm font-medium text-neutral-900 dark:text-white mb-4 text-center">
                {q.question}
              </p>

              {/* Answer Circles */}
              <div className="flex items-center justify-center gap-3">
                {ANSWER_OPTIONS.map((option) => {
                  const isSelected = selectedAnswer === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => onAnswerChange(q.id, option.value)}
                      className={`${getCircleSize(option.position)} ${getCircleStyle(option.position, isSelected)} rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
                        isSelected ? 'ring-2 ring-offset-2 ring-neutral-400 dark:ring-offset-neutral-900' : ''
                      }`}
                    />
                  );
                })}
              </div>

              {/* Legend for first question only */}
              {index === 0 && (
                <div className="flex justify-between mt-3 text-xs text-neutral-400 dark:text-neutral-500">
                  <span>Disagree</span>
                  <span>Agree</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileQuestions;
