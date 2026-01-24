import React, { useState, useEffect } from 'react';
import { X, Trash2, Check } from 'lucide-react';
import { AIConversationMessage } from '../constants';

interface AIConversationEditModalProps {
  message: AIConversationMessage;
  onClose: () => void;
  onSave: (messageId: string, newText: string) => void;
  onDelete: (messageId: string) => void;
}

const AIConversationEditModal: React.FC<AIConversationEditModalProps> = ({
  message,
  onClose,
  onSave,
  onDelete,
}) => {
  const [text, setText] = useState(message.message);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    if (text.trim()) {
      onSave(message.id, text.trim());
    }
  };

  const handleDelete = () => {
    onDelete(message.id);
  };

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
        className="relative bg-white dark:bg-neutral-900 rounded-3xl w-[90%] max-w-sm mx-4 overflow-hidden shadow-2xl transition-all duration-300"
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
        }}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-400 to-pink-500 px-5 py-4">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X size={18} className="text-white" />
          </button>

          <h2 className="text-white font-serif italic font-bold text-lg">
            Edit Message
          </h2>
          <p className="text-white/80 text-sm mt-1">
            Modify what your AI said
          </p>
        </div>

        {/* Content */}
        <div className="p-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-black dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your message..."
          />

          <p className="text-xs text-neutral-500 mt-2">
            Original: {message.timestamp}
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 pt-2 flex gap-3">
          <button
            onClick={handleDelete}
            className="flex-1 py-3 rounded-xl text-red-500 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 size={16} />
            Delete
          </button>
          <button
            onClick={handleSave}
            disabled={!text.trim() || text === message.message}
            className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              text.trim() && text !== message.message
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

export default AIConversationEditModal;
