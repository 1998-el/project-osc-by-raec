import React, { useState } from 'react';
import ConversationItem from './ConversationItem';
import SearchBar from './SearchBar';

const ConversationList = ({ conversations, onSelectConversation, selectedConversation, onCreateGroup }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
        <button
          onClick={onCreateGroup}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          title="Créer un groupe"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Barre de recherche */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {/* Liste des conversations */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map(conversation => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedConversation?.id === conversation.id}
            onSelect={onSelectConversation}
          />
        ))}
        
        {filteredConversations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Aucune conversation trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
