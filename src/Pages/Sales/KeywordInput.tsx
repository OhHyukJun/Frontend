import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { salesState } from "../../Atom/sales";

export const KeywordInput = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [sales, setSales] = useRecoilState(salesState);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywordInput = e.target.value;
    setKeyword(keywordInput);

    const keywordArray = keywordInput.split(/\s+/);

    setSales((prevSales) => ({
      ...prevSales,
      keyword: keywordArray,
    }));
  };

  return (
    <div className="flex flex-row w-full h-full mt-3 items-center">
      <span className="font-bold text-xl">키워드</span>
      <input
        type="input"
        value={keyword}
        className="flex ml-5 w-[40vw] rounded-lg bg-slate-100 outline-none border-none p-2 text-center"
        onChange={handleKeywordChange}
      ></input>
    </div>
  );
};
