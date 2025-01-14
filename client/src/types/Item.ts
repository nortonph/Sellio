export interface Item {
  _id: string; 
  title: string;
  description: string;
  price: number;
  category: string[];
  city?: string;
  country?: string;
  coverPhoto?: string;
  images?: string[];
  videos?: string[];
  datePosted?: string; 
  isBanner?: boolean;
  isSold?: boolean;
  userId: string;
}