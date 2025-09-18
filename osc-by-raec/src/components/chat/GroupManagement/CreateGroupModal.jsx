import React, { useState } from 'react';

const CreateGroupModal = ({ onClose, onSuccess }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      const newGroup = {
        id: Date.now(),
        name: groupName,
        avatar: null,
        lastMessage: 'Groupe créé',
        lastMessageTime: new Date(),
        unreadCount: 0,
        isOnline: true,
        isGroup: true,
        members: selectedMembers.length + 1
      };
      onSuccess(newGroup);
    }
  };

  const toggleMember = (memberId) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Créer un groupe</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du groupe
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez le nom du groupe"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Membres ({selectedMembers.length} sélectionnés)
            </label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md">
              {/* Liste des membres disponibles - à remplacer par données réelles */}
              {['Alice Dupont', 'Bob Martin', 'Claire Bernard'].map((member, index) => (
                <div
                  key={index}
                  className={`flex items-center p-2 cursor-pointer hover:bg-gray-50 ${
                    selectedMembers.includes(index) ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => toggleMember(index)}
                >
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(index)}
                    onChange={() => {}}
                    className="mr-3"
                  />
                  <span className="text-sm">{member}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
