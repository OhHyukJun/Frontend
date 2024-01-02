import React from "react";
import { salesItemSummaryDto } from "../../interface/sales";
import { useNavigate } from "react-router-dom";

export const SalesItemSummay = ({ props }: { props: salesItemSummaryDto }) => {
  const navigate = useNavigate();
  const handleToNavigate = () => {
    navigate("/buy/" + props.id); // 이거 상세페이지가 buy로 되어있는데 이거 맞나요?
  };

  return (
    <div className="flex flex-col w-full h-full items-center mt-5">
      <div className="w-60" onClick={handleToNavigate}>
        <img src={props.mainImage} alt="mainImage" className="w-60 h-60" />
        <div className="items-start flex w-full flex-col">
          <span className="text-xl font-bold">{props.productName}</span>
          <span className="text-base">{props.price}원</span>
          <div className="flex flex-row justify-between w-full h-full">
            <div className="flex">
              <img
                className="w-5 h-5"
                src={require("../../public/images/Star.png")}
                alt="star"
              />
              <span className="ml-1">{props.rating}</span>
              <span className="ml-1">({props.reviewCount})</span>
            </div>
            <div>
              <p>마감일</p>
              <span className="ml-1">D - </span>
              <span className="text-red-600">{props.salesDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
