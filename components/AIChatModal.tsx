import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { MATCH_CANDIDATE, AI_CONVERSATION, USER_DATA } from '../constants';
import StatusBar from './StatusBar';

interface AIChatModalProps {
  onClose: () => void;
}

const AIChatModal: React.FC<AIChatModalProps> = ({ onClose }) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);

  useEffect(() => {
    if (visibleMessages < AI_CONVERSATION.length) {
      const timeout = setTimeout(() => {
        setVisibleMessages((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [visibleMessages]);

  return (
    <div className="absolute inset-0 bg-cream dark:bg-neutral-900 z-40 flex flex-col animate-slide-up">
      <StatusBar className="bg-white dark:bg-neutral-800" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={MATCH_CANDIDATE.avatar}
              alt={MATCH_CANDIDATE.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-white">
              {MATCH_CANDIDATE.name}
            </h3>
            <p className="text-xs text-green-500">AI chatting...</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
        >
          <X className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {AI_CONVERSATION.slice(0, visibleMessages).map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-message-in`}
          >
            {msg.sender === 'match' && (
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 shrink-0">
                <img
                  src={MATCH_CANDIDATE.avatar}
                  alt={MATCH_CANDIDATE.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-br-sm'
                  : 'bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white rounded-bl-sm shadow-sm'
              }`}
            >
              <p className="text-sm">{msg.message}</p>
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full overflow-hidden ml-2 shrink-0">
                <img
                  src={USER_DATA.avatar}
                  alt={USER_DATA.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {visibleMessages < AI_CONVERSATION.length && (
          <div className="flex justify-start animate-message-in">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 shrink-0">
              <img
                src={AI_CONVERSATION[visibleMessages].sender === 'match' ? MATCH_CANDIDATE.avatar : USER_DATA.avatar}
                alt="Typing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white dark:bg-neutral-700 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Conversation complete message */}
        {visibleMessages === AI_CONVERSATION.length && (
          <div className="text-center py-4 animate-fade-in">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              ✨ AI chat completed!
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
              Your AI started the conversation
            </p>
          </div>
        )}
      </div>

      {/* Bottom indicator */}
      <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
        <div className="bg-neutral-100 dark:bg-neutral-700 rounded-full px-4 py-2 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            AI is chatting on your behalf 🤖
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChatModal;
