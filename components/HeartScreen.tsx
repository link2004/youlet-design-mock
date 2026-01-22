import React, { useState, useEffect } from 'react';
import { USER_DATA, MATCH_CANDIDATE, SHARED_INTERESTS } from '../constants';
import BottomNav from './BottomNav';
import ProfileCard from './ProfileCard';
import AIChatModal from './AIChatModal';
import { PageType } from '../App';

const DIALOGUE_LINES = [
  "Hey! So happy to see you!",
  "How's your day going?",
  "I was just thinking about you...",
  "Want to hear something funny?",
  "You're looking great today!",
  "I missed you so much!",
  "Let's do something fun together!",
  "Did anything exciting happen?",
  "You always brighten my day!",
  "I'm so glad we can talk like this.",
];

const PROPOSAL_MESSAGE = `I found someone special! ${MATCH_CANDIDATE.name} shares ${SHARED_INTERESTS.length} interests with you!`;

type MatchingState = 'idle' | 'notification' | 'proposing' | 'showingCard' | 'chatting' | 'completed';

interface HeartScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const HeartScreen: React.FC<HeartScreenProps> = ({ currentPage, onNavigate }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [matchingState, setMatchingState] = useState<MatchingState>('idle');
  const [dialogueCount, setDialogueCount] = useState(0);

  // Trigger notification after 3 dialogue lines
  useEffect(() => {
    if (dialogueCount >= 3 && matchingState === 'idle') {
      setMatchingState('notification');
    }
  }, [dialogueCount, matchingState]);

  // Handle dialogue typing (only in idle state)
  useEffect(() => {
    if (matchingState !== 'idle') return;

    const targetText = DIALOGUE_LINES[currentLineIndex];

    if (isTyping) {
      if (displayedText.length < targetText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(targetText.slice(0, displayedText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const pauseTimeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(pauseTimeout);
      }
    } else {
      const nextTimeout = setTimeout(() => {
        setCurrentLineIndex((prev) => (prev + 1) % DIALOGUE_LINES.length);
        setDisplayedText('');
        setIsTyping(true);
        setDialogueCount((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(nextTimeout);
    }
  }, [displayedText, isTyping, currentLineIndex, matchingState]);

  // Handle proposal typing
  useEffect(() => {
    if (matchingState !== 'proposing') return;

    if (isTyping) {
      if (displayedText.length < PROPOSAL_MESSAGE.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(PROPOSAL_MESSAGE.slice(0, displayedText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
      }
    }
  }, [displayedText, isTyping, matchingState]);

  // Handle notification tap - start proposing
  const handleNotificationTap = () => {
    if (matchingState === 'notification') {
      setMatchingState('proposing');
      setDisplayedText('');
      setIsTyping(true);
    }
  };

  // Handle proposal tap - show card
  const handleProposalTap = () => {
    if (matchingState === 'proposing' && !isTyping) {
      setMatchingState('showingCard');
    }
  };

  const handleAccept = () => {
    setMatchingState('chatting');
  };

  const handleDecline = () => {
    setMatchingState('completed');
  };

  const handleChatClose = () => {
    setMatchingState('completed');
  };

  // Reset after completed state
  useEffect(() => {
    if (matchingState === 'completed') {
      const timeout = setTimeout(() => {
        setMatchingState('idle');
        setDialogueCount(0);
        setCurrentLineIndex(0);
        setDisplayedText('');
        setIsTyping(true);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [matchingState]);

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

      {/* Main Content - Character centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Notification Bubble (exclamation mark) */}
          {matchingState === 'notification' && (
            <button
              onClick={handleNotificationTap}
              className="relative mb-4 animate-bounce"
            >
              <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <span className="text-white text-2xl font-bold">!</span>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-orange-500" />
              </div>
            </button>
          )}

          {/* Speech Bubble (idle or proposing state) */}
          {(matchingState === 'idle' || matchingState === 'proposing' || matchingState === 'showingCard') && (
            <div className="relative mb-4">
              <div className={`bg-white dark:bg-neutral-800 rounded-2xl px-5 py-3 shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[180px] min-h-[44px] max-w-[260px] transition-all ${
                matchingState === 'proposing' || matchingState === 'showingCard' ? 'ring-2 ring-orange-300 dark:ring-orange-500/50' : ''
              }`}>
                <p className="text-sm text-neutral-800 dark:text-neutral-200">
                  {displayedText}
                </p>
              </div>
              {/* Bubble tail */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-2">
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white dark:border-t-neutral-800" />
              </div>
            </div>
          )}

          <div className="relative">
            <div className="w-56 h-56 flex items-center justify-center">
              <img
                src={USER_DATA.avatar}
                alt="Character"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_15.png";
                }}
              />
            </div>
            {/* Foot shadow */}
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 w-40 h-6 rounded-[50%] bg-black/20 dark:bg-white/35 blur-md"
            />
          </div>

          {/* Button - Right below character */}
          {matchingState === 'proposing' && !isTyping && (
            <button
              onClick={handleProposalTap}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:from-orange-500 hover:to-orange-600 active:scale-[0.98] transition-all animate-pulse"
            >
              See Profile ✨
            </button>
          )}
        </div>
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />

      {/* Full screen tap overlay for proposing state */}
      {matchingState === 'proposing' && !isTyping && (
        <div
          className="absolute inset-0 z-30"
          onClick={handleProposalTap}
        />
      )}

      {/* Profile Card Overlay */}
      {matchingState === 'showingCard' && (
        <ProfileCard onAccept={handleAccept} onClose={handleDecline} />
      )}

      {/* AI Chat Modal */}
      {matchingState === 'chatting' && (
        <AIChatModal onClose={handleChatClose} />
      )}
    </div>
  );
};

export default HeartScreen;
