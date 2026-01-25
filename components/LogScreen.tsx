import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { ACTIVITY_LOGS, ActivityLog, USER_DATA } from '../constants';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import { PageType } from '../App';

interface LogScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

// 日付をフォーマット（例: "January 25, 2026" - ビューアー用）
const formatDateLong = (dateStr: string): string => {
  const date = new Date(dateStr);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

// 日付を短い形式でフォーマット（例: "Aug 3, 2025" - 投稿カード用）
const formatDateShort = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const year = date.getFullYear();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${day}, ${year}`;
};

// インスタ風詳細ビューアー
interface PhotoViewerProps {
  activity: ActivityLog;
  initialIndex?: number;
  onClose: () => void;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({ activity, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  useEffect(() => {
    if (scrollRef.current && initialIndex > 0) {
      const itemWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollLeft = itemWidth * initialIndex;
    }
  }, [initialIndex]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < activity.images.length) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`absolute inset-0 z-50 bg-white dark:bg-neutral-900 transition-all duration-300 flex flex-col ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      onClick={handleClose}
    >
      {/* ヘッダー */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={handleClose}
          className="p-1"
        >
          <X size={24} className="text-black dark:text-white" />
        </button>
        <h2 className="text-black dark:text-white font-semibold">{activity.title}</h2>
        <div className="w-8" />
      </div>

      {/* 画像エリア */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onClick={(e) => e.stopPropagation()}
        className="w-full aspect-square overflow-x-auto no-scrollbar flex bg-black"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {activity.images.map((img, idx) => (
          <div
            key={idx}
            className="w-full aspect-square flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* ページインジケーター */}
      {activity.images.length > 1 && (
        <div className="flex justify-center gap-1.5 py-3">
          {activity.images.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                idx === currentIndex
                  ? 'bg-blue-500'
                  : 'bg-neutral-300 dark:bg-neutral-600'
              }`}
            />
          ))}
        </div>
      )}

      {/* 詳細情報 */}
      <div className="flex-1 px-4 py-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* 日時 */}
        <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm mb-3">
          <span>{formatDateLong(activity.date)}</span>
          <span>•</span>
          <span>{activity.time}</span>
        </div>

        {/* タイトル */}
        <h3 className="text-xl font-bold text-black dark:text-white mb-2">
          {activity.title}
        </h3>

        {/* 説明文 */}
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {activity.category === 'school' && '今日も一日お疲れ様でした。授業はなかなか大変だったけど、友達と話せて楽しかった！'}
          {activity.category === 'work' && 'バイト頑張った！今日は忙しかったけど、なんとか乗り切れた。'}
          {activity.category === 'leisure' && '最高の一日だった！また行きたいな〜'}
          {activity.category === 'food' && '美味しかった〜！また来よう。'}
          {activity.category === 'other' && '充実した時間を過ごせた。'}
        </p>
      </div>
    </div>
  );
};

// Threads風投稿カード
interface PostCardProps {
  activity: ActivityLog;
  onImageClick: (activity: ActivityLog, imageIndex: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ activity, onImageClick }) => {
  const getPostText = (act: ActivityLog): string => {
    switch (act.category) {
      case 'school':
        return '今日も一日お疲れ様でした。\n友達と話せて楽しかった！';
      case 'work':
        return 'バイト頑張った！\nなんとか乗り切れた 💪';
      case 'leisure':
        return `${act.title}楽しかった！\n最高だった！また行きたいな〜 ✨`;
      case 'food':
        return '美味しかった〜！\nまた来よう 🍽️';
      case 'other':
        return '充実した時間を過ごせた。';
      default:
        return '';
    }
  };

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-4">
      {/* ヘッダー: アバター + 名前 + 日付 */}
      <div className="flex items-start gap-3">
        {/* アバター */}
        <div className="flex-shrink-0">
          <img
            src={USER_DATA.characterAvatar}
            alt={USER_DATA.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        {/* コンテンツ */}
        <div className="flex-1 min-w-0">
          {/* 名前と日付 */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-black dark:text-white">
              {USER_DATA.name}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {formatDateShort(activity.date)}
            </span>
          </div>

          {/* 投稿テキスト */}
          <p className="text-black dark:text-white text-sm leading-relaxed whitespace-pre-line mb-3">
            {getPostText(activity)}
          </p>

          {/* 写真ギャラリー（縦長、横スクロール） */}
          {activity.images.length > 0 && (
            <div
              className="flex gap-2 overflow-x-auto no-scrollbar -mr-4 pr-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {activity.images.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 cursor-pointer transition-transform duration-200 active:scale-95 rounded-xl overflow-hidden"
                  style={{ scrollSnapAlign: 'start' }}
                  onClick={() => onImageClick(activity, idx)}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-32 h-40 object-cover"
                  />
                </div>
              ))}
              {activity.images.length > 4 && (
                <div
                  className="flex-shrink-0 cursor-pointer transition-transform duration-200 active:scale-95 rounded-xl overflow-hidden relative"
                  style={{ scrollSnapAlign: 'start' }}
                  onClick={() => onImageClick(activity, 4)}
                >
                  <img
                    src={activity.images[4]}
                    alt=""
                    className="w-32 h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      +{activity.images.length - 4}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LogScreen: React.FC<LogScreenProps> = ({ currentPage, onNavigate }) => {
  const [selectedActivity, setSelectedActivity] = useState<{ activity: ActivityLog; imageIndex: number } | null>(null);

  // 日付でソート（新しい順）
  const sortedActivities = [...ACTIVITY_LOGS].sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;
    // 同じ日の場合は時間で比較（遅い時間が先に来る）
    return b.time.localeCompare(a.time);
  });

  const openViewer = (activity: ActivityLog, imageIndex: number) => {
    setSelectedActivity({ activity, imageIndex });
  };

  const closeViewer = () => {
    setSelectedActivity(null);
  };

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      <StatusBar />

      {/* 投稿一覧 */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 pt-3">
        {sortedActivities.map(activity => (
          <PostCard
            key={activity.id}
            activity={activity}
            onImageClick={openViewer}
          />
        ))}
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />

      {/* 詳細ビューアー */}
      {selectedActivity && (
        <PhotoViewer
          activity={selectedActivity.activity}
          initialIndex={selectedActivity.imageIndex}
          onClose={closeViewer}
        />
      )}
    </div>
  );
};

export default LogScreen;
