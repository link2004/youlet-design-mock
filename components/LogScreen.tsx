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

// 日付を短い形式に変換（例: "Jan 25"）
const formatShortDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

// インスタ風詳細ビューアー
interface PhotoViewerProps {
  activity: ActivityLog;
  onClose: () => void;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({ activity, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < activity.images.length) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // 日付をフォーマット
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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
      >
        {activity.images.map((img, idx) => (
          <div
            key={idx}
            className="w-full aspect-square flex-shrink-0"
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
          <span>{formatDate(activity.date)}</span>
          <span>•</span>
          <span>{activity.time}</span>
        </div>

        {/* タイトル */}
        <h3 className="text-xl font-bold text-black dark:text-white mb-2">
          {activity.title}
        </h3>

        {/* 説明文（モック） */}
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

// 写真スタックコンポーネント
interface PhotoStackProps {
  images: string[];
  isLeft: boolean;
  title: string;
  onImageClick: () => void;
}

const PhotoStack: React.FC<PhotoStackProps> = ({ images, isLeft, title, onImageClick }) => {
  const baseRotation = isLeft ? -3 : 3;

  if (images.length === 1) {
    return (
      <div
        onClick={onImageClick}
        className="shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
        style={{ transform: `rotate(${baseRotation}deg)` }}
      >
        <img
          src={images[0]}
          alt={title}
          className="w-36 h-36 rounded-2xl object-cover"
        />
      </div>
    );
  }

  // 複数枚の場合: 重ねて表示
  return (
    <div
      className="relative cursor-pointer w-36 h-36 transition-transform duration-300 hover:scale-105 active:scale-95"
      onClick={onImageClick}
    >
      {images.slice(0, 3).map((img, idx) => (
        <div
          key={idx}
          className="absolute shadow-lg"
          style={{
            transform: `rotate(${baseRotation + idx * (isLeft ? 4 : -4)}deg)`,
            top: `${idx * 4}px`,
            left: isLeft ? `${idx * 4}px` : 'auto',
            right: isLeft ? 'auto' : `${idx * 4}px`,
            zIndex: images.length - idx,
          }}
        >
          <img
            src={img}
            alt={title}
            className="w-36 h-36 rounded-2xl object-cover"
          />
        </div>
      ))}
      {/* 枚数インジケーター */}
      <div className="absolute -bottom-2 -right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
        {images.length}
      </div>
    </div>
  );
};

// タイムラインアイテムコンポーネント
interface TimelineItemProps {
  activity: ActivityLog;
  index: number;
  onImageClick: (activity: ActivityLog) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ activity, index, onImageClick }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex items-start min-h-[180px]">
      {/* 左側コンテンツ */}
      <div className="flex-1 flex justify-end pr-4 pt-4">
        {isLeft ? (
          <PhotoStack
            images={activity.images}
            isLeft={true}
            title={activity.title}
            onImageClick={() => onImageClick(activity)}
          />
        ) : (
          <div className="text-right pr-1 pt-8">
            <h3 className="text-lg font-semibold text-black dark:text-white">{activity.title}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{activity.time}</p>
          </div>
        )}
      </div>

      {/* 中央のタイムラインと日付バッジ */}
      <div className="relative flex flex-col items-center z-10 shrink-0 pt-4">
        <div className="bg-white dark:bg-neutral-800 px-2 py-1 rounded-full shadow-sm border border-neutral-200 dark:border-neutral-700">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {formatShortDate(activity.date)}
          </span>
        </div>
      </div>

      {/* 右側コンテンツ */}
      <div className="flex-1 flex justify-start pl-4 pt-4">
        {isLeft ? (
          <div className="text-left pl-1 pt-8">
            <h3 className="text-lg font-semibold text-black dark:text-white">{activity.title}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{activity.time}</p>
          </div>
        ) : (
          <PhotoStack
            images={activity.images}
            isLeft={false}
            title={activity.title}
            onImageClick={() => onImageClick(activity)}
          />
        )}
      </div>
    </div>
  );
};

const LogScreen: React.FC<LogScreenProps> = ({ currentPage, onNavigate }) => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityLog | null>(null);

  const openViewer = (activity: ActivityLog) => {
    setSelectedActivity(activity);
  };

  const closeViewer = () => {
    setSelectedActivity(null);
  };

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      <StatusBar />

      {/* ヘッダー */}
      <div className="px-4 py-3">
        <h1 className="text-2xl font-bold text-black dark:text-white">Activity Log</h1>
      </div>

      {/* タイムラインコンテンツ */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative">
        {/* 中央の縦線 */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-300 dark:bg-neutral-700 -translate-x-1/2" />

        {/* タイムラインアイテム */}
        <div className="relative py-4">
          {ACTIVITY_LOGS.map((activity, index) => (
            <TimelineItem
              key={activity.id}
              activity={activity}
              index={index}
              onImageClick={openViewer}
            />
          ))}
        </div>
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />

      {/* インスタ風詳細ビューアー */}
      {selectedActivity && (
        <PhotoViewer
          activity={selectedActivity}
          onClose={closeViewer}
        />
      )}
    </div>
  );
};

export default LogScreen;
