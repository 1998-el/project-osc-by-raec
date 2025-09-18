import React, { useState } from 'react';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import CreateGroupModal from './GroupManagement/CreateGroupModal';
import VideoCall from './CallInterface/VideoCall';
import AudioCall from './CallInterface/AudioCall';
import { useChat } from '../../hooks/useChat';

const ChatContainer = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  
  const {
    conversations,
    messages,
    sendMessage,
    markAsRead,
    startVideoCall,
    startAudioCall
  } = useChat();

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    markAsRead(conversation.id);
  };

  const handleStartCall = (type) => {
    if (selectedConversation) {
      const call = type === 'video' 
        ? startVideoCall(selectedConversation.id)
        : startAudioCall(selectedConversation.id);
      setActiveCall({ ...call, type });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar des conversations */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <ConversationList
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
          onCreateGroup={() => setIsCreateGroupOpen(true)}
        />
      </div>
      
      {/* Fenêtre de chat principale */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            messages={messages[selectedConversation.id] || []}
            onSendMessage={sendMessage}
            onStartVideoCall={() => handleStartCall('video')}
            onStartAudioCall={() => handleStartCall('audio')}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Bienvenue sur Africonnect Chat</h2>
            <p className="text-center">Sélectionnez une conversation pour commencer à discuter</p>
          </div>
        )}
      </div>

      {/* Modals et interfaces d'appel */}
      {isCreateGroupOpen && (
        <CreateGroupModal
          onClose={() => setIsCreateGroupOpen(false)}
          onSuccess={(group) => {
            setIsCreateGroupOpen(false);
            setSelectedConversation(group);
          }}
        />
      )}

      {activeCall && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          {activeCall.type === 'video' ? (
            <VideoCall
              call={activeCall}
              onEndCall={() => setActiveCall(null)}
            />
          ) : (
            <AudioCall
              call={activeCall}
              onEndCall={() => setActiveCall(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
