import React, { useEffect, useState } from "react";
import { buyState } from "../../Atom/buy";
import { useRecoilState, useRecoilValue } from "recoil";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Button as BootstrapButton,
  Container,
  Col,
  Row,
  FormControl,
} from "react-bootstrap";
import styled from "styled-components";
import { DropBar } from "./DropBar";
import { BuyItem } from "../../interface/buy";
import { SellerLink } from "./sellerLink";
import { userState } from "../../Atom/user";
import axiosInstance from "../../API/axios";
import { countState } from "../../Atom/buy";

const MainImage = styled(Col)`
  margin-left: 10vw;
  margin-right: auto;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  display: block;
`;

const MainContainer = styled(Container)`
  margin-top: 5vw;
  margin-bottom: 10vw;
`;

const ProductInfo = styled.div`
  margin-bottom: 1vw;
  text-align: center;
  justify-content: flex-end;
  display: flex;
  margin-top: 1vw;
  margin-right: 15vw;
`;

const ProductInfo1 = styled.div`
  margin-bottom: 1vw;
  margin-right: 15vw;
  text-align: center;
  justify-content: center;
  display: flex;
  margin-top: 1vw;
  font-size: 2rem;
`;

const TextBox = styled.div`
  justify-content: center;
  display: flex;
  font-size: 2rem;
  max-height: calc(30vh);
`;

const TestArea = styled(Container)`
  margin-top: 5vw;
`;
const TextCol = styled(Col)`
  margin-top: 5vw;
  justify-content: center;
  display: flex;
`;

const Button = styled(BootstrapButton)`
  margin-bottom: 1.6vh;
  margin-left: 2vh;
  width: 30%;
  display: flex;
  height: auto;
  justify-content: center;
`;

const Button1 = styled(BootstrapButton)`
  margin-top: 3vw;
  margin-right: 15vw;
  width: 10vw;
  display: flex;
  height: auto;
  justify-content: center;
`;

const Button1Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ImageBox = styled.img`
  margin-top: 5vw;
  margin-left: auto;
  margin-right: auto;
  width: 60vw;
  height: 25vw;
  object-fit: contain(60vw);
  display: block;
`;

const StyledListItem = styled.li`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const Customer = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [product, setProduct] = useRecoilState(buyState);
  const [count, setCount] = useRecoilState(countState);
  const productId = useParams().id;

  const fetchProduct = async () => {
    const response = await axiosInstance.get(
      `/v1/sale_product/view?id=${productId}`
    );
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProduct();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate("/payment");
  };

  const Basket = async () => {
    try {
      const response = await axiosInstance.post("/v1/shopping/add", {
        id: product?.id,
        count,
      });

      if (response.status === 200) {
        setCount(count);
        navigate("/Basket");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const goSeller = () => {
    navigate("/seller-my-page");
  };

  console.log(count);
  return (
    <>
      <Button1Wrapper>
        {user.role === "seller" && (
          <Button1 onClick={goSeller} className="bg-mainGreen">
            <span>수정하기</span>
          </Button1>
        )}
      </Button1Wrapper>
      <MainContainer>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={6}>
              <MainImage>
                <img src={product?.mainImage} alt={product?.name} />
              </MainImage>
            </Col>
            <Col xs={12} md={6}>
              <ProductInfo1>
                <p>{product?.name}</p>
              </ProductInfo1>
              <ProductInfo>
                <p>{product?.price}</p>
              </ProductInfo>
              <ProductInfo>
                <p>{product?.description}</p>
              </ProductInfo>
              <Row>
                <DropBar />
              </Row>
              <Row>
                <Button type="submit" className="bg-mainGreen">
                  <span>구매하기</span>
                </Button>
              </Row>
              <Row>
                <Button onClick={Basket} className="bg-mainGreen">
                  <span>장바구니</span>
                </Button>
              </Row>
            </Col>
          </Row>
        </form>
      </MainContainer>
      <SellerLink />
      <TestArea>
        <TextBox>
          판매기간: {product?.saleStartDate}~{product?.saleEndDate}
        </TextBox>
        {product?.detailImage && product.detailImage.length > 0 && (
          <ImageBox src={product.detailImage[0]} />
        )}
        <TextBox>
          <TextCol>{product?.subTitle}</TextCol>
        </TextBox>
        <TextCol>{product?.subDescription}</TextCol>

        {product?.detailImage && product.detailImage.length > 1 && (
          <ImageBox src={product.detailImage[1]} />
        )}
        <TextCol>추가설명글1</TextCol>
        {product?.detailImage && product.detailImage.length > 2 && (
          <ImageBox src={product.detailImage[2]} />
        )}
        <TextCol>추가설명글2</TextCol>
      </TestArea>
    </>
  );
};
