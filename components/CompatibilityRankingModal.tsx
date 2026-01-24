import React from 'react';
import { X, Trophy, Sparkles } from 'lucide-react';
import { PAST_COMPATIBILITY_RESULTS } from '../constants';

interface CompatibilityRankingModalProps {
  onClose: () => void;
}

const CompatibilityRankingModal: React.FC<CompatibilityRankingModalProps> = ({ onClose }) => {
  const getRankStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white';
      case 1:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
      case 2:
        return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
      default:
        return 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300';
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-3 h-3" />;
    return <span className="text-xs font-bold">{index + 1}</span>;
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/50 animate-fade-in">
      <div className="relative bg-white dark:bg-neutral-800 rounded-3xl p-5 mx-4 shadow-2xl max-w-[300px] w-full animate-scale-in max-h-[80%] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors z-10"
        >
          <X className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
        </button>

        {/* Header */}
        <div className="text-center mb-4 pt-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold text-neutral-800 dark:text-white">
              Compatibility Ranking
            </h3>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Your past matches
          </p>
        </div>

        {/* Ranking List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {PAST_COMPATIBILITY_RESULTS.map((result, index) => (
            <div
              key={result.id}
              className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              {/* Rank Badge */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${getRankStyle(index)}`}>
                {getRankIcon(index)}
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-200 dark:border-orange-400/30 shrink-0">
                <img
                  src={result.avatar}
                  alt={result.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-800 dark:text-white truncate">
                  {result.name}, {result.age}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {result.sharedInterests} shared interests
                </p>
              </div>

              {/* Score */}
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-orange-500">
                  {result.compatibilityScore}%
                </p>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500">
                  match
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompatibilityRankingModal;
