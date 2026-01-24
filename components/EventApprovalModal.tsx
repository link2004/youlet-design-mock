import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Sparkles, ChevronDown } from 'lucide-react';
import { AI_SUGGESTED_EVENTS } from '../constants';

interface EventDetails {
  additionalContext: string;
}

interface EventApprovalModalProps {
  onClose: () => void;
  onApprove: (eventIds: string[], eventDetails: Record<string, EventDetails>) => void;
}

const EventApprovalModal: React.FC<EventApprovalModalProps> = ({ onClose, onApprove }) => {
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [eventDetails, setEventDetails] = useState<Record<string, EventDetails>>({});
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  const fullText = 'AI found some recent events from your activity. Add them to your card?';

  useEffect(() => {
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
    }, 25);

    return () => clearInterval(interval);
  }, [showContent]);

  const toggleEvent = (id: string) => {
    setSelectedEvents(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setExpandedEvent(null);
        // Remove details for deselected event
        setEventDetails(prevDetails => {
          const newDetails = { ...prevDetails };
          delete newDetails[id];
          return newDetails;
        });
      } else {
        next.add(id);
        setExpandedEvent(id);
        // Initialize details with AI-generated description
        const event = AI_SUGGESTED_EVENTS.find(e => e.id === id);
        if (!eventDetails[id] && event) {
          setEventDetails(prevDetails => ({
            ...prevDetails,
            [id]: { additionalContext: event.description }
          }));
        }
        // Focus the textarea after a short delay
        setTimeout(() => {
          textareaRefs.current[id]?.focus();
        }, 100);
      }
      return next;
    });
  };

  const handleContextChange = (id: string, value: string) => {
    setEventDetails(prev => ({
      ...prev,
      [id]: { ...prev[id], additionalContext: value }
    }));
  };

  const handleApprove = () => {
    onApprove(Array.from(selectedEvents), eventDetails);
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
            <h2 className="text-white font-serif italic font-bold text-lg">New Events</h2>
          </div>

          <p className="text-white/90 text-sm leading-relaxed min-h-[2.5rem]">
            {typingText}
            {!typingComplete && <span className="animate-pulse">|</span>}
          </p>
        </div>

        {/* Events List */}
        <div
          className="p-4 space-y-3 max-h-[320px] overflow-y-auto transition-opacity duration-500"
          style={{ opacity: typingComplete ? 1 : 0.3 }}
        >
          {AI_SUGGESTED_EVENTS.map((event, index) => {
            const isSelected = selectedEvents.has(event.id);
            const isExpanded = expandedEvent === event.id && isSelected;
            const details = eventDetails[event.id];

            return (
              <div
                key={event.id}
                className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800'
                }`}
                style={{
                  opacity: typingComplete ? 1 : 0,
                  transform: typingComplete ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Event Header - Title only */}
                <button
                  onClick={() => toggleEvent(event.id)}
                  className="w-full text-left p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{event.emoji}</span>
                    <p className="flex-1 font-medium text-neutral-900 dark:text-white">
                      {event.title}
                    </p>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        isSelected
                          ? 'bg-orange-400 border-orange-400'
                          : 'border-neutral-300 dark:border-neutral-600'
                      }`}
                    >
                      {isSelected && (
                        <Check size={14} className="text-white" strokeWidth={3} />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Details Form */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 pb-4 space-y-3">
                    {/* Divider */}
                    <div className="border-t border-orange-200 dark:border-orange-800" />

                    {/* AI-generated description - editable */}
                    <div>
                      <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5 flex items-center gap-1.5">
                        <span>Edit details</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400">AI only</span>
                      </label>
                      <textarea
                        ref={(el) => { textareaRefs.current[event.id] = el; }}
                        value={details?.additionalContext || ''}
                        onChange={(e) => handleContextChange(event.id, e.target.value)}
                        placeholder="Add more context..."
                        className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 resize-none"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Collapse/Expand indicator for selected items */}
                {isSelected && !isExpanded && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedEvent(event.id);
                    }}
                    className="w-full py-2 flex items-center justify-center text-orange-500 hover:bg-orange-100/50 dark:hover:bg-orange-900/30 transition-colors"
                  >
                    <ChevronDown size={16} />
                    <span className="text-xs ml-1">Edit details</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 pt-2 flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 py-3 rounded-xl text-neutral-600 dark:text-neutral-400 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Skip
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
            Add ({selectedEvents.size})
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventApprovalModal;
