import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FriendProfile } from '../constants';

interface FriendCardFlipModalProps {
  friend: FriendProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onViewDetail: (friend: FriendProfile) => void;
}

const FriendCardFlipModal: React.FC<FriendCardFlipModalProps> = ({
  friend,
  isOpen,
  onClose,
  onViewDetail,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsFlipped(false);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsFlipped(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible || !friend) return null;

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleViewDetail = () => {
    onClose();
    onViewDetail(friend);
  };

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center transition-transform duration-300 ${
        isOpen ? 'scale-100' : 'scale-95'
      }`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-20 w-8 h-8 bg-white dark:bg-neutral-700 rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors"
          style={{ transform: 'translate(50%, -50%)' }}
        >
          <X size={18} className="text-neutral-600 dark:text-neutral-300" />
        </button>

        {/* Flippable Card */}
        <div
          className="w-56 aspect-[2/3] cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={handleCardClick}
        >
          <div
            className="relative w-full h-full transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front - Friend Card */}
            <div
              className="absolute inset-0 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg border-2 border-neutral-200 dark:border-neutral-600 overflow-hidden flex flex-col"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="flex-1 min-h-0 flex items-center justify-center p-4 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800">
                <img
                  src={friend.image}
                  alt={friend.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="shrink-0 px-4 py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-600">
                <div className="text-center">
                  <span className="text-xl font-serif italic font-bold text-neutral-900 dark:text-white block">
                    {friend.name}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {friend.userId}
                  </span>
                </div>
              </div>
            </div>

            {/* Back - Hobbies & Personality */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg border-2 border-orange-300 dark:border-orange-600"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 p-4 flex flex-col">
                <h3 className="text-white font-serif italic font-bold text-lg mb-3 text-center">
                  {friend.name}'s Profile
                </h3>

                <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
                  {/* Hobbies */}
                  <div>
                    <p className="text-white/80 text-xs font-semibold mb-1.5">Hobbies</p>
                    <div className="flex flex-wrap gap-1.5">
                      {friend.hobbies.map((hobby) => (
                        <span
                          key={hobby}
                          className="bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full"
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Personality */}
                  <div>
                    <p className="text-white/80 text-xs font-semibold mb-1.5">Personality</p>
                    <div className="flex flex-wrap gap-1.5">
                      {friend.personality.map((trait) => (
                        <span
                          key={trait}
                          className="bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-white/60 text-xs text-center mt-3 font-medium">
                  Tap to flip back
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hint text */}
        <p className="text-white/70 text-xs mt-3">
          {isFlipped ? 'Tap card to see front' : 'Tap card to see profile'}
        </p>

        {/* View Detail Button */}
        <button
          onClick={handleViewDetail}
          className="mt-4 px-6 py-2.5 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-full shadow-lg transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default FriendCardFlipModal;
