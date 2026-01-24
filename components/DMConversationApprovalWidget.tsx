import React, { useState, useEffect } from 'react';
import { MessageSquare, Lock, Unlock, Check, Clock } from 'lucide-react';
import { FriendProfile, ApprovalStatus } from '../constants';

interface DMConversationApprovalWidgetProps {
  friend: FriendProfile;
  status: ApprovalStatus;
  onApprove?: () => void;
  onViewConversation?: () => void;
  onSimulateTheirApproval?: () => void;
}

const DMConversationApprovalWidget: React.FC<DMConversationApprovalWidgetProps> = ({
  friend,
  status,
  onApprove,
  onViewConversation,
  onSimulateTheirApproval,
}) => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showUnlocked, setShowUnlocked] = useState(false);

  useEffect(() => {
    if (status === 'approved' && !showUnlocked) {
      setIsUnlocking(true);
      const timer = setTimeout(() => {
        setIsUnlocking(false);
        setShowUnlocked(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status, showUnlocked]);

  if (status === 'none') return null;

  // Pending sent - waiting for their approval
  if (status === 'pending_sent') {
    return (
      <div className="mx-4 my-2">
        <div
          className="bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 rounded-2xl p-4 border border-orange-200 dark:border-orange-800 cursor-pointer active:scale-[0.99] transition-transform"
          onClick={onSimulateTheirApproval}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-400 rounded-xl">
              <MessageSquare size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">
                AI Conversation Shared
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                Waiting for {friend.name}'s approval to unlock their AI's messages
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Clock size={14} className="text-orange-500" />
                <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                  Pending approval...
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-2 italic">
                (Tap to simulate approval)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pending received - they shared, waiting for your approval
  if (status === 'pending_received') {
    return (
      <div className="mx-4 my-2">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <Lock size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">
                {friend.name} shared their AI conversation!
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                Approve to unlock each other's AI messages
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={onViewConversation}
                  className="flex-1 py-2 px-3 bg-white dark:bg-neutral-800 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  Preview
                </button>
                <button
                  onClick={onApprove}
                  className="flex-1 py-2 px-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-sm font-bold text-white shadow-lg active:scale-[0.98] transition-transform"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Approved - show unlocked state with animation
  if (status === 'approved') {
    return (
      <div className="mx-4 my-2">
        <div
          className={`bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-4 border border-green-200 dark:border-green-800 transition-all duration-500 ${
            isUnlocking ? 'animate-pulse' : ''
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl transition-transform duration-500 ${
                isUnlocking ? 'animate-bounce' : ''
              }`}
            >
              {isUnlocking ? (
                <Lock size={20} className="text-white animate-spin" />
              ) : (
                <Unlock size={20} className="text-white" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-neutral-900 dark:text-white text-sm flex items-center gap-2">
                {isUnlocking ? 'Unlocking...' : 'Conversation Unlocked!'}
                {!isUnlocking && <Check size={16} className="text-green-500" />}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                {isUnlocking
                  ? 'Verifying mutual approval...'
                  : 'You can now see the full AI conversation'}
              </p>
              {!isUnlocking && (
                <button
                  onClick={onViewConversation}
                  className="mt-3 py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-sm font-bold text-white shadow-lg active:scale-[0.98] transition-transform"
                >
                  View Full Conversation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DMConversationApprovalWidget;
