import { atom, selector } from "recoil";
import { SellerMarketDto, UserDto } from "../interface/user";
import { sellerMarketState, salesItemSummaryListState } from "./sales";
import { salesItemSummaryDto } from "../interface/sales";

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const userState = atom<UserDto>({
  key: "userState",
  default: {
    id: 0,
    name: "",
    email: "",
    role: "", // "admin" | "customer" | "seller" ? 모름
  },
});

//export const sellerState = atom({
//  key: "sellerState",
//  default: {
//    user: {
//      id: 0,
//      name: "",
//      email: "",
//      role: "",
//    } as UserDto,
//    market: {
//      sellerId: 0,
//      sellerName: "",
//      sellerProfileImage: "",
//      sellerRating: 0,
//      sellerReviewCount: 0,
//      marketInfo: "",
//    } as SellerMarketDto,
//    salseItemsSummaryList: [] as salesItemSummaryDto[],
//  },
//});

export const sellerState = selector({
  key: "sellerState",
  get: ({ get }) => {
    const user = get(userState);
    const market = get(sellerMarketState);
    const salesItemsSummaryList = get(salesItemSummaryListState);

    return {
      user,
      market,
      salesItemsSummaryList,
    };
  },
  set: ({ set }, newValue: any) => {
    if (newValue.user) set(userState, newValue.user);
    if (newValue.market) set(sellerMarketState, newValue.market);
    if (newValue.salesItemsSummaryList)
      set(salesItemSummaryListState, newValue.salesItemsSummaryList);
  },
});