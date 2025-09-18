import type { Post } from '../types';

export const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '1',
      name: 'Marie Dupont',
      organization: 'ONG Environnement Afrique',
      role: 'Directrice',
      avatar: undefined
    },
    content: 'Exciting news! Our latest project on sustainable agriculture has been approved by the African Development Bank. This initiative will help 5000 farmers across 3 countries improve their yields and adopt climate-resilient practices. 🌱🚜',
    images: [
      'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop'
    ],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 24,
    comments: 8,
    shares: 5,
    supports: 12,
    isLiked: false,
    isSupported: true
  },
  {
    id: '2',
    author: {
      id: '2',
      name: 'Ahmed Hassan',
      organization: 'Centre de Formation Professionnelle',
      role: 'Coordinateur',
      avatar: undefined
    },
    content: 'We are launching a new vocational training program for youth in rural areas. The program focuses on digital skills, entrepreneurship, and sustainable development. Applications are now open! 📚💻',
    document: {
      name: 'Programme_Formation_2024.pdf',
      url: '#'
    },
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 18,
    comments: 12,
    shares: 7,
    supports: 9,
    isLiked: true,
    isSupported: false
  },
  {
    id: '3',
    author: {
      id: '3',
      name: 'Sophie Mbeki',
      organization: 'Réseau Santé Communautaire',
      role: 'Médecin',
      avatar: undefined
    },
    content: 'Today we vaccinated over 200 children in our mobile clinic. Thanks to our partners and donors for making this possible. Every child deserves a healthy start! 💉👶',
    images: [
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop'
    ],
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 31,
    comments: 15,
    shares: 9,
    supports: 18,
    isLiked: false,
    isSupported: true
  },
  {
    id: '4',
    author: {
      id: '4',
      name: 'Jean-Baptiste Ndiaye',
      organization: 'Alliance pour l\'Éducation',
      role: 'Directeur Exécutif',
      avatar: undefined
    },
    content: 'Proud to announce that our literacy program has reached 10,000 participants this year! The impact on communities is incredible. Education is the foundation of sustainable development. 📖✨',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    likes: 45,
    comments: 22,
    shares: 15,
    supports: 28,
    isLiked: true,
    isSupported: true
  },
  {
    id: '5',
    author: {
      id: '5',
      name: 'Fatima Al-Zahra',
      organization: 'Femmes Entrepreneurs Afrique',
      role: 'Présidente',
      avatar: undefined
    },
    content: 'Our women\'s entrepreneurship summit was a huge success! Over 300 women from 15 countries gathered to share experiences and build networks. The energy was incredible! 💪👩‍💼',
    images: [
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop'
    ],
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    likes: 67,
    comments: 34,
    shares: 23,
    supports: 41,
    isLiked: false,
    isSupported: false
  }
];
