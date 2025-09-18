import React from 'react';

const ChatHeader = ({ conversation, onStartVideoCall, onStartAudioCall }) => {
  const { name, avatar, isOnline, isGroup, members } = conversation;

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <div className="relative">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <span className="text-blue-600 font-semibold">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          {isOnline && !isGroup && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
          <p className="text-xs text-gray-500">
            {isGroup ? `${members} membres` : (isOnline ? 'En ligne' : 'Hors ligne')}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onStartAudioCall}
          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
          title="Appel audio"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        <button
          onClick={onStartVideoCall}
          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
          title="Appel vidéo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
