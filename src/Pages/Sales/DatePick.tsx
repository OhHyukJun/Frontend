import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";
import { salesState } from "../../Atom/sales";
import { formatDate } from "../../Utils/date";

export const DatePick = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sales, setSales] = useRecoilState(salesState);

  const today = new Date();

  const oneYearFromToday = new Date();
  oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1);

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    setSales({ ...sales, saleStartDate: formatDate(date) });
    console.log(formatDate(date));
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    setSales({ ...sales, saleEndDate: formatDate(date) });
  };

  return (
    <div className="mt-3">
      <span className="font-bold text-xl">판매기간</span>
      <div className="w-[40vw] justify-between flex items-center mt-4 ">
        <DatePicker
          className="w-[18vw] bg-slate-100 rounded-full outline-none border-none p-2 text-center"
          dateFormat="yyyy/MM/dd"
          shouldCloseOnSelect
          minDate={today}
          maxDate={oneYearFromToday}
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          popperPlacement="bottom"
          wrapperClassName="date-picker-wrapper"
          placeholderText="판매 시작 날짜"
        />
        ~
        <DatePicker
          className="w-[18vw] bg-slate-100 rounded-full outline-none border-none p-2 text-center "
          dateFormat="yyyy/MM/dd"
          shouldCloseOnSelect
          maxDate={oneYearFromToday}
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          popperPlacement="bottom"
          wrapperClassName="date-picker-wrapper"
          placeholderText="판매 종료 날짜"
        />
      </div>
    </div>
  );
};
