import React, { useState, useEffect, useRef } from 'react';
import PostEditorModal from '../../components/ui/Modal/PostEditorModal';
import PostCard from '../../components/ui/Card/PostCard';
import OSCProfileCard from '../../components/ui/Card/OSCProfileCard';
import { mockPosts } from '../../utils/constants/mockData';
import type { Post } from '../../utils/types';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const rightSidebarRef = useRef<HTMLDivElement>(null);

  // Gestion du scroll indépendant et du sticky sidebar
  useEffect(() => {
    const handleScroll = () => {
      // Vérifier si on doit rendre le sidebar sticky
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const handleComment = (postId: string, comment: string) => {
    // Simuler l'ajout d'un commentaire
    console.log('Commentaire ajouté:', comment, 'sur le post:', postId);
    // Ici on pourrait mettre à jour l'état des posts avec le nouveau commentaire
  };

  const handleShare = (postId: string) => {
    // Simuler le partage
    console.log('Partage du post:', postId);
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, shares: post.shares + 1 }
          : post
      )
    );
  };

  const handleSupport = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isSupported: !post.isSupported,
              supports: post.isSupported ? post.supports - 1 : post.supports + 1
            }
          : post
      )
    );
  };

  const handleSave = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, isSaved: !post.isSaved }
          : post
      )
    );
  };

  const handleReport = (postId: string) => {
    console.log('Signalement du post:', postId);
    // Ici on pourrait ouvrir un modal de signalement
  };

  const userProfile = {
    name: 'Utilisateur',
    avatar: undefined
  };

  // Données pour les suggestions
  const suggestions = [
    {
      title: 'Organisations similaires',
      items: [
        { name: 'ONG Espoir', followers: '1.2k' },
        { name: 'Association Solidarité', followers: '890' },
        { name: 'Fondation Avenir', followers: '2.1k' }
      ]
    },
    {
      title: 'Événements à venir',
      items: [
        { name: 'Webinaire: Financement des OSC', date: '15 Nov' },
        { name: 'Atelier: Gestion de projet', date: '22 Nov' },
        { name: 'Conférence: Développement durable', date: '30 Nov' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 w-full">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-6">
        {/* Section gauche - Profil */}
        <aside 
          ref={leftSidebarRef}
          className="hidden lg:block lg:col-span-3"
        >
          <div className={`${isSticky ? 'sticky top-20' : ''} transition-all duration-200`}>
            <OSCProfileCard 
              userProfile={{
                name: userProfile.name,
                avatar: userProfile.avatar,
                organization: 'Organisation de la société civile',
                sector: 'Développement communautaire',
                location: 'Abidjan, Côte d\'Ivoire',
                memberSince: '2021',
                connections: 120,
                posts: 34,
                projects: 12,
                verified: true,
                impact: '15 projets réalisés, 5000 bénéficiaires',
                followers: 450,
                following: 280
              }} 
              onViewProfile={() => console.log('Voir profil')}
              onEditProfile={() => console.log('Modifier profil')}
              onMessage={() => console.log('Envoyer message')}
              onShare={() => console.log('Partager profil')}
            />
          </div>
        </aside>

        {/* Section milieu - posts */}
        <main className="col-span-12 lg:col-span-6">
          {/* Bouton pour créer une publication */}
          <div className="mb-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-white rounded-lg border border-gray-200 shadow p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {userProfile.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex-1 text-left border border-gray-200 p-4 rounded-full bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                  <p className="text-gray-500">Commencer une publication</p>
                </div>
              </div>
            </button>
          </div>

          {/* Modal Post Editor */}
          <PostEditorModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            userProfile={userProfile}
          />

          {/* Feed de posts */}
          <div className="space-y-6">
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onSupport={handleSupport}
                onSave={handleSave}
                onReport={handleReport}
              />
            ))}
          </div>

          {/* Message si pas de posts */}
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun post pour le moment. Soyez le premier à partager !</p>
            </div>
          )}
        </main>

        {/* Section droite - Suggestions et ressources */}
        <aside 
          ref={rightSidebarRef}
          className="hidden lg:block lg:col-span-3 space-y-6"
        >
          <div className={`${isSticky ? 'sticky top-20' : ''} transition-all duration-200 space-y-6`}>
            {/* Ressources et Partenaires */}
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Ressources et Partenaires</h2>
              <ul className="space-y-3">
                <li className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <span className="text-sm text-gray-700">Base de données des financeurs</span>
                  <span className="text-xs text-blue-600 font-medium">Nouveau</span>
                </li>
                <li className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <span className="text-sm text-gray-700">Bibliothèque documentaire</span>
                </li>
                <li className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <span className="text-sm text-gray-700">Formations et webinaires</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <span className="text-sm text-gray-700">Partenariats stratégiques</span>
                  <span className="text-xs text-green-600 font-medium">10+</span>
                </li>
                <li className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <span className="text-sm text-gray-700">Événements à venir</span>
                </li>
              </ul>
            </div>

            {/* Suggestions d'organisations */}
            {suggestions.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-5">
                <h3 className="font-semibold mb-3 text-gray-900">{section.title}</h3>
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.followers ? `${item.followers} abonnés` : `Le ${item.date}`}
                        </p>
                      </div>
                      <button className="text-blue-600 text-xs font-semibold hover:text-blue-800 transition-colors">
                        {item.followers ? 'Suivre' : 'S\'inscrire'}
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Voir plus
                </button>
              </div>
            ))}

            {/* Footer de la sidebar */}
            <div className="text-center text-xs text-gray-500 pt-4">
              <p>Africonnect © 2023</p>
              <p className="mt-1">Plateforme des OSC Africaines</p>
              <div className="flex justify-center space-x-3 mt-2">
                <a href="#" className="hover:text-blue-600 transition-colors">Confidentialité</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Conditions</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Aide</a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;