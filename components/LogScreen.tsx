import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { ActivityLog } from '../constants';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import { PageType } from '../App';

interface LogScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

// プレースホルダー画像URL
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1511882150382-421056c89033?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=300&fit=crop',
];

// start_timeから日付を抽出 (例: "2026-01-15 23:13:58+00" → "2026-01-15")
const extractDate = (startTime: string): string => {
  return startTime.split(' ')[0];
};

// start_timeから時間を抽出 (例: "2026-01-15 23:13:58+00" → "23:13")
const extractTime = (startTime: string): string => {
  const timePart = startTime.split(' ')[1];
  if (!timePart) return '';
  const [hours, minutes] = timePart.split(':');
  return `${hours}:${minutes}`;
};

// image_countに基づいてプレースホルダー画像を生成
const generateImages = (imageCount: number, activityId: string): string[] => {
  if (imageCount === 0) return [];
  const images: string[] = [];
  // activityIdを使って擬似的なランダム性を持たせる
  const seed = activityId.charCodeAt(0) + activityId.charCodeAt(activityId.length - 1);
  for (let i = 0; i < imageCount; i++) {
    const idx = (seed + i) % PLACEHOLDER_IMAGES.length;
    images.push(PLACEHOLDER_IMAGES[idx]);
  }
  return images;
};

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

// 拡張されたアクティビティ型（表示用）
interface DisplayActivity extends ActivityLog {
  date: string;
  time: string;
  images: string[];
}

// 投稿編集画面
interface PostEditorProps {
  activity: DisplayActivity;
  onClose: () => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ activity, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState(activity.description);
  const [images, setImages] = useState(activity.images);
  const [actionSheetTarget, setActionSheetTarget] = useState<number | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
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

  const handleImageTap = (idx: number) => {
    setActionSheetTarget(idx);
  };

  const handleDeleteRequest = () => {
    setShowConfirmDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (actionSheetTarget === null) return;
    const newImages = images.filter((_, i) => i !== actionSheetTarget);
    setImages(newImages);
    if (currentIndex >= newImages.length && newImages.length > 0) {
      setCurrentIndex(newImages.length - 1);
    }
    setShowConfirmDialog(false);
    setActionSheetTarget(null);
  };

  const handleDeleteCancel = () => {
    setShowConfirmDialog(false);
    setActionSheetTarget(null);
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
      <div className="flex items-center justify-between px-4 py-3 pt-12 border-b border-neutral-200 dark:border-neutral-800">
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
                className="w-full aspect-square flex-shrink-0 relative cursor-pointer"
                style={{ scrollSnapAlign: 'start' }}
                onClick={() => handleImageTap(idx)}
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

      {/* Swift風アクションシート */}
      {actionSheetTarget !== null && !showConfirmDialog && (
        <div
          className="absolute inset-0 z-60 flex items-end justify-center"
          onClick={() => setActionSheetTarget(null)}
        >
          {/* 背景オーバーレイ */}
          <div className="absolute inset-0 bg-black/40" />

          {/* アクションシート */}
          <div
            className="relative w-full px-2 pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* メインアクション */}
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden mb-2">
              <button
                onClick={handleDeleteRequest}
                className="w-full py-4 text-red-500 text-lg font-normal active:bg-neutral-200 dark:active:bg-neutral-700"
              >
                写真を削除
              </button>
            </div>

            {/* キャンセル */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setActionSheetTarget(null)}
                className="w-full py-4 text-blue-500 text-lg font-semibold active:bg-neutral-100 dark:active:bg-neutral-700"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 確認ダイアログ */}
      {showConfirmDialog && (
        <div
          className="absolute inset-0 z-60 flex items-center justify-center"
          onClick={handleDeleteCancel}
        >
          {/* 背景オーバーレイ */}
          <div className="absolute inset-0 bg-black/40" />

          {/* ダイアログ */}
          <div
            className="relative bg-white dark:bg-neutral-800 rounded-2xl w-72 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* タイトルとメッセージ */}
            <div className="px-4 pt-5 pb-4 text-center">
              <h3 className="text-black dark:text-white font-semibold text-lg mb-1">
                写真を削除
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                この写真を削除してもよろしいですか？
              </p>
            </div>

            {/* ボタン */}
            <div className="border-t border-neutral-200 dark:border-neutral-700 flex">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 py-3 text-blue-500 text-lg font-normal border-r border-neutral-200 dark:border-neutral-700 active:bg-neutral-100 dark:active:bg-neutral-700"
              >
                キャンセル
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-3 text-red-500 text-lg font-semibold active:bg-neutral-100 dark:active:bg-neutral-700"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Threads風投稿カード
interface PostCardProps {
  activity: DisplayActivity;
  onClick: (activity: DisplayActivity) => void;
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

      {/* 投稿テキスト（descriptionをそのまま使用） */}
      <p className="text-black dark:text-white text-sm leading-relaxed whitespace-pre-line mb-3">
        {activity.description}
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
  const [activities, setActivities] = useState<DisplayActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<DisplayActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // JSONファイルを読み込む
  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch('/data/activity_logs.json');
        const data: ActivityLog[] = await response.json();

        // DisplayActivity形式に変換
        const displayActivities: DisplayActivity[] = data.map(activity => ({
          ...activity,
          date: extractDate(activity.start_time),
          time: extractTime(activity.start_time),
          images: generateImages(activity.image_count, activity.id),
        }));

        // 日付と時間でソート（新しい順）
        displayActivities.sort((a, b) => {
          const dateCompare = b.start_time.localeCompare(a.start_time);
          return dateCompare;
        });

        setActivities(displayActivities);
      } catch (error) {
        console.error('Failed to load activity logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadActivities();
  }, []);

  const openEditor = (activity: DisplayActivity) => {
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
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-neutral-500 dark:text-neutral-400">読み込み中...</span>
          </div>
        ) : (
          activities.map(activity => (
            <PostCard
              key={activity.id}
              activity={activity}
              onClick={openEditor}
            />
          ))
        )}
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />

      {/* 編集画面 */}
      {selectedActivity && (
        <PostEditor
          activity={selectedActivity}
          onClose={closeEditor}
        />
      )}
    </div>
  );
};

export default LogScreen;
