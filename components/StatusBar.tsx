import React from 'react';
import { useMobile } from '../contexts/MobileContext';

interface StatusBarProps {
  variant?: 'default' | 'light';
  className?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ variant = 'default', className = '' }) => {
  const { isMobile } = useMobile();

  // Don't render on mobile - the real device has its own status bar
  if (isMobile) {
    return null;
  }

  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-black dark:text-white';
  const bgColor = isLight ? 'bg-white' : 'bg-black dark:bg-white';
  const borderColor = isLight ? 'border-white' : 'border-black dark:border-white';

  return (
    <div className={`flex justify-between items-center px-6 pt-[18px] pb-2 ${textColor} font-semibold text-sm shrink-0 z-50 ${className}`}>
      <span className="w-12">13:42</span>
      <div className="flex-1" />
      <div className="flex items-center gap-1.5 w-20 justify-end">
        {/* Cellular signal */}
        <div className="flex items-end gap-[2px] h-3">
          <div className={`w-[3px] h-[4px] ${bgColor} rounded-[1px]`} />
          <div className={`w-[3px] h-[6px] ${bgColor} rounded-[1px]`} />
          <div className={`w-[3px] h-[8px] ${bgColor} rounded-[1px]`} />
          <div className={`w-[3px] h-[11px] ${bgColor} rounded-[1px]`} />
        </div>
        {/* WiFi */}
        <svg className={`w-4 h-3 ${textColor}`} viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3.5 7.5c2.5-2.5 6.5-2.5 9 0l-1 1c-1.9-1.9-5.1-1.9-7 0l-1-1zM1 5c3.9-3.9 10.1-3.9 14 0l-1 1c-3.3-3.3-8.7-3.3-12 0L1 5z"/>
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-0.5">
          <div className={`w-6 h-[11px] border-[1.5px] ${borderColor} rounded-[3px] relative flex items-center p-[1.5px]`}>
            <div className={`h-full ${bgColor} rounded-[1px]`} style={{ width: '80%' }} />
          </div>
          <div className={`w-[3px] h-[5px] ${bgColor} rounded-r-[1px] -ml-[1px]`} />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
