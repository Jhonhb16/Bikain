export interface Option {
  emoji: string;
  text: string;
  score: number;
}

export interface Question {
  id: number;
  qNumText: string;
  qText: string;
  qSub: string;
  options: Option[];
}

export interface Testimonial {
  name: string;
  location: string;
  stars: number;
  text: string;
  result: string;
  avatar: string;
  date: string;
}

export interface PurchaseNotification {
  initials: string;
  name: string;
  location: string;
  action: string;
  time: string;
}

export type ViewType = 'quiz' | 'loading' | 'result' | 'landing';
