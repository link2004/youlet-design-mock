import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { ACTIVITY_LOGS, ActivityLog } from '../constants';
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

// 投稿編集画面
interface PostEditorProps {
  activity: ActivityLog;
  initialText: string;
  onClose: () => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ activity, initialText, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState(initialText);
  const [images, setImages] = useState(activity.images);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const handleDeleteImage = (idx: number) => {
    const newImages = images.filter((_, i) => i !== idx);
    setImages(newImages);
    if (currentIndex >= newImages.length && newImages.length > 0) {
      setCurrentIndex(newImages.length - 1);
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
    >
      {/* ヘッダー */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={handleClose}
          className="p-1"
        >
          <X size={24} className="text-black dark:text-white" />
        </button>
        <h2 className="text-black dark:text-white font-semibold">編集</h2>
        <div className="w-8" />
      </div>

      {/* 画像エリア */}
      {images.length > 0 && (
        <>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full aspect-square overflow-x-auto no-scrollbar flex bg-black relative"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                className="w-full aspect-square flex-shrink-0 relative"
                style={{ scrollSnapAlign: 'start' }}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {/* 削除ボタン */}
                <button
                  onClick={() => handleDeleteImage(idx)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center active:bg-black/80"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
            ))}
          </div>

          {/* ページインジケーター */}
          {images.length > 1 && (
            <div className="flex justify-center gap-1.5 py-3">
              {images.map((_, idx) => (
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
        </>
      )}

      {/* 編集エリア */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* 日時 */}
        <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm mb-3">
          <span>{formatDateLong(activity.date)}</span>
          <span>•</span>
          <span>{activity.time}</span>
        </div>

        {/* テキスト編集 */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-32 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white text-sm leading-relaxed rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="投稿内容を入力..."
        />
      </div>
    </div>
  );
};

// 投稿テキストを取得
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

// Threads風投稿カード
interface PostCardProps {
  activity: ActivityLog;
  onClick: (activity: ActivityLog) => void;
}

const PostCard: React.FC<PostCardProps> = ({ activity, onClick }) => {
  return (
    <div
      className="border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-4 cursor-pointer active:bg-neutral-100 dark:active:bg-neutral-800 -mx-4 px-4 transition-colors"
      onClick={() => onClick(activity)}
    >
      {/* 日付 */}
      <div className="mb-1">
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
              className="flex-shrink-0 rounded-xl overflow-hidden"
              style={{ scrollSnapAlign: 'start' }}
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
              className="flex-shrink-0 rounded-xl overflow-hidden relative"
              style={{ scrollSnapAlign: 'start' }}
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
  );
};

const LogScreen: React.FC<LogScreenProps> = ({ currentPage, onNavigate }) => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityLog | null>(null);

  // 日付でソート（新しい順）
  const sortedActivities = [...ACTIVITY_LOGS].sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;
    // 同じ日の場合は時間で比較（遅い時間が先に来る）
    return b.time.localeCompare(a.time);
  });

  const openEditor = (activity: ActivityLog) => {
    setSelectedActivity(activity);
  };

  const closeEditor = () => {
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
            onClick={openEditor}
          />
        ))}
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />

      {/* 編集画面 */}
      {selectedActivity && (
        <PostEditor
          activity={selectedActivity}
          initialText={getPostText(selectedActivity)}
          onClose={closeEditor}
        />
      )}
    </div>
  );
};

export default LogScreen;
