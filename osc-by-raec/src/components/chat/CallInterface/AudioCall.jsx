import React, { useState, useEffect } from 'react';

const AudioCall = ({ call, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Simuler la connexion audio
    console.log('Appel audio démarré', call);

    return () => {
      console.log('Appel audio terminé');
    };
  }, [call]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Ici on pourrait muter/démuter le micro
  };

  return (
    <div className="bg-black rounded-lg overflow-hidden shadow-2xl max-w-md w-full p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Appel audio</h3>
        <button
          onClick={onEndCall}
          className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-semibold">
          C
        </div>
        <p className="text-white">Appel en cours...</p>

        <button
          onClick={toggleMute}
          className={`px-4 py-2 rounded-full text-white transition-colors ${
            isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
          }`}
        >
          {isMuted ? 'Activer le son' : 'Couper le son'}
        </button>
      </div>
    </div>
  );
};

export default AudioCall;
