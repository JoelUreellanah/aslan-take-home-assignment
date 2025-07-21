export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  googleShoppingLink: string;
  wishListed: boolean;
  offer: Offer | null;
  createdAt: string; // ISO date string
}

export interface Offer {
  description?: string;
  discountAmount?: number;
  isPercentage?: boolean;
}
