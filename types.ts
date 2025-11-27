export interface VideoData {
  id: string;
  title: string;
  channelName: string;
  thumbnailUrl: string;
  channelUrl: string;
  uploadDate: string;
  summary?: string; // AI generated summary
}

export interface AwardData {
  category: string;
  place: number; // 1, 2, or 3
  podcastName: string;
  year: number;
}

export interface HostProfile {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  columnTitle: string;
  excerpt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: 'Apparel' | 'Accessory';
}
