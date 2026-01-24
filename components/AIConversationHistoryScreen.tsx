import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, Lock, Send, Edit3 } from 'lucide-react';
import { FriendProfile, FriendEvent, AIConversationMessage, FRIEND_AI_CONVERSATIONS, ApprovalStatus, CARD_BACK_EVENTS } from '../constants';
import CardBackEditModal from './CardBackEditModal';

interface AIConversationHistoryScreenProps {
  friend: FriendProfile;
  onBack: () => void;
  onSendApproval: () => void;
  approvalStatus: ApprovalStatus;
}

const AIConversationHistoryScreen: React.FC<AIConversationHistoryScreenProps> = ({
  friend,
  onBack,
  onSendApproval,
  approvalStatus,
}) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [messages, setMessages] = useState<AIConversationMessage[]>([]);
  const [showContent, setShowContent] = useState(false);
  const [myEvents, setMyEvents] = useState<FriendEvent[]>(CARD_BACK_EVENTS);
  const [showCardBackEditModal, setShowCardBackEditModal] = useState(false);

  useEffect(() => {
    const container = document.getElementById('iphone-modal-portal');
    setPortalContainer(container);
  }, []);

  useEffect(() => {
    const friendMessages = FRIEND_AI_CONVERSATIONS[friend.id] || [];
    setMessages(friendMessages.filter(m => !m.isDeleted));
  }, [friend.id]);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isApproved = approvalStatus === 'approved';

  if (!portalContainer) return null;

  return createPortal(
    <div className="absolute inset-0 z-[60] font-sans overflow-hidden flex flex-col pointer-events-auto">
      {/* Background */}
      <div className="absolute inset-0 bg-cream dark:bg-black z-0" />

      {/* Status Bar */}
      <div className="relative z-10 flex justify-between items-center px-6 pt-[18px] pb-2 text-black dark:text-white font-semibold text-sm shrink-0">
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
      <div className="relative z-10 flex items-center gap-3 px-4 py-2 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors active:scale-95"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-6 text-black dark:text-white" />
        </button>
        <div className="flex items-center gap-3">
          <img
            src={friend.image}
            alt={friend.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h1 className="text-lg font-bold text-black dark:text-white">AI Conversation</h1>
            <p className="text-xs text-neutral-500">with {friend.name}'s AI</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 no-scrollbar">
        {/* My Events Section */}
        {myEvents.length > 0 && (
          <div className="mb-4 bg-neutral-100 dark:bg-neutral-800/50 rounded-2xl p-4">
            <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3">
              My Events
            </h3>
            <div className="space-y-3">
              {myEvents.map((event) => (
                <div key={event.id} className="flex gap-3">
                  <span className="text-xl flex-shrink-0">{event.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black dark:text-white">{event.title}</p>
                    {event.description && (
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">
                        {event.description}
                      </p>
                    )}
                    <p className="text-[10px] text-neutral-500 mt-1">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {messages.map((msg, index) => {
            const isMyAI = msg.sender === 'my_ai';
            const shouldBlur = !isMyAI && !isApproved;

            return (
              <div
                key={msg.id}
                className={`flex ${isMyAI ? 'justify-end' : 'justify-start'}`}
                style={{
                  opacity: showContent ? 1 : 0,
                  transform: showContent ? 'translateY(0)' : 'translateY(10px)',
                  transition: `all 0.3s ease ${index * 50}ms`,
                }}
              >
                <div className="max-w-[80%] flex flex-col gap-1">
                  {/* Sender label */}
                  <span className={`text-[10px] text-neutral-500 ${isMyAI ? 'text-right' : 'text-left'}`}>
                    {isMyAI ? 'Your AI' : `${friend.name}'s AI`}
                  </span>

                  <div className="relative">
                    {/* Message bubble */}
                    <div
                      className={`relative px-4 py-3 rounded-2xl ${
                        isMyAI
                          ? 'bg-orange-400 text-white rounded-br-md'
                          : 'bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white rounded-bl-md'
                      } ${shouldBlur ? 'select-none' : ''}`}
                    >
                      <p
                        className={`text-sm transition-all duration-500 ${
                          shouldBlur ? 'blur-sm' : ''
                        }`}
                      >
                        {msg.message}
                      </p>
                      <p
                        className={`text-[10px] mt-1.5 ${
                          isMyAI ? 'text-white/70' : 'text-neutral-500 dark:text-neutral-400'
                        }`}
                      >
                        {msg.timestamp}
                      </p>

                      {/* Lock overlay for blurred messages */}
                      {shouldBlur && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/30 backdrop-blur-[2px] rounded-full p-2">
                            <Lock size={16} className="text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-neutral-500">
            <p className="text-sm">No AI conversation yet</p>
          </div>
        )}
      </div>

      {/* Footer - Send Approval Button + Edit Button */}
      {approvalStatus === 'none' && (
        <div className="relative z-10 px-4 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-cream dark:bg-black">
          <div className="flex gap-2">
            <button
              onClick={() => setShowCardBackEditModal(true)}
              className="px-4 py-3 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors flex items-center justify-center gap-2"
            >
              <Edit3 size={18} />
              Edit
            </button>
            <button
              onClick={onSendApproval}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold rounded-xl shadow-lg active:scale-[0.98] transition-transform"
            >
              <Send size={18} />
              Share & Request Approval
            </button>
          </div>
          <p className="text-center text-xs text-neutral-500 mt-2">
            Share this conversation with {friend.name} to unlock their AI's messages
          </p>
        </div>
      )}

      {approvalStatus === 'pending_sent' && (
        <div className="relative z-10 px-4 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-cream dark:bg-black">
          <div className="flex gap-2">
            <button
              onClick={() => setShowCardBackEditModal(true)}
              className="px-4 py-3 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors flex items-center justify-center gap-2"
            >
              <Edit3 size={18} />
              Edit
            </button>
            <div className="flex-1 py-3 bg-neutral-200 dark:bg-neutral-700 text-neutral-500 font-medium rounded-xl text-center">
              Waiting for {friend.name}'s approval...
            </div>
          </div>
        </div>
      )}

      {approvalStatus === 'approved' && (
        <div className="relative z-10 px-4 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-cream dark:bg-black">
          <div className="flex gap-2">
            <button
              onClick={() => setShowCardBackEditModal(true)}
              className="px-4 py-3 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors flex items-center justify-center gap-2"
            >
              <Edit3 size={18} />
              Edit
            </button>
            <div className="flex-1 py-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium rounded-xl text-center flex items-center justify-center gap-2">
              <Lock size={16} className="inline" />
              Mutually Approved - Full conversation unlocked!
            </div>
          </div>
        </div>
      )}

      {/* Card Back Edit Modal */}
      {showCardBackEditModal && (
        <CardBackEditModal
          events={myEvents}
          onClose={() => setShowCardBackEditModal(false)}
          onSave={(newEvents) => {
            setMyEvents(newEvents);
            setShowCardBackEditModal(false);
          }}
        />
      )}
    </div>,
    portalContainer
  );
};

export default AIConversationHistoryScreen;
