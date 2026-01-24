import React, { useState, useEffect } from 'react';
import { Settings, ChevronLeft, Star, Moon, Sun } from 'lucide-react';
import { MENU_ITEMS, AnswerValue } from '../constants';
import MenuItem from './MenuItem';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import ElementsBubbles from './ElementsBubbles';
import StoryView from './StoryView';
import ProfileCardFlip from './ProfileCardFlip';
import EventApprovalModal from './EventApprovalModal';
import ProfileQuestions from './ProfileQuestions';
import { PageType } from '../App';

interface PhoneScreenProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const PhoneScreen: React.FC<PhoneScreenProps> = ({ currentPage, onNavigate }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showElements, setShowElements] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [showEventApproval, setShowEventApproval] = useState(false);
  const [hasShownEventApproval, setHasShownEventApproval] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, AnswerValue>>({});

  const handleAnswerChange = (questionId: string, answer: AnswerValue) => {
    setQuestionAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  // Show event approval modal on first load (simulating app launch)
  useEffect(() => {
    if (!hasShownEventApproval) {
      const timer = setTimeout(() => {
        setShowEventApproval(true);
        setHasShownEventApproval(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasShownEventApproval]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="relative w-full h-full bg-cream dark:bg-black font-sans transition-colors duration-300 overflow-hidden flex flex-col">
      <StatusBar />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        {/* Main Screen */}
        <div className="absolute inset-0">
          <div className="h-full overflow-y-auto no-scrollbar pb-20">
            {/* Header */}
            <div className="relative flex items-center px-4 py-2 bg-cream dark:bg-black sticky top-0 z-40 transition-colors duration-300">
              <h1 className="absolute left-1/2 -translate-x-1/2 font-serif italic font-black text-2xl tracking-tight text-black dark:text-white">
                YouLet
              </h1>
              <div className="flex-1" />
              <button
                onClick={() => setShowSettings(true)}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <Settings size={22} className="text-orange-400" />
              </button>
            </div>

            {/* Profile Card with Flip */}
            <ProfileCardFlip />

            {/* Menu List */}
            <div className="px-6 flex flex-col gap-1 pb-4">
              {MENU_ITEMS.map((item, idx) => (
                <MenuItem key={idx} {...item} />
              ))}
            </div>

            {/* Promo Cards - Bottom Section */}
            <div className="px-6 pb-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowStory(true)}
                className="bg-gradient-to-r from-blue-500 to-red-500 py-5 rounded-2xl relative overflow-hidden shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center px-4"
              >
                <div className="absolute -right-2 -top-2 text-white/10 transform rotate-12">
                  <Star size={48} fill="currentColor" />
                </div>
                <div className="absolute left-2 bottom-0 text-white/10 transform -rotate-12">
                  <Star size={24} fill="currentColor" />
                </div>
                <span className="relative z-10 text-white font-serif italic font-bold text-sm tracking-wide text-center leading-snug">
                  Read Your Story
                </span>
              </button>
              <button
                onClick={() => setShowElements(true)}
                className="py-5 rounded-2xl relative overflow-hidden shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center px-4"
                style={{
                  background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
                }}
              >
                {/* Stars */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-1 h-1 bg-white/80 rounded-full blur-[1px] top-3 left-4" />
                  <div className="absolute w-1.5 h-1.5 bg-white/60 rounded-full blur-[2px] top-5 right-6" />
                  <div className="absolute w-1 h-1 bg-white/70 rounded-full blur-[1px] top-8 left-8" />
                  <div className="absolute w-0.5 h-0.5 bg-white/50 rounded-full blur-[1px] top-4 right-3" />
                  <div className="absolute w-1 h-1 bg-white/60 rounded-full blur-[2px] bottom-3 left-5" />
                  <div className="absolute w-0.5 h-0.5 bg-white/70 rounded-full blur-[1px] bottom-5 right-4" />
                </div>
                <span className="relative z-10 text-white font-serif italic font-bold text-sm tracking-wide text-center leading-snug">
                  Your Elements
                </span>
              </button>
            </div>

            {/* AI Learning Questions */}
            <ProfileQuestions
              answers={questionAnswers}
              onAnswerChange={handleAnswerChange}
            />
          </div>
        </div>

        {/* Settings Screen - Overlays on top */}
        <div
          className={`absolute inset-0 bg-cream dark:bg-black transition-transform duration-300 ease-out z-50 ${
            showSettings ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full overflow-y-auto no-scrollbar pb-20">
            {/* Settings Header */}
            <div className="relative flex items-center px-4 py-2 bg-cream dark:bg-black sticky top-0 z-40 transition-colors duration-300">
              <button
                onClick={() => setShowSettings(false)}
                className="flex items-center gap-1 text-neutral-700 dark:text-neutral-400"
              >
                <ChevronLeft size={24} strokeWidth={2} />
                <span className="text-base font-medium">Back</span>
              </button>
              <h1 className="absolute left-1/2 -translate-x-1/2 font-serif italic font-bold text-lg text-black dark:text-white">
                Settings
              </h1>
              <div className="flex-1" />
            </div>

            {/* Settings Content */}
            <div className="px-6 mt-6">
              {/* Appearance Section */}
              <div className="mb-6">
                <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
                  Appearance
                </h2>
                <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3">
                      {darkMode ? (
                        <Moon size={20} className="text-neutral-600 dark:text-neutral-400" />
                      ) : (
                        <Sun size={20} className="text-neutral-600 dark:text-neutral-400" />
                      )}
                      <span className="text-neutral-900 dark:text-neutral-100 font-medium">
                        Dark Mode
                      </span>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                        darkMode ? 'bg-white' : 'bg-neutral-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-300 ${
                          darkMode ? 'left-6 bg-black' : 'left-1 bg-white'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />

      {/* Elements Bubbles Modal */}
      {showElements && (
        <ElementsBubbles onClose={() => setShowElements(false)} />
      )}

      {/* Story View Modal */}
      {showStory && (
        <StoryView onClose={() => setShowStory(false)} />
      )}

      {/* Event Approval Modal */}
      {showEventApproval && (
        <EventApprovalModal
          onClose={() => setShowEventApproval(false)}
          onApprove={(eventIds, eventDetails) => {
            console.log('Approved events:', eventIds);
            console.log('Event details:', eventDetails);
            setShowEventApproval(false);
          }}
        />
      )}
    </div>
  );
};

export default PhoneScreen;
