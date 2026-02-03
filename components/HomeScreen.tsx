import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronRight, UserPlus } from 'lucide-react';
import { FRIENDS_LIST, FRIEND_ONE_LINES, FriendProfile, TodayOneLine } from '../constants';
import { useBlurRules } from '../contexts/AppStateContext';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import RadialGraph from './RadialGraph';
import FriendsOfFriendsList from './FriendsOfFriendsList';
import FriendCardPreview from './FriendCardPreview';
import { PageType } from '../App';

interface HomeScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onSelectFriend: (friend: FriendProfile) => void;
  onTapCenter?: () => void;
  onGoFriend?: (friendId: number) => void;
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

// Today's Ranking Preview with blur and GO
const RankingPreview: React.FC<{
  friends: FriendProfile[];
  oneLines: TodayOneLine[];
  blurTitle: boolean;
  blurImage: boolean;
  isFriendGoed: (id: number) => boolean;
  onViewAll: () => void;
  onSelectFriend: (friend: FriendProfile) => void;
  onGo: (friendId: number) => void;
}> = ({ friends, oneLines, blurTitle, blurImage, isFriendGoed, onViewAll, onSelectFriend, onGo }) => {
  const RANK_MEDALS = [
    '/images/rank/1st_3d.png',
    '/images/rank/2nd_3d.png',
    '/images/rank/3rd_3d.png',
  ];

  const getOneLine = (friendId: number) => oneLines.find(ol => ol.friendId === friendId);

  return (
    <div className="mt-4">
      <button
        onClick={onViewAll}
        className="flex items-center justify-between w-full mb-3 active:opacity-70 transition-opacity"
      >
        <div className="flex items-center gap-2">
          <img src="/images/emoji/trophy_3d.png" alt="trophy" className="w-5 h-5" />
          <span className="font-bold text-black dark:text-white">Today's Ranking</span>
        </div>
        <ChevronRight size={20} className="text-neutral-400" />
      </button>

      <div className="flex flex-col gap-2">
        {friends.slice(0, 3).map((friend, index) => {
          const oneLine = getOneLine(friend.id);
          const goed = isFriendGoed(friend.id);
          return (
            <div
              key={friend.id}
              className="flex items-center gap-2 p-2.5 bg-white dark:bg-neutral-800 rounded-xl"
            >
              <img src={RANK_MEDALS[index]} alt={`${index + 1}`} className="w-7 h-7 object-contain shrink-0" />
              <button
                onClick={() => onSelectFriend(friend)}
                className="flex items-center gap-2 flex-1 min-w-0 active:opacity-70"
              >
                <div className={`w-8 h-8 rounded-lg overflow-hidden shrink-0 ${blurImage && !goed ? 'blur-sm' : ''}`}>
                  <img src={friend.image} alt={friend.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-neutral-900 dark:text-white block">
                    {friend.userId}
                  </span>
                  <span className={`text-[10px] text-neutral-500 dark:text-neutral-400 block truncate ${blurTitle ? 'blur-[3px]' : ''}`}>
                    {oneLine?.title || 'No update today'}
                  </span>
                </div>
              </button>
              <button
                onClick={() => onGo(friend.id)}
                className="shrink-0 px-3 py-1 bg-orange-400 rounded-full text-white text-xs font-bold active:scale-95 transition-transform"
              >
                GO
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Today's one-line list for all friends
const OneLineList: React.FC<{
  friends: FriendProfile[];
  oneLines: TodayOneLine[];
  blurTitle: boolean;
  blurImage: boolean;
  isFriendGoed: (id: number) => boolean;
  rankedTopIds: number[];
  onSelectFriend: (friend: FriendProfile) => void;
  onGo: (friendId: number) => void;
}> = ({ friends, oneLines, blurTitle, blurImage, isFriendGoed, rankedTopIds, onSelectFriend, onGo }) => {
  // Exclude top 3 already shown in ranking
  const remaining = friends.filter(f => !rankedTopIds.includes(f.id));
  if (remaining.length === 0) return null;

  const getOneLine = (friendId: number) => oneLines.find(ol => ol.friendId === friendId);

  return (
    <div className="mt-4">
      <h3 className="font-bold text-black dark:text-white text-sm mb-2">Today's One Lines</h3>
      <div className="flex flex-col gap-1.5">
        {remaining.map(friend => {
          const oneLine = getOneLine(friend.id);
          const goed = isFriendGoed(friend.id);
          return (
            <div
              key={friend.id}
              className="flex items-center gap-2 p-2.5 bg-white dark:bg-neutral-800 rounded-xl"
            >
              <button
                onClick={() => onSelectFriend(friend)}
                className="flex items-center gap-2 flex-1 min-w-0 active:opacity-70"
              >
                <div className={`w-8 h-8 rounded-lg overflow-hidden shrink-0 ${blurImage && !goed ? 'blur-sm' : ''}`}>
                  <img src={friend.image} alt={friend.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                    {friend.name}
                  </span>
                  <span className={`text-[10px] text-neutral-500 dark:text-neutral-400 block truncate ${blurTitle ? 'blur-[3px]' : ''}`}>
                    {oneLine?.title || 'No update today'}
                  </span>
                </div>
              </button>
              <button
                onClick={() => onGo(friend.id)}
                className="shrink-0 px-3 py-1 bg-orange-400 rounded-full text-white text-xs font-bold active:scale-95 transition-transform"
              >
                GO
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = ({
  currentPage,
  onNavigate,
  onSelectFriend,
  onTapCenter,
  onGoFriend,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewFriend, setPreviewFriend] = useState<FriendProfile | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewFriendRef = useRef<FriendProfile | null>(null);

  const { blurTitle, blurImage, isFriendGoed } = useBlurRules();
  const rankedFriends = getWeeklyRanking();
  const rankedTopIds = rankedFriends.slice(0, 3).map(f => f.id);

  useEffect(() => {
    previewFriendRef.current = previewFriend;
  }, [previewFriend]);

  const handleBlur = () => {
    setTimeout(() => {
      if (previewFriendRef.current) return;
      setIsSearchFocused(false);
      setSearchQuery('');
    }, 150);
  };

  const handleGo = (friendId: number) => {
    onGoFriend?.(friendId);
  };

  const handleTapCenter = () => {
    if (onTapCenter) {
      onTapCenter();
    } else {
      onNavigate('profile');
    }
  };

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      <StatusBar />

      {/* Search Bar */}
      <div className="px-4 py-3 shrink-0">
        <div className="relative flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search or add friends"
              className={`w-full pl-9 ${isSearchFocused ? 'pr-9' : 'pr-4'} py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm text-black dark:text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-orange-400 transition-all`}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={handleBlur}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isSearchFocused && (
              <button
                type="button"
                onClick={() => {
                  setIsSearchFocused(false);
                  setSearchQuery('');
                  inputRef.current?.blur();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500 transition-colors"
              >
                <X className="w-3 h-3 text-neutral-600 dark:text-neutral-300" />
              </button>
            )}
          </div>
          {!isSearchFocused && (
            <button
              onClick={() => {
                setIsSearchFocused(true);
                inputRef.current?.focus();
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-400 active:scale-95 transition-transform"
            >
              <UserPlus size={20} className="text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {isSearchFocused ? (
          <FriendsOfFriendsList
            searchQuery={searchQuery}
            onSelectFriend={(friend) => setPreviewFriend(friend)}
          />
        ) : (
          <>
            {/* Radial Graph */}
            <div className="flex justify-center">
              <RadialGraph
                onSelectFriend={onSelectFriend}
                onTapCenter={handleTapCenter}
                containerWidth={345}
                containerHeight={380}
              />
            </div>

            {/* Ranking Preview */}
            <RankingPreview
              friends={rankedFriends}
              oneLines={FRIEND_ONE_LINES}
              blurTitle={blurTitle}
              blurImage={blurImage}
              isFriendGoed={isFriendGoed}
              onViewAll={() => onNavigate('ranking')}
              onSelectFriend={onSelectFriend}
              onGo={handleGo}
            />

            {/* One Line List */}
            <OneLineList
              friends={FRIENDS_LIST}
              oneLines={FRIEND_ONE_LINES}
              blurTitle={blurTitle}
              blurImage={blurImage}
              isFriendGoed={isFriendGoed}
              rankedTopIds={rankedTopIds}
              onSelectFriend={onSelectFriend}
              onGo={handleGo}
            />
          </>
        )}
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />

      {/* Friend Card Preview Modal */}
      <FriendCardPreview
        friend={previewFriend}
        isOpen={previewFriend !== null}
        onClose={() => setPreviewFriend(null)}
        onExchange={() => {
          setPreviewFriend(null);
          setIsSearchFocused(false);
          setSearchQuery('');
        }}
      />
    </div>
  );
};

export default HomeScreen;
