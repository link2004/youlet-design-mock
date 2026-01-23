import React from 'react';
import { DIAGNOSTIC_TYPES, DiagnosticType } from '../constants';
import BottomNav from './BottomNav';
import { PageType } from '../App';

interface DiagnosticScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

interface DiagnosticCardProps {
  diagnostic: DiagnosticType;
  onClick?: () => void;
}

const DiagnosticCard: React.FC<DiagnosticCardProps> = ({ diagnostic, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-full aspect-[4/5] rounded-2xl shadow-lg overflow-hidden
        bg-gradient-to-br ${diagnostic.gradient}
        active:scale-[0.98] transition-transform duration-150
        flex flex-col items-start justify-between p-4
      `}
    >
      {/* Emoji image container with semi-transparent background */}
      <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
        <img
          src={diagnostic.image}
          alt={diagnostic.title}
          className="w-10 h-10 object-contain"
        />
      </div>

      {/* Text content */}
      <div className="text-left">
        <h3 className="text-white font-bold text-sm leading-tight mb-1">
          {diagnostic.title}
        </h3>
        <p className="text-white/70 text-xs leading-tight">
          {diagnostic.description}
        </p>
      </div>
    </button>
  );
};

const DiagnosticScreen: React.FC<DiagnosticScreenProps> = ({ currentPage, onNavigate }) => {
  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-[18px] pb-2 text-black dark:text-white font-semibold text-sm shrink-0 z-50">
        <span className="w-12">13:42</span>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5 w-20 justify-end">
          <div className="flex items-end gap-[2px] h-3">
            <div className="w-[3px] h-[4px] bg-black dark:bg-white rounded-[1px]" />
            <div className="w-[3px] h-[6px] bg-black dark:bg-white rounded-[1px]" />
            <div className="w-[3px] h-[8px] bg-black dark:bg-white rounded-[1px]" />
            <div className="w-[3px] h-[11px] bg-black dark:bg-white rounded-[1px]" />
          </div>
          <svg className="w-4 h-3 text-black dark:text-white" viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3.5 7.5c2.5-2.5 6.5-2.5 9 0l-1 1c-1.9-1.9-5.1-1.9-7 0l-1-1zM1 5c3.9-3.9 10.1-3.9 14 0l-1 1c-3.3-3.3-8.7-3.3-12 0L1 5z"/>
          </svg>
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-[11px] border-[1.5px] border-black dark:border-white rounded-[3px] relative flex items-center p-[1.5px]">
              <div className="h-full bg-black dark:bg-white rounded-[1px]" style={{ width: '80%' }} />
            </div>
            <div className="w-[3px] h-[5px] bg-black dark:bg-white rounded-r-[1px] -ml-[1px]" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-5 pt-2 pb-4 shrink-0">
        <h1 className="text-2xl font-bold text-black dark:text-white">Diagnostic</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
          Discover compatibility insights
        </p>
      </div>

      {/* Diagnostic Cards Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="grid grid-cols-2 gap-3">
          {DIAGNOSTIC_TYPES.map((diagnostic) => (
            <DiagnosticCard
              key={diagnostic.id}
              diagnostic={diagnostic}
              onClick={() => {
                // Future: Open diagnostic detail view
              }}
            />
          ))}
        </div>
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
};

export default DiagnosticScreen;
