import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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

// 全画面フォトビューアー
interface PhotoViewerProps {
  images: string[];
  initialIndex: number;
  title: string;
  onClose: () => void;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({ images, initialIndex, title, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // アニメーションのためのマウント後の表示
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  useEffect(() => {
    // スクロール位置を初期インデックスに設定
    if (scrollRef.current && currentIndex > 0) {
      const items = scrollRef.current.children;
      if (items[currentIndex]) {
        const item = items[currentIndex] as HTMLElement;
        // scroll-snap-align: center なので、アイテムの中心が画面中央に来るようにスクロール
        const itemLeft = item.offsetLeft;
        const itemWidth = item.offsetWidth;
        const containerWidth = scrollRef.current.offsetWidth;
        scrollRef.current.scrollLeft = itemLeft - (containerWidth - itemWidth) / 2;
      }
    }
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const items = Array.from(scrollRef.current.children) as HTMLElement[];
      const containerCenter = scrollRef.current.scrollLeft + scrollRef.current.offsetWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      items.forEach((item, idx) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(containerCenter - itemCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = idx;
        }
      });

      if (closestIndex !== currentIndex) {
        setCurrentIndex(closestIndex);
      }
    }
  };

  const goToIndex = (index: number) => {
    if (scrollRef.current && index >= 0 && index < images.length) {
      const items = scrollRef.current.children;
      if (items[index]) {
        const item = items[index] as HTMLElement;
        const itemLeft = item.offsetLeft;
        const itemWidth = item.offsetWidth;
        const containerWidth = scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({
          left: itemLeft - (containerWidth - itemWidth) / 2,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`absolute inset-0 z-50 bg-black/80 backdrop-blur-xl transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* ヘッダー */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-12 px-4 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
          >
            <X size={24} className="text-white" />
          </button>
          <h2 className="text-white font-semibold text-lg">{title}</h2>
          <div className="w-10" /> {/* スペーサー */}
        </div>
      </div>

      {/* 画像スクロールエリア */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onClick={handleClose}
        className="h-full w-full overflow-x-auto no-scrollbar flex items-center"
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        {images.map((img, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === images.length - 1;
          const slideWidth = 75; // percentage of container width

          return (
            <div
              key={idx}
              className="h-full flex-shrink-0 flex items-center justify-center"
              style={{
                width: `${slideWidth}%`,
                scrollSnapAlign: 'center',
                boxSizing: 'content-box',
                paddingLeft: isFirst ? `calc(50% - ${slideWidth / 2}%)` : '8px',
                paddingRight: isLast ? `calc(50% - ${slideWidth / 2}%)` : '8px',
              }}
            >
              <img
                src={img}
                alt=""
                onClick={(e) => e.stopPropagation()}
                className={`max-h-[70vh] w-full object-contain rounded-2xl transition-transform duration-500 ${
                  isVisible ? 'scale-100' : 'scale-90'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* ナビゲーションボタン */}
      {images.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={() => goToIndex(currentIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm transition-transform hover:scale-110"
            >
              <ChevronLeft size={28} className="text-white" />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              onClick={() => goToIndex(currentIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm transition-transform hover:scale-110"
            >
              <ChevronRight size={28} className="text-white" />
            </button>
          )}
        </>
      )}

      {/* インジケーター */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 写真スタックコンポーネント
interface PhotoStackProps {
  images: string[];
  isLeft: boolean;
  title: string;
  onImageClick: (index: number) => void;
}

const PhotoStack: React.FC<PhotoStackProps> = ({ images, isLeft, title, onImageClick }) => {
  const baseRotation = isLeft ? -3 : 3;

  if (images.length === 1) {
    return (
      <div
        onClick={() => onImageClick(0)}
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
      onClick={() => onImageClick(0)}
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
  onImageClick: (images: string[], index: number, title: string) => void;
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
            onImageClick={(imgIndex) => onImageClick(activity.images, imgIndex, activity.title)}
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
            onImageClick={(imgIndex) => onImageClick(activity.images, imgIndex, activity.title)}
          />
        )}
      </div>
    </div>
  );
};

const LogScreen: React.FC<LogScreenProps> = ({ currentPage, onNavigate }) => {
  const [viewerData, setViewerData] = useState<{
    images: string[];
    index: number;
    title: string;
  } | null>(null);

  const openViewer = (images: string[], index: number, title: string) => {
    setViewerData({ images, index, title });
  };

  const closeViewer = () => {
    setViewerData(null);
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

      {/* 全画面フォトビューアー */}
      {viewerData && (
        <PhotoViewer
          images={viewerData.images}
          initialIndex={viewerData.index}
          title={viewerData.title}
          onClose={closeViewer}
        />
      )}
    </div>
  );
};

export default LogScreen;
