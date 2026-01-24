import React, { useState } from 'react';
import IPhoneMockup from './components/IPhoneMockup';
import PhoneScreen from './components/PhoneScreen';
import FeedScreen from './components/FeedScreen';
import RankingScreen from './components/RankingScreen';
import DiagnosticScreen from './components/DiagnosticScreen';
import DiagnosticDetailScreen from './components/DiagnosticDetailScreen';
import DMScreen from './components/DMScreen';
import { DiagnosticType, GroupDiagnosticType, FriendProfile } from './constants';

export type PageType = 'cards' | 'profile' | 'diagnostic' | 'diagnostic-detail' | 'group-diagnostic-detail' | 'ranking' | 'dm';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('profile');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<DiagnosticType | null>(null);
  const [selectedGroupDiagnostic, setSelectedGroupDiagnostic] = useState<GroupDiagnosticType | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<FriendProfile | null>(null);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<FriendProfile[]>([]);

  const handleSelectDiagnostic = (diagnostic: DiagnosticType) => {
    setSelectedDiagnostic(diagnostic);
    setCurrentPage('diagnostic-detail');
  };

  const handleSelectGroupDiagnostic = (diagnostic: GroupDiagnosticType) => {
    setSelectedGroupDiagnostic(diagnostic);
    setSelectedGroupMembers([]);
    setCurrentPage('group-diagnostic-detail');
  };

  const handleBackFromGroupDiagnosticDetail = () => {
    setSelectedGroupDiagnostic(null);
    setSelectedGroupMembers([]);
    setCurrentPage('diagnostic');
  };

  const handleBackFromDiagnosticDetail = () => {
    setCurrentPage('diagnostic');
    setSelectedDiagnostic(null);
  };

  const renderScreen = () => {
    switch (currentPage) {
      case 'cards':
        return (
          <FeedScreen
            currentPage="cards"
            onNavigate={setCurrentPage}
          />
        );
      case 'ranking':
        return (
          <RankingScreen
            onBack={() => setCurrentPage('cards')}
          />
        );
      case 'diagnostic':
        return (
          <DiagnosticScreen
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onSelectDiagnostic={handleSelectDiagnostic}
            onSelectGroupDiagnostic={handleSelectGroupDiagnostic}
          />
        );
      case 'group-diagnostic-detail':
        if (selectedGroupDiagnostic) {
          return (
            <DiagnosticDetailScreen
              groupDiagnostic={selectedGroupDiagnostic}
              onBack={handleBackFromGroupDiagnosticDetail}
              selectedGroupMembers={selectedGroupMembers}
              onSelectGroupMembers={setSelectedGroupMembers}
            />
          );
        }
        return <DiagnosticScreen currentPage="diagnostic" onNavigate={setCurrentPage} onSelectDiagnostic={handleSelectDiagnostic} onSelectGroupDiagnostic={handleSelectGroupDiagnostic} />;
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
      case 'dm':
        return (
          <DMScreen
            currentPage={currentPage}
            onNavigate={setCurrentPage}
          />
        );
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
