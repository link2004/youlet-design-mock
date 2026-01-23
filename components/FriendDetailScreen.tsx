import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft } from 'lucide-react';
import { FriendProfile, DiagnosticType } from '../constants';
import DiagnosticTypeSheet from './DiagnosticTypeSheet';

interface FriendDetailScreenProps {
  friend: FriendProfile;
  onBack: () => void;
  onSelectDiagnostic: (diagnostic: DiagnosticType) => void;
  initialSheetOpen?: boolean;
}

const FriendDetailScreen: React.FC<FriendDetailScreenProps> = ({ friend, onBack, onSelectDiagnostic, initialSheetOpen = false }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(initialSheetOpen);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.getElementById('iphone-modal-portal');
    setPortalContainer(container);
  }, []);

  const handleDiagnosticSelect = (diagnostic: DiagnosticType) => {
    setIsSheetOpen(false);
    onSelectDiagnostic(diagnostic);
  };

  if (!portalContainer) return null;

  return createPortal(
    <div className="absolute inset-0 z-50 font-sans overflow-hidden flex flex-col pointer-events-auto">
      {/* Blur background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />

      {/* Status Bar */}
      <div className="relative z-10 flex justify-between items-center px-6 pt-[18px] pb-2 text-white font-semibold text-sm shrink-0">
        <span className="w-12">13:42</span>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5 w-20 justify-end">
          <div className="flex items-end gap-[2px] h-3">
            <div className="w-[3px] h-[4px] bg-white rounded-[1px]" />
            <div className="w-[3px] h-[6px] bg-white rounded-[1px]" />
            <div className="w-[3px] h-[8px] bg-white rounded-[1px]" />
            <div className="w-[3px] h-[11px] bg-white rounded-[1px]" />
          </div>
          <svg className="w-4 h-3 text-white" viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3.5 7.5c2.5-2.5 6.5-2.5 9 0l-1 1c-1.9-1.9-5.1-1.9-7 0l-1-1zM1 5c3.9-3.9 10.1-3.9 14 0l-1 1c-3.3-3.3-8.7-3.3-12 0L1 5z"/>
          </svg>
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-[11px] border-[1.5px] border-white rounded-[3px] relative flex items-center p-[1.5px]">
              <div className="h-full bg-white rounded-[1px]" style={{ width: '80%' }} />
            </div>
            <div className="w-[3px] h-[5px] bg-white rounded-r-[1px] -ml-[1px]" />
          </div>
        </div>
      </div>

      {/* Header with back button */}
      <div className="relative z-10 flex items-center px-4 py-2 shrink-0">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors active:scale-95"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Content - Large Card + Name + Button */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        {/* Large Friend Card */}
        <div className="w-64 mb-4">
          <div className="w-full aspect-[2/3] rounded-3xl bg-white shadow-2xl border-2 border-white/80 flex flex-col overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-neutral-50 to-neutral-100">
              <img
                src={friend.image}
                alt={friend.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="px-4 py-3 bg-white border-t border-neutral-200">
              <span className="text-base text-neutral-700 font-semibold block text-center truncate">
                {friend.name}
              </span>
            </div>
          </div>
        </div>

        {/* Friend Name (below card) */}
        <h2 className="text-white font-bold text-2xl mb-8">{friend.name}</h2>

        {/* Compatibility Button */}
        <button
          onClick={() => setIsSheetOpen(true)}
          className="px-8 py-3 bg-white rounded-full font-semibold text-gray-900 shadow-lg hover:bg-gray-100 transition-colors active:scale-95"
        >
          Compatibility
        </button>
      </div>

      {/* Diagnostic Type Sheet */}
      <DiagnosticTypeSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSelect={handleDiagnosticSelect}
      />
    </div>,
    portalContainer
  );
};

export default FriendDetailScreen;
