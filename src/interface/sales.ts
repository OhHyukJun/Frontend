export interface SalesDto {
  id: number;
  userId: number;
  name: string;
  subTitle: string;
  price: number;
  description: string;
  subDescription: string;
  mainImage: string;
  detailImages: string[];
  keywords: string[];
  saleStartDate: string;
  saleEndDate: string;
  category: string;
  viewCount: number;
  reviewCount: number;
  averageReviewPoint: number;
  createdAt: string;
}

export interface salesItemSummaryDto {
  id: number;
  mainImage: string;
  productName: string;
  price: number;
  rating: number;
  reviewCount: number;
  salesDate: string;
}
