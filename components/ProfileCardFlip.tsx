import React from 'react';
import { USER_DATA } from '../constants';

const ProfileCardFlip: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-4 mb-6 px-6">
      <div className="w-full aspect-[3/4]">
        <div className="relative w-full h-full">
          {/* Profile Card */}
          <div className="absolute inset-0 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg border-2 border-neutral-200 dark:border-neutral-600 overflow-hidden flex flex-col">
            <div className="flex-1 min-h-0 flex items-center justify-center p-4 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800">
              <img
                src={USER_DATA.characterAvatar}
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
        </div>
      </div>
    </div>
  );
};

export default ProfileCardFlip;
