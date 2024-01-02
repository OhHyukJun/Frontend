import React from "react";
import { useRecoilValue } from "recoil";
import { sellerState } from "../../Atom/user";

export const SellerInfo = () => {
  const seller = useRecoilValue(sellerState);
  const { market } = seller;

  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex">
        <div className="flex h-32 w-32 aspect-square rounded-full">
          <img
            src={market?.sellerProfileImage}
            alt="profile"
            className="flex w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="w-ful flex-col flex ml-5 justify-center">
          <span className="text-3xl font-bold">
            {market?.sellerName} 판매자
          </span>
          <div className="flex flex-row mt-3">
            <img
              className="w-5 h-5"
              src={require("../../public/images/Star.png")}
              alt="star"
            />
            <span className="ml-1">{market?.sellerRating}</span>
            <span className="ml-1">({market?.sellerReviewCount})</span>
          </div>
        </div>
      </div>
      <div className="flex p-10 w-full h-full mt-5 flex-col">
        <span className="text-2xl font-semibold">마켓 소개</span>
        <span className="ml-5 mt-2">{market?.marketInfo}</span>
      </div>
    </div>
  );
};
