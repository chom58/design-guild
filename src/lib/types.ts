export interface Portfolio {
  title: string;
  image: string;
  description: string;
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
  date: string;
  location: string;
  description: string;
  image: string;
  registrationUrl: string;
  capacity: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}