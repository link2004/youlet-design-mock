import React from 'react';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { FRIENDS_LIST, FriendProfile } from '../constants';
import StatusBar from './StatusBar';

const RANK_MEDALS = [
  '/images/rank/1st_3d.png',
  '/images/rank/2nd_3d.png',
  '/images/rank/3rd_3d.png',
];

interface RankingScreenProps {
  onSelectFriend: (friend: FriendProfile) => void;
  onBack: () => void;
}

// Generate ranking data
const getWeeklyRanking = () => {
  const seed = 42;
  const shuffled = [...FRIENDS_LIST].sort((a, b) => {
    const aHash = (a.id * seed) % 100;
    const bHash = (b.id * seed) % 100;
    return bHash - aHash;
  });
  return shuffled;
};

const RankingScreen: React.FC<RankingScreenProps> = ({ onSelectFriend, onBack }) => {
  const rankedFriends = getWeeklyRanking();

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      <StatusBar />

      {/* Header */}
      <div className="relative flex items-center px-4 py-3 bg-cream dark:bg-black">
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
      </div>

      {/* Subtitle */}
      <div className="px-6 pb-4">
        <p className="text-center text-neutral-500 dark:text-neutral-400 text-xs">
          Jan 20 - Jan 26
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
                className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm transition-transform active:scale-[0.98]"
              >
                {/* Rank */}
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  {rank <= 3 ? (
                    <img
                      src={RANK_MEDALS[rank - 1]}
                      alt={`${rank}`}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <span className="text-neutral-400 font-bold text-lg">{rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className="w-11 h-11 shrink-0">
                  <img
                    src={friend.image}
                    alt={friend.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Name */}
                <div className="flex-1 text-left">
                  <p className="font-semibold text-neutral-900 dark:text-white text-sm">
                    {friend.name}
                  </p>
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
