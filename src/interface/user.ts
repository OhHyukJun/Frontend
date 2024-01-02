export interface UserDto {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  address: string;
  detailAddress: string;
  profile?: string;
  certificate?: string;
}

export interface SellerMarketDto {
  sellerId: number;
  sellerName: string;
  sellerProfileImage: string;
  sellerRating: number;
  sellerReviewCount: number;
  marketInfo: string;
}

export interface Buyer {
  id: number;
  buyerId: number;
  productId: number;
  point: number;
  description: string;
  reviewImage: string;
  createdAt: string;
}
