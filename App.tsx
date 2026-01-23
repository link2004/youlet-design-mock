import React, { useState } from 'react';
import IPhoneMockup from './components/IPhoneMockup';
import PhoneScreen from './components/PhoneScreen';
import FeedScreen from './components/FeedScreen';
import DiagnosticScreen from './components/DiagnosticScreen';

export type PageType = 'cards' | 'profile' | 'diagnostic';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('profile');

  const renderScreen = () => {
    switch (currentPage) {
      case 'cards':
        return <FeedScreen currentPage={currentPage} onNavigate={setCurrentPage} />;
      case 'diagnostic':
        return <DiagnosticScreen currentPage={currentPage} onNavigate={setCurrentPage} />;
      case 'profile':
      default:
        return <PhoneScreen currentPage={currentPage} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <IPhoneMockup>
      {renderScreen()}
    </IPhoneMockup>
  );
};

export default App;
