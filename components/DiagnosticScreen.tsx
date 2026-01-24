import React, { useState } from 'react';
import { DIAGNOSTIC_TYPES, DiagnosticType, GROUP_DIAGNOSTIC_TYPES, GroupDiagnosticType } from '../constants';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import { PageType } from '../App';

type TabType = 'pair' | 'group';

interface DiagnosticScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onSelectDiagnostic: (diagnostic: DiagnosticType) => void;
  onSelectGroupDiagnostic: (diagnostic: GroupDiagnosticType) => void;
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
        flex flex-col items-start justify-end p-5 gap-3
      `}
    >
      {/* Emoji image */}
      <img
        src={diagnostic.image}
        alt={diagnostic.title}
        className="w-12 h-12 object-contain"
      />

      {/* Text content */}
      <h3 className="text-white font-serif italic font-black text-sm leading-tight text-left">
        {(() => {
          const words = diagnostic.title.split(' ');
          if (words.length <= 2) {
            return <>{words[0]}<br />{words[1]}</>;
          }
          const lastWord = words.pop();
          return <>{words.join(' ')}<br />{lastWord}</>;
        })()}
      </h3>
    </button>
  );
};

interface GroupDiagnosticCardProps {
  diagnostic: GroupDiagnosticType;
  onClick?: () => void;
}

const GroupDiagnosticCard: React.FC<GroupDiagnosticCardProps> = ({ diagnostic, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-full aspect-square rounded-2xl shadow-lg overflow-hidden
        bg-gradient-to-br ${diagnostic.gradient}
        border-2 border-white/30
        active:scale-[0.98] transition-transform duration-150
        flex flex-col items-start justify-end p-5 gap-3
      `}
    >
      {/* Image */}
      <img
        src={diagnostic.image}
        alt={diagnostic.title}
        className="w-12 h-12 object-contain"
      />

      {/* Text content */}
      <h3 className="text-white font-serif italic font-black text-sm leading-tight text-left">
        {(() => {
          const words = diagnostic.title.split(' ');
          if (words.length <= 2) {
            return <>{words[0]}<br />{words[1]}</>;
          }
          const lastWord = words.pop();
          return <>{words.join(' ')}<br />{lastWord}</>;
        })()}
      </h3>
    </button>
  );
};

const DiagnosticScreen: React.FC<DiagnosticScreenProps> = ({ currentPage, onNavigate, onSelectDiagnostic, onSelectGroupDiagnostic }) => {
  const [activeTab, setActiveTab] = useState<TabType>('pair');

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      <StatusBar />

      {/* Header with YouLet logo */}
      <div className="relative flex items-center justify-center px-4 py-2 bg-cream dark:bg-black shrink-0 z-40 transition-colors duration-300">
        <h1 className="font-serif italic font-black text-2xl tracking-tight text-black dark:text-white">
          YouLet
        </h1>
      </div>

      {/* Tabs */}
      <div className="px-4 pb-3 shrink-0">
        <div className="flex bg-gray-200/70 dark:bg-gray-800/70 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('pair')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'pair'
                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Pair
          </button>
          <button
            onClick={() => setActiveTab('group')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'group'
                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Group
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {activeTab === 'pair' ? (
          <div className="grid grid-cols-2 gap-3">
            {DIAGNOSTIC_TYPES.map((diagnostic) => (
              <DiagnosticCard
                key={diagnostic.id}
                diagnostic={diagnostic}
                onClick={() => onSelectDiagnostic(diagnostic)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {GROUP_DIAGNOSTIC_TYPES.map((diagnostic) => (
              <GroupDiagnosticCard
                key={diagnostic.id}
                diagnostic={diagnostic}
                onClick={() => onSelectGroupDiagnostic(diagnostic)}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
};

export default DiagnosticScreen;
