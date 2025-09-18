import React from 'react';

const GroupInfoModal = ({ group, onClose }) => {
  const { name, avatar, members, description } = group;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Informations du groupe</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            {avatar ? (
              <img src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <span className="text-blue-600 font-semibold text-xl">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-gray-500">{members} membres</p>
          </div>
        </div>

        {description && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-700">{description}</p>
          </div>
        )}

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Membres</h4>
          <div className="space-y-2">
            {/* Liste des membres - à remplacer par données réelles */}
            {Array.from({ length: members }, (_, i) => (
              <div key={i} className="flex items-center p-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-semibold text-sm">
                    M{i + 1}
                  </span>
                </div>
                <span className="text-sm">Membre {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupInfoModal;
