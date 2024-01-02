import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Button as BootstrapButton,
  Container,
  Col,
  Row,
  FormControl,
} from "react-bootstrap";
import { buyerState } from "../../Atom/buy";
import { Buyer } from "../../interface/user";
import { SalesDto } from "../../interface/sales";
import { buyeruserState } from "../../Atom/buy";
import { salesState } from "../../Atom/sales";
import {SERVER} from "../../config";
import axios from "axios";
import { userState } from "../../Atom/user";

const Text = styled.span`
    width:5vw;
`;



const FormContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: left;
  width:80%;
  font-size: 1rem;
  margin-left:20vw;
`;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: row;
  font-weight:bold;
  align-items: center;
  gap: 3vw;
  margin-bottom: 2vw;
`;

const Button = styled(BootstrapButton)`
  width: 30%;
  margin-top:3vw;
  display: flex;
  height: auto;
  justify-content: center;
  item-align: left;
`;


export const BuyerForm = () => {
  const [buyerUser, setBuyerUser] = useRecoilState(buyeruserState);
  const product = useRecoilValue(salesState);
  const [buyer, setBuyer] = useRecoilState(userState);
  const [pay, setPay] = useState("");

  const onClick = async () => {
    try {
      const response = await axios.post("https://115.85.181.92/api/v1/payment/web-hook");
      console.log(response);
      setPay(response.data);
    } catch (error: any) {
      console.log(error);
      alert(`에러: ${error.message}`);
    }
  };
  
  useEffect(() => {
    setBuyerUser({
      ...buyerUser,
      buyerValue: buyer,
    });
  }, []);

  const inputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "buyerName") setBuyer({ ...buyer, name: value });
    else if (name === "buyerPhone") setBuyer({ ...buyer, phone: value });
    else if (name === "buyerAddress") setBuyer({ ...buyer, address: value });
  };

  const formPhoneNumber = (phone: string | undefined) => {
    if (phone) {
      return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else {
      return "";
    }
  };

  return (
    <>
    <FormContainer>
      <StyledCol>
        <span>구매자 정보</span>
      </StyledCol>
      <StyledCol>
        <Text>이름</Text>        
        <input
          name="buyerName"
          value={buyerUser.buyer?.name}
          type="text"
          placeholder={buyerUser.buyer?.name}
          onChange={inputChange}
          maxLength={30}
          className="w-[55vw] h-[3rem] pl-2 border-none outline-none rounded-lg bg-slate-100"
        />     
      </StyledCol>
      <StyledCol>
        <Text>연락처</Text>
        <input
          name="buyerPhone"
          value={formPhoneNumber(buyerUser.buyer?.phone)}
          type="tel"
          placeholder={formPhoneNumber(buyerUser.buyer?.phone)}
          onChange={inputChange}
          maxLength={11}
          className="w-[55vw] h-[3rem] pl-2 border-none outline-none rounded-lg bg-slate-100"    />
      </StyledCol>
      <StyledCol>
        <Text>주소</Text>
        <input
          name="buyerAddress"
          value={buyerUser.buyer?.address}
          type="text"
          placeholder={buyerUser.buyer?.address}
          onChange={inputChange}
          className="w-[55vw] h-[3rem] pl-2 border-none outline-none rounded-lg bg-slate-100"
        />
      </StyledCol>
     
      <StyledCol>
      <Text>결제정보</Text>
      </StyledCol>
      <StyledCol>
      <Text>결제 금액</Text>
        <span className="w-[55vw] flex justify-end">
          {product.price}원
        </span>
      </StyledCol>
      <StyledCol>
        <Button onClick={onClick} className="bg-mainGreen">결제하기</Button>
      </StyledCol>
    </FormContainer>
    </>
  );
};
