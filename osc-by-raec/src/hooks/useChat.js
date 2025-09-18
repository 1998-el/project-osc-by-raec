import { useState, useEffect, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import { useTranslation } from './useTranslation';
import { mockConversations, mockMessages } from '../utils/constants/chatData';

export const useChat = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  const { connect, send } = useWebSocket();
  const { translateMessage } = useTranslation();

  useEffect(() => {
    const initializeChat = async () => {
      // Simuler le chargement des conversations
      setTimeout(() => {
        setConversations(mockConversations);
      }, 1000);
      
      // Se connecter au WebSocket
      connect('wss://api.africonnect.com/chat', {
        onMessage: handleWebSocketMessage
      });
    };

    initializeChat();
  }, []);

  const handleWebSocketMessage = useCallback((data) => {
    switch (data.type) {
      case 'NEW_MESSAGE':
        handleNewMessage(data.message);
        break;
      case 'TYPING_START':
        handleTypingStart(data.conversationId, data.userId);
        break;
      case 'TYPING_STOP':
        handleTypingStop(data.conversationId, data.userId);
        break;
      default:
        break;
    }
  }, []);

  const handleNewMessage = (message) => {
    setMessages(prev => ({
      ...prev,
      [message.conversationId]: [
        ...(prev[message.conversationId] || []),
        message
      ]
    }));
  };

  const sendMessage = async (conversationId, content, attachments = []) => {
    const message = {
      conversationId,
      content,
      attachments,
      timestamp: new Date().toISOString(),
      sender: 'current-user'
    };

    // Simuler l'envoi via WebSocket
    send({
      type: 'SEND_MESSAGE',
      message
    });

    // Ajouter immédiatement au state pour l'UI
    handleNewMessage(message);
  };

  const startVideoCall = (conversationId) => {
    return {
      id: Date.now(),
      conversationId,
      type: 'video',
      participants: []
    };
  };

  const startAudioCall = (conversationId) => {
    return {
      id: Date.now(),
      conversationId,
      type: 'audio',
      participants: []
    };
  };

  const markAsRead = (conversationId) => {
    setConversations(prev => prev.map(conv =>
      conv.id === conversationId
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  return {
    conversations,
    messages,
    sendMessage,
    markAsRead,
    startVideoCall,
    startAudioCall
  };
};
