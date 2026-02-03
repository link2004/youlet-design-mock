import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Home09Icon,
  SentIcon,
  UserIcon
} from '@hugeicons/core-free-icons';
import type { IconSvgObject } from '@hugeicons/react';
import { PageType } from '../App';

interface BottomNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const NAV_ITEMS: { icon: IconSvgObject; label: string; page: PageType }[] = [
  { icon: SentIcon, label: "Chat", page: 'chat' },
  { icon: Home09Icon, label: "Home", page: 'home' },
  { icon: UserIcon, label: "Profile", page: 'profile' },
];

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-30 bg-white/80 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-700"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      <div className="flex items-center justify-around px-4 py-3">
        {NAV_ITEMS.map((item, index) => {
          const isActive = currentPage === item.page;
          return (
            <button
              key={index}
              className="cursor-pointer bg-transparent border-none p-2"
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
