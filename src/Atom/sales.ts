import { atom, selector } from "recoil";
import { SalesDto, salesItemSummaryDto } from "../interface/sales";
import { SellerMarketDto } from "../interface/user";

export const salesState = atom<SalesDto>({
  key: "salesState",
  default: {
    id: 0,
    userId: 0,
    name: "",
    subTitle: "",
    price: 0,
    description: "",
    subDescription: "",
    mainImage: "",
    detailImages: [],
    keywords: [],
    saleStartDate: "",
    saleEndDate: "",
    category: "",
    viewCount: 0,
    reviewCount: 0,
    averageReviewPoint: 0,
    createdAt: "",
  },
});

export const formDataState = atom<FormData | null>({
  key: "formDataState",
  default: null,
});

export const salesItemSummaryListState = atom<salesItemSummaryDto[]>({
  key: "salesItemSummaryListState",
  default: [],
});

export const sellerMarketState = atom<SellerMarketDto>({
  key: "sellerMarketState",
  default: {
    sellerId: 0,
    sellerName: "",
    sellerProfileImage: "",
    sellerRating: 0,
    sellerReviewCount: 0,
    marketInfo: "",
  },
});
