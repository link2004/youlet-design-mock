import React, { useState } from 'react';
import { USER_DATA } from '../constants';

// Empty events array (CARD_BACK_EVENTS was removed from constants)
const CARD_BACK_EVENTS: Array<{ id: string; title: string; emoji: string; date: string; }> = [];

const ProfileCardFlip: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center mt-4 mb-6 px-6">
      <div
        className="w-64 aspect-[2/3] cursor-pointer"
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
          {/* Front - Profile Card */}
          <div
            className="absolute inset-0 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg border-2 border-neutral-200 dark:border-neutral-600 overflow-hidden flex flex-col"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex-1 min-h-0 flex items-center justify-center p-4 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800">
              <img
                src={USER_DATA.avatar}
                alt="Profile"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_15.png";
                }}
              />
            </div>
            <div className="shrink-0 px-4 py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-600">
              <div className="text-center">
                <span className="text-xl font-serif italic font-bold text-neutral-900 dark:text-white block">{USER_DATA.name}</span>
              </div>
            </div>
          </div>

          {/* Back - Events Card */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg border-2 border-orange-300 dark:border-orange-600"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 p-4 flex flex-col">
              <h3 className="text-white font-serif italic font-bold text-lg mb-3 text-center">
                Today's Events
              </h3>

              <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
                {CARD_BACK_EVENTS.length > 0 ? (
                  CARD_BACK_EVENTS.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white/20 backdrop-blur-sm rounded-xl p-3"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-2xl flex-shrink-0">{event.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm leading-tight">
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
                      No events yet
                    </p>
                  </div>
                )}
              </div>

              <p className="text-white/60 text-xs text-center mt-3 font-medium">
                Tap to flip back
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-neutral-400 dark:text-neutral-500 text-xs mt-3">
        Tap card to see events
      </p>
    </div>
  );
};

export default ProfileCardFlip;
