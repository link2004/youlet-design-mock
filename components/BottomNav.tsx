import React from 'react';
import { NAV_ITEMS } from '../constants';

const BottomNav: React.FC = () => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-6 px-6 py-3 bg-neutral-300/60 dark:bg-neutral-700/60 rounded-full shadow-lg"
        style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      >
        {NAV_ITEMS.map((item, index) => (
          <div key={index} className="cursor-pointer">
            <item.icon
              size={24}
              className={`fill-current ${item.active ? "text-black dark:text-white" : "text-neutral-400 dark:text-neutral-500"}`}
              strokeWidth={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;