interface Image {
    id: number;
    imageUrl: string;
  }
  
  interface ProductKeyword {
    id: number;
    products: string[];
    keyword: string;
  }
  
  interface Keyword {
    id: number;
    product: string;
    productKeyword: ProductKeyword;
    keyword: string;
  }
  
  interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    detailAddress: string;
    role: string;
    profile: string;
    certificate: string;
  }
  
  export interface MainItem {
    id: number;
    userId: User;
    name: string;
    subTitle: string;
    price: number;
    description: string;
    subDescription: string;
    mainImage: string;
    detailImage: Image[];
    keywords: Keyword[];
    saleStartDate: string;
    saleEndDate: string;
    category: string;
    viewCount: number;
    reviewCount: number;
    averageReviewPoint: number;
    createdAt: string;
  }