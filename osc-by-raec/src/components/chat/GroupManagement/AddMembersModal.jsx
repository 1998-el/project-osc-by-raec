import React, { useState } from 'react';

const AddMembersModal = ({ group, onClose, onAddMembers }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMembers.length > 0) {
      onAddMembers(selectedMembers);
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Ajouter des membres</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Sélectionnez les membres à ajouter au groupe "{group.name}"
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Membres disponibles ({selectedMembers.length} sélectionnés)
            </label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md">
              {/* Liste des membres disponibles - à remplacer par données réelles */}
              {['David Leroy', 'Emma Petit', 'François Moreau', 'Gabrielle Roux'].map((member, index) => (
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
              disabled={selectedMembers.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMembersModal;
