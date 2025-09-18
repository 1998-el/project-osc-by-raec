import React from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <MessageItem key={message.id || index} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
