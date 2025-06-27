export type MediaType = 'image' | 'video' | 'pdf' | 'audio' | '3d';

export interface Portfolio {
  title: string;
  description: string;
  type: MediaType;
  url: string;
  thumbnail?: string;
  embedUrl?: string; // For YouTube/Vimeo
  duration?: string; // For videos/audio
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface Creator {
  id: string;
  name: string;
  profileImage: string;
  profession: string;
  bio: string;
  skills: Array<'graphic' | 'illustration' | 'branding'>;
  portfolio: Portfolio[];
  social: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  email: string;
}

export interface Event {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  venue: string;
  description: string;
  longDescription?: string;
  image: string;
  category: 'networking' | 'workshop' | 'seminar' | 'exhibition' | 'competition';
  tags: string[];
  speakers?: {
    name: string;
    title: string;
    bio: string;
    image?: string;
  }[];
  agenda?: {
    time: string;
    title: string;
    description?: string;
    speaker?: string;
  }[];
  capacity: number;
  registered: number;
  price: number;
  earlyBirdPrice?: number;
  earlyBirdDeadline?: string;
  includes: string[];
  requirements?: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  registrationDeadline: string;
}