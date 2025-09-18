// Mock data for chat conversations
export const mockConversations = [
  {
    id: '1',
    name: 'Marie Dupont',
    avatar: null,
    lastMessage: 'Bonjour, comment allez-vous ?',
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    unreadCount: 2,
    isOnline: true,
    isGroup: false,
    members: 1
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    avatar: null,
    lastMessage: 'Le projet avance bien !',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    unreadCount: 0,
    isOnline: false,
    isGroup: false,
    members: 1
  },
  {
    id: '3',
    name: 'Groupe Développement Durable',
    avatar: null,
    lastMessage: 'Nouvelle réunion programmée pour demain',
    lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    unreadCount: 5,
    isOnline: true,
    isGroup: true,
    members: 8
  },
  {
    id: '4',
    name: 'Sophie Mbeki',
    avatar: null,
    lastMessage: 'Merci pour votre soutien !',
    lastMessageTime: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    unreadCount: 1,
    isOnline: true,
    isGroup: false,
    members: 1
  }
];

// Mock data for chat messages
export const mockMessages = {
  '1': [
    {
      id: '1',
      content: 'Bonjour ! Comment allez-vous ?',
      sender: 'Marie Dupont',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isOwn: false,
      attachments: []
    },
    {
      id: '2',
      content: 'Très bien merci ! Et vous ?',
      sender: 'current-user',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      isOwn: true,
      attachments: []
    },
    {
      id: '3',
      content: 'Ça va bien aussi. J\'ai vu votre dernier post sur le projet agricole.',
      sender: 'Marie Dupont',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      isOwn: false,
      attachments: []
    }
  ],
  '2': [
    {
      id: '4',
      content: 'Salut Ahmed ! Comment se passe le programme de formation ?',
      sender: 'current-user',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isOwn: true,
      attachments: []
    },
    {
      id: '5',
      content: 'Très bien ! Nous avons déjà 50 inscriptions.',
      sender: 'Ahmed Hassan',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
      isOwn: false,
      attachments: []
    }
  ],
  '3': [
    {
      id: '6',
      content: 'Bonjour à tous !',
      sender: 'Sophie Mbeki',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isOwn: false,
      attachments: []
    },
    {
      id: '7',
      content: 'Nouvelle réunion programmée pour demain à 14h.',
      sender: 'Jean-Baptiste Ndiaye',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000 + 10 * 60 * 1000),
      isOwn: false,
      attachments: []
    },
    {
      id: '8',
      content: 'Parfait, je serai là !',
      sender: 'current-user',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000 + 15 * 60 * 1000),
      isOwn: true,
      attachments: []
    }
  ]
};
