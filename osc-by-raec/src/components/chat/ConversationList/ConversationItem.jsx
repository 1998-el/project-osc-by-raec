import React from 'react';

const ConversationItem = ({ conversation, isSelected, onSelect }) => {
  const {
    id,
    name,
    avatar,
    lastMessage,
    unreadCount,
    lastMessageTime,
    isOnline,
    isGroup
  } = conversation;

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-blue-50 border-r-4 border-r-blue-600' : ''
      }`}
      onClick={() => onSelect(conversation)}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <span className="text-blue-600 font-semibold text-lg">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        {isOnline && !isGroup && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>

      {/* Contenu */}
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
          <span className="text-xs text-gray-500">{formatTime(lastMessageTime)}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600 truncate">{lastMessage}</p>
          {unreadCount > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
