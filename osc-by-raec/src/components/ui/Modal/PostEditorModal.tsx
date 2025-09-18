import { useState, useRef } from 'react';
import {
  PhotoIcon,
  VideoCameraIcon,
  DocumentIcon,
  XMarkIcon,
  CalendarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface PostEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: {
    name: string;
    avatar?: string;
  };
}

const PostEditorModal: React.FC<PostEditorModalProps> = ({ isOpen, onClose, userProfile }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<{ file: File; type: string; preview?: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (selectedFiles.length + files.length > 4) {
      alert('Vous ne pouvez ajouter que 4 fichiers maximum');
      return;
    }

    const newFiles = files.map(file => ({
      file,
      type: file.type.startsWith('image/') ? 'image' :
            file.type.startsWith('video/') ? 'video' : 'document',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));

    setSelectedFiles([...selectedFiles, ...newFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    if (newFiles[index].preview) {
      URL.revokeObjectURL(newFiles[index].preview);
    }
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim() && selectedFiles.length === 0) return;

    // Simuler l'envoi du post
    console.log('Publication:', { postContent, selectedFiles });

    // Réinitialiser le formulaire
    setPostContent('');
    setSelectedFiles([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>

        {/* Modal panel */}
        <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-lg w-full mx-4" role="document">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 id="modal-title" className="text-lg font-medium text-gray-900">Créer une publication</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Fermer la modal"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex items-start space-x-3 mb-4">
                {/* Photo de profil */}
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                    {userProfile?.avatar ? (
                      <img
                        src={userProfile.avatar}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-blue-600 font-semibold text-sm">
                        {userProfile?.name?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-900">{userProfile.name}</span>
                  </div>

                  <label htmlFor="postContent" className="sr-only">Contenu de la publication</label>
                  <textarea
                    id="postContent"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Partagez les dernières nouvelles de votre organisation..."
                    className="w-full border-0 resize-none focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500 min-h-[120px]"
                    rows={4}
                  />
                </div>
              </div>

              {/* Fichiers sélectionnés */}
              {selectedFiles.length > 0 && (
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        {file.type === 'image' && file.preview && (
                          <img
                            src={file.preview}
                            alt={`Selected ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        )}
                        {file.type === 'video' && (
                          <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                            <VideoCameraIcon className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                        {file.type === 'document' && (
                          <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                            <DocumentIcon className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <XMarkIcon className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      multiple
                      accept="image/*,video/*,.pdf,.doc,.docx"
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                      title="Ajouter une photo"
                    >
                      <PhotoIcon className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                      title="Ajouter une vidéo"
                    >
                      <VideoCameraIcon className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                      title="Ajouter un document"
                    >
                      <DocumentIcon className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                      title="Ajouter un événement"
                    >
                      <CalendarIcon className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                      title="Ajouter un emplacement"
                    >
                      <MapPinIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!postContent.trim() && selectedFiles.length === 0}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Publier
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditorModal;
