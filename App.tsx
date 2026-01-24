import React, { useState } from 'react';
import IPhoneMockup from './components/IPhoneMockup';
import PhoneScreen from './components/PhoneScreen';
import HeartScreen from './components/HeartScreen';
import DMScreen from './components/DMScreen';

export type PageType = 'feed' | 'explorer' | 'heart' | 'chat' | 'account' | 'dm';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('account');

  const renderScreen = () => {
    switch (currentPage) {
      case 'heart':
        return <HeartScreen currentPage={currentPage} onNavigate={setCurrentPage} />;
      case 'dm':
        return <DMScreen currentPage={currentPage} onNavigate={setCurrentPage} />;
      case 'account':
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
