import React from 'react';
import { DIAGNOSTIC_TYPES, DiagnosticType } from '../constants';

interface DiagnosticTypeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (diagnostic: DiagnosticType) => void;
}

const DiagnosticTypeSheet: React.FC<DiagnosticTypeSheetProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - tap to close */}
      <div
        className="absolute inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 z-50
          bg-white dark:bg-gray-900 rounded-t-3xl
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
        style={{ height: '85%' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Title */}
        <div className="px-6 pb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Select Diagnostic
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Choose a compatibility type to diagnose
          </p>
        </div>

        {/* Diagnostic type cards */}
        <div className="px-4 pb-8 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 120px)' }}>
          <div className="grid grid-cols-2 gap-3">
            {DIAGNOSTIC_TYPES.map((diagnostic) => (
              <button
                key={diagnostic.id}
                onClick={() => onSelect(diagnostic)}
                className={`
                  relative w-full aspect-square rounded-2xl shadow-lg overflow-hidden
                  bg-gradient-to-br ${diagnostic.gradient}
                  border-2 border-white/30
                  active:scale-[0.98] transition-transform duration-150
                  flex flex-col items-start justify-end p-5 gap-3
                `}
              >
                <img
                  src={diagnostic.image}
                  alt={diagnostic.title}
                  className="w-12 h-12 object-contain"
                />
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DiagnosticTypeSheet;
