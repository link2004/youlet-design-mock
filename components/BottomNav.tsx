import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Home01Icon,
  CompassIcon,
  Calendar03Icon,
  BubbleChatIcon,
  UserIcon
} from '@hugeicons/core-free-icons';
import type { IconSvgObject } from '@hugeicons/react';
import { PageType } from '../App';

interface BottomNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const NAV_ITEMS: { icon: IconSvgObject; label: string; page: PageType }[] = [
  { icon: Home01Icon, label: "Cards", page: 'cards' },
  { icon: CompassIcon, label: "Diagnostic", page: 'diagnostic' },
  { icon: Calendar03Icon, label: "Log", page: 'log' },
  { icon: BubbleChatIcon, label: "DM", page: 'dm' },
  { icon: UserIcon, label: "Profile", page: 'profile' },
];

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 z-30"
      style={{ bottom: 'max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 0.5rem))' }}
    >
      <div
        className="flex items-center gap-6 px-6 py-3 bg-neutral-300/60 dark:bg-neutral-700/60 rounded-full shadow-lg"
        style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      >
        {NAV_ITEMS.map((item, index) => {
          const isActive = currentPage === item.page;
          return (
            <button
              key={index}
              className="cursor-pointer bg-transparent border-none p-0"
              onClick={() => onNavigate(item.page)}
              aria-label={item.label}
            >
              <HugeiconsIcon
                icon={item.icon}
                size={24}
                color={isActive ? "#fb923c" : "#a3a3a3"}
                strokeWidth={isActive ? 2 : 1.5}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
