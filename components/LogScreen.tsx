import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { X, Calendar, List, ChevronLeft } from 'lucide-react';
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
  const sensitivityConfig = SENSITIVITY_CONFIG[activity.sensitivity as keyof typeof SENSITIVITY_CONFIG];

  return (
    <div
      className="border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-4 cursor-pointer active:bg-neutral-100 dark:active:bg-neutral-800 -mx-4 px-4 transition-colors"
      onClick={() => onClick(activity)}
    >
      {/* 日付とsensitivityラベル */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          {formatDateShort(activity.date)}
        </span>
        {sensitivityConfig && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${sensitivityConfig.labelColor}`}>
            {sensitivityConfig.label}
          </span>
        )}
      </div>

      {/* タイトル */}
      <h3 className="text-black dark:text-white font-semibold text-base mb-1">
        {activity.title}
      </h3>

      {/* 投稿テキスト（descriptionをそのまま使用） */}
      <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed whitespace-pre-line mb-3">
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

// sensitivityに基づく色とラベル
const SENSITIVITY_CONFIG = {
  public: {
    color: 'bg-green-500',
    label: 'Public',
    labelColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  private: {
    color: 'bg-blue-500',
    label: 'Private',
    labelColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  sensitive: {
    color: 'bg-red-500',
    label: 'Sensitive',
    labelColor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
};

// sensitivityから色を取得
const getEventColor = (sensitivity: string): string => {
  return SENSITIVITY_CONFIG[sensitivity as keyof typeof SENSITIVITY_CONFIG]?.color || 'bg-gray-400';
};

// カレンダー用のヘルパー関数
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

const formatMonthYear = (year: number, month: number): string => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[month]} ${year}`;
};

// 日付をキーとしてアクティビティをグループ化
const groupActivitiesByDate = (activities: DisplayActivity[]): Map<string, DisplayActivity[]> => {
  const map = new Map<string, DisplayActivity[]>();
  activities.forEach(activity => {
    const dateKey = activity.date; // "2026-01-15" format
    const existing = map.get(dateKey) || [];
    existing.push(activity);
    map.set(dateKey, existing);
  });
  return map;
};

// カレンダービューコンポーネント
interface CalendarViewProps {
  activities: DisplayActivity[];
  onDateClick: (date: string) => void;
  currentYear: number;
  currentMonth: number;
}

const CalendarView: React.FC<CalendarViewProps> = ({ activities, onDateClick, currentYear, currentMonth }) => {
  const today = new Date();

  // アクティビティを日付でグループ化
  const activitiesByDate = useMemo(() => groupActivitiesByDate(activities), [activities]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  // 前月の日数（カレンダーの前半を埋めるため）
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);

  // 6週間分のセルを生成
  const totalCells = 42; // 6週 x 7日

  const isToday = (day: number): boolean => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // 日付文字列を生成（例: "2026-01-05"）
  const formatDateKey = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex flex-col h-full">
      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 border-b border-neutral-200 dark:border-neutral-800">
        {weekDays.map((day, idx) => (
          <div
            key={day}
            className={`py-2 text-center text-xs font-medium ${
              idx === 0 ? 'text-red-400' : idx === 6 ? 'text-blue-400' : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* カレンダーグリッド */}
      <div className="flex-1 grid grid-cols-7 grid-rows-6">
        {Array.from({ length: totalCells }, (_, cellIndex) => {
          let day: number;
          let isCurrentMonth = true;
          let cellYear = currentYear;
          let cellMonth = currentMonth;

          if (cellIndex < firstDay) {
            // 前月の日
            day = prevMonthDays - firstDay + cellIndex + 1;
            isCurrentMonth = false;
            cellMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            cellYear = currentMonth === 0 ? currentYear - 1 : currentYear;
          } else if (cellIndex >= firstDay + daysInMonth) {
            // 次月の日
            day = cellIndex - firstDay - daysInMonth + 1;
            isCurrentMonth = false;
            cellMonth = currentMonth === 11 ? 0 : currentMonth + 1;
            cellYear = currentMonth === 11 ? currentYear + 1 : currentYear;
          } else {
            // 今月の日
            day = cellIndex - firstDay + 1;
          }

          const dateKey = formatDateKey(cellYear, cellMonth, day);
          const dayActivities = activitiesByDate.get(dateKey) || [];
          const maxVisibleEvents = 3;
          const visibleActivities = dayActivities.slice(0, maxVisibleEvents);
          const remainingCount = dayActivities.length - maxVisibleEvents;
          const dayOfWeek = cellIndex % 7;

          return (
            <button
              key={cellIndex}
              onClick={() => onDateClick(dateKey)}
              className={`border-b border-r border-neutral-100 dark:border-neutral-800 p-0.5 min-h-[60px] text-left ${
                !isCurrentMonth ? 'bg-neutral-50 dark:bg-neutral-900/50' : ''
              } hover:bg-neutral-100 dark:hover:bg-neutral-800/50 active:bg-neutral-200 dark:active:bg-neutral-700/50 transition-colors`}
            >
              {/* 日付 */}
              <div className="flex justify-center mb-0.5">
                <span
                  className={`text-xs w-5 h-5 flex items-center justify-center ${
                    isToday(day) && isCurrentMonth
                      ? 'bg-orange-400 text-white rounded-full font-semibold'
                      : isCurrentMonth
                      ? dayOfWeek === 0 ? 'text-red-400' : dayOfWeek === 6 ? 'text-blue-400' : 'text-black dark:text-white'
                      : 'text-neutral-300 dark:text-neutral-600'
                  }`}
                >
                  {day}
                </span>
              </div>

              {/* イベントバー */}
              <div className="flex flex-col gap-0.5">
                {visibleActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`${getEventColor(activity.sensitivity)} text-white text-[8px] px-1 py-0.5 rounded truncate text-left w-full`}
                    title={activity.title}
                  >
                    {activity.title}
                  </div>
                ))}
                {remainingCount > 0 && (
                  <span className="text-[8px] text-neutral-500 dark:text-neutral-400 px-1">
                    +{remainingCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

type ViewMode = 'list' | 'calendar';

const LogScreen: React.FC<LogScreenProps> = ({ currentPage, onNavigate }) => {
  const [activities, setActivities] = useState<DisplayActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<DisplayActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [scrollToDate, setScrollToDate] = useState<string | null>(null);

  // 月の状態を管理
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  // スワイプ用のref
  const headerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const dateRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const goToPrevMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }, [currentMonth, currentYear]);

  const goToNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }, [currentMonth, currentYear]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // スワイプと判定する最小距離

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // 左にスワイプ → 次の月
        goToNextMonth();
      } else {
        // 右にスワイプ → 前の月
        goToPrevMonth();
      }
    }
  }, [goToNextMonth, goToPrevMonth]);

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

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'list' ? 'calendar' : 'list');
  };

  const handleDateClick = (date: string) => {
    // リスト表示に切り替えて、その日付までスクロール
    setViewMode('list');
    setScrollToDate(date);
  };

  // スクロール処理
  useEffect(() => {
    if (scrollToDate && viewMode === 'list' && !isLoading) {
      // 少し遅延させてDOMが更新されるのを待つ
      const timer = setTimeout(() => {
        const targetRef = dateRefs.current.get(scrollToDate);
        if (targetRef) {
          targetRef.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
        setScrollToDate(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [scrollToDate, viewMode, isLoading]);

  // 日付ごとにアクティビティをグループ化
  const activitiesByDate = useMemo(() => {
    const groups: { date: string; activities: DisplayActivity[] }[] = [];
    const dateMap = new Map<string, DisplayActivity[]>();

    activities.forEach(activity => {
      const existing = dateMap.get(activity.date) || [];
      existing.push(activity);
      dateMap.set(activity.date, existing);
    });

    // 日付順にソート（新しい順）
    const sortedDates = Array.from(dateMap.keys()).sort((a, b) => b.localeCompare(a));
    sortedDates.forEach(date => {
      groups.push({ date, activities: dateMap.get(date)! });
    });

    return groups;
  }, [activities]);

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      <StatusBar />

      {/* ヘッダー - 月表示（スワイプ対応） */}
      <div
        ref={headerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 select-none"
      >
        <div className="w-10" /> {/* 左スペーサー */}
        <span className="text-black dark:text-white font-semibold text-lg">
          {formatMonthYear(currentYear, currentMonth)}
        </span>
        <button
          onClick={toggleViewMode}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700 transition-colors"
        >
          {viewMode === 'list' ? (
            <Calendar size={20} className="text-orange-400" />
          ) : (
            <List size={20} className="text-orange-400" />
          )}
        </button>
      </div>

      {/* コンテンツエリア */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-neutral-500 dark:text-neutral-400">読み込み中...</span>
        </div>
      ) : viewMode === 'list' ? (
        /* リストビュー - 日付ごとにグループ化 */
        <div ref={listContainerRef} className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 pt-3">
          {activitiesByDate.map(({ date, activities: dateActivities }) => (
            <div
              key={date}
              ref={(el) => {
                if (el) dateRefs.current.set(date, el);
              }}
            >
              {/* 日付ヘッダー */}
              <div className="py-2">
                <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                  {formatDateLong(date)}
                </span>
              </div>
              {/* その日のアクティビティ */}
              {dateActivities.map(activity => (
                <PostCard
                  key={activity.id}
                  activity={activity}
                  onClick={openEditor}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        /* カレンダービュー */
        <div
          className="flex-1 overflow-hidden pb-24"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <CalendarView
            activities={activities}
            onDateClick={handleDateClick}
            currentYear={currentYear}
            currentMonth={currentMonth}
          />
        </div>
      )}

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
