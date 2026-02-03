import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronRight, UserPlus } from 'lucide-react';
import { FRIENDS_LIST, FriendProfile } from '../constants';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import FriendCard from './FriendCard';
import FriendsOfFriendsList from './FriendsOfFriendsList';
import FriendCardPreview from './FriendCardPreview';
import { PageType } from '../App';

interface HomeScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onSelectFriend: (friend: FriendProfile) => void;
}

// Generate ranking data (same as RankingScreen)
const getWeeklyRanking = () => {
  const seed = 42;
  const shuffled = [...FRIENDS_LIST].sort((a, b) => {
    const aHash = (a.id * seed) % 100;
    const bHash = (b.id * seed) % 100;
    return bHash - aHash;
  });
  return shuffled;
};

// Suggestion card for new connections
const SuggestionCard: React.FC<{
  friend: FriendProfile;
  compatibility: number;
  onGo: () => void;
}> = ({ friend, compatibility, onGo }) => (
  <div className="bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl p-4 shadow-lg">
    <div className="flex items-start gap-3">
      <img
        src={friend.image}
        alt={friend.name}
        className="w-14 h-14 object-contain bg-white rounded-xl p-1"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-lg">{friend.name}</span>
          <span className="text-white/90 text-sm">- You're {compatibility}% compatible</span>
        </div>
        <p className="text-white/80 text-sm mt-1 truncate">
          What's been happening lately...
        </p>
      </div>
      <button
        onClick={onGo}
        className="shrink-0 px-4 py-2 bg-white rounded-full font-bold text-orange-500 text-sm active:scale-95 transition-transform"
      >
        GO
      </button>
    </div>
  </div>
);

// Ranking preview section
const RankingPreview: React.FC<{
  friends: FriendProfile[];
  onViewAll: () => void;
  onSelectFriend: (friend: FriendProfile) => void;
}> = ({ friends, onViewAll, onSelectFriend }) => {
  const RANK_MEDALS = [
    '/images/rank/1st_3d.png',
    '/images/rank/2nd_3d.png',
    '/images/rank/3rd_3d.png',
  ];

  return (
    <div className="mt-6">
      <button
        onClick={onViewAll}
        className="flex items-center justify-between w-full mb-3 active:opacity-70 transition-opacity"
      >
        <div className="flex items-center gap-2">
          <img src="/images/emoji/trophy_3d.png" alt="trophy" className="w-5 h-5" />
          <span className="font-bold text-black dark:text-white">Weekly Ranking</span>
        </div>
        <ChevronRight size={20} className="text-neutral-400" />
      </button>

      <div className="flex flex-col gap-2">
        {friends.slice(0, 3).map((friend, index) => (
          <button
            key={friend.id}
            onClick={() => onSelectFriend(friend)}
            className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-800 rounded-xl active:scale-[0.98] transition-transform"
          >
            <img
              src={RANK_MEDALS[index]}
              alt={`${index + 1}`}
              className="w-8 h-8 object-contain"
            />
            <img
              src={friend.image}
              alt={friend.name}
              className="w-10 h-10 object-contain"
            />
            <span className="flex-1 text-left font-semibold text-neutral-900 dark:text-white text-sm">
              {friend.userId}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 text-xs truncate max-w-[120px]">
              {friend.events[0]?.title || 'No recent activity'}
            </span>
            <ChevronRight size={16} className="text-neutral-400 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ currentPage, onNavigate, onSelectFriend }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewFriend, setPreviewFriend] = useState<FriendProfile | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewFriendRef = useRef<FriendProfile | null>(null);

  const rankedFriends = getWeeklyRanking();
  // Get a suggestion friend (not in top 3 ranking)
  const suggestionFriend = FRIENDS_LIST.find(f => !rankedFriends.slice(0, 3).some(r => r.id === f.id)) || FRIENDS_LIST[0];

  // Keep ref in sync with state for use in setTimeout callback
  useEffect(() => {
    previewFriendRef.current = previewFriend;
  }, [previewFriend]);

  const handleBlur = () => {
    // Delay to allow click on search results
    setTimeout(() => {
      // Don't close search if preview modal is open (use ref to get latest value)
      if (previewFriendRef.current) return;
      setIsSearchFocused(false);
      setSearchQuery('');
    }, 150);
  };

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      <StatusBar />

      {/* Search Bar with add friend icon */}
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
            {/* Suggestion Card */}
            <SuggestionCard
              friend={suggestionFriend}
              compatibility={96}
              onGo={() => onSelectFriend(suggestionFriend)}
            />

            {/* Friends Grid */}
            <div className="mt-6">
              <h2 className="font-bold text-black dark:text-white mb-3">Friends</h2>
              <div className="grid grid-cols-3 gap-3">
                {FRIENDS_LIST.map((friend) => (
                  <FriendCard
                    key={friend.id}
                    name={friend.name}
                    image={friend.image}
                    onClick={() => onSelectFriend(friend)}
                  />
                ))}
              </div>
            </div>

            {/* Ranking Preview */}
            <RankingPreview
              friends={rankedFriends}
              onViewAll={() => onNavigate('ranking')}
              onSelectFriend={onSelectFriend}
            />
          </>
        )}
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />

      {/* Friend Card Preview Modal */}
      <FriendCardPreview
        friend={previewFriend}
        isOpen={previewFriend !== null}
        onClose={() => {
          setPreviewFriend(null);
          // Keep search focused to show friends of friends list
        }}
        onExchange={() => {
          // Future: implement exchange logic
          setPreviewFriend(null);
          setIsSearchFocused(false);
          setSearchQuery('');
        }}
      />
    </div>
  );
};

export default HomeScreen;
