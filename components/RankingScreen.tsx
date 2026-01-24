import React, { useState } from 'react';
import { Crown, Medal, ChevronLeft, Sparkles, Heart, AlertTriangle, CloudRain, TrendingUp } from 'lucide-react';
import { FRIENDS_LIST, FriendProfile } from '../constants';
import StatusBar from './StatusBar';
import { PageType } from '../App';

interface RankingScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onSelectFriend: (friend: FriendProfile) => void;
  onBack: () => void;
}

// Weekly ranking category definitions
interface RankingCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  bgGradient: string;
}

const RANKING_CATEGORIES: RankingCategory[] = [
  {
    id: 'big_change',
    label: 'Big Changes',
    icon: <Sparkles size={14} />,
    description: 'People with major life changes this week',
    color: 'text-purple-500',
    bgGradient: 'from-purple-500/10 to-violet-500/10'
  },
  {
    id: 'love',
    label: 'Romance',
    icon: <Heart size={14} />,
    description: 'People with romantic developments',
    color: 'text-pink-500',
    bgGradient: 'from-pink-500/10 to-rose-500/10'
  },
  {
    id: 'incident',
    label: 'Drama',
    icon: <AlertTriangle size={14} />,
    description: 'People who experienced something dramatic',
    color: 'text-orange-500',
    bgGradient: 'from-orange-500/10 to-amber-500/10'
  },
  {
    id: 'sad',
    label: 'Sadness',
    icon: <CloudRain size={14} />,
    description: 'People going through tough times',
    color: 'text-blue-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10'
  },
  {
    id: 'growth',
    label: 'Growth',
    icon: <TrendingUp size={14} />,
    description: 'People showing remarkable growth',
    color: 'text-green-500',
    bgGradient: 'from-green-500/10 to-emerald-500/10'
  }
];

// Generate ranking data for each category (shuffle using seed)
const getWeeklyRanking = (categoryId: string) => {
  // Sort differently per category (seeded shuffle)
  const seed = categoryId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const shuffled = [...FRIENDS_LIST].sort((a, b) => {
    const aHash = (a.id * seed) % 100;
    const bHash = (b.id * seed) % 100;
    return bHash - aHash;
  });

  // Generate scores (different range per category)
  return shuffled.map((friend, index) => ({
    ...friend,
    score: Math.max(45, 95 - index * 5 - ((index * seed) % 3)),
    change: index < 3 ? Math.floor(Math.random() * 5) + 1 : 0 // Show change for top 3
  }));
};

const RankingScreen: React.FC<RankingScreenProps> = ({ onSelectFriend, onBack }) => {
  const [activeCategory, setActiveCategory] = useState(RANKING_CATEGORIES[0].id);
  const currentCategory = RANKING_CATEGORIES.find(c => c.id === activeCategory) || RANKING_CATEGORIES[0];
  const rankedFriends = getWeeklyRanking(activeCategory);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown size={20} className="text-yellow-500 fill-yellow-500" />;
      case 2:
        return <Medal size={20} className="text-gray-400 fill-gray-400" />;
      case 3:
        return <Medal size={20} className="text-amber-600 fill-amber-600" />;
      default:
        return <span className="text-neutral-400 font-bold text-sm w-5 text-center">{rank}</span>;
    }
  };

  const getRankBgClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-700';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 border-gray-200 dark:border-gray-600';
      case 3:
        return 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-700';
      default:
        return 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700';
    }
  };

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      <StatusBar />

      {/* Header */}
      <div className="relative flex items-center px-4 py-2 mt-4 bg-cream dark:bg-black sticky top-0 z-40 transition-colors duration-300">
        <button
          onClick={onBack}
          className="flex items-center text-neutral-700 dark:text-neutral-400"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 font-serif italic font-black text-xl tracking-tight text-black dark:text-white flex items-center gap-2">
          <Sparkles size={20} className="text-orange-400" />
          Weekly Ranking
        </h1>
        <div className="flex-1" />
      </div>

      {/* Subtitle with week info */}
      <div className="px-6 pt-2 pb-1">
        <p className="text-center text-neutral-500 dark:text-neutral-400 text-xs">
          Weekly ranking for Jan 20 - Jan 26
        </p>
      </div>

      {/* Category Tabs */}
      <div className="px-4 py-2">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {RANKING_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.bgGradient} ${category.color} border border-current`
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-transparent'
              }`}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Description */}
      <div className="px-6 py-2">
        <p className={`text-center text-sm font-medium ${currentCategory.color}`}>
          {currentCategory.description}
        </p>
      </div>

      {/* Ranking List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-6">
        <div className="flex flex-col gap-2">
          {rankedFriends.map((friend, index) => {
            const rank = index + 1;
            return (
              <button
                key={friend.id}
                onClick={() => onSelectFriend(friend)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-transform active:scale-[0.98] ${getRankBgClass(rank)}`}
              >
                {/* Rank */}
                <div className="w-8 flex justify-center">
                  {getRankIcon(rank)}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 overflow-hidden border-2 border-white dark:border-neutral-600 shadow-sm">
                  <img
                    src={friend.image}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name & Episode */}
                <div className="flex-1 text-left min-w-0">
                  <p className="font-semibold text-neutral-900 dark:text-white text-base">
                    {friend.name}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                    {friend.events[0]?.emoji} {friend.events[0]?.title || 'No recent events'}
                  </p>
                </div>

                {/* Score & Change */}
                <div className="flex flex-col items-end">
                  <span className={`text-lg font-bold ${currentCategory.color}`}>{friend.score}pt</span>
                  {friend.change > 0 && (
                    <span className="text-[10px] text-green-500 flex items-center gap-0.5">
                      <TrendingUp size={10} />
                      +{friend.change}
                    </span>
                  )}
                  {!friend.change && (
                    <span className="text-[10px] text-neutral-400">this week</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RankingScreen;
