import React from 'react';
import { 
  UsersIcon, 
  DocumentIcon, 
  CalendarIcon, 
  MapPinIcon, 
  CheckBadgeIcon,
  PencilSquareIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface OSCProfileCardProps {
  userProfile: {
    name: string;
    avatar?: string;
    organization?: string;
    sector?: string;
    location?: string;
    memberSince?: string;
    connections?: number;
    posts?: number;
    projects?: number;
    verified?: boolean;
    impact?: string;
    followers?: number;
    following?: number;
  };
  onViewProfile?: () => void;
  onEditProfile?: () => void;
  onMessage?: () => void;
  onShare?: () => void;
}

const OSCProfileCard: React.FC<OSCProfileCardProps> = ({ 
  userProfile, 
  onViewProfile, 
  onEditProfile, 
  onMessage, 
  onShare 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
      {/* Cover Image */}
      <div className="h-20 bg-gradient-to-r from-blue-600 to-blue-700 relative">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>

      {/* Profile Section */}
      <div className="px-4 pb-4 relative">
        {/* Avatar */}
        <div className="flex justify-center -mt-10 mb-2">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
              {userProfile?.avatar ? (
                <img
                  src={userProfile.avatar}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-blue-600 font-bold text-2xl">
                  {userProfile?.name?.charAt(0) || 'O'}
                </span>
              )}
            </div>
            {userProfile.verified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                <CheckBadgeIcon className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{userProfile.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{userProfile.organization || 'Organisation de la société civile'}</p>
          
          {userProfile.sector && (
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full mb-2">
              {userProfile.sector}
            </span>
          )}
          
          {userProfile.impact && (
            <p className="text-xs text-gray-500 mt-2">
              <span className="font-medium">Impact: </span>
              {userProfile.impact}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 mb-4">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900">{userProfile.connections || 0}</div>
            <div className="text-xs text-gray-500">Connexions</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900">{userProfile.posts || 0}</div>
            <div className="text-xs text-gray-500">Publications</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900">{userProfile.projects || 0}</div>
            <div className="text-xs text-gray-500">Projets</div>
          </div>
        </div>

        {/* Location & Member Since */}
        <div className="space-y-2 mb-4">
          {userProfile.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
              <span>{userProfile.location}</span>
            </div>
          )}
          {userProfile.memberSince && (
            <div className="flex items-center text-sm text-gray-600">
              <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
              <span>Membre depuis {userProfile.memberSince}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button 
            onClick={onViewProfile}
            className="flex items-center justify-center bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            <EyeIcon className="h-4 w-4 mr-1" />
            Voir profil
          </button>
          <button 
            onClick={onEditProfile}
            className="flex items-center justify-center bg-gray-100 text-gray-700 text-sm font-medium py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
          >
            <PencilSquareIcon className="h-4 w-4 mr-1" />
            Modifier
          </button>
        </div>

        {/* Additional Actions */}
        <div className="flex space-x-2 mb-4">
          <button 
            onClick={onMessage}
            className="flex-1 flex items-center justify-center bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
            Message
          </button>
          <button 
            onClick={onShare}
            className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ShareIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Recent Activity */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <DocumentIcon className="h-4 w-4 mr-2 text-blue-500" />
            Activité récente
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Publications ce mois</span>
              <span className="text-gray-900 font-medium">{userProfile.posts || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Nouvelles connexions</span>
              <span className="text-gray-900 font-medium">5</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Projets actifs</span>
              <span className="text-gray-900 font-medium">{userProfile.projects || 0}</span>
            </div>
          </div>
        </div>

        {/* Follow Stats */}
        {(userProfile.followers !== undefined || userProfile.following !== undefined) && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex space-x-4 text-center">
              {userProfile.followers !== undefined && (
                <div>
                  <div className="text-sm font-semibold text-gray-900">{userProfile.followers}</div>
                  <div className="text-xs text-gray-500">Abonnés</div>
                </div>
              )}
              {userProfile.following !== undefined && (
                <div>
                  <div className="text-sm font-semibold text-gray-900">{userProfile.following}</div>
                  <div className="text-xs text-gray-500">Abonnements</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Valeurs par défaut pour les props
OSCProfileCard.defaultProps = {
  userProfile: {
    name: 'Organisation',
    connections: 0,
    posts: 0,
    projects: 0,
    verified: false
  },
  onViewProfile: () => console.log('Voir profil'),
  onEditProfile: () => console.log('Modifier profil'),
  onMessage: () => console.log('Envoyer message'),
  onShare: () => console.log('Partager profil')
};

export default OSCProfileCard;