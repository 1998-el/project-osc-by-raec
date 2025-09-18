export interface User {
  id: string;
  name: string;
  avatar?: string;
  organization?: string;
  role?: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  images?: string[];
  video?: string;
  document?: {
    name: string;
    url: string;
  };
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  supports: number;
  isLiked: boolean;
  isSupported: boolean;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  description: string;
  sector: string;
  location: {
    country: string;
    city: string;
  };
  website?: string;
  contactEmail: string;
  phone?: string;
  foundedYear: number;
  employeeCount: string;
  projects: number;
  connections: number;
  isConnected: boolean;
  connectionStatus: 'none' | 'pending' | 'connected';
  tags: string[];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface ConnectionRequest {
  id: string;
  fromOrganization: Organization;
  toOrganization: Organization;
  message: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'declined';
}
