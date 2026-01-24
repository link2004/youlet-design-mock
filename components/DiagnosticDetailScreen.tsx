import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Heart, Sparkles, AlertTriangle, X, Share2, Link, MessageCircle, Trophy, Crown, Medal } from 'lucide-react';
import { DiagnosticType, GroupDiagnosticType, FRIENDS_LIST, MY_PROFILE, FriendProfile } from '../constants';

// 過去の診断結果のモックデータ（診断タイプごと）
interface PastDiagnosisResult {
  friend: FriendProfile;
  percentage: number;
  diagnosedAt: string;
}

const generateMockPastResults = (): PastDiagnosisResult[] => {
  // ランダムに5人を選んでモック結果を生成
  const shuffled = [...FRIENDS_LIST].sort(() => Math.random() - 0.5).slice(0, 5);
  return shuffled.map((friend, index) => ({
    friend,
    percentage: 98 - index * 8 - Math.floor(Math.random() * 5),
    diagnosedAt: `${Math.floor(Math.random() * 7) + 1}d ago`,
  })).sort((a, b) => b.percentage - a.percentage);
};

type DiagnosticPhase = 'select' | 'loading' | 'result';

interface DiagnosticResult {
  percentage: number;
  dateScenario: {
    title: string;
    scenes: string[];
  };
  strengths: {
    point: string;
    reason: string;
  }[];
  warnings: {
    point: string;
    tip: string;
  }[];
}

// 友達名を埋め込んでモックデータを生成
const generateLoveResult = (friendName: string): DiagnosticResult => ({
  percentage: 87,
  dateScenario: {
    title: "渋谷カフェ → 原宿散歩デート",
    scenes: [
      "📍 渋谷のカフェで待ち合わせ",
      `あなた「深煎りエチオピアで」\n${friendName}「え、私も同じの頼もうとしてた！」`,
      "二人で写真を撮りながら原宿まで散歩することに",
      `あなたの一眼レフを見て${friendName}「重そう...持とうか？」`,
      `優しさに胸キュン...かと思いきや「私も撮りたい！貸して！」`,
      "結局カメラの取り合いで1時間経過 😂",
      "帰りは二人とも疲れて無言...でもなぜか心地いい"
    ]
  },
  strengths: [
    { point: "コーヒーの好みが合う", reason: "カフェ選びで揉めない" },
    { point: "写真を一緒に楽しめる", reason: "「ちょっと待って」が通じる" },
    { point: "静かな時間も心地よい", reason: "お互いIntrovertなので沈黙OK" }
  ],
  warnings: [
    { point: "最初のデートは緊張で無言危機", tip: "共通の趣味の話から入ろう" },
    { point: "「どこ行く？」「どこでも」ループ", tip: "デートプランは事前に決めておこう" },
    { point: "お互い譲り合いすぎて決まらない", tip: "じゃんけんで決めるルールを作ろう" }
  ]
});

// ペア診断用 props
interface PairDiagnosticProps {
  diagnostic: DiagnosticType;
  onBack: () => void;
  selectedFriend: FriendProfile | null;
  onSelectFriend: (friend: FriendProfile | null) => void;
  groupDiagnostic?: never;
  selectedGroupMembers?: never;
  onSelectGroupMembers?: never;
}

// グループ診断用 props
interface GroupDiagnosticProps {
  groupDiagnostic: GroupDiagnosticType;
  onBack: () => void;
  selectedGroupMembers: FriendProfile[];
  onSelectGroupMembers: (members: FriendProfile[]) => void;
  diagnostic?: never;
  selectedFriend?: never;
  onSelectFriend?: never;
}

type DiagnosticDetailScreenProps = PairDiagnosticProps | GroupDiagnosticProps;

interface FriendSelectSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (friend: FriendProfile) => void;
}

// 脈打つハートコンポーネント（診断タイプの画像を使用）
interface PulsingHeartProps {
  imageSrc: string;
}

const PulsingHeart: React.FC<PulsingHeartProps> = ({ imageSrc }) => {
  return (
    <div className="relative">
      <img
        src={imageSrc}
        alt="heart"
        className="w-20 h-20 object-contain drop-shadow-lg"
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
  person: FriendProfile | typeof MY_PROFILE;
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
  friend: FriendProfile;
  diagnosticImage: string;
}

const LoadingPhase: React.FC<LoadingPhaseProps> = ({ myProfile, friend, diagnosticImage }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      {/* 脈打つハート（診断タイプの画像） */}
      <div className="mb-8">
        <PulsingHeart imageSrc={diagnosticImage} />
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

// シェア用コンパクトカード
interface ShareCardProps {
  myProfile: typeof MY_PROFILE;
  friend: FriendProfile;
  result: DiagnosticResult;
  diagnosticTitle: string;
  gradient: string;
  onClose: () => void;
}

// シェア先の定義
const SHARE_OPTIONS = [
  { id: 'copy', label: 'Copy', icon: 'copy', color: 'bg-gray-400' },
  { id: 'x', label: 'X', icon: 'x', color: 'bg-black' },
  { id: 'instagram', label: 'Instagram', icon: 'instagram', color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'whatsapp', color: 'bg-green-500' },
  { id: 'dm', label: 'Instagram Direct', icon: 'dm', color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400' },
  { id: 'message', label: 'Message', icon: 'message', color: 'bg-green-500' },
];

// SNSアイコンコンポーネント
const ShareIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'copy':
      return <Link className="w-6 h-6 text-white" />;
    case 'x':
      return (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case 'dm':
      return (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 20.2A1.5 1.5 0 003.8 21.454l3.032-.892A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm5.907 8.256l-4.2 3.98a1.5 1.5 0 01-2.058-.056l-1.6-1.6a.5.5 0 00-.707 0l-2.25 2.25a.5.5 0 01-.707-.707l2.25-2.25a1.5 1.5 0 012.121 0l1.543 1.543 3.9-3.693a.5.5 0 11.688.726z" />
        </svg>
      );
    case 'message':
      return <MessageCircle className="w-6 h-6 text-white" />;
    default:
      return null;
  }
};

const ShareCard: React.FC<ShareCardProps> = ({ myProfile, friend, result, diagnosticTitle, gradient, onClose }) => {
  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center px-2 pt-14 pb-2 shrink-0">
        <button
          onClick={onClose}
          className="p-2 active:scale-95"
        >
          <X className="w-7 h-7 text-white" />
        </button>
      </div>

      {/* Card Area - Horizontal Scroll */}
      <div className="flex-1 flex items-center">
        <div
          className="w-full flex gap-4 overflow-x-auto py-4"
          style={{
            scrollSnapType: 'x mandatory',
            paddingLeft: 'calc(50% - 130px)',
            paddingRight: 'calc(50% - 100px)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* 詳細カード */}
          <div
            className={`w-[260px] flex-shrink-0 bg-gradient-to-br ${gradient} rounded-3xl p-4 shadow-2xl`}
            style={{ scrollSnapAlign: 'center', scrollSnapStop: 'always' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Cards + Heart */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-14">
                <div className="w-full aspect-[2/3] rounded-lg bg-white shadow border border-white/80 flex flex-col">
                  <div className="flex-1 flex items-center justify-center p-1 bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-t-[6px] overflow-hidden">
                    <img src={myProfile.image} alt={myProfile.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="px-1 py-0.5 bg-white border-t border-neutral-200 rounded-b-[6px]">
                    <span className="text-[8px] text-neutral-700 font-semibold block text-center truncate">{myProfile.name}</span>
                  </div>
                </div>
              </div>
              <Heart className="w-4 h-4 text-white fill-white" />
              <div className="w-14">
                <div className="w-full aspect-[2/3] rounded-lg bg-white shadow border border-white/80 flex flex-col">
                  <div className="flex-1 flex items-center justify-center p-1 bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-t-[6px] overflow-hidden">
                    <img src={friend.image} alt={friend.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="px-1 py-0.5 bg-white border-t border-neutral-200 rounded-b-[6px]">
                    <span className="text-[8px] text-neutral-700 font-semibold block text-center truncate">{friend.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Percentage */}
            <div className="text-center mb-2">
              <span className="text-3xl font-serif italic font-black text-white drop-shadow">{result.percentage}%</span>
              <p className="text-white/90 font-serif italic font-semibold text-[10px]">{diagnosticTitle}</p>
            </div>

            {/* Content Card */}
            <div className="bg-white/95 rounded-xl p-3 space-y-2">
              {/* Date Scenario */}
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs">🎬</span>
                  <span className="font-bold text-gray-800 text-[9px]">もし二人がデートしたら...</span>
                </div>
                <p className="text-gray-600 text-[8px] leading-relaxed line-clamp-4">
                  {result.dateScenario.scenes.slice(0, 3).join(' → ')}...
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Strengths */}
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3 text-pink-500" />
                  <span className="font-bold text-gray-800 text-[9px]">うまくいくポイント</span>
                </div>
                <div className="space-y-0.5">
                  {result.strengths.map((s, i) => (
                    <p key={i} className="text-gray-600 text-[8px]">• {s.point}</p>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Warnings */}
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                  <span className="font-bold text-gray-800 text-[9px]">注意ポイント</span>
                </div>
                <div className="space-y-0.5">
                  {result.warnings.map((w, i) => (
                    <p key={i} className="text-gray-600 text-[8px]">• {w.point}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-white/70 text-[8px] mt-2">YouLet AI Compatibility</p>
          </div>

          {/* シンプルカード */}
          <div
            className={`w-[200px] flex-shrink-0 bg-gradient-to-br ${gradient} rounded-3xl p-6 shadow-2xl flex flex-col justify-between`}
            style={{ scrollSnapAlign: 'center', scrollSnapStop: 'always' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* アバター */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14">
                <div className="w-full aspect-[2/3] rounded-lg bg-white shadow border border-white/80 flex flex-col">
                  <div className="flex-1 flex items-center justify-center p-1 bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-t-[6px] overflow-hidden">
                    <img src={myProfile.image} alt={myProfile.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="px-1 py-0.5 bg-white border-t border-neutral-200 rounded-b-[6px]">
                    <span className="text-[8px] text-neutral-700 font-semibold block text-center truncate">{myProfile.name}</span>
                  </div>
                </div>
              </div>
              <Heart className="w-5 h-5 text-white fill-white" />
              <div className="w-14">
                <div className="w-full aspect-[2/3] rounded-lg bg-white shadow border border-white/80 flex flex-col">
                  <div className="flex-1 flex items-center justify-center p-1 bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-t-[6px] overflow-hidden">
                    <img src={friend.image} alt={friend.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="px-1 py-0.5 bg-white border-t border-neutral-200 rounded-b-[6px]">
                    <span className="text-[8px] text-neutral-700 font-semibold block text-center truncate">{friend.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* パーセンテージ（大きめ） */}
            <div className="text-center flex-1 flex flex-col justify-center">
              <span className="text-5xl font-serif italic font-black text-white drop-shadow">
                {result.percentage}%
              </span>
              <p className="text-white/90 font-serif italic font-semibold text-sm mt-1">
                {diagnosticTitle}
              </p>
            </div>

            {/* フッター */}
            <p className="text-center text-white/70 text-[10px] mt-4">
              YouLet AI Compatibility
            </p>
          </div>
        </div>
      </div>

      {/* Share Options */}
      <div className="shrink-0 px-2 pb-8 pt-4">
        <div className="flex gap-4 overflow-x-auto pb-2 px-2">
          {SHARE_OPTIONS.map((option) => (
            <button key={option.id} className="flex flex-col items-center gap-1.5 min-w-[60px] active:scale-95">
              <div className={`w-14 h-14 rounded-full ${option.color} flex items-center justify-center shadow-lg`}>
                <ShareIcon type={option.icon} />
              </div>
              <span className="text-white text-[10px] text-center leading-tight">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// 結果画面
interface ResultPhaseProps {
  myProfile: typeof MY_PROFILE;
  friend: FriendProfile;
  result: DiagnosticResult;
  diagnosticTitle: string;
  gradient: string;
  onBack: () => void;
}

const ResultPhase: React.FC<ResultPhaseProps> = ({ myProfile, friend, result, diagnosticTitle, gradient, onBack }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);

  useEffect(() => {
    // パーセンテージのカウントアップ後に詳細を表示
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Header with back button */}
      <div className="flex items-center px-4 py-2 shrink-0">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-4 pb-6">
        {/* 2枚のカード + ハート */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <MiniCard person={myProfile} />
          <Heart className="w-6 h-6 text-white fill-white" />
          <MiniCard person={friend} />
        </div>

        {/* パーセンテージ */}
        <div className="text-center mb-1">
          <span className="text-5xl font-serif italic font-black text-white drop-shadow-lg">
            <CountUpNumber target={result.percentage} />%
          </span>
        </div>
        <p className="text-white/90 font-serif italic font-semibold text-base mb-4">
          {diagnosticTitle}
        </p>

        {/* 詳細分析カード群 */}
        <div
          className={`
            w-full max-w-xs space-y-3
            transition-all duration-500
            ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {/* デートシナリオカード */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🎬</span>
              <span className="font-bold text-gray-800 text-sm">もし二人がデートしたら...</span>
            </div>
            <p className="text-gray-500 text-xs mb-3">{result.dateScenario.title}</p>
            <div className="space-y-2">
              {result.dateScenario.scenes.map((scene, index) => (
                <p key={index} className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                  {scene}
                </p>
              ))}
            </div>
          </div>

          {/* うまくいくポイントカード */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="font-bold text-gray-800 text-sm">うまくいくポイント</span>
            </div>
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-pink-500 mt-0.5">•</span>
                  <div>
                    <span className="text-gray-800 text-sm font-medium">{strength.point}</span>
                    <p className="text-gray-500 text-xs">{strength.reason}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 注意ポイントカード */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-gray-800 text-sm">注意ポイント</span>
            </div>
            <ul className="space-y-2">
              {result.warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <div>
                    <span className="text-gray-800 text-sm font-medium">{warning.point}</span>
                    <p className="text-gray-500 text-xs">💡 {warning.tip}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ボタン */}
        <div
          className={`
            flex items-center justify-center gap-3 mt-6 pb-4
            transition-all duration-500 delay-300
            ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <button
            onClick={onBack}
            className="px-5 py-2.5 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full text-white font-semibold shadow-lg transition-colors hover:bg-white/30 active:scale-95"
          >
            Try Another
          </button>
          <button
            onClick={() => setShowShareCard(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-gray-900 font-semibold shadow-lg transition-colors hover:bg-gray-100 active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Share Card Modal */}
      {showShareCard && (
        <ShareCard
          myProfile={myProfile}
          friend={friend}
          result={result}
          diagnosticTitle={diagnosticTitle}
          gradient={gradient}
          onClose={() => setShowShareCard(false)}
        />
      )}
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

// 過去の診断ランキングシート
interface PastRankingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFriend: (friend: FriendProfile) => void;
  diagnosticTitle: string;
}

const PastRankingSheet: React.FC<PastRankingSheetProps> = ({ isOpen, onClose, onSelectFriend, diagnosticTitle }) => {
  const [pastResults] = useState<PastDiagnosisResult[]>(() => generateMockPastResults());

  if (!isOpen) return null;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown size={16} className="text-yellow-500 fill-yellow-500" />;
      case 2:
        return <Medal size={16} className="text-gray-400 fill-gray-400" />;
      case 3:
        return <Medal size={16} className="text-amber-600 fill-amber-600" />;
      default:
        return <span className="text-neutral-400 font-bold text-xs w-4 text-center">{rank}</span>;
    }
  };

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
        style={{ maxHeight: '70%' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Trophy size={18} className="text-orange-400" />
            <h3 className="font-bold text-neutral-900 dark:text-white text-base">Past Results</h3>
          </div>
          <p className="text-center text-neutral-500 dark:text-neutral-400 text-xs">{diagnosticTitle}</p>
        </div>

        {/* Ranking list */}
        <div className="px-4 pb-8 overflow-y-auto" style={{ maxHeight: 'calc(70vh - 100px)' }}>
          <div className="flex flex-col gap-2">
            {pastResults.map((result, index) => {
              const rank = index + 1;
              return (
                <button
                  key={result.friend.id}
                  onClick={() => {
                    onSelectFriend(result.friend);
                    onClose();
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-transform active:scale-[0.98] ${
                    rank === 1
                      ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200'
                      : rank === 2
                      ? 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200'
                      : rank === 3
                      ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200'
                      : 'bg-white border-neutral-200'
                  }`}
                >
                  {/* Rank */}
                  <div className="w-6 flex justify-center">
                    {getRankIcon(rank)}
                  </div>

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-b from-neutral-100 to-neutral-200 overflow-hidden border-2 border-white shadow-sm">
                    <img
                      src={result.friend.image}
                      alt={result.friend.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Info */}
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-neutral-900 text-sm">
                      {result.friend.name}
                    </p>
                    <p className="text-[10px] text-neutral-400">
                      {result.diagnosedAt}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-end">
                    <span className="text-base font-bold text-orange-500">{result.percentage}%</span>
                  </div>
                </button>
              );
            })}
          </div>

          {pastResults.length === 0 && (
            <div className="text-center py-8 text-neutral-400">
              <p>No past results yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

interface PersonCardProps {
  person: FriendProfile | typeof MY_PROFILE | null;
  isPlaceholder?: boolean;
  onClick?: () => void;
  size?: 'normal' | 'small';
}

const PersonCard: React.FC<PersonCardProps> = ({ person, isPlaceholder, onClick, size = 'normal' }) => {
  const sizeClass = size === 'small' ? 'w-16' : 'w-24';
  const plusSize = size === 'small' ? 'w-6 h-6' : 'w-8 h-8';
  const textSize = size === 'small' ? 'text-[9px]' : 'text-[11px]';

  if (isPlaceholder || !person) {
    return (
      <button
        onClick={onClick}
        className={`${sizeClass} group`}
      >
        <div className="w-full aspect-[2/3] rounded-xl border-2 border-dashed border-white/50 bg-white/10 backdrop-blur-sm transition-transform group-active:scale-95 flex flex-col">
          <div className="flex-1 flex items-center justify-center min-h-0">
            <Plus className={`${plusSize} text-white/70`} />
          </div>
          <div className="px-2 py-1.5 border-t border-dashed border-white/30 shrink-0">
            <span className={`${textSize} text-white/70 font-semibold block text-center`}>
              Select
            </span>
          </div>
        </div>
      </button>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={`${sizeClass} group`}>
        <div className="w-full aspect-[2/3] rounded-xl bg-white shadow-md border-2 border-neutral-200 flex flex-col transition-transform group-active:scale-95">
          <div className="flex-1 flex items-center justify-center p-2 bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-t-[10px] min-h-0 overflow-hidden">
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="px-2 py-1.5 bg-white border-t border-neutral-200 rounded-b-[10px] shrink-0">
            <span className={`${textSize} text-neutral-700 font-semibold block text-center truncate`}>
              {person.name}
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className={sizeClass}>
      <div className="w-full aspect-[2/3] rounded-xl bg-white shadow-md border-2 border-neutral-200 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-2 bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-t-[10px] min-h-0 overflow-hidden">
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="px-2 py-1.5 bg-white border-t border-neutral-200 rounded-b-[10px] shrink-0">
          <span className={`${textSize} text-neutral-700 font-semibold block text-center truncate`}>
            {person.name}
          </span>
        </div>
      </div>
    </div>
  );
};

// グループ診断用の友達選択シート
interface GroupFriendSelectSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (friend: FriendProfile) => void;
  selectedMembers: FriendProfile[];
}

const GroupFriendSelectSheet: React.FC<GroupFriendSelectSheetProps> = ({ isOpen, onClose, onSelect, selectedMembers }) => {
  if (!isOpen) return null;

  const selectedIds = selectedMembers.map(m => m.id);

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
            {FRIENDS_LIST.filter(friend => !selectedIds.includes(friend.id)).map((friend) => (
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

// グループ診断結果の型
interface GroupDiagnosticResult {
  winnerPair: [FriendProfile, FriendProfile];
  percentage: number;
  reason: string;
}

// グループ診断結果を生成
const generateGroupResult = (members: FriendProfile[], diagnosticId: string): GroupDiagnosticResult => {
  // ランダムに2人を選ぶ
  const shuffled = [...members].sort(() => Math.random() - 0.5);
  const pair: [FriendProfile, FriendProfile] = [shuffled[0], shuffled[1]];

  const reasons: Record<string, string[]> = {
    dna_soulmates: [
      'Their energy frequencies resonate perfectly!',
      'A cosmic connection written in the stars',
      'Twin flame energy detected at 99.7%',
    ],
    chaos_catalyst: [
      'Warning: Combined chaos level exceeds safety limits',
      'These two should never be left alone together',
      'Expect fireworks... and maybe a few broken things',
    ],
    one_night_mistake: [
      'The chemistry is there... the judgment is not',
      'Proceed with caution (they won\'t)',
      'A story they\'ll regret telling their grandchildren',
    ],
  };

  const reasonList = reasons[diagnosticId] || reasons.dna_soulmates;
  const reason = reasonList[Math.floor(Math.random() * reasonList.length)];

  return {
    winnerPair: pair,
    percentage: Math.floor(Math.random() * 20) + 80,
    reason,
  };
};

// グループ診断のローディング画面
interface GroupLoadingPhaseProps {
  members: FriendProfile[];
  diagnosticImage: string;
}

const GroupLoadingPhase: React.FC<GroupLoadingPhaseProps> = ({ members, diagnosticImage }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      {/* 脈打つ画像 */}
      <div className="mb-8">
        <PulsingHeart imageSrc={diagnosticImage} />
      </div>

      {/* メンバーカード（4つまで表示） */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap max-w-[280px]">
        {members.slice(0, 4).map((member) => (
          <div key={member.id} className="w-14">
            <div className="w-full aspect-[2/3] rounded-lg bg-white shadow border border-white/80 flex flex-col">
              <div className="flex-1 flex items-center justify-center p-1 bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-t-[6px] overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-contain" />
              </div>
              <div className="px-1 py-0.5 bg-white border-t border-neutral-200 rounded-b-[6px]">
                <span className="text-[8px] text-neutral-700 font-semibold block text-center truncate">{member.name}</span>
              </div>
            </div>
          </div>
        ))}
        {members.length > 4 && (
          <div className="w-14 flex items-center justify-center">
            <span className="text-white/80 text-sm font-semibold">+{members.length - 4}</span>
          </div>
        )}
      </div>

      {/* ローディングテキスト */}
      <p className="text-white/90 font-medium text-lg animate-pulse">
        Analyzing group dynamics...
      </p>
    </div>
  );
};

// グループ診断の結果画面
interface GroupResultPhaseProps {
  result: GroupDiagnosticResult;
  diagnosticTitle: string;
  diagnosticSubtitle: string;
  gradient: string;
  onBack: () => void;
}

const GroupResultPhase: React.FC<GroupResultPhaseProps> = ({ result, diagnosticTitle, diagnosticSubtitle, gradient, onBack }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Header with back button */}
      <div className="flex items-center px-4 py-2 shrink-0">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-4 pb-6">
        {/* Award badge */}
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
          <span className="text-white/90 text-sm font-semibold">🏆 {diagnosticSubtitle}</span>
        </div>

        {/* 2枚のカード + ハート */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <MiniCard person={result.winnerPair[0]} />
          <Heart className="w-6 h-6 text-white fill-white" />
          <MiniCard person={result.winnerPair[1]} />
        </div>

        {/* パーセンテージ */}
        <div className="text-center mb-1">
          <span className="text-5xl font-serif italic font-black text-white drop-shadow-lg">
            <CountUpNumber target={result.percentage} />%
          </span>
        </div>
        <p className="text-white/90 font-serif italic font-semibold text-base mb-4">
          {diagnosticTitle}
        </p>

        {/* 理由カード */}
        <div
          className={`
            w-full max-w-xs
            transition-all duration-500
            ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="font-bold text-gray-800 text-sm">Why these two?</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {result.reason}
            </p>
          </div>
        </div>

        {/* ボタン */}
        <div
          className={`
            flex items-center justify-center gap-3 mt-6 pb-4
            transition-all duration-500 delay-300
            ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <button
            onClick={onBack}
            className="px-5 py-2.5 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full text-white font-semibold shadow-lg transition-colors hover:bg-white/30 active:scale-95"
          >
            Try Another
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-gray-900 font-semibold shadow-lg transition-colors hover:bg-gray-100 active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

const DiagnosticDetailScreen: React.FC<DiagnosticDetailScreenProps> = (props) => {
  const { onBack } = props;
  const isGroupMode = 'groupDiagnostic' in props && props.groupDiagnostic !== undefined;

  // ペア診断用の状態
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isRankingSheetOpen, setIsRankingSheetOpen] = useState(false);
  const [phase, setPhase] = useState<DiagnosticPhase>('select');
  const [resultData, setResultData] = useState<DiagnosticResult | null>(null);

  // グループ診断用の状態
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [groupResultData, setGroupResultData] = useState<GroupDiagnosticResult | null>(null);

  // ペア診断のハンドラー
  const handleFriendSelect = (friend: FriendProfile) => {
    if (!isGroupMode && props.onSelectFriend) {
      props.onSelectFriend(friend);
    }
    setIsSheetOpen(false);
  };

  const handleDiagnose = () => {
    if (isGroupMode) return;
    if (!props.selectedFriend) return;
    setPhase('loading');
    setTimeout(() => {
      setResultData(generateLoveResult(props.selectedFriend!.name));
      setPhase('result');
    }, 2500);
  };

  // グループ診断のハンドラー
  const handleGroupMemberSelect = (friend: FriendProfile) => {
    if (!isGroupMode || !props.onSelectGroupMembers) return;
    props.onSelectGroupMembers([...props.selectedGroupMembers!, friend]);
    setIsSheetOpen(false);
    setSelectedSlot(null);
  };

  const handleRemoveGroupMember = (index: number) => {
    if (!isGroupMode || !props.onSelectGroupMembers) return;
    const newMembers = [...props.selectedGroupMembers!];
    newMembers.splice(index, 1);
    props.onSelectGroupMembers(newMembers);
  };

  const handleGroupDiagnose = () => {
    if (!isGroupMode || !props.selectedGroupMembers || props.selectedGroupMembers.length < 4) return;
    setPhase('loading');
    setTimeout(() => {
      setGroupResultData(generateGroupResult(props.selectedGroupMembers!, props.groupDiagnostic!.id));
      setPhase('result');
    }, 2500);
  };

  // グループ診断モード
  if (isGroupMode) {
    const { groupDiagnostic, selectedGroupMembers } = props;
    const canDiagnose = selectedGroupMembers!.length >= 4;

    return (
      <div className={`relative w-full h-full font-sans overflow-hidden flex flex-col bg-gradient-to-br ${groupDiagnostic!.gradient}`}>
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
        {phase === 'loading' && (
          <GroupLoadingPhase members={selectedGroupMembers!} diagnosticImage={groupDiagnostic!.image} />
        )}

        {/* Result phase */}
        {phase === 'result' && groupResultData && (
          <GroupResultPhase
            result={groupResultData}
            diagnosticTitle={groupDiagnostic!.title}
            diagnosticSubtitle={groupDiagnostic!.subtitle}
            gradient={groupDiagnostic!.gradient}
            onBack={onBack}
          />
        )}

        {/* Select phase */}
        {phase === 'select' && (
          <div className="flex-1 flex flex-col items-center px-4 overflow-y-auto">
            {/* Emoji and title */}
            <img
              src={groupDiagnostic!.image}
              alt={groupDiagnostic!.title}
              className="w-16 h-16 object-contain mb-2"
            />
            <h2 className="text-white font-serif italic font-black text-xl text-center mb-1">
              {groupDiagnostic!.title}
            </h2>
            <p className="text-white/80 text-xs mb-4">Select 4-8 members</p>

            {/* 2行4列グリッド */}
            <div className="w-full max-w-[300px] mb-4">
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[0, 1, 2, 3].map((index) => (
                  <PersonCard
                    key={index}
                    person={selectedGroupMembers![index] || null}
                    isPlaceholder={!selectedGroupMembers![index]}
                    onClick={() => {
                      if (selectedGroupMembers![index]) {
                        handleRemoveGroupMember(index);
                      } else if (selectedGroupMembers!.length < 8) {
                        setSelectedSlot(index);
                        setIsSheetOpen(true);
                      }
                    }}
                    size="small"
                  />
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[4, 5, 6, 7].map((index) => (
                  <PersonCard
                    key={index}
                    person={selectedGroupMembers![index] || null}
                    isPlaceholder={!selectedGroupMembers![index]}
                    onClick={() => {
                      if (selectedGroupMembers![index]) {
                        handleRemoveGroupMember(index);
                      } else if (selectedGroupMembers!.length < 8) {
                        setSelectedSlot(index);
                        setIsSheetOpen(true);
                      }
                    }}
                    size="small"
                  />
                ))}
              </div>
            </div>

            {/* Member count */}
            <p className="text-white/70 text-sm mb-4">
              {selectedGroupMembers!.length} / 8 members selected
            </p>

            {/* Diagnose button */}
            {canDiagnose && (
              <button
                onClick={handleGroupDiagnose}
                className="px-8 py-3 bg-white rounded-full font-semibold text-gray-900 shadow-lg hover:bg-gray-100 transition-colors active:scale-95"
              >
                Diagnose
              </button>
            )}
          </div>
        )}

        {/* Friend select sheet */}
        <GroupFriendSelectSheet
          isOpen={isSheetOpen}
          onClose={() => {
            setIsSheetOpen(false);
            setSelectedSlot(null);
          }}
          onSelect={handleGroupMemberSelect}
          selectedMembers={selectedGroupMembers!}
        />
      </div>
    );
  }

  // ペア診断モード
  const { diagnostic, selectedFriend } = props as PairDiagnosticProps;
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
        <LoadingPhase myProfile={MY_PROFILE} friend={selectedFriend} diagnosticImage={diagnostic.image} />
      )}

      {/* Result phase */}
      {phase === 'result' && selectedFriend && resultData && (
        <ResultPhase
          myProfile={MY_PROFILE}
          friend={selectedFriend}
          result={resultData}
          diagnosticTitle={diagnostic.title}
          gradient={diagnostic.gradient}
          onBack={onBack}
        />
      )}

      {/* Select phase - Content area */}
      {phase === 'select' && (
        <div className="flex-1 flex flex-col px-4">
          {/* Main content centered */}
          <div className="flex-1 flex flex-col items-center justify-center">
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

          {/* Ranking button at bottom */}
          <div className="pb-8">
            <button
              onClick={() => setIsRankingSheetOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl text-white font-medium active:scale-[0.98] transition-transform"
            >
              <Trophy size={18} className="text-yellow-300" />
              <span>Past Results Ranking</span>
            </button>
          </div>
        </div>
      )}

      {/* Friend select sheet */}
      <FriendSelectSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSelect={handleFriendSelect}
      />

      {/* Past ranking sheet */}
      <PastRankingSheet
        isOpen={isRankingSheetOpen}
        onClose={() => setIsRankingSheetOpen(false)}
        onSelectFriend={handleFriendSelect}
        diagnosticTitle={diagnostic.title}
      />
    </div>
  );
};

export default DiagnosticDetailScreen;
