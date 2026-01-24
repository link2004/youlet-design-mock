import React, { useState, useRef, useEffect } from 'react';
import { Search, Edit, ArrowLeft, Send, Image, Mic, Camera } from 'lucide-react';
import { DM_CHATS, DM_MESSAGES_BY_CHAT, USER_DATA, DMChat, DMMessage } from '../constants';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import { PageType } from '../App';

interface DMScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  initialChatId?: string;
}

interface ChatItemProps {
  chat: DMChat;
  onClick: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 cursor-pointer transition-colors"
  >
    {/* Avatar with online indicator */}
    <div className="relative shrink-0">
      <img
        src={chat.avatar}
        alt={chat.name}
        className="w-14 h-14 rounded-full object-cover"
        onError={(e) => {
          e.currentTarget.src = "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_1.png";
        }}
      />
      {chat.online && (
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-cream dark:border-black" />
      )}
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <span className={`font-semibold text-black dark:text-white ${chat.unread ? '' : 'font-normal'}`}>
          {chat.name}
        </span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {chat.timestamp}
        </span>
      </div>
      <p className={`text-sm truncate ${chat.unread ? 'text-black dark:text-white font-medium' : 'text-neutral-500 dark:text-neutral-400'}`}>
        {chat.lastMessage}
      </p>
    </div>

    {/* Unread indicator */}
    {chat.unread && (
      <div className="w-3 h-3 bg-orange-400 rounded-full shrink-0" />
    )}
  </div>
);

interface ChatDetailProps {
  chat: DMChat;
  onBack: () => void;
}

// メッセージバブルコンポーネント
interface MessageBubbleProps {
  message: DMMessage;
  chatAvatar: string;  // 相手のアバター
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, chatAvatar }) => {
  const isUser = message.sender === 'user';

  // AIメッセージの場合はアバターを表示
  if (message.isAI) {
    const avatarSrc = isUser ? USER_DATA.avatar : chatAvatar;

    return (
      <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* アバター */}
        <img
          src={avatarSrc}
          alt="Avatar"
          className="w-8 h-8 object-contain shrink-0"
        />
        {/* メッセージバブル */}
        <div
          className={`max-w-[70%] px-4 py-2 rounded-2xl ${
            isUser
              ? 'bg-orange-400 text-white rounded-br-md'
              : 'bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white rounded-bl-md'
          }`}
        >
          <p className="text-sm">{message.message}</p>
          <p className={`text-[10px] mt-1 text-right ${
            isUser ? 'text-white/70' : 'text-neutral-500 dark:text-neutral-400'
          }`}>
            {message.timestamp}
          </p>
        </div>
      </div>
    );
  }

  // 通常のメッセージ（アバターなし）
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl ${
          isUser
            ? 'bg-orange-400 text-white rounded-br-md'
            : 'bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white rounded-bl-md'
        }`}
      >
        <p className="text-sm">{message.message}</p>
        <p className={`text-[10px] mt-1 text-right ${
          isUser ? 'text-white/70' : 'text-neutral-500 dark:text-neutral-400'
        }`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
};

const ChatDetail: React.FC<ChatDetailProps> = ({ chat, onBack }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = DM_MESSAGES_BY_CHAT[chat.id] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="absolute inset-0 bg-cream dark:bg-black z-40 flex flex-col">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={onBack}
          className="p-1 -ml-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-black dark:text-white" />
        </button>
        <div className="relative">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {chat.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-cream dark:border-black" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-black dark:text-white">{chat.name}</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {chat.online ? 'Active now' : 'Offline'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 no-scrollbar">
        <div className="flex flex-col gap-3 px-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} chatAvatar={chat.avatar} />
          ))}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-cream dark:bg-black">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <Camera size={24} className="text-neutral-600 dark:text-neutral-400" />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-full px-4 py-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-transparent text-sm text-black dark:text-white placeholder-neutral-500 outline-none"
            />
            <button className="hover:opacity-70 transition-opacity">
              <Image size={20} className="text-neutral-600 dark:text-neutral-400" />
            </button>
            <button className="hover:opacity-70 transition-opacity">
              <Mic size={20} className="text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>
          {inputValue.trim() && (
            <button className="p-2 bg-orange-400 rounded-full hover:bg-orange-500 transition-colors">
              <Send size={20} className="text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const DMScreen: React.FC<DMScreenProps> = ({
  currentPage,
  onNavigate,
  initialChatId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<DMChat | null>(null);

  // Open chat when initialChatId is provided
  useEffect(() => {
    if (initialChatId) {
      const chat = DM_CHATS.find(c => c.id === initialChatId);
      if (chat) {
        setSelectedChat(chat);
      }
    }
  }, [initialChatId]);

  const filteredChats = DM_CHATS.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <img
            src={USER_DATA.avatar}
            alt="Your avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <h1 className="text-xl font-bold text-black dark:text-white">{USER_DATA.name}</h1>
        </div>
        <button className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
          <Edit size={24} className="text-black dark:text-white" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-2 bg-neutral-200/80 dark:bg-neutral-800 rounded-xl px-3 py-2">
          <Search size={18} className="text-neutral-500 dark:text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent text-sm text-black dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 outline-none"
          />
        </div>
      </div>

      {/* Messages label */}
      <div className="px-4 py-2">
        <h2 className="text-base font-semibold text-black dark:text-white">Messages</h2>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              onClick={() => setSelectedChat(chat)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-neutral-500 dark:text-neutral-400">
            <p className="text-sm">No conversations found</p>
          </div>
        )}
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />

      {/* Chat Detail Overlay */}
      {selectedChat && (
        <ChatDetail
          chat={selectedChat}
          onBack={() => setSelectedChat(null)}
        />
      )}
    </div>
  );
};

export default DMScreen;
