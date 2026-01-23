import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Heart, Sparkles, MessageCircleHeart, X, Share2 } from 'lucide-react';
import { DiagnosticType, FRIENDS_LIST, MY_PROFILE } from '../constants';

interface Friend {
  id: number;
  name: string;
  image: string;
}

type DiagnosticPhase = 'select' | 'loading' | 'result';

interface DiagnosticResult {
  percentage: number;
  strengths: string[];
  advice: string;
}

const LOVE_RESULT: DiagnosticResult = {
  percentage: 87,
  strengths: [
    "共通の趣味が多い",
    "価値観が近い",
    "コミュニケーションスタイルが合う"
  ],
  advice: "お互いの小さな違いを尊重し合うことで、より深い関係を築けるでしょう。"
};

interface DiagnosticDetailScreenProps {
  diagnostic: DiagnosticType;
  onBack: () => void;
}

interface FriendSelectSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (friend: Friend) => void;
}

// 脈打つハートコンポーネント
const PulsingHeart: React.FC = () => {
  return (
    <div className="relative">
      <Heart
        className="w-16 h-16 text-white fill-white drop-shadow-lg"
        style={{
          animation: 'pulse-heart 1.2s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

// 数字カウントアップコンポーネント
const CountUpNumber: React.FC<{ target: number; duration?: number }> = ({ target, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count}</span>;
};

// ローディング画面用のミニカード
interface MiniCardProps {
  person: Friend | typeof MY_PROFILE;
}

const MiniCard: React.FC<MiniCardProps> = ({ person }) => {
  return (
    <div className="w-20">
      <div className="w-full aspect-[2/3] rounded-xl bg-white shadow-lg border-2 border-white/80 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-2 bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-t-[10px] min-h-0 overflow-hidden">
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="px-2 py-1 bg-white border-t border-neutral-200 rounded-b-[10px] shrink-0">
          <span className="text-[10px] text-neutral-700 font-semibold block text-center truncate">
            {person.name}
          </span>
        </div>
      </div>
    </div>
  );
};

// ローディング画面
interface LoadingPhaseProps {
  myProfile: typeof MY_PROFILE;
  friend: Friend;
}

const LoadingPhase: React.FC<LoadingPhaseProps> = ({ myProfile, friend }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      {/* 脈打つハート */}
      <div className="mb-8">
        <PulsingHeart />
      </div>

      {/* 2枚のカード */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <MiniCard person={myProfile} />
        <MiniCard person={friend} />
      </div>

      {/* ローディングテキスト */}
      <p className="text-white/90 font-medium text-lg animate-pulse">
        Analyzing...
      </p>
    </div>
  );
};

// 結果画面
interface ResultPhaseProps {
  myProfile: typeof MY_PROFILE;
  friend: Friend;
  result: DiagnosticResult;
  onClose: () => void;
}

const ResultPhase: React.FC<ResultPhaseProps> = ({ myProfile, friend, result, onClose }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // パーセンテージのカウントアップ後に詳細を表示
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center px-4 py-6 overflow-y-auto">
      {/* 2枚のカード + ハート */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <MiniCard person={myProfile} />
        <Heart className="w-6 h-6 text-white fill-white" />
        <MiniCard person={friend} />
      </div>

      {/* パーセンテージ */}
      <div className="text-center mb-2">
        <span className="text-6xl font-black text-white drop-shadow-lg">
          <CountUpNumber target={result.percentage} />%
        </span>
      </div>
      <p className="text-white/90 font-semibold text-lg mb-6">
        Love Compatibility
      </p>

      {/* 詳細分析カード */}
      <div
        className={`
          w-full max-w-xs bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl
          transition-all duration-500
          ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        {/* 相性の良い点 */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="font-bold text-gray-800 text-sm">相性の良い点</span>
          </div>
          <ul className="space-y-1 pl-6">
            {result.strengths.map((strength, index) => (
              <li key={index} className="text-gray-700 text-sm list-disc">
                {strength}
              </li>
            ))}
          </ul>
        </div>

        {/* アドバイス */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageCircleHeart className="w-4 h-4 text-pink-500" />
            <span className="font-bold text-gray-800 text-sm">アドバイス</span>
          </div>
          <p className="text-gray-700 text-sm pl-6">
            {result.advice}
          </p>
        </div>
      </div>

      {/* ボタン */}
      <div
        className={`
          flex items-center justify-center gap-4 mt-6
          transition-all duration-500 delay-300
          ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-6 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold transition-colors hover:bg-white/30 active:scale-95"
        >
          <X className="w-4 h-4" />
          Close
        </button>
        <button
          className="flex items-center gap-2 px-6 py-2.5 bg-white rounded-full text-gray-900 font-semibold shadow-lg transition-colors hover:bg-gray-100 active:scale-95"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
};

const FriendSelectSheet: React.FC<FriendSelectSheetProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 z-50
          bg-white dark:bg-gray-900 rounded-t-3xl
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
        style={{ maxHeight: '60%' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Friend grid */}
        <div className="px-4 pb-8 overflow-y-auto" style={{ maxHeight: 'calc(60vh - 40px)' }}>
          <div className="grid grid-cols-3 gap-3">
            {FRIENDS_LIST.map((friend) => (
              <button
                key={friend.id}
                onClick={() => onSelect(friend)}
                className="group"
              >
                <div className="w-full aspect-[2/3] rounded-xl bg-white dark:bg-neutral-800 shadow-md border-2 border-neutral-200 dark:border-neutral-600 transition-transform group-active:scale-95 flex flex-col">
                  <div className="flex-1 flex items-center justify-center p-2 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-t-[10px] min-h-0 overflow-hidden">
                    <img
                      src={friend.image}
                      alt={friend.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="px-2 py-1.5 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-600 rounded-b-[10px] shrink-0">
                    <span className="text-[11px] text-neutral-700 dark:text-neutral-300 font-semibold block text-center truncate">
                      {friend.name}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

interface PersonCardProps {
  person: Friend | typeof MY_PROFILE | null;
  isPlaceholder?: boolean;
  onClick?: () => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, isPlaceholder, onClick }) => {
  if (isPlaceholder || !person) {
    return (
      <button
        onClick={onClick}
        className="w-24 group"
      >
        <div className="w-full aspect-[2/3] rounded-xl border-2 border-dashed border-white/50 bg-white/10 backdrop-blur-sm transition-transform group-active:scale-95 flex flex-col">
          <div className="flex-1 flex items-center justify-center min-h-0">
            <Plus className="w-8 h-8 text-white/70" />
          </div>
          <div className="px-2 py-1.5 border-t border-dashed border-white/30 shrink-0">
            <span className="text-[11px] text-white/70 font-semibold block text-center">
              Select
            </span>
          </div>
        </div>
      </button>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="w-24 group">
        <div className="w-full aspect-[2/3] rounded-xl bg-white shadow-md border-2 border-neutral-200 flex flex-col transition-transform group-active:scale-95">
          <div className="flex-1 flex items-center justify-center p-2 bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-t-[10px] min-h-0 overflow-hidden">
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="px-2 py-1.5 bg-white border-t border-neutral-200 rounded-b-[10px] shrink-0">
            <span className="text-[11px] text-neutral-700 font-semibold block text-center truncate">
              {person.name}
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="w-24">
      <div className="w-full aspect-[2/3] rounded-xl bg-white shadow-md border-2 border-neutral-200 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-2 bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-t-[10px] min-h-0 overflow-hidden">
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="px-2 py-1.5 bg-white border-t border-neutral-200 rounded-b-[10px] shrink-0">
          <span className="text-[11px] text-neutral-700 font-semibold block text-center truncate">
            {person.name}
          </span>
        </div>
      </div>
    </div>
  );
};

const DiagnosticDetailScreen: React.FC<DiagnosticDetailScreenProps> = ({ diagnostic, onBack }) => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [phase, setPhase] = useState<DiagnosticPhase>('select');
  const [resultData, setResultData] = useState<DiagnosticResult | null>(null);

  const handleFriendSelect = (friend: Friend) => {
    setSelectedFriend(friend);
    setIsSheetOpen(false);
  };

  const handleDiagnose = () => {
    setPhase('loading');
    // 2.5秒後に結果を表示
    setTimeout(() => {
      setResultData(LOVE_RESULT);
      setPhase('result');
    }, 2500);
  };

  const handleClose = () => {
    setPhase('select');
    setResultData(null);
  };

  const bothSelected = selectedFriend !== null;

  return (
    <div className={`relative w-full h-full font-sans overflow-hidden flex flex-col bg-gradient-to-br ${diagnostic.gradient}`}>
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-[18px] pb-2 text-white font-semibold text-sm shrink-0 z-50">
        <span className="w-12">13:42</span>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5 w-20 justify-end">
          <div className="flex items-end gap-[2px] h-3">
            <div className="w-[3px] h-[4px] bg-white rounded-[1px]" />
            <div className="w-[3px] h-[6px] bg-white rounded-[1px]" />
            <div className="w-[3px] h-[8px] bg-white rounded-[1px]" />
            <div className="w-[3px] h-[11px] bg-white rounded-[1px]" />
          </div>
          <svg className="w-4 h-3 text-white" viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3.5 7.5c2.5-2.5 6.5-2.5 9 0l-1 1c-1.9-1.9-5.1-1.9-7 0l-1-1zM1 5c3.9-3.9 10.1-3.9 14 0l-1 1c-3.3-3.3-8.7-3.3-12 0L1 5z"/>
          </svg>
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-[11px] border-[1.5px] border-white rounded-[3px] relative flex items-center p-[1.5px]">
              <div className="h-full bg-white rounded-[1px]" style={{ width: '80%' }} />
            </div>
            <div className="w-[3px] h-[5px] bg-white rounded-r-[1px] -ml-[1px]" />
          </div>
        </div>
      </div>

      {/* Header with back button - only show in select phase */}
      {phase === 'select' && (
        <div className="relative flex items-center px-4 py-2 shrink-0 z-40">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors active:scale-95"
            aria-label="Back"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>
      )}

      {/* Loading phase */}
      {phase === 'loading' && selectedFriend && (
        <LoadingPhase myProfile={MY_PROFILE} friend={selectedFriend} />
      )}

      {/* Result phase */}
      {phase === 'result' && selectedFriend && resultData && (
        <ResultPhase
          myProfile={MY_PROFILE}
          friend={selectedFriend}
          result={resultData}
          onClose={handleClose}
        />
      )}

      {/* Select phase - Content area */}
      {phase === 'select' && (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* Emoji and title */}
          <img
            src={diagnostic.image}
            alt={diagnostic.title}
            className="w-20 h-20 object-contain mb-4"
          />
          <h2 className="text-white font-serif italic font-black text-2xl text-center mb-8">
            {diagnostic.title}
          </h2>

          {/* Card placement area */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <PersonCard person={MY_PROFILE} />
            <PersonCard
              person={selectedFriend}
              isPlaceholder={!selectedFriend}
              onClick={() => setIsSheetOpen(true)}
            />
          </div>

          {/* Diagnose button */}
          {bothSelected && (
            <button
              onClick={handleDiagnose}
              className="px-8 py-3 bg-white rounded-full font-semibold text-gray-900 shadow-lg hover:bg-gray-100 transition-colors active:scale-95"
            >
              Diagnose
            </button>
          )}
        </div>
      )}

      {/* Friend select sheet */}
      <FriendSelectSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSelect={handleFriendSelect}
      />
    </div>
  );
};

export default DiagnosticDetailScreen;
