import { useState, useRef } from 'react';
import {
  PhotoIcon,
  VideoCameraIcon,
  DocumentIcon,
  XMarkIcon,
  CalendarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface UserProfile {
  name: string;
  avatar: string | null;
}

interface SelectedFile {
  file: File;
  type: 'image' | 'video' | 'document';
  preview: string | null;
}

const PostAction = ({ userProfile, onClose }: { userProfile: UserProfile; onClose: () => void }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (selectedFiles.length + files.length > 4) {
      alert('Vous ne pouvez ajouter que 4 fichiers maximum');
      return;
    }

    const newFiles: SelectedFile[] = files.map((file: File) => ({
      file,
      type: (file.type.startsWith('image/') ? 'image' :
            file.type.startsWith('video/') ? 'video' : 'document') as 'image' | 'video' | 'document',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-start space-x-3">
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
          <textarea
            className="w-full border-0 rounded-lg p-3 focus:outline-none focus:ring-0 resize-none text-gray-800 placeholder-gray-500"
            rows={4}
            placeholder="Partagez les dernières nouvelles de votre organisation..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            autoFocus
          />

          {/* Aperçu des fichiers */}
          {selectedFiles.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  {file.type === 'image' ? (
                    <img
                      src={file.preview || ''}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : file.type === 'video' ? (
                    <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <VideoCameraIcon className="h-8 w-8 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-600 truncate">{file.file.name}</span>
                    </div>
                  ) : (
                    <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <DocumentIcon className="h-8 w-8 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-600 truncate">{file.file.name}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-gray-800 bg-opacity-70 text-white rounded-full p-1"
                    onClick={() => removeFile(index)}
                    aria-label="Supprimer le fichier"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex justify-between items-center border-t border-gray-100 pt-3">
            <div className="flex space-x-2">
              <div>
                <label htmlFor="file-input" className="sr-only">Ajouter une photo</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  id="file-input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                  title="Ajouter une photo"
                  aria-label="Ajouter une photo"
                >
                  <PhotoIcon className="h-5 w-5" />
                </button>
              </div>

              <button
                type="button"
                className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                title="Ajouter une vidéo"
                aria-label="Ajouter une vidéo"
              >
                <VideoCameraIcon className="h-5 w-5" />
              </button>

              <button
                type="button"
                className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                title="Ajouter un document"
                aria-label="Ajouter un document"
              >
                <DocumentIcon className="h-8 w-8" />
              </button>

              <button
                type="button"
                className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                title="Ajouter un emplacement"
                aria-label="Ajouter un emplacement"
              >
                <MapPinIcon className="h-5 w-5" />
              </button>

              <button
                type="button"
                className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                title="Ajouter un événement"
                aria-label="Ajouter un événement"
              >
                <CalendarIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  setPostContent('');
                  setSelectedFiles([]);
                  onClose();
                }}
                className="px-4 py-2 text-gray-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={!postContent.trim() && selectedFiles.length === 0}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

// Valeurs par défaut pour les props
PostAction.defaultProps = {
  userProfile: {
    name: 'User',
    avatar: null
  }
};

export default PostAction;
