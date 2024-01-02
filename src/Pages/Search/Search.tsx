import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productDto } from "../../interface/product";
import { Container } from "react-bootstrap";
import { SearchItemSummay } from "./SearchItemSummay";
import axiosInstance from "../../API/axios";

export const Search = () => {
  const search = useParams().word;
  const [products, setProducts] = useState<productDto[]>();
  const order = ["최신순", "조회순", "리뷰순", "저가순"];
  const [orderClick, setOrderClick] = useState("최신순");

  const fetchSearchData = async () => {
    const res = await axiosInstance.get(
      `/v1/search_product/all?Name=${search}&sortBy=${orderClick}`
    );
    setProducts(res.data);
  };

  useEffect(() => {
    fetchSearchData();
  }, []);

  const handleOrder = (e: any) => {
    const id = e.target.id;
    setOrderClick(id);
    fetchSearchData();
  };

  return (
    <Container className="mt-20">
      <div className="w-full h-[8vh]">
        <span className="font-bold text-[2rem]">{search}</span>
      </div>
      <div className="flex w-full justify-end">
        <div className="flex ml-0 w-[17vw] h-[5vh] justify-between">
          {order.map((item) => (
            <span
              className="font-semibold text-[1rem]"
              onClick={handleOrder}
              id={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4 w-full h-full">
        {products &&
          products.map((item: productDto) => (
            <SearchItemSummay key={item.id} props={item} />
          ))}
      </div>
    </Container>
  );
};
