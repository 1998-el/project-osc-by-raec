import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  HomeIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchInputRef = useRef(null);

  // Focus sur le champ de recherche quand il devient visible
  useEffect(() => {
    if (isSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchVisible]);

  // Fermer la recherche et les dropdowns si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Fermer la recherche si on clique en dehors
      if (isSearchVisible && searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        if (!event.target.closest('.search-icon')) {
          setIsSearchVisible(false);
        }
      }
      
      // Fermer le dropdown profil si on clique en dehors
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchVisible, isProfileDropdownOpen]);

  // Fermer le menu mobile quand on clique sur un lien
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 fixed top-0 w-full z-50">
        <div className="mx-auto px-16">
          <div className="flex justify-between h-14 items-center">
            {/* Logo et menu mobile */}
            <div className="flex items-center flex-shrink-0">
              {/* Menu hamburger mobile */}
              <button 
                className="text-gray-600 p-2 md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu mobile"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </button>
              
              {/* Logo */}
              <Link to="/" className="flex items-center ml-2 md:ml-0">
               
                <span className="ml-2 text-lg font-semibold text-gray-900 hidden sm:block">Africonnect</span>
              </Link>
            </div>

            {/* Navigation centrale - visible sur desktop */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 flex flex-col items-center transition-colors"
              >
                <HomeIcon className="h-5 w-5" />
                <span className="text-xs mt-0.5">Accueil</span>
              </Link>

              <Link
                to="/networking"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 flex flex-col items-center transition-colors"
              >
                <UserGroupIcon className="h-5 w-5" />
                <span className="text-xs mt-0.5">Réseau</span>
              </Link>

              <Link
                to="/fundraising"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 flex flex-col items-center transition-colors"
              >
                <BriefcaseIcon className="h-5 w-5" />
                <span className="text-xs mt-0.5">Financement</span>
              </Link>

              <Link
                to="/resources"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 flex flex-col items-center transition-colors"
              >
                <BuildingLibraryIcon className="h-5 w-5" />
                <span className="text-xs mt-0.5">Ressources</span>
              </Link>
            </div>

            {/* Section droite - notifications, messages, profil */}
            <div className="flex items-center space-x-2">
              {/* Barre de recherche - visible sur desktop */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="block w-48 pl-10 pr-3 py-1.5 border border-gray-300 rounded-md bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Icône de recherche mobile */}
              <button 
                className="text-gray-600 p-2 md:hidden search-icon"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                aria-label="Rechercher"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>

              {/* Icônes de notification et messages - visible sur desktop */}
              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/messages"
                  className="text-gray-600 hover:text-gray-900 p-2 relative rounded-md transition-colors"
                  title="Messages"
                >
                  <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                </Link>

                <Link
                  to="/notifications"
                  className="text-gray-600 hover:text-gray-900 p-2 relative rounded-md transition-colors"
                  title="Notifications"
                >
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500"></span>
                </Link>

                <Link
                  to="/trainings"
                  className="text-gray-600 hover:text-gray-900 p-2 relative rounded-md transition-colors"
                  title="Formations"
                >
                  <BookOpenIcon className="h-5 w-5" />
                </Link>

                {/* Séparateur */}
                <div className="h-5 w-px bg-gray-300 mx-1"></div>
              </div>

              {/* Avatar utilisateur avec dropdown */}
              <div className="relative profile-dropdown">
                <button
                  className="flex items-center space-x-1 cursor-pointer p-1 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  aria-label="Menu profil"
                >
                  <div className="h-7 w-7 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-800">U</span>
                  </div>
                  <ChevronDownIcon className={`h-3 w-3 text-gray-600 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md py-1 z-50 border border-gray-200 shadow-lg">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeMobileMenu}>
                      Mon Profil
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeMobileMenu}>
                      Paramètres
                    </Link>
                    <Link to="/organizations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeMobileMenu}>
                      Mes organisations
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeMobileMenu}>
                      Déconnexion
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Barre de recherche mobile - apparaît au clic */}
          {isSearchVisible && (
            <div className="pb-2 md:hidden px-4">
              <div className="relative" ref={searchInputRef}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher des OSC, bailleurs, ressources..."
                  className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-md bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setIsSearchVisible(false)}
                  aria-label="Fermer la recherche"
                >
                  <XMarkIcon className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden mt-14">
          <div className="fixed inset-0 bg-black bg-opacity-10" onClick={closeMobileMenu}></div>
          <div className="relative bg-white border-t border-gray-200 w-full">
            <div className="py-2 px-4 space-y-0">
              <Link to="/" className="flex items-center px-3 py-2 text-gray-900 border-b border-gray-100" onClick={closeMobileMenu}>
                <HomeIcon className="h-5 w-5 mr-3" />
                <span>Accueil</span>
              </Link>
              <Link to="/networking" className="flex items-center px-3 py-2 text-gray-900 border-b border-gray-100" onClick={closeMobileMenu}>
                <UserGroupIcon className="h-5 w-5 mr-3" />
                <span>Réseau</span>
              </Link>
              <Link to="/fundraising" className="flex items-center px-3 py-2 text-gray-900 border-b border-gray-100" onClick={closeMobileMenu}>
                <BriefcaseIcon className="h-5 w-5 mr-3" />
                <span>Financement</span>
              </Link>
              <Link to="/resources" className="flex items-center px-3 py-2 text-gray-900 border-b border-gray-100" onClick={closeMobileMenu}>
                <BuildingLibraryIcon className="h-5 w-5 mr-3" />
                <span>Ressources</span>
              </Link>
              <Link to="/messages" className="flex items-center px-3 py-2 text-gray-900 border-b border-gray-100" onClick={closeMobileMenu}>
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-3" />
                <span>Messages</span>
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </Link>
              <Link to="/notifications" className="flex items-center px-3 py-2 text-gray-900 border-b border-gray-100" onClick={closeMobileMenu}>
                <BellIcon className="h-5 w-5 mr-3" />
                <span>Notifications</span>
              </Link>
              <Link to="/trainings" className="flex items-center px-3 py-2 text-gray-900" onClick={closeMobileMenu}>
                <BookOpenIcon className="h-5 w-5 mr-3" />
                <span>Formations</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;