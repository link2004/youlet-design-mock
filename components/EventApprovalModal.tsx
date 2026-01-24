import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { AI_SUGGESTED_EVENTS } from '../constants';

interface EventApprovalModalProps {
  onClose: () => void;
  onApprove: (eventIds: string[]) => void;
}

const EventApprovalModal: React.FC<EventApprovalModalProps> = ({ onClose, onApprove }) => {
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [showContent, setShowContent] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  const fullText = 'AIがあなたの最近の活動から、カードに表示する出来事を提案しました';

  useEffect(() => {
    // Fade in content
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showContent) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.slice(0, index));
        index++;
      } else {
        setTypingComplete(true);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [showContent]);

  const toggleEvent = (id: string) => {
    setSelectedEvents(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleApprove = () => {
    onApprove(Array.from(selectedEvents));
    onClose();
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: showContent ? 1 : 0 }}
        onClick={handleSkip}
      />

      {/* Modal */}
      <div
        className="relative bg-white dark:bg-neutral-900 rounded-3xl w-[90%] max-w-sm mx-4 overflow-hidden shadow-2xl transition-all duration-500"
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
        }}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-400 to-pink-500 px-5 py-4">
          <button
            onClick={handleSkip}
            className="absolute right-3 top-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X size={18} className="text-white" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={20} className="text-white" />
            <h2 className="text-white font-bold text-lg">新しい出来事</h2>
          </div>

          <p className="text-white/90 text-sm leading-relaxed min-h-[2.5rem]">
            {typingText}
            {!typingComplete && <span className="animate-pulse">|</span>}
          </p>
        </div>

        {/* Events List */}
        <div
          className="p-4 space-y-3 max-h-[280px] overflow-y-auto transition-opacity duration-500"
          style={{ opacity: typingComplete ? 1 : 0.3 }}
        >
          {AI_SUGGESTED_EVENTS.map((event, index) => (
            <button
              key={event.id}
              onClick={() => toggleEvent(event.id)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                selectedEvents.has(event.id)
                  ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20'
                  : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800'
              }`}
              style={{
                opacity: typingComplete ? 1 : 0,
                transform: typingComplete ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{event.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-900 dark:text-white">
                    {event.title}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {event.description}
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedEvents.has(event.id)
                      ? 'bg-orange-400 border-orange-400'
                      : 'border-neutral-300 dark:border-neutral-600'
                  }`}
                >
                  {selectedEvents.has(event.id) && (
                    <Check size={14} className="text-white" strokeWidth={3} />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 pt-2 flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 py-3 rounded-xl text-neutral-600 dark:text-neutral-400 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            スキップ
          </button>
          <button
            onClick={handleApprove}
            disabled={selectedEvents.size === 0}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
              selectedEvents.size > 0
                ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500'
            }`}
          >
            追加する ({selectedEvents.size})
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventApprovalModal;
