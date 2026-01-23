import React, { useState } from 'react';
import { DIAGNOSTIC_TYPES, DiagnosticType, GROUP_DIAGNOSTIC_TYPES, GroupDiagnosticType, FRIENDS_LIST, MY_PROFILE } from '../constants';
import BottomNav from './BottomNav';
import { PageType } from '../App';
import { Check, Users } from 'lucide-react';

type TabType = 'pair' | 'group';

interface DiagnosticScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onSelectDiagnostic: (diagnostic: DiagnosticType) => void;
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
        relative w-full rounded-2xl shadow-lg overflow-hidden
        bg-gradient-to-br ${diagnostic.gradient}
        border-2 border-white/30
        active:scale-[0.98] transition-transform duration-150
        flex items-center p-4 gap-4
      `}
    >
      {/* Emoji */}
      <span className="text-5xl shrink-0">
        {diagnostic.emoji}
      </span>

      {/* Text content */}
      <div className="flex flex-col items-start text-left flex-1 min-w-0">
        <h3 className="text-white font-serif italic font-black text-base leading-tight">
          {diagnostic.title}
        </h3>
        <p className="text-white/80 text-xs font-medium mt-0.5">
          {diagnostic.subtitle}
        </p>
        <p className="text-white/60 text-[10px] mt-1 line-clamp-2">
          {diagnostic.description}
        </p>
      </div>
    </button>
  );
};

interface MemberSelectorProps {
  selectedMembers: number[];
  onToggleMember: (id: number) => void;
}

const MemberSelector: React.FC<MemberSelectorProps> = ({ selectedMembers, onToggleMember }) => {
  const allMembers = [
    { id: MY_PROFILE.id, name: MY_PROFILE.name, image: MY_PROFILE.image, isMe: true },
    ...FRIENDS_LIST.map(f => ({ id: f.id, name: f.name, image: f.image, isMe: false }))
  ];

  return (
    <div className="bg-white/50 dark:bg-white/10 rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Select Members
          </span>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
          selectedMembers.length >= 4 && selectedMembers.length <= 8
            ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
            : 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300'
        }`}>
          {selectedMembers.length} / 4-8
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {allMembers.map((member) => {
          const isSelected = selectedMembers.includes(member.id);
          return (
            <button
              key={member.id}
              onClick={() => onToggleMember(member.id)}
              className={`
                relative flex flex-col items-center gap-1 p-1.5 rounded-xl
                transition-all duration-150
                ${isSelected
                  ? 'bg-orange-100 dark:bg-orange-900/50 ring-2 ring-orange-400'
                  : 'bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10'}
              `}
            >
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-10 h-10 rounded-full object-cover ${
                    isSelected ? 'ring-2 ring-orange-400' : ''
                  }`}
                />
                {isSelected && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
                {member.isMe && (
                  <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-[8px] font-bold px-1 rounded">
                    ME
                  </div>
                )}
              </div>
              <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 truncate w-full text-center">
                {member.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const DiagnosticScreen: React.FC<DiagnosticScreenProps> = ({ currentPage, onNavigate, onSelectDiagnostic }) => {
  const [activeTab, setActiveTab] = useState<TabType>('pair');
  const [selectedMembers, setSelectedMembers] = useState<number[]>([MY_PROFILE.id]);

  const handleToggleMember = (id: number) => {
    setSelectedMembers(prev => {
      if (prev.includes(id)) {
        return prev.filter(m => m !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isGroupReady = selectedMembers.length >= 4 && selectedMembers.length <= 8;

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
          <div className="flex flex-col gap-3">
            <MemberSelector
              selectedMembers={selectedMembers}
              onToggleMember={handleToggleMember}
            />

            {!isGroupReady && (
              <div className="text-center py-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select 4-8 members to unlock group diagnostics
                </p>
              </div>
            )}

            <div className={`flex flex-col gap-3 transition-opacity duration-300 ${
              isGroupReady ? 'opacity-100' : 'opacity-40 pointer-events-none'
            }`}>
              {GROUP_DIAGNOSTIC_TYPES.map((diagnostic) => (
                <GroupDiagnosticCard
                  key={diagnostic.id}
                  diagnostic={diagnostic}
                  onClick={() => {
                    // TODO: Handle group diagnostic selection
                    console.log('Group diagnostic selected:', diagnostic.id, 'Members:', selectedMembers);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
};

export default DiagnosticScreen;
