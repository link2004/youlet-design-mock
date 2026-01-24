import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Check } from 'lucide-react';
import { FriendEvent } from '../constants';

interface CardBackEditModalProps {
  events: FriendEvent[];
  onClose: () => void;
  onSave: (events: FriendEvent[]) => void;
}

interface EditableEvent extends FriendEvent {
  isNew?: boolean;
}

const EMOJI_OPTIONS = ['📷', '☕', '🎮', '🎨', '📚', '🎵', '✈️', '🍝', '⛰️', '🧘', '🎬', '🍿', '💡', '✨', '🎸', '🖼️'];

const CardBackEditModal: React.FC<CardBackEditModalProps> = ({
  events,
  onClose,
  onSave,
}) => {
  const [editableEvents, setEditableEvents] = useState<EditableEvent[]>(
    events.map(e => ({ ...e }))
  );
  const [showContent, setShowContent] = useState(false);
  const [editingEmojiId, setEditingEmojiId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleAddEvent = () => {
    const newEvent: EditableEvent = {
      id: `new-${Date.now()}`,
      title: '',
      emoji: '✨',
      date: 'Just now',
      description: '',
      isNew: true,
    };
    setEditableEvents([newEvent, ...editableEvents]);
  };

  const handleUpdateEvent = (id: string, field: keyof FriendEvent, value: string) => {
    setEditableEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleDeleteEvent = (id: string) => {
    setEditableEvents(prev => prev.filter(e => e.id !== id));
  };

  const handleSave = () => {
    const validEvents = editableEvents
      .filter(e => e.title.trim())
      .map(({ isNew, ...event }) => event);
    onSave(validEvents);
  };

  const hasChanges = JSON.stringify(events) !== JSON.stringify(
    editableEvents.filter(e => e.title.trim()).map(({ isNew, ...event }) => event)
  );

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: showContent ? 1 : 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white dark:bg-neutral-900 rounded-3xl w-[90%] max-w-sm mx-4 overflow-hidden shadow-2xl transition-all duration-300 max-h-[80%] flex flex-col"
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
        }}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-400 to-pink-500 px-5 py-4 shrink-0">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X size={18} className="text-white" />
          </button>

          <h2 className="text-white font-serif italic font-bold text-lg">
            Edit Today's Events
          </h2>
          <p className="text-white/80 text-sm mt-1">
            Add, edit, or remove events from your card
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          {/* Add button */}
          <button
            onClick={handleAddEvent}
            className="w-full py-3 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-xl text-neutral-500 dark:text-neutral-400 hover:border-orange-400 hover:text-orange-400 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Event
          </button>

          {/* Event list */}
          {editableEvents.map((event) => (
            <div
              key={event.id}
              className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-3"
            >
              <div className="flex items-start gap-3">
                {/* Emoji selector */}
                <div className="relative">
                  <button
                    onClick={() => setEditingEmojiId(editingEmojiId === event.id ? null : event.id)}
                    className="text-2xl w-10 h-10 flex items-center justify-center bg-white dark:bg-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-600 transition-colors"
                  >
                    {event.emoji}
                  </button>

                  {/* Emoji picker dropdown */}
                  {editingEmojiId === event.id && (
                    <div className="absolute top-12 left-0 z-10 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-2 grid grid-cols-4 gap-1 border border-neutral-200 dark:border-neutral-700">
                      {EMOJI_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => {
                            handleUpdateEvent(event.id, 'emoji', emoji);
                            setEditingEmojiId(null);
                          }}
                          className="w-8 h-8 text-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Title and description inputs */}
                <div className="flex-1 min-w-0 space-y-2">
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) => handleUpdateEvent(event.id, 'title', e.target.value)}
                    placeholder="Event title..."
                    className="w-full bg-transparent text-black dark:text-white text-sm font-medium focus:outline-none placeholder:text-neutral-400"
                  />
                  <textarea
                    value={event.description || ''}
                    onChange={(e) => handleUpdateEvent(event.id, 'description', e.target.value)}
                    placeholder="Add details (shown only in AI conversation)..."
                    rows={2}
                    className="w-full bg-white dark:bg-neutral-700 text-black dark:text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-400 placeholder:text-neutral-400 resize-none"
                  />
                  <p className="text-xs text-neutral-500">{event.date}</p>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {editableEvents.length === 0 && (
            <div className="text-center py-8 text-neutral-500">
              <p className="text-sm">No events yet</p>
              <p className="text-xs mt-1">Tap "Add Event" to create one</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 pt-2 flex gap-3 shrink-0 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-neutral-600 dark:text-neutral-400 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              hasChanges
                ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500'
            }`}
          >
            <Check size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardBackEditModal;
