import React from 'react';

const MessageItem = ({ message }) => {
  const { content, sender, timestamp, isOwn, attachments } = message;

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isOwn 
          ? 'bg-blue-600 text-white' 
          : 'bg-white text-gray-900 border border-gray-200'
      }`}>
        {!isOwn && (
          <p className="text-xs text-gray-500 mb-1">{sender}</p>
        )}
        <p className="text-sm">{content}</p>
        {attachments && attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {attachments.map((attachment, index) => (
              <div key={index} className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span className="text-xs">{attachment.name}</span>
              </div>
            ))}
          </div>
        )}
        <p className={`text-xs mt-1 ${isOwn ? 'text-blue-200' : 'text-gray-500'}`}>
          {formatTime(timestamp)}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
