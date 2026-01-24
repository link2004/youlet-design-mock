import React, { useState, useRef, useEffect } from 'react';
import { Search, Trophy, X } from 'lucide-react';
import { FRIENDS_LIST, FriendProfile } from '../constants';
import BottomNav from './BottomNav';
import FriendCard from './FriendCard';
import FriendsOfFriendsList from './FriendsOfFriendsList';
import FriendCardPreview from './FriendCardPreview';
import FriendCardFlipModal from './FriendCardFlipModal';
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
  const [selectedFriend, setSelectedFriend] = useState<FriendProfile | null>(null);
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
                onClick={() => setSelectedFriend(friend)}
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

      {/* Friend Card Flip Modal */}
      <FriendCardFlipModal
        friend={selectedFriend}
        isOpen={selectedFriend !== null}
        onClose={() => setSelectedFriend(null)}
        onViewDetail={(friend) => {
          setSelectedFriend(null);
          onSelectFriend(friend);
        }}
      />
    </div>
  );
};

export default FeedScreen;
