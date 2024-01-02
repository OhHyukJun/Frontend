import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { salesState } from "../../Atom/sales";

export const DescriptionInput = () => {
  const [sales, setSales] = useRecoilState(salesState);

  const inputChangeHandler = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setSales({ ...sales, name: value });
        break;
      case "description":
        setSales({ ...sales, description: value });
        break;
      case "price":
        setSales({ ...sales, price: value });
        break;
      case "category":
        setSales({ ...sales, category: value });
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex w-full h-full py-10 flex-col">
      <div className="flex flex-grow w-full items-center">
        <span className="font-bold text-xl">카테고리</span>
        <select
          name="category"
          className="flex w-[10vw] h-[5vh] ml-5 p-2 bg-slate-100 outline-none border-none rounded-lg font-bold text-lg"
          value={sales.category}
          defaultValue={"과일"}
          onChange={inputChangeHandler}
        >
          <option key={"과일"} value="과일">
            과일
          </option>
          <option key={"채소"} value="채소">
            채소
          </option>
          <option key={"쌀, 잡곡, 견과"} value="쌀, 잡곡, 견과">
            쌀, 잡곡, 견과
          </option>
        </select>
      </div>
      <div className="flex flex-grow w-full mt-5">
        <label className="flex flex-row w-full h-full items-center">
          <span className="font-bold text-xl">상품명</span>
          <input
            name="title"
            className="w-[40vw] h-[5vh] ml-5 p-2 bg-slate-100 outline-none border-none rounded-lg font-bold text-lg"
            type="text"
            value={sales.name}
            onChange={inputChangeHandler}
          />
        </label>
      </div>
      <div className="flex flex-grow w-full h-32 mt-5">
        <label className="flex flex-col w-full h-full">
          <span className="font-bold text-xl w-full">상품 소개</span>
          <textarea
            name="description"
            placeholder="최대 500자까지 입력 가능합니다."
            value={sales.description}
            onChange={inputChangeHandler}
            maxLength={100}
            className="w-[44vw] h-32 text-[1rem] border-none outline-none rounded-lg bg-slate-100 p-3 mt-2"
            style={{ wordWrap: "break-word", resize: "none" }}
          />
        </label>
      </div>
      <div className="flex flex-grow w-full mt-5">
        <label className="flex flex-row w-full h-full items-center">
          <span className="font-bold text-xl">가격</span>
          <input
            name="price"
            className="w-[41vw] h-[5vh] ml-5 p-2 bg-slate-100 outline-none border-none rounded-lg text-lg"
            type="number"
            value={sales.price}
            onChange={inputChangeHandler}
          />
        </label>
      </div>
    </div>
  );
};
