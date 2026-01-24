import React, { useState } from 'react';
import { USER_DATA, CARD_BACK_EVENTS } from '../constants';

interface ProfileCardFlipProps {
  onRequestNewEvents?: () => void;
}

const ProfileCardFlip: React.FC<ProfileCardFlipProps> = ({ onRequestNewEvents }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative mb-2">
      <div
        className="w-56 h-56 cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={handleClick}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front - Avatar */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <img
              src={USER_DATA.avatar}
              alt="Profile"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_15.png";
              }}
            />
          </div>

          {/* Back - Events */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl p-4 flex flex-col"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <h3 className="text-white font-bold text-sm mb-3 text-center">
              今週の出来事
            </h3>

            <div className="flex-1 overflow-y-auto space-y-2">
              {CARD_BACK_EVENTS.length > 0 ? (
                CARD_BACK_EVENTS.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white/20 backdrop-blur-sm rounded-xl p-3"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xl">{event.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm leading-tight truncate">
                          {event.title}
                        </p>
                        <p className="text-white/70 text-xs mt-0.5">
                          {event.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-white/70 text-sm text-center">
                    まだイベントがありません
                  </p>
                </div>
              )}
            </div>

            <p className="text-white/60 text-xs text-center mt-2">
              タップして戻る
            </p>
          </div>
        </div>
      </div>

      {/* Foot shadow */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 w-40 h-6 rounded-[50%] bg-black/20 dark:bg-white/35 blur-md transition-opacity duration-500"
        style={{ opacity: isFlipped ? 0 : 1 }}
      />
    </div>
  );
};

export default ProfileCardFlip;
