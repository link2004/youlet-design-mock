import React, { useState, useRef, useEffect } from 'react';
import { Search, Trophy, X } from 'lucide-react';
import { FRIENDS_LIST, FriendProfile } from '../constants';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import FriendCard from './FriendCard';
import FriendsOfFriendsList from './FriendsOfFriendsList';
import FriendCardPreview from './FriendCardPreview';
import { PageType } from '../App';

interface FeedScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onSelectFriend: (friend: FriendProfile) => void;
}

const FeedScreen: React.FC<FeedScreenProps> = ({ currentPage, onNavigate, onSelectFriend }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewFriend, setPreviewFriend] = useState<FriendProfile | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewFriendRef = useRef<FriendProfile | null>(null);

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

      {/* Header with YouLet logo */}
      <div className="relative flex items-center justify-between px-4 py-2 bg-cream dark:bg-black shrink-0 z-40 transition-colors duration-300">
        <div className="w-8" />
        <h1 className="font-serif italic font-black text-2xl tracking-tight text-black dark:text-white">
          YouLet
        </h1>
        <button
          onClick={() => onNavigate('ranking')}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Trophy size={20} className="text-orange-400" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by @username..."
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
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {isSearchFocused ? (
          <FriendsOfFriendsList
            searchQuery={searchQuery}
            onSelectFriend={(friend) => setPreviewFriend(friend)}
          />
        ) : (
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

export default FeedScreen;
