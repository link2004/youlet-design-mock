import React from 'react';
import { ChevronDown, ChevronUp, Check, Sparkles } from 'lucide-react';
import { PROFILE_QUESTIONS, ProfileQuestion } from '../constants';

interface ProfileQuestionsProps {
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, answer: string) => void;
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
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const answeredCount = Object.values(answers).filter(a => a.trim().length > 0).length;
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
      <div className="space-y-3">
        {PROFILE_QUESTIONS.map((q) => {
          const isExpanded = expandedId === q.id;
          const hasAnswer = answers[q.id]?.trim().length > 0;

          return (
            <div
              key={q.id}
              className={`bg-white dark:bg-neutral-900 rounded-xl overflow-hidden transition-all duration-200 ${
                isExpanded ? 'ring-2 ring-orange-400' : ''
              }`}
            >
              {/* Question Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="w-full flex items-start gap-3 p-4 text-left"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    hasAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-700'
                  }`}
                >
                  {hasAnswer && <Check size={12} strokeWidth={3} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white leading-snug">
                    {q.question}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[q.category]}`}
                    >
                      {categoryLabels[q.category]}
                    </span>
                    {hasAnswer && (
                      <span className="text-xs text-neutral-400 dark:text-neutral-500 truncate">
                        {answers[q.id]}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-neutral-400 flex-shrink-0">
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {/* Answer Input */}
              {isExpanded && (
                <div className="px-4 pb-4">
                  <textarea
                    value={answers[q.id] || ''}
                    onChange={(e) => onAnswerChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    rows={3}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow"
                  />
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
