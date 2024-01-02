import { atom, selector } from "recoil";
import { BuyItem, CountItem } from "../interface/buy";
import { Buyer } from "../interface/user";
import { userState } from "./user";
import { BasketItem } from "../interface/buy";

export const buyState = atom<BuyItem>({
  key: "buyState",
  default: {
    id: 0,
    productKeywords:[],
    sellerId: 0,
    mainImage: "",
    name: "",
    price: 0,
    keywords: [],
    saleStartDate: "",
    saleEndDate: "",
    detailImage: [],
    description: "",
    subDescription: "",
    subTitle: "",
    category: "과일",
    createdAt: "",
    viewCount: 0,
    reviewCount: 0,
    averageReviewPoint: 0,
  },
});

export const buyItemState = atom<BuyItem[]>({
  key: "buyItemState",
  default: [],
});

export const formDataState = atom<FormData | null>({
  key: "formDataState",
  default: null,
});

export const buyerState = atom<Buyer>({
  key: "buyerState",
  default: {
    id: 0,
    buyerId: 0,
    productId: 0,
    point: 0,
    description: "",
    reviewImage: "",
    createdAt: "",
  },
});

export const buyeruserState = selector({
  key: "buyeruserState",
  get: ({ get }) => {
    const user = get(userState);
    const buyerValue = get(buyerState);

    return {
      user,
      buyerValue,
    };
  },
  set: ({ set }, newValue: any) => {
    if (newValue.user) set(userState, newValue.user);
    if (newValue.buyerValue) set(buyerState, newValue.buyerValue);
  },
});

export const basketState = atom<BasketItem[]>({
  key: "basketState",
  default: [],
});

export const countState = atom<CountItem>({
  key: "countState",
  default: {
    id: 0,
    count: 0,
  },
})

