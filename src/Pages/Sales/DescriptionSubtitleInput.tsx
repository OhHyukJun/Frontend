import React, { useState } from "react";
import { salesState } from "../../Atom/sales";
import { useRecoilState } from "recoil";

export const DescriptionSubtitleInput = () => {
  const [sales, setSales] = useRecoilState(salesState);

  const handleSubDescriptionChange = (e: any) => {
    setSales({ ...sales, subDescription: e.target.value });
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSales({ ...sales, subTitle: e.target.value });
  };

  return (
    <div className="flex flex-col w-full mt-3">
      <div className="flex flex-row items-center">
        <span className="font-bold text-xl mr-2">설명 추가하기</span>
        <textarea
          name="sub-description"
          placeholder="최대 500자까지 입력 가능합니다."
          value={sales.subDescription}
          onChange={handleSubDescriptionChange}
          maxLength={100}
          className="w-[44vw] h-32 text-[1rem] border-none outline-none rounded-lg bg-slate-100 p-3 mt-2"
          style={{ wordWrap: "break-word", resize: "none" }}
        />
      </div>
      <div className="flex flex-row items-center mt-3">
        <span className="font-bold text-xl mr-2">소제목 추가하기</span>
        <input
          type="input"
          value={sales.subTitle}
          className="flex w-[40vw] rounded-lg bg-slate-100 outline-none border-none p-2 text-center"
          onChange={handleSubtitleChange}
        />
      </div>
    </div>
  );
};
