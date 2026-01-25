import React, { useState, useRef, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { ACTIVITY_LOGS, ActivityLog } from '../constants';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import { PageType } from '../App';

interface LogScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

// 日付をフォーマット（例: "January 25, 2026"）
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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
          <span>{formatDate(activity.date)}</span>
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

// 横スクロール写真ギャラリー
interface PhotoGalleryProps {
  images: string[];
  onImageClick: (index: number) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images, onImageClick }) => {
  return (
    <div
      className="flex gap-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1"
      style={{ scrollSnapType: 'x mandatory' }}
    >
      {images.map((img, idx) => (
        <div
          key={idx}
          className="flex-shrink-0 cursor-pointer transition-transform duration-200 active:scale-95"
          style={{ scrollSnapAlign: 'start' }}
          onClick={() => onImageClick(idx)}
        >
          <img
            src={img}
            alt=""
            className="w-20 h-20 rounded-lg object-cover"
          />
        </div>
      ))}
    </div>
  );
};

// アクティビティアイテム（1つのアクティビティ）
interface ActivityItemProps {
  activity: ActivityLog;
  onImageClick: (activity: ActivityLog, imageIndex: number) => void;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, onImageClick }) => {
  const getDiaryTextForActivity = (act: ActivityLog): string => {
    switch (act.category) {
      case 'school':
        return '今日も一日お疲れ様でした。友達と話せて楽しかった！';
      case 'work':
        return 'バイト頑張った！なんとか乗り切れた。';
      case 'leisure':
        return '最高だった！また行きたいな〜';
      case 'food':
        return '美味しかった〜！また来よう。';
      case 'other':
        return '充実した時間を過ごせた。';
      default:
        return '';
    }
  };

  return (
    <div className="mb-4">
      {/* アクティビティタイトルと時間 */}
      <div className="flex items-center gap-2 mb-1">
        <span className="font-medium text-black dark:text-white">{activity.title}</span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">{activity.time}</span>
      </div>

      {/* 日記テキスト */}
      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
        {getDiaryTextForActivity(activity)}
      </p>

      {/* 写真ギャラリー */}
      {activity.images.length > 0 && (
        <PhotoGallery
          images={activity.images}
          onImageClick={(index) => onImageClick(activity, index)}
        />
      )}
    </div>
  );
};

// 日記エントリー（1日分）
interface DiaryEntryProps {
  date: string;
  activities: ActivityLog[];
  onImageClick: (activity: ActivityLog, imageIndex: number) => void;
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ date, activities, onImageClick }) => {
  return (
    <div className="mb-6">
      {/* 日付ヘッダー */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
        <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
          {formatDate(date)}
        </span>
      </div>

      {/* アクティビティ一覧 */}
      <div className="pl-4">
        {activities.map(activity => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            onImageClick={onImageClick}
          />
        ))}
      </div>
    </div>
  );
};

const LogScreen: React.FC<LogScreenProps> = ({ currentPage, onNavigate }) => {
  const [selectedActivity, setSelectedActivity] = useState<{ activity: ActivityLog; imageIndex: number } | null>(null);

  // 日付ごとにアクティビティをグループ化
  const groupedActivities = useMemo(() => {
    const groups: { [date: string]: ActivityLog[] } = {};
    ACTIVITY_LOGS.forEach(activity => {
      if (!groups[activity.date]) {
        groups[activity.date] = [];
      }
      groups[activity.date].push(activity);
    });
    // 日付でソート（新しい順）
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, []);

  const openViewer = (activity: ActivityLog, imageIndex: number) => {
    setSelectedActivity({ activity, imageIndex });
  };

  const closeViewer = () => {
    setSelectedActivity(null);
  };

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      <StatusBar />

      {/* 日記エントリー一覧 */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 pt-3">
        {groupedActivities.map(([date, activities]) => (
          <DiaryEntry
            key={date}
            date={date}
            activities={activities}
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
