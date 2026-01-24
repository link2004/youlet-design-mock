import React from 'react';
import { Sparkles } from 'lucide-react';
import { PROFILE_QUESTIONS, ANSWER_OPTIONS, ProfileQuestion, AnswerValue } from '../constants';

interface ProfileQuestionsProps {
  answers: Record<string, AnswerValue>;
  onAnswerChange: (questionId: string, answer: AnswerValue) => void;
}

const categoryColors: Record<ProfileQuestion['category'], string> = {
  personality: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  lifestyle: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  values: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  preferences: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  social: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
};

const categoryLabels: Record<ProfileQuestion['category'], string> = {
  personality: 'Personality',
  lifestyle: 'Lifestyle',
  values: 'Values',
  preferences: 'Preferences',
  social: 'Social',
};

const ProfileQuestions: React.FC<ProfileQuestionsProps> = ({ answers, onAnswerChange }) => {
  const answeredCount = Object.keys(answers).length;
  const totalCount = PROFILE_QUESTIONS.length;
  const progressPercent = (answeredCount / totalCount) * 100;

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
      <div className="space-y-4">
        {PROFILE_QUESTIONS.map((q) => {
          const selectedAnswer = answers[q.id];

          return (
            <div
              key={q.id}
              className="bg-white dark:bg-neutral-900 rounded-xl p-4"
            >
              {/* Category Tag */}
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[q.category]}`}
              >
                {categoryLabels[q.category]}
              </span>

              {/* Question */}
              <p className="text-sm font-medium text-neutral-900 dark:text-white mt-2 mb-3">
                {q.question}
              </p>

              {/* Answer Options */}
              <div className="flex gap-2">
                {ANSWER_OPTIONS.map((option) => {
                  const isSelected = selectedAnswer === option.value;
                  const isPositive = option.value === 'strongly_agree' || option.value === 'agree';

                  return (
                    <button
                      key={option.value}
                      onClick={() => onAnswerChange(q.id, option.value)}
                      className={`flex-1 py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? isPositive
                            ? 'bg-orange-400 text-white'
                            : 'bg-neutral-600 text-white dark:bg-neutral-500'
                          : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      <span className="block">{option.short}</span>
                    </button>
                  );
                })}
              </div>

              {/* Legend for first question only */}
              {q.id === 'q1' && (
                <div className="flex justify-between mt-2 text-[10px] text-neutral-400 dark:text-neutral-500">
                  <span>Strongly Agree</span>
                  <span>Strongly Disagree</span>
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
