import React, { useState, useRef, useEffect } from 'react';
import { Search, Edit, ArrowLeft, Send, Image, Mic, Camera, Sparkles, Heart } from 'lucide-react';
import { DM_CHATS, DM_MESSAGES_BY_CHAT, USER_DATA, DMChat, FRIENDS_LIST, type DMMessage } from '../constants';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import FourPersonChatDetail from './FourPersonChatDetail';
import { PageType } from '../App';

interface ChatScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  initialChatId?: string;
  initialFourPersonFriendId?: number;
  fromGo?: boolean;
}

interface ChatItemProps {
  chat: DMChat;
  onClick: () => void;
  is4PRoom?: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, onClick, is4PRoom = true }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 cursor-pointer transition-colors"
  >
    <div className="relative shrink-0">
      <img
        src={chat.avatar}
        alt={chat.name}
        className="w-14 h-14 object-contain"
      />
      {chat.online && (
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-cream dark:border-black" />
      )}
      {/* AI badges for 4P room */}
      {is4PRoom && (
        <div className="absolute -top-1 -right-1 flex -space-x-1">
          <div className="w-4 h-4 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center border border-white dark:border-black">
            <Sparkles size={7} className="text-orange-500" />
          </div>
          <div className="w-4 h-4 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center border border-white dark:border-black">
            <Sparkles size={7} className="text-neutral-500" />
          </div>
        </div>
      )}
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={`font-semibold text-black dark:text-white ${chat.unread ? '' : 'font-normal'}`}>
            {chat.name}
          </span>
          {is4PRoom && (
            <span className="text-[9px] px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-full">
              4P
            </span>
          )}
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {chat.timestamp}
        </span>
      </div>
      <p className={`text-sm truncate ${chat.unread ? 'text-black dark:text-white font-medium' : 'text-neutral-500 dark:text-neutral-400'}`}>
        {chat.lastMessage}
      </p>
    </div>

    {chat.unread && (
      <div className="w-3 h-3 bg-orange-400 rounded-full shrink-0" />
    )}
  </div>
);

// AI Chat item at the top
const AIChatItem: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 hover:from-orange-100 hover:to-amber-100 dark:hover:from-orange-900/30 dark:hover:to-amber-900/30 cursor-pointer transition-colors border-b border-orange-100 dark:border-orange-900/30"
  >
    <div className="relative shrink-0">
      <img
        src={USER_DATA.characterAvatar}
        alt="Your AI"
        className="w-14 h-14 object-contain"
      />
      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center">
        <Sparkles size={12} className="text-white" />
      </div>
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="font-bold text-orange-600 dark:text-orange-400">
          AI Morasu
        </span>
        <span className="text-xs px-2 py-0.5 bg-orange-400 text-white rounded-full">
          Your AI
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
        Relationship advice & suggestions
      </p>
    </div>
  </div>
);

interface ChatDetailProps {
  chat: DMChat;
  onBack: () => void;
  onDiagnostic?: () => void;
  onAIConsult?: () => void;
  isAIChat?: boolean;
}

const InitialAvatar: React.FC<{ name: string }> = ({ name }) => (
  <div className="w-8 h-8 rounded-full bg-neutral-300 dark:bg-neutral-600 flex items-center justify-center shrink-0">
    <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
      {name.charAt(0).toUpperCase()}
    </span>
  </div>
);

interface MessageBubbleProps {
  message: DMMessage;
  chatAvatar: string;
  chatName: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, chatAvatar, chatName }) => {
  const isUser = message.sender === 'user';
  const isAI = message.isAI;
  const showAvatar = isAI || !isUser;
  const maxWidth = 'max-w-[85%]';

  const renderAvatar = () => {
    if (isAI) {
      const avatarSrc = isUser ? USER_DATA.characterAvatar : chatAvatar;
      return <img src={avatarSrc} alt="Avatar" className="w-8 h-8 object-contain shrink-0" />;
    } else {
      const name = isUser ? USER_DATA.name : chatName;
      return <InitialAvatar name={name} />;
    }
  };

  const isUserHumanMessage = isUser && !isAI;

  return (
    <div className={`flex items-end gap-2 ${isUserHumanMessage ? 'justify-end' : 'justify-start'}`}>
      {showAvatar && renderAvatar()}
      <div
        className={`${maxWidth} px-4 py-2 rounded-2xl ${
          isUser
            ? 'bg-orange-400 text-white'
            : 'bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white'
        } ${isUserHumanMessage ? 'rounded-br-md' : 'rounded-bl-md'}`}
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

// AI Chat pre-scripted messages for relationship advice
const AI_ADVICE_MESSAGES: DMMessage[] = [
  {
    id: 'ai-advice-1',
    sender: 'other',
    message: "Hey Riku! I've been watching your friend interactions. Here are some tips for deepening your connections today:",
    timestamp: '09:00',
    isAI: true,
  },
  {
    id: 'ai-advice-2',
    sender: 'other',
    message: "☕ Momo found a new cafe - you both love coffee! A perfect excuse to meet up. Try saying: 'Hey, heard you found an amazing spot in Shimokita. Want to check it out together?'",
    timestamp: '09:01',
    isAI: true,
  },
  {
    id: 'ai-advice-3',
    sender: 'other',
    message: "📸 Sora captured beautiful sunset photos. Since you're both into photography, suggest a photo walk! Golden hour is at 4:30 PM today.",
    timestamp: '09:02',
    isAI: true,
  },
  {
    id: 'ai-advice-4',
    sender: 'other',
    message: "💡 Tip: People appreciate when you remember small details. Ryo mentioned wanting to open a restaurant someday - ask about it next time!",
    timestamp: '09:03',
    isAI: true,
  },
];

const ChatDetail: React.FC<ChatDetailProps> = ({ chat, onBack, onDiagnostic, onAIConsult, isAIChat }) => {
  const [inputValue, setInputValue] = useState('');
  const [localMessages, setLocalMessages] = useState<DMMessage[]>([]);
  const [showToast, setShowToast] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessages = isAIChat ? AI_ADVICE_MESSAGES : (DM_MESSAGES_BY_CHAT[chat.id] || []);
  const messages = [...initialMessages, ...localMessages];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [localMessages]);
  useEffect(() => { scrollToBottom(); }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newMessage: DMMessage = {
      id: `local-${Date.now()}`,
      sender: 'user',
      message: inputValue.trim(),
      timestamp,
      isAI: false,
    };
    setLocalMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Show toast on AI chat for "memo saved" effect
    if (isAIChat) {
      setTimeout(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }, 500);
    }
  };

  return (
    <div className="absolute inset-0 bg-cream dark:bg-black z-40 flex flex-col">
      <StatusBar />

      <div className="flex items-center gap-3 px-4 py-2 border-b border-neutral-200 dark:border-neutral-800">
        <button onClick={onBack} className="p-1 -ml-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-black dark:text-white" />
        </button>
        <div className="relative">
          <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
          {!isAIChat && chat.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-cream dark:border-black" />
          )}
          {isAIChat && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center border-2 border-cream dark:border-black">
              <Sparkles size={10} className="text-white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-black dark:text-white">{chat.name}</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {isAIChat ? 'Your AI companion' : (chat.online ? 'Active now' : 'Offline')}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 no-scrollbar">
        {isAIChat && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <img src={USER_DATA.characterAvatar} alt="AI" className="w-24 h-24 object-contain mb-4" />
            <h3 className="font-bold text-black dark:text-white text-lg mb-2">Hey there!</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              I can help with relationship advice, conversation starters, and friend insights!
            </p>
          </div>
        )}
        <div className="flex flex-col gap-3 px-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} chatAvatar={chat.avatar} chatName={chat.name} />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {!isAIChat && (
        <div className="px-4 py-2 flex gap-2 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={onDiagnostic}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm active:scale-95 transition-transform"
          >
            <Heart size={16} />
            Compatibility
          </button>
          <button
            onClick={onAIConsult}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 text-white font-semibold text-sm active:scale-95 transition-transform"
          >
            <Sparkles size={16} />
            Ask AI
          </button>
        </div>
      )}

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
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
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
            <button onClick={handleSend} className="p-2 bg-orange-400 rounded-full hover:bg-orange-500 transition-colors">
              <Send size={20} className="text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Toast for memo saved */}
      {showToast && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-green-500 text-white text-sm rounded-full shadow-lg animate-fade-in">
          📝 Saved to memo!
        </div>
      )}
    </div>
  );
};

const ChatScreen: React.FC<ChatScreenProps> = ({
  currentPage,
  onNavigate,
  initialChatId,
  initialFourPersonFriendId,
  fromGo,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<DMChat | null>(null);
  const [isAIChat, setIsAIChat] = useState(false);
  const [fourPersonFriendId, setFourPersonFriendId] = useState<number | null>(null);

  const aiChat: DMChat = {
    id: 'ai',
    name: 'AI Morasu',
    avatar: USER_DATA.characterAvatar,
    lastMessage: '',
    timestamp: '',
    unread: false,
    online: true,
  };

  useEffect(() => {
    if (initialFourPersonFriendId) {
      setFourPersonFriendId(initialFourPersonFriendId);
    } else if (initialChatId) {
      const chat = DM_CHATS.find(c => c.id === initialChatId);
      if (chat) {
        setSelectedChat(chat);
        setIsAIChat(false);
      }
    }
  }, [initialChatId, initialFourPersonFriendId]);

  const filteredChats = DM_CHATS.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAIChat = () => {
    setSelectedChat(aiChat);
    setIsAIChat(true);
  };

  const handleOpenFriendChat = (chat: DMChat) => {
    // Find matching friend for 4P chat
    const friend = FRIENDS_LIST.find(f => f.name === chat.name);
    if (friend) {
      setFourPersonFriendId(friend.id);
    } else {
      setSelectedChat(chat);
      setIsAIChat(false);
    }
  };

  const handleDiagnostic = () => {
    onNavigate('diagnostic');
  };

  const handleAIConsult = () => {
    setSelectedChat(aiChat);
    setIsAIChat(true);
  };

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      <StatusBar />

      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <img src={USER_DATA.characterAvatar} alt="Your avatar" className="w-8 h-8 object-contain" />
          <h1 className="text-xl font-bold text-black dark:text-white">Morasu</h1>
        </div>
        <button className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
          <Edit size={24} className="text-black dark:text-white" />
        </button>
      </div>

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

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <AIChatItem onClick={handleOpenAIChat} />

        <div className="px-4 py-2">
          <h2 className="text-base font-semibold text-black dark:text-white">Friends</h2>
        </div>

        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              onClick={() => handleOpenFriendChat(chat)}
              is4PRoom={true}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-neutral-500 dark:text-neutral-400">
            <p className="text-sm">No conversations found</p>
          </div>
        )}
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />

      {/* Regular Chat Detail Overlay */}
      {selectedChat && !fourPersonFriendId && (
        <ChatDetail
          chat={selectedChat}
          onBack={() => {
            setSelectedChat(null);
            setIsAIChat(false);
          }}
          onDiagnostic={handleDiagnostic}
          onAIConsult={handleAIConsult}
          isAIChat={isAIChat}
        />
      )}

      {/* Four Person Chat Detail */}
      {fourPersonFriendId && (
        <FourPersonChatDetail
          friendId={fourPersonFriendId}
          onBack={() => setFourPersonFriendId(null)}
          onDiagnostic={handleDiagnostic}
          fromGo={fromGo}
        />
      )}
    </div>
  );
};

export default ChatScreen;
