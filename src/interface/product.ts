interface ProductKeyword {
  id: number;
  products: string[];
  keyword: string;
}

interface DetailImage {
  id: number;
  imageUrl: string;
}

export interface productDto {
  id: number;
  seller_id: number;
  name: string;
  subTitle: string;
  price: number;
  description: string;
  subDescription: string;
  main_image: string;
  detailImage: string[];
  keyword: string[];
  saleStartDate: string;
  saleEndDate: string;
  category: string;
  viewCount: number;
  createdAt: string;
  rating: number;
}
