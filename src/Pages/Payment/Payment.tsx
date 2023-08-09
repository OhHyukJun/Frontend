import React from "react";
import styled from "styled-components";
import { buyState1 } from '../Customer/product';
import { useRecoilState,useRecoilValue } from "recoil";
import { Container,Row,Col } from "react-bootstrap";
import { BuyerForm } from "./BuyerForm";
const TextTitle = styled.div`
font-size:3rem;    
display:flex;
justify-content: left;
align-items: flex-start;
width: 100%;
margin-top:3vw;
margin-left:15vw;
`;

const Box = styled.div`
  font-size:1.5em;
  display:flex;
  width:50%; 
`;
const Price = styled.p`
  margin-top:15vw;
  font-size:1.1em;
`;

const ImageSize = styled.img`
  width:auto;
  height:auto;
  margin-right:1vw;
`

const MainContainer = styled(Container)`
  margin-top: 5vw;
  margin-bottom:5vw;
  width:90vw;
  height:100%;
  justify-content: space-around; 
  display: flex;
  
`;



export const Payment = () => {
  const buy = useRecoilValue(buyState1);

  return(
    <>
      <TextTitle>결제하기</TextTitle>
      <MainContainer>
        <Box>
          <ImageSize src={buy.mainImage} alt={buy.productName} />
          {buy.productName} 
        </Box>
          <Price>{buy.price}원</Price> 
      </MainContainer>  
      <BuyerForm/>
    </>
  );
};
