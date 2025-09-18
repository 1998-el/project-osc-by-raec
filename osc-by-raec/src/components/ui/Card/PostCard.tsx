import { useState, useRef } from 'react';
import {
  HeartIcon,
  ShareIcon,
  HandRaisedIcon,
  EllipsisHorizontalIcon,
  DocumentIcon,
  ChatBubbleLeftIcon,
  PhotoIcon,
  FaceSmileIcon,
  PaperAirplaneIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BookmarkIcon,
  FlagIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import type { Post } from '../../../utils/types';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onShare: (postId: string) => void;
  onSupport: (postId: string) => void;
  onSave: (postId: string) => void;
  onReport: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onLike, 
  onComment, 
  onShare, 
  onSupport, 
  onSave, 
  onReport 
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [commentText, setCommentText] = useState('');
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours} h`;
    return `Il y a ${days} j`;
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
      if (commentInputRef.current) {
        commentInputRef.current.style.height = 'auto';
      }
    }
  };

  const handleTextareaResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = Math.min(target.scrollHeight, 120) + 'px';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4 overflow-hidden">
      {/* Header du post */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-blue-600 font-semibold text-sm">
                    {post.author.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {post.author.name}
                </h3>
                {post.author.verified && (
                  <span className="bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded-full">
                    ✓ Vérifié
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                {post.author.organization && (
                  <span className="text-sm text-gray-600 truncate">
                    {post.author.organization}
                  </span>
                )}
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">
                  {formatTimestamp(post.timestamp)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Menu options */}
          <div className="relative">
            <button 
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setShowOptions(!showOptions)}
              aria-label="Options"
            >
              <EllipsisHorizontalIcon className="h-5 w-5" />
            </button>
            
            {showOptions && (
              <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={() => {
                    onSave(post.id);
                    setShowOptions(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {post.isSaved ? (
                    <BookmarkIconSolid className="h-4 w-4 text-blue-600" />
                  ) : (
                    <BookmarkIcon className="h-4 w-4" />
                  )}
                  <span>{post.isSaved ? 'Post enregistré' : 'Enregistrer le post'}</span>
                </button>
                <button
                  onClick={() => {
                    onReport(post.id);
                    setShowOptions(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FlagIcon className="h-4 w-4" />
                  <span>Signaler le post</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenu du post */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>

        {/* Médias */}
        {post.images && post.images.length > 0 && (
          <div className={`mt-3 grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {post.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Post media ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
              </div>
            ))}
          </div>
        )}

        {post.video && (
          <div className="mt-3">
            <video
              src={post.video}
              controls
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {post.document && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <DocumentIcon className="h-8 w-8 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{post.document.name}</p>
                <p className="text-xs text-gray-500 mt-1">{post.document.size}</p>
              </div>
              <a
                href={post.document.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded-md bg-white border border-gray-300 hover:border-blue-300 transition-colors"
              >
                Télécharger
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Statistiques */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            {post.likes > 0 && (
              <span className="flex items-center">
                <HeartIconSolid className="h-4 w-4 text-red-500 mr-1" />
                {post.likes}
              </span>
            )}
            {post.comments > 0 && (
              <span>{post.comments} commentaire{post.comments > 1 ? 's' : ''}</span>
            )}
            {post.shares > 0 && (
              <span>{post.shares} partage{post.shares > 1 ? 's' : ''}</span>
            )}
            {post.supports > 0 && (
              <span>{post.supports} soutien{post.supports > 1 ? 's' : ''}</span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="grid grid-cols-4 gap-1">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center justify-center space-x-2 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
              post.isLiked
                ? 'text-red-600 hover:bg-red-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {post.isLiked ? (
              <HeartIconSolid className="h-5 w-5" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
            <span className="hidden sm:inline">J'aime</span>
          </button>

          <button
            onClick={() => {
              setShowComments(!showComments);
              if (!showComments && commentInputRef.current) {
                setTimeout(() => commentInputRef.current?.focus(), 100);
              }
            }}
            className="flex items-center justify-center space-x-2 px-2 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Commenter</span>
          </button>

          <button
            onClick={() => onShare(post.id)}
            className="flex items-center justify-center space-x-2 px-2 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ShareIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Partager</span>
          </button>

          <button
            onClick={() => onSupport(post.id)}
            className={`flex items-center justify-center space-x-2 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
              post.isSupported
                ? 'text-green-600 hover:bg-green-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <HandRaisedIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Soutenir</span>
          </button>
        </div>
      </div>

      {/* Section commentaires */}
      {showComments && (
        <div className="border-t border-gray-100 px-4 py-4 bg-gray-50">
          {/* Formulaire de commentaire */}
          <div className="flex items-start space-x-3 mb-4">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-xs">U</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <textarea
                  ref={commentInputRef}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onInput={handleTextareaResize}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[40px] max-h-[120px]"
                  placeholder="Ajouter un commentaire..."
                  rows={1}
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-500 hover:text-blue-600 rounded transition-colors">
                      <PhotoIcon className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-blue-600 rounded transition-colors">
                      <FaceSmileIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={handleCommentSubmit}
                    disabled={!commentText.trim()}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PaperAirplaneIcon className="h-3 w-3" />
                    <span>Publier</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des commentaires */}
          {post.comments > 0 && (
            <div className="space-y-3">
              {/* Commentaire exemple */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-xs">A</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">Alice Dupont</span>
                        <span className="text-xs text-gray-500">Il y a 2h</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <EllipsisHorizontalIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">Excellent travail ! Continuez comme ça.</p>
                    <div className="flex items-center space-x-4">
                      <button className="text-xs text-gray-500 hover:text-blue-600 font-medium">J'aime</button>
                      <button className="text-xs text-gray-500 hover:text-blue-600 font-medium">Répondre</button>
                      <span className="text-xs text-gray-400">2 réponses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;