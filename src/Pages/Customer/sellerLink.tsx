import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { sellerState } from "../../Atom/user";
import { SellerIntro } from "./sellerIntro";
import { SellerMarketDto } from "../../interface/user";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import {
  Button as BootstrapButton,
  Col,
  Row,
  FormControl,
} from "react-bootstrap";

const MainContainer = styled(Container)`
  display: flex;
  justify-content: center;
  margin-left: 20vw;
`;

const dummySeller: SellerMarketDto = {
  sellerId: 1,
  sellerName: "김철수",
  sellerProfileImage: "https://i.imgur.com/1QZzX3j.png",
  sellerRating: 4.5,
  sellerReviewCount: 103,
  marketInfo: "김철수의 농장입니다.",
};

export const SellerLink = () => {
  const [seller, setSeller] = useRecoilState(sellerState);

  useEffect(() => {
    setSeller({
      ...seller,
      market: dummySeller,
    });
    //나중에 api여기서 호출
  }, []);

  return (
    <MainContainer>
      <SellerIntro />
    </MainContainer>
  );
};
