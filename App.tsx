import React, { useState } from 'react';
import IPhoneMockup from './components/IPhoneMockup';
import PhoneScreen from './components/PhoneScreen';
import FeedScreen from './components/FeedScreen';
import DiagnosticScreen from './components/DiagnosticScreen';
import DiagnosticDetailScreen from './components/DiagnosticDetailScreen';
import FriendDetailScreen from './components/FriendDetailScreen';
import { DiagnosticType, FriendProfile } from './constants';

export type PageType = 'cards' | 'profile' | 'diagnostic' | 'diagnostic-detail' | 'friend-detail';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('profile');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<DiagnosticType | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<FriendProfile | null>(null);
  const [shouldOpenSheet, setShouldOpenSheet] = useState(false);

  const handleSelectDiagnostic = (diagnostic: DiagnosticType) => {
    setSelectedDiagnostic(diagnostic);
    setCurrentPage('diagnostic-detail');
  };

  const handleBackFromDiagnosticDetail = () => {
    // If coming from friend-detail flow, go back to friend-detail with sheet open
    // Otherwise go back to diagnostic list
    if (selectedFriend) {
      setShouldOpenSheet(true);
      setCurrentPage('friend-detail');
    } else {
      setCurrentPage('diagnostic');
    }
    setSelectedDiagnostic(null);
  };

  const handleSelectFriendFromFeed = (friend: FriendProfile) => {
    setSelectedFriend(friend);
    setShouldOpenSheet(false);
    setCurrentPage('friend-detail');
  };

  const handleBackFromFriendDetail = () => {
    setSelectedFriend(null);
    setShouldOpenSheet(false);
    setCurrentPage('cards');
  };

  const handleSelectDiagnosticFromFriendDetail = (diagnostic: DiagnosticType) => {
    setShouldOpenSheet(false);
    setSelectedDiagnostic(diagnostic);
    setCurrentPage('diagnostic-detail');
  };

  const renderScreen = () => {
    switch (currentPage) {
      case 'cards':
        return (
          <FeedScreen
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onSelectFriend={handleSelectFriendFromFeed}
          />
        );
      case 'friend-detail':
        if (selectedFriend) {
          return (
            <FriendDetailScreen
              friend={selectedFriend}
              onBack={handleBackFromFriendDetail}
              onSelectDiagnostic={handleSelectDiagnosticFromFriendDetail}
              initialSheetOpen={shouldOpenSheet}
            />
          );
        }
        return <FeedScreen currentPage="cards" onNavigate={setCurrentPage} onSelectFriend={handleSelectFriendFromFeed} />;
      case 'diagnostic':
        return (
          <DiagnosticScreen
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onSelectDiagnostic={handleSelectDiagnostic}
          />
        );
      case 'diagnostic-detail':
        if (selectedDiagnostic) {
          return (
            <DiagnosticDetailScreen
              diagnostic={selectedDiagnostic}
              onBack={handleBackFromDiagnosticDetail}
              selectedFriend={selectedFriend}
              onSelectFriend={setSelectedFriend}
            />
          );
        }
        return <DiagnosticScreen currentPage="diagnostic" onNavigate={setCurrentPage} onSelectDiagnostic={handleSelectDiagnostic} />;
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
