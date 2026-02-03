import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Camera, Sparkles, Heart, MessageSquare } from 'lucide-react';
import {
  FOUR_PERSON_CHATS,
  FRIENDS_LIST,
  USER_DATA,
  CONSULTATION_TOPICS,
  FRIEND_ONE_LINES,
  FriendProfile,
  FourPersonMessage,
} from '../constants';
import { useAppState } from '../contexts/AppStateContext';
import StatusBar from './StatusBar';

interface FourPersonChatDetailProps {
  friendId: number;
  onBack: () => void;
  onDiagnostic?: () => void;
  fromGo?: boolean;
}

// Message bubble for 4-person chat
const FPMessageBubble: React.FC<{
  message: FourPersonMessage;
  friend: FriendProfile;
}> = ({ message, friend }) => {
  const isUserSide = message.sender === 'user' || message.sender === 'userAI';
  const isAI = message.sender === 'userAI' || message.sender === 'friendAI';

  const getAvatar = () => {
    if (message.sender === 'user') return null;
    if (message.sender === 'userAI') return USER_DATA.characterAvatar;
    if (message.sender === 'friend') return friend.image;
    if (message.sender === 'friendAI') return friend.image;
    return null;
  };

  const avatar = getAvatar();
  const showAvatar = message.sender !== 'user';

  const getBubbleStyle = () => {
    switch (message.sender) {
      case 'user':
        return 'bg-orange-400 text-white';
      case 'userAI':
        return 'bg-orange-200 dark:bg-orange-900/40 text-orange-900 dark:text-orange-100';
      case 'friend':
        return 'bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white';
      case 'friendAI':
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300';
    }
  };

  return (
    <div className={`flex items-end gap-2 ${isUserSide ? 'justify-end' : 'justify-start'}`}>
      {showAvatar && !isUserSide && (
        <div className="relative shrink-0">
          <img src={avatar!} alt="" className="w-7 h-7 object-contain" />
          {isAI && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-orange-400 rounded-full flex items-center justify-center">
              <Sparkles size={8} className="text-white" />
            </div>
          )}
        </div>
      )}
      <div className={`max-w-[78%] px-3 py-2 rounded-2xl ${getBubbleStyle()} ${isUserSide ? 'rounded-br-md' : 'rounded-bl-md'}`}>
        {isAI && (
          <span className="text-[9px] font-semibold opacity-60 block mb-0.5">
            {message.sender === 'userAI' ? 'Your AI' : `${friend.name}'s AI`}
          </span>
        )}
        {message.isImage && message.imageUrl ? (
          <img src={message.imageUrl} alt="" className="w-full rounded-lg" />
        ) : (
          <p className="text-sm">{message.message}</p>
        )}
        <p className={`text-[10px] mt-1 text-right ${isUserSide ? 'opacity-70' : 'text-neutral-400 dark:text-neutral-500'}`}>
          {message.timestamp}
        </p>
      </div>
      {showAvatar && isUserSide && (
        <div className="relative shrink-0">
          <img src={avatar!} alt="" className="w-7 h-7 object-contain" />
          {isAI && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-orange-400 rounded-full flex items-center justify-center">
              <Sparkles size={8} className="text-white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FourPersonChatDetail: React.FC<FourPersonChatDetailProps> = ({
  friendId,
  onBack,
  onDiagnostic,
  fromGo,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [localMessages, setLocalMessages] = useState<FourPersonMessage[]>([]);
  const [showConsultSheet, setShowConsultSheet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useAppState();

  const friend = FRIENDS_LIST.find(f => f.id === friendId);
  const initialMessages = FOUR_PERSON_CHATS[friendId] || [];
  const oneLine = FRIEND_ONE_LINES.find(ol => ol.friendId === friendId);

  // If from GO, add image reveal message
  const goMessages: FourPersonMessage[] = fromGo && oneLine ? [
    ...initialMessages,
    {
      id: `go-img-${friendId}`,
      sender: 'friendAI' as const,
      message: `📸 ${friend?.name}'s today: "${oneLine.title}"`,
      timestamp: new Date().getHours() + ':' + new Date().getMinutes().toString().padStart(2, '0'),
    },
    {
      id: `go-react-${friendId}`,
      sender: 'userAI' as const,
      message: `Love this! You two should definitely talk about it 🔥`,
      timestamp: new Date().getHours() + ':' + new Date().getMinutes().toString().padStart(2, '0'),
    },
  ] : initialMessages;

  const messages = [...goMessages, ...localMessages];

  // Mark friend as GO'd if from GO
  useEffect(() => {
    if (fromGo) {
      dispatch({ type: 'GO_FRIEND', friendId });
    }
  }, [fromGo, friendId, dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [localMessages]);
  useEffect(() => { scrollToBottom(); }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newMessage: FourPersonMessage = {
      id: `local-${Date.now()}`,
      sender: 'user',
      message: inputValue.trim(),
      timestamp,
    };
    setLocalMessages(prev => [...prev, newMessage]);
    setInputValue('');
  };

  if (!friend) return null;

  return (
    <div className="absolute inset-0 bg-cream dark:bg-black z-40 flex flex-col">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-neutral-200 dark:border-neutral-800">
        <button onClick={onBack} className="p-1 -ml-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-black dark:text-white" />
        </button>
        <div className="flex items-center gap-2">
          <img src={friend.image} alt={friend.name} className="w-9 h-9 rounded-full object-contain" />
          <div className="flex -space-x-1.5">
            <div className="w-4 h-4 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center border border-white dark:border-black">
              <Sparkles size={8} className="text-orange-500" />
            </div>
            <div className="w-4 h-4 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center border border-white dark:border-black">
              <Sparkles size={8} className="text-neutral-500" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-black dark:text-white text-sm">{friend.name}</h3>
          <p className="text-[10px] text-neutral-500 dark:text-neutral-400">4P Room</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 no-scrollbar">
        <div className="flex flex-col gap-3 px-4">
          {messages.map(msg => (
            <FPMessageBubble key={msg.id} message={msg} friend={friend} />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-2 flex gap-2 border-t border-neutral-200 dark:border-neutral-800">
        <button
          onClick={onDiagnostic}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-xs active:scale-95 transition-transform"
        >
          <Heart size={14} />
          Compatibility
        </button>
        <button
          onClick={() => setShowConsultSheet(true)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 text-white font-semibold text-xs active:scale-95 transition-transform"
        >
          <MessageSquare size={14} />
          Consult
        </button>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-cream dark:bg-black">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <Camera size={22} className="text-neutral-600 dark:text-neutral-400" />
          </button>
          <div className="flex-1 flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-full px-4 py-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Message..."
              className="flex-1 bg-transparent text-sm text-black dark:text-white placeholder-neutral-500 outline-none"
            />
          </div>
          {inputValue.trim() && (
            <button onClick={handleSend} className="p-2 bg-orange-400 rounded-full hover:bg-orange-500 transition-colors">
              <Send size={18} className="text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Consultation Bottom Sheet */}
      {showConsultSheet && (
        <div className="absolute inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowConsultSheet(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 rounded-t-3xl p-6 animate-slide-up">
            <div className="w-10 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-black dark:text-white text-lg mb-4">Ask AI for advice</h3>
            <div className="flex flex-col gap-2">
              {CONSULTATION_TOPICS.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setShowConsultSheet(false)}
                  className="flex items-center gap-3 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl active:scale-[0.98] transition-transform"
                >
                  <span className="text-xl">{topic.emoji}</span>
                  <span className="font-medium text-neutral-900 dark:text-white text-sm">{topic.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FourPersonChatDetail;
