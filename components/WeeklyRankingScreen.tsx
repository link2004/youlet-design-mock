import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Sparkles, Calendar } from 'lucide-react';
import BottomNav from './BottomNav';
import { PageType } from '../App';
import { RANKING_CATEGORIES, WEEKLY_RANKINGS, RankingCategory, RankingUser } from '../constants';

interface WeeklyRankingScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const RankingItem: React.FC<{ user: RankingUser; rank: number }> = ({ user, rank }) => {
  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-orange-300 to-orange-400 text-white';
    return 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300';
  };

  const getTrendIcon = () => {
    if (user.trend === 'new') {
      return <span className="text-xs font-bold text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-1.5 py-0.5 rounded">NEW</span>;
    }
    if (user.trend === 'up') {
      return (
        <span className="flex items-center text-green-500 text-xs">
          <ChevronUp size={14} />
          {user.previousRank && <span>{user.previousRank - rank}</span>}
        </span>
      );
    }
    if (user.trend === 'down') {
      return (
        <span className="flex items-center text-red-500 text-xs">
          <ChevronDown size={14} />
          {user.previousRank && <span>{rank - user.previousRank}</span>}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-800 rounded-xl shadow-sm animate-fade-in">
      <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${getRankBadge(rank)}`}>
        {rank}
      </div>
      <img
        src={user.avatar}
        alt={user.name}
        className="w-12 h-12 rounded-full object-cover bg-neutral-200 dark:bg-neutral-700"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">{user.name}</span>
          {getTrendIcon()}
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">{user.summary}</p>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-orange-500">{user.score}</div>
        <div className="text-xs text-neutral-400">pts</div>
      </div>
    </div>
  );
};

const WeeklyRankingScreen: React.FC<WeeklyRankingScreenProps> = ({ currentPage, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<RankingCategory>('changes');

  const currentDate = new Date();
  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="relative w-full h-full bg-cream dark:bg-neutral-900 overflow-hidden flex flex-col">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 py-2">
        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-1 rounded-full bg-neutral-800 dark:bg-neutral-200 ${
                  i === 1 ? 'h-1' : i === 2 ? 'h-2' : i === 3 ? 'h-3' : 'h-4'
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-xs font-medium text-neutral-800 dark:text-neutral-200">5G</span>
          <div className="ml-2 w-6 h-3 border border-neutral-800 dark:border-neutral-200 rounded-sm relative">
            <div className="absolute inset-0.5 bg-neutral-800 dark:bg-neutral-200 rounded-sm" style={{ width: '70%' }} />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="text-orange-400" size={24} />
            <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              Weekly Ranking
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <Calendar size={14} />
          <span>{formatDate(weekStart)} - {formatDate(weekEnd)}</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {RANKING_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? 'bg-orange-400 text-white shadow-md'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
              }`}
            >
              <span>{category.emoji}</span>
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Ranking List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-24">
        <div className="space-y-3">
          {WEEKLY_RANKINGS[activeCategory].map((user, index) => (
            <RankingItem key={user.id} user={user} rank={index + 1} />
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
          <p className="text-sm text-orange-700 dark:text-orange-300 text-center">
            ランキングは毎週月曜日に更新されます
          </p>
        </div>
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
};

export default WeeklyRankingScreen;
