import React from "react";
import { useRecoilValue } from "recoil";
import { sellerState } from "../../Atom/user";
import styled from "styled-components";
import {
  Button as BootstrapButton,
  Container,
  Col,
  Row,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const MainContainer = styled(Container)`
  display: flex;
  justify-content: center;
  margin-left: 10vw;
`;
const Button = styled(BootstrapButton)`
  margin-bottom: 1.6vh;
  margin-left: 20vh;
  width: 5vw;
  display: flex;
  height: auto;
  justify-content: center;
`;
const Test = styled.span`
  font-size: 0.7rem;
`;
const TextArea = styled.div`
  display: flex;
  width: 60vw;
  font-size: 1.3rem;

  margin-right: 5vw;
  margin-top: 5vw;
`;

export const SellerIntro = () => {
  const seller = useRecoilValue(sellerState);
  const { market } = seller;
  const navigate = useNavigate();
  const addView = () => {
    navigate("/seller-my-page");
  };

  return (
    <MainContainer>
      <div className="flex">
        <div className="flex h-24 w-24 aspect-square rounded-full">
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
          <TextArea>
            {market?.sellerName} 판매자의 다른 상품이 궁금하다면?..
            <Button onClick={() => addView()} className="bg-mainGreen">
              <Test>더보기</Test>
            </Button>
          </TextArea>
        </div>
      </div>
    </MainContainer>
  );
};
