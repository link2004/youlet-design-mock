import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles } from 'lucide-react';
import { MY_ONE_LINE_CANDIDATES, USER_DATA } from '../constants';
import { useAppState, OneLine } from '../contexts/AppStateContext';

interface OneLineGenerateScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

type Phase = 'loading' | 'candidates' | 'confirmed';

const OneLineGenerateScreen: React.FC<OneLineGenerateScreenProps> = ({ isOpen, onClose }) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>('loading');
  const { dispatch } = useAppState();

  useEffect(() => {
    const container = document.getElementById('iphone-modal-portal');
    setPortalContainer(container);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setPhase('loading');
      const timer = setTimeout(() => {
        const candidates: OneLine[] = MY_ONE_LINE_CANDIDATES.map(c => ({
          id: c.id,
          title: c.title,
          characterImage: c.characterImage,
        }));
        dispatch({ type: 'GENERATE_CANDIDATES', candidates });
        setPhase('candidates');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, dispatch]);

  const handleSelect = (candidate: OneLine) => {
    dispatch({ type: 'CONFIRM_ONELINE', oneLine: candidate });
    setPhase('confirmed');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  if (!isOpen || !portalContainer) return null;

  return createPortal(
    <div className="absolute inset-0 z-[60] font-sans overflow-hidden flex flex-col bg-black/80 backdrop-blur-lg">
      {/* Close button */}
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 active:scale-95 transition-transform"
        >
          <X size={20} className="text-white" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {phase === 'loading' && (
          <div className="flex flex-col items-center gap-6 animate-pulse">
            <div className="relative">
              <img
                src={USER_DATA.characterAvatar}
                alt="AI"
                className="w-24 h-24 object-contain"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center animate-spin">
                <Sparkles size={16} className="text-white" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-white text-xl font-bold mb-2">AI Analyzing...</h2>
              <p className="text-white/60 text-sm">Creating your today's one line</p>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {phase === 'candidates' && (
          <div className="w-full">
            <h2 className="text-white text-xl font-bold text-center mb-2">Pick Your One Line</h2>
            <p className="text-white/60 text-sm text-center mb-8">Choose one to share with friends today</p>

            <div className="flex flex-col gap-3">
              {MY_ONE_LINE_CANDIDATES.map((candidate) => (
                <button
                  key={candidate.id}
                  onClick={() => handleSelect({
                    id: candidate.id,
                    title: candidate.title,
                    characterImage: candidate.characterImage,
                  })}
                  className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/20 active:scale-[0.98] active:bg-white/20 transition-all"
                >
                  <img
                    src={candidate.characterImage}
                    alt="You"
                    className="w-12 h-12 object-contain shrink-0"
                  />
                  <span className="text-white text-sm font-medium text-left flex-1">
                    {candidate.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'confirmed' && (
          <div className="flex flex-col items-center gap-4 animate-bounce-once">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl">✓</span>
            </div>
            <h2 className="text-white text-xl font-bold">Confirmed!</h2>
            <p className="text-white/60 text-sm">Your one line is now live</p>
          </div>
        )}
      </div>
    </div>,
    portalContainer
  );
};

export default OneLineGenerateScreen;
