interface ProductKeyword {
  id: number;
  product: string;
  productKeyword: {
    id: number;
    products: string[];
    keyword: string;
  };
  keyword: string;
}

//interface DetailImage {
//  id: number;
//  imageUrl: string;
//}

export interface BuyItem {
  id: number;
  productKeywords: [];
  sellerId: number;
  name: string;
  subTitle: string;
  price: number;
  description: string;
  subDescription: string;
  mainImage: string;
  detailImage: string[];
  keywords: ProductKeyword[];
  saleStartDate: string;
  saleEndDate: string;
  category: string;
  viewCount: number;
  reviewCount: number;
  averageReviewPoint: number;
  createdAt: string;
}

export interface BasketItem {
  id: number;
  seller_id: number;
  main_image: string;
  name: string;
  price: number;
  category: string;
  count: number;
}

export interface CountItem {
  id: number;
  count: number;
}
