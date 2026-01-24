import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, X } from 'lucide-react';
import { FriendProfile, DiagnosticType, DIAGNOSTIC_TYPES } from '../constants';
import StatusBar from './StatusBar';

interface FriendDetailScreenProps {
  friend: FriendProfile;
  onBack: () => void;
  onDiagnostic?: (diagnostic: DiagnosticType) => void;
  onDM?: () => void;
}

const FriendDetailScreen: React.FC<FriendDetailScreenProps> = ({ friend, onBack, onDiagnostic, onDM }) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const container = document.getElementById('iphone-modal-portal');
    setPortalContainer(container);
  }, []);

  const handleSelectDiagnostic = (diagnostic: DiagnosticType) => {
    setIsSheetOpen(false);
    onDiagnostic?.(diagnostic);
  };

  if (!portalContainer) return null;

  return createPortal(
    <div className="absolute inset-0 z-50 font-sans overflow-hidden flex flex-col pointer-events-auto">
      {/* Blur background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />

      <StatusBar variant="light" className="relative z-10" />

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

      {/* Content - Card + Actions */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        {/* Large Friend Card - Original Design */}
        <div style={{ width: '220px', height: '330px' }} className="rounded-3xl bg-white shadow-2xl border-2 border-white/80 overflow-hidden flex flex-col">
          <div className="flex-1 min-h-0 flex items-center justify-center p-6 bg-gradient-to-b from-neutral-50 to-neutral-100">
            <img
              src={friend.image}
              alt={friend.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="shrink-0 px-4 py-3 bg-white border-t border-neutral-200">
            <span className="text-base text-neutral-700 font-semibold block text-center truncate">
              {friend.name}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-10 w-48">
          <button
            onClick={() => setIsSheetOpen(true)}
            className="w-full py-3 rounded-full bg-orange-400 shadow-lg active:scale-95 transition-transform"
          >
            <span className="text-base text-white font-bold">Compatibility</span>
          </button>

          <button
            onClick={onDM}
            className="w-full py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 active:scale-95 transition-transform"
          >
            <span className="text-base text-white font-bold">Message</span>
          </button>
        </div>
      </div>

      {/* Diagnostic Type Selection Sheet */}
      {isSheetOpen && (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsSheetOpen(false)}
          />

          {/* Sheet */}
          <div className="relative bg-white rounded-t-3xl px-4 pt-4 pb-8 animate-slide-up">
            {/* Handle */}
            <div className="flex justify-center mb-3">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Select Diagnostic</h3>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Diagnostic Options */}
            <div className="space-y-2">
              {DIAGNOSTIC_TYPES.map((diagnostic) => (
                <button
                  key={diagnostic.id}
                  onClick={() => handleSelectDiagnostic(diagnostic)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${diagnostic.gradient} active:scale-[0.98] transition-transform`}
                >
                  <img
                    src={diagnostic.image}
                    alt={diagnostic.title}
                    className="w-10 h-10 object-contain"
                  />
                  <div className="flex-1 text-left">
                    <span className="text-white font-semibold block">{diagnostic.title}</span>
                    <span className="text-white/80 text-xs">{diagnostic.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>,
    portalContainer
  );
};

export default FriendDetailScreen;
