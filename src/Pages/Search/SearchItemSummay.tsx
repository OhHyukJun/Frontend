import React from "react";
import { useNavigate } from "react-router-dom";
import { productDto } from "../../interface/product";
import { _fnCompareDay, formatDate } from "../../Utils/date";

//나중에 salesItemSummary 수정하면 안쓸거임
export const SearchItemSummay = ({ props }: { props: productDto }) => {
  const navigate = useNavigate();
  const handleToNavigate = () => {
    navigate("/buy/" + props.id);
  };

  const compareDay = _fnCompareDay(formatDate(new Date()), props.saleEndDate);

  return (
    <div className="flex flex-col w-full h-full items-center mt-5">
      <div className="w-60" onClick={handleToNavigate}>
        <img src={props.main_image} alt="mainImage" className="w-60 h-60" />
        <div className="items-start flex w-full flex-col">
          <span className="text-xl font-bold">{props.name}</span>
          <span className="text-base">{props.price}원</span>
          <div className="flex flex-row justify-between w-full h-full">
            <div className="flex">
              <img
                className="w-5 h-5"
                src={require("../../public/images/Star.png")}
                alt="star"
              />
              <span className="ml-1">{props.rating}</span>
              {/*<span className="ml-1">({props.reviewCount})</span>*/}
            </div>
            <div>
              <p>마감일</p>
              <span className="ml-1">D - </span>
              <span className="text-red-600">{compareDay}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
