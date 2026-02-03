import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, Bot, User, Plus } from 'lucide-react';
import {
  FriendProfile,
  DiagnosticType,
  FRIEND_ONE_LINES,
  FRIEND_CARD_BACK_DATA,
  INITIAL_FRIEND_MEMOS,
} from '../constants';
import { useAppState, useBlurRules } from '../contexts/AppStateContext';
import StatusBar from './StatusBar';
import DiagnosticTypeSheet from './DiagnosticTypeSheet';

interface FriendCardBackProps {
  friend: FriendProfile;
  onBack: () => void;
  onDiagnostic?: (diagnostic: DiagnosticType) => void;
  onChat?: () => void;
  onGo?: (friendId: number) => void;
}

const FriendCardBack: React.FC<FriendCardBackProps> = ({
  friend,
  onBack,
  onDiagnostic,
  onChat,
  onGo,
}) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [memoInput, setMemoInput] = useState('');
  const [showMemoInput, setShowMemoInput] = useState(false);
  const { state, dispatch } = useAppState();
  const { blurTitle, blurImage, isFriendGoed } = useBlurRules();

  useEffect(() => {
    const container = document.getElementById('iphone-modal-portal');
    setPortalContainer(container);
  }, []);

  const cardBackData = FRIEND_CARD_BACK_DATA.find(d => d.friendId === friend.id);
  const oneLine = FRIEND_ONE_LINES.find(ol => ol.friendId === friend.id);
  const initialMemos = INITIAL_FRIEND_MEMOS[friend.id] || [];
  const dynamicMemos = state.friendMemos[friend.id] || [];
  const allMemos = [...initialMemos.map(m => ({ ...m })), ...dynamicMemos];
  const goed = isFriendGoed(friend.id);

  const handleSelectDiagnostic = (diagnostic: DiagnosticType) => {
    setIsSheetOpen(false);
    onDiagnostic?.(diagnostic);
  };

  const handleAddMemo = () => {
    if (!memoInput.trim()) return;
    dispatch({
      type: 'ADD_MEMO',
      friendId: friend.id,
      memo: {
        id: `memo-user-${Date.now()}`,
        type: 'user',
        content: memoInput.trim(),
        timestamp: 'Just now',
      },
    });
    setMemoInput('');
    setShowMemoInput(false);
  };

  const handleGo = () => {
    onGo?.(friend.id);
  };

  if (!portalContainer) return null;

  return createPortal(
    <div className="absolute inset-0 z-50 font-sans overflow-hidden flex flex-col pointer-events-auto bg-cream dark:bg-black">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center px-4 py-2 shrink-0 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={onBack}
          className="p-1 -ml-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={24} className="text-black dark:text-white" />
        </button>
        <h3 className="flex-1 text-center font-bold text-black dark:text-white">
          {friend.name}
        </h3>
        <div className="w-6" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {/* Character Image + Basic Info */}
        <div className="flex flex-col items-center pt-6 pb-4 px-6">
          <div className="w-28 h-36 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg border-2 border-neutral-200 dark:border-neutral-600 overflow-hidden mb-3">
            <div className="w-full h-full flex items-center justify-center p-2">
              <img src={friend.image} alt={friend.name} className="w-full h-full object-contain" />
            </div>
          </div>
          <h2 className="text-lg font-bold text-black dark:text-white">{friend.name}</h2>
          <div className="flex items-center gap-3 mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{cardBackData?.hasBF ? '💑 In a relationship' : '💛 Single'}</span>
            <span>·</span>
            <span>{cardBackData?.commonFriendsCount || 0} mutual friends</span>
          </div>
        </div>

        {/* Today's One Line */}
        <div className="px-6 mb-4">
          <h3 className="font-bold text-sm text-black dark:text-white mb-2">Today's One Line</h3>
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-800 rounded-xl">
            <div className={`w-10 h-10 rounded-lg overflow-hidden shrink-0 ${blurImage && !goed ? 'blur-sm' : ''}`}>
              <img src={friend.image} alt={friend.name} className="w-full h-full object-contain" />
            </div>
            <span className={`flex-1 text-sm text-neutral-700 dark:text-neutral-300 ${blurTitle ? 'blur-[3px]' : ''}`}>
              {oneLine?.title || 'No update today'}
            </span>
            <button
              onClick={handleGo}
              className="shrink-0 px-3 py-1.5 bg-orange-400 rounded-full text-white text-xs font-bold active:scale-95 transition-transform"
            >
              GO
            </button>
          </div>
        </div>

        {/* Recent Events */}
        <div className="px-6 mb-4">
          <h3 className="font-bold text-sm text-black dark:text-white mb-2">Recent Events</h3>
          <div className="flex flex-col gap-2">
            {friend.events.map(event => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-800 rounded-xl">
                <span className="text-lg shrink-0">{event.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                    {event.title}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {event.date}
                  </span>
                </div>
              </div>
            ))}
            {friend.events.length === 0 && (
              <p className="text-sm text-neutral-400 dark:text-neutral-500 text-center py-4">No recent events</p>
            )}
          </div>
        </div>

        {/* Compatibility Button */}
        <div className="px-6 mb-4">
          <button
            onClick={() => setIsSheetOpen(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm active:scale-[0.98] transition-transform shadow-md"
          >
            Check Compatibility
          </button>
        </div>

        {/* Memos */}
        <div className="px-6 mb-6">
          <h3 className="font-bold text-sm text-black dark:text-white mb-2">Memos</h3>
          <div className="flex flex-col gap-2">
            {allMemos.map(memo => (
              <div key={memo.id} className="flex items-start gap-2 p-3 bg-white dark:bg-neutral-800 rounded-xl">
                {memo.type === 'ai' ? (
                  <Bot size={16} className="text-orange-400 shrink-0 mt-0.5" />
                ) : (
                  <User size={16} className="text-blue-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300 block">
                    {memo.content}
                  </span>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1 block">
                    {memo.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Add memo */}
            {showMemoInput ? (
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-neutral-800 rounded-xl">
                <input
                  type="text"
                  value={memoInput}
                  onChange={(e) => setMemoInput(e.target.value)}
                  placeholder="Write a memo..."
                  className="flex-1 bg-transparent text-sm text-black dark:text-white placeholder-neutral-400 outline-none"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddMemo();
                  }}
                />
                <button
                  onClick={handleAddMemo}
                  className="px-3 py-1 bg-orange-400 rounded-full text-white text-xs font-bold active:scale-95"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowMemoInput(true)}
                className="flex items-center gap-2 p-3 bg-white dark:bg-neutral-800 rounded-xl text-neutral-500 dark:text-neutral-400 active:bg-neutral-50 dark:active:bg-neutral-700 transition-colors"
              >
                <Plus size={16} />
                <span className="text-sm">Add memo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Diagnostic Type Sheet */}
      <DiagnosticTypeSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSelect={handleSelectDiagnostic}
      />
    </div>,
    portalContainer
  );
};

export default FriendCardBack;
