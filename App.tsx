import React, { useState } from 'react';
import IPhoneMockup from './components/IPhoneMockup';
import PhoneScreen from './components/PhoneScreen';
import FeedScreen from './components/FeedScreen';
import RankingScreen from './components/RankingScreen';
import DiagnosticScreen from './components/DiagnosticScreen';
import DiagnosticDetailScreen from './components/DiagnosticDetailScreen';
import FriendDetailScreen from './components/FriendDetailScreen';
import DMScreen from './components/DMScreen';
import AIConversationHistoryScreen from './components/AIConversationHistoryScreen';
import { DiagnosticType, GroupDiagnosticType, FriendProfile, ApprovalStatus, FRIENDS_LIST } from './constants';

export type PageType = 'cards' | 'profile' | 'diagnostic' | 'diagnostic-detail' | 'group-diagnostic-detail' | 'friend-detail' | 'ranking' | 'dm' | 'ai-conversation-history';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('profile');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<DiagnosticType | null>(null);
  const [selectedGroupDiagnostic, setSelectedGroupDiagnostic] = useState<GroupDiagnosticType | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<FriendProfile | null>(null);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<FriendProfile[]>([]);
  const [shouldOpenSheet, setShouldOpenSheet] = useState(false);
  const [diagnosticEntryPoint, setDiagnosticEntryPoint] = useState<'diagnostic' | 'friend-detail' | null>(null);
  const [friendDetailEntryPoint, setFriendDetailEntryPoint] = useState<'cards' | 'ranking' | null>(null);
  const [approvalStatuses, setApprovalStatuses] = useState<Map<number, ApprovalStatus>>(new Map());
  const [initialDMChatId, setInitialDMChatId] = useState<string | undefined>(undefined);
  const [aiConversationEntryPoint, setAiConversationEntryPoint] = useState<'friend-detail' | 'dm' | null>(null);

  const handleSelectDiagnostic = (diagnostic: DiagnosticType) => {
    setDiagnosticEntryPoint('diagnostic');
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
    if (diagnosticEntryPoint === 'friend-detail') {
      setShouldOpenSheet(true);
      setCurrentPage('friend-detail');
    } else {
      setCurrentPage('diagnostic');
    }
    setSelectedDiagnostic(null);
    setDiagnosticEntryPoint(null);
  };

  const handleSelectFriendFromFeed = (friend: FriendProfile) => {
    setFriendDetailEntryPoint('cards');
    setSelectedFriend(friend);
    setShouldOpenSheet(false);
    setCurrentPage('friend-detail');
  };

  const handleSelectFriendFromRanking = (friend: FriendProfile) => {
    setFriendDetailEntryPoint('ranking');
    setSelectedFriend(friend);
    setShouldOpenSheet(false);
    setCurrentPage('friend-detail');
  };

  const handleBackFromFriendDetail = () => {
    const returnPage = friendDetailEntryPoint || 'cards';
    setSelectedFriend(null);
    setShouldOpenSheet(false);
    setFriendDetailEntryPoint(null);
    setCurrentPage(returnPage);
  };

  const handleSelectDiagnosticFromFriendDetail = (diagnostic: DiagnosticType) => {
    setDiagnosticEntryPoint('friend-detail');
    setShouldOpenSheet(false);
    setSelectedDiagnostic(diagnostic);
    setCurrentPage('diagnostic-detail');
  };

  // AI Conversation handlers
  const handleViewAIConversation = (friendId?: number) => {
    if (friendId) {
      const friend = FRIENDS_LIST.find(f => f.id === friendId);
      if (friend) {
        setSelectedFriend(friend);
      }
    }
    if (selectedFriend || friendId) {
      setAiConversationEntryPoint(currentPage === 'dm' ? 'dm' : 'friend-detail');
      setCurrentPage('ai-conversation-history');
    }
  };

  const handleBackFromAIConversation = () => {
    if (aiConversationEntryPoint === 'dm') {
      setCurrentPage('dm');
    } else {
      setCurrentPage('friend-detail');
    }
    setAiConversationEntryPoint(null);
  };

  const handleSendApproval = () => {
    if (selectedFriend) {
      // Set status to pending_sent for this friend
      setApprovalStatuses(prev => {
        const next = new Map(prev);
        next.set(selectedFriend.id, 'pending_sent');
        return next;
      });
      // Navigate to DM with this friend's chat open
      const dmChat = ['Momo', 'Kento', 'Nina', 'Ryo', 'Sora', 'Leon'].find(
        name => name === selectedFriend.name
      );
      if (dmChat) {
        const chatIndex = ['Momo', 'Kento', 'Nina', 'Ryo', 'Sora', 'Leon'].indexOf(dmChat);
        setInitialDMChatId((chatIndex + 1).toString());
      }
      setCurrentPage('dm');
    }
  };

  const handleApprove = (friendId: number) => {
    setApprovalStatuses(prev => {
      const next = new Map(prev);
      const currentStatus = prev.get(friendId);
      // If they sent us a request, approving means mutual approval
      if (currentStatus === 'pending_received') {
        next.set(friendId, 'approved');
      }
      return next;
    });
  };

  // Demo: Simulate receiving an approval request from Momo
  const handleSimulateReceivedRequest = () => {
    setApprovalStatuses(prev => {
      const next = new Map(prev);
      // Momo (id: 1) sends us a request
      next.set(1, 'pending_received');
      return next;
    });
  };

  // Demo: Simulate the other person approving our request
  const handleSimulateTheirApproval = (friendId: number) => {
    setApprovalStatuses(prev => {
      const next = new Map(prev);
      const currentStatus = prev.get(friendId);
      // If we sent them a request, simulate them approving it
      if (currentStatus === 'pending_sent') {
        next.set(friendId, 'approved');
      }
      return next;
    });
  };

  const renderScreen = () => {
    switch (currentPage) {
      case 'cards':
      case 'friend-detail':
        return (
          <>
            <FeedScreen
              currentPage="cards"
              onNavigate={setCurrentPage}
              onSelectFriend={handleSelectFriendFromFeed}
            />
            {currentPage === 'friend-detail' && selectedFriend && (
              <FriendDetailScreen
                friend={selectedFriend}
                onBack={handleBackFromFriendDetail}
                onSelectDiagnostic={handleSelectDiagnosticFromFriendDetail}
                initialSheetOpen={shouldOpenSheet}
                onViewAIConversation={() => handleViewAIConversation()}
              />
            )}
          </>
        );
      case 'ranking':
        return (
          <RankingScreen
            onSelectFriend={handleSelectFriendFromRanking}
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
            approvalStatuses={approvalStatuses}
            onApprove={handleApprove}
            onViewAIConversation={handleViewAIConversation}
            onSimulateTheirApproval={handleSimulateTheirApproval}
            initialChatId={initialDMChatId}
          />
        );
      case 'ai-conversation-history':
        if (selectedFriend) {
          return (
            <>
              <FeedScreen
                currentPage="cards"
                onNavigate={setCurrentPage}
                onSelectFriend={handleSelectFriendFromFeed}
              />
              <AIConversationHistoryScreen
                friend={selectedFriend}
                onBack={handleBackFromAIConversation}
                onSendApproval={handleSendApproval}
                approvalStatus={approvalStatuses.get(selectedFriend.id) || 'none'}
              />
            </>
          );
        }
        return <FeedScreen currentPage="cards" onNavigate={setCurrentPage} onSelectFriend={handleSelectFriendFromFeed} />;
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
