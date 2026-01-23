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
        relative w-full aspect-square rounded-2xl shadow-lg overflow-hidden
        bg-gradient-to-br ${diagnostic.gradient}
        border-2 border-white/30
        active:scale-[0.98] transition-transform duration-150
        flex flex-col items-center justify-between p-3 pt-4
      `}
    >
      {/* Emoji image */}
      <img
        src={diagnostic.image}
        alt={diagnostic.title}
        className="w-12 h-12 object-contain"
      />

      {/* Text content */}
      <h3 className="text-white font-serif italic font-black text-sm leading-tight text-center">
        {diagnostic.title.split(' ').map((word, i, arr) => (
          <span key={i}>
            {word}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </h3>
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

      {/* Header with YouLet logo */}
      <div className="relative flex items-center justify-center px-4 py-2 bg-cream dark:bg-black shrink-0 z-40 transition-colors duration-300">
        <h1 className="font-serif italic font-black text-2xl tracking-tight text-black dark:text-white">
          YouLet
        </h1>
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
