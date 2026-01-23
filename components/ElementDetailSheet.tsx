import React, { useRef, useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { UserElement } from '../constants';

interface ElementDetailSheetProps {
  element: UserElement;
  onClose: () => void;
}

const ElementDetailSheet: React.FC<ElementDetailSheetProps> = ({ element, onClose }) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const isPersonality = element.type === 'personality';

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStartY(clientY);
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartY === null) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diff = clientY - dragStartY;
    if (diff > 0) {
      setCurrentTranslate(diff);
    }
  };

  const handleDragEnd = () => {
    if (currentTranslate > 100) {
      setIsClosing(true);
      setTimeout(onClose, 200);
    } else {
      setCurrentTranslate(0);
    }
    setDragStartY(null);
  };

  return (
    <div
      className="absolute inset-0 z-[60] animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 rounded-t-3xl max-h-[70%] flex flex-col transition-transform ${
          isClosing ? 'duration-200' : 'duration-0'
        }`}
        style={{
          transform: `translateY(${isClosing ? '100%' : `${currentTranslate}px`})`,
          animation: isClosing ? undefined : 'slideUp 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none"
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          <div className="w-10 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 pb-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isPersonality ? 'bg-purple-400' : 'bg-orange-400'
              }`}
            >
              <span className="text-white text-sm font-bold">
                {element.label.charAt(0)}
              </span>
            </div>
            <h2 className="text-xl font-serif italic font-bold text-neutral-900 dark:text-white">
              {element.label}
            </h2>
          </div>
        </div>

        {/* Stories List */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {element.stories.length === 0 ? (
            <div className="text-center text-neutral-500 dark:text-neutral-400 py-8">
              まだストーリーがありません
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {element.stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4"
                >
                  <p className="text-neutral-900 dark:text-white text-sm leading-relaxed">
                    {story.content}
                  </p>
                  <div className="flex justify-end gap-2 mt-3">
                    <button className="p-2 rounded-full bg-white dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
                      <Pencil size={16} className="text-neutral-600 dark:text-neutral-300" />
                    </button>
                    <button className="p-2 rounded-full bg-white dark:bg-neutral-700 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Button */}
        <div className="px-5 py-4 border-t border-neutral-200 dark:border-neutral-700">
          <button className="w-full py-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-neutral-600 dark:text-neutral-300 font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
            <Plus size={18} />
            ストーリーを追加
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ElementDetailSheet;
