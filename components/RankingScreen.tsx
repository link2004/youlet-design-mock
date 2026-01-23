import React from 'react';
import { Crown, Medal, Trophy } from 'lucide-react';
import { FRIENDS_LIST, USER_ELEMENTS, FriendProfile } from '../constants';
import BottomNav from './BottomNav';
import { PageType } from '../App';

interface RankingScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onSelectFriend: (friend: FriendProfile) => void;
}

// 相性スコアを計算する関数
const calculateCompatibilityScore = (friend: FriendProfile): number => {
  const userHobbies = USER_ELEMENTS.filter(e => e.type === 'hobby').map(e => e.label);
  const userPersonality = USER_ELEMENTS.filter(e => e.type === 'personality').map(e => e.label);

  // 趣味の一致数
  const hobbyMatches = friend.hobbies.filter(h => userHobbies.includes(h)).length;
  // 性格の一致数
  const personalityMatches = friend.personality.filter(p => userPersonality.includes(p)).length;

  // スコア計算: 趣味 30点/個、性格 20点/個、ベース40点
  const baseScore = 40;
  const hobbyScore = hobbyMatches * 30;
  const personalityScore = personalityMatches * 20;

  return Math.min(100, baseScore + hobbyScore + personalityScore);
};

// ランキングデータを生成
const getRankedFriends = () => {
  return FRIENDS_LIST
    .map(friend => ({
      ...friend,
      score: calculateCompatibilityScore(friend)
    }))
    .sort((a, b) => b.score - a.score);
};

const RankingScreen: React.FC<RankingScreenProps> = ({ currentPage, onNavigate, onSelectFriend }) => {
  const rankedFriends = getRankedFriends();

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
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-[18px] pb-2 text-black dark:text-white font-semibold text-sm shrink-0 z-50">
        <span className="w-12">13:42</span>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5 w-20 justify-end">
          <div className="flex items-end gap-[2px] h-3">
            <div className="w-[3px] h-[4px] bg-black dark:bg-white rounded-[1px]" />
            <div className="w-[3px] h-[6px] bg-black dark:bg-white rounded-[1px]" />
            <div className="w-[3px] h-[8px] bg-black dark:bg-white rounded-[1px]" />
            <div className="w-[3px] h-[11px] bg-black dark:bg-white rounded-[1px]" />
          </div>
          <svg className="w-4 h-3 text-black dark:text-white" viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3.5 7.5c2.5-2.5 6.5-2.5 9 0l-1 1c-1.9-1.9-5.1-1.9-7 0l-1-1zM1 5c3.9-3.9 10.1-3.9 14 0l-1 1c-3.3-3.3-8.7-3.3-12 0L1 5z"/>
          </svg>
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-[11px] border-[1.5px] border-black dark:border-white rounded-[3px] relative flex items-center p-[1.5px]">
              <div className="h-full bg-black dark:bg-white rounded-[1px]" style={{ width: '80%' }} />
            </div>
            <div className="w-[3px] h-[5px] bg-black dark:bg-white rounded-r-[1px] -ml-[1px]" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative flex items-center px-4 py-2 bg-cream dark:bg-black sticky top-0 z-40 transition-colors duration-300">
        <h1 className="absolute left-1/2 -translate-x-1/2 font-serif italic font-black text-xl tracking-tight text-black dark:text-white flex items-center gap-2">
          <Trophy size={20} className="text-orange-400" />
          Compatibility
        </h1>
        <div className="flex-1" />
      </div>

      {/* Subtitle */}
      <div className="px-6 py-3">
        <p className="text-center text-neutral-500 dark:text-neutral-400 text-sm">
          Friends ranked by compatibility with you
        </p>
      </div>

      {/* Ranking List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-24">
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

                {/* Name & Info */}
                <div className="flex-1 text-left">
                  <p className="font-semibold text-neutral-900 dark:text-white text-base">
                    {friend.name}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {friend.hobbies.slice(0, 2).join(', ')}
                  </p>
                </div>

                {/* Score */}
                <div className="flex flex-col items-end">
                  <span className="text-lg font-bold text-orange-500">{friend.score}%</span>
                  <span className="text-[10px] text-neutral-400">match</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
};

export default RankingScreen;
