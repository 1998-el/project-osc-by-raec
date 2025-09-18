import React, { useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import { useTranslation } from '../../../hooks/useTranslation';

const ChatWindow = ({ conversation, messages, onSendMessage, onStartVideoCall, onStartAudioCall }) => {
  const messagesEndRef = useRef(null);
  const { translateMessage } = useTranslation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content, attachments = []) => {
    const translatedContent = await translateMessage(content, 'auto', 'fr');
    onSendMessage(conversation.id, translatedContent, attachments);
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        conversation={conversation}
        onStartVideoCall={onStartVideoCall}
        onStartAudioCall={onStartAudioCall}
      />
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <MessageList messages={messages} />
        <TypingIndicator isTyping={conversation.isTyping} />
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
