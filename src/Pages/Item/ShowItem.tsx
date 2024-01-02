// Basket.tsx
import React, { useEffect, useState } from 'react';
import { useRecoilValue,useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button as BootstrapButton,
  Container,
  Col,
  Row,
  FormControl,
} from "react-bootstrap";
import { BasketItem } from '../../interface/buy';
import { basketState } from '../../Atom/buy'; 
import peach from "../../img/peach.jpg";
import Cereal from "../../img/Cereal.jpg";
import styled from 'styled-components';


const BasketContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 7vw;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5rem;
`;

const QuantityInput = styled.input`
  width: 4vw;
  margin-top: 0.5rem;
  margin-left:1vw;
  padding-left:0.5vw;
`;

const Text = styled.p`
    font-size: 2.5rem;
    margin-bottom: 2vw;
    margin-top:2vw;
    margin-right:40vw;
`;

const Text1 = styled.p`
    font-size: 1.5rem;
    margin-bottom:2vw;
`;

const Box = styled.span`
    margin-left:0.5vw;
`;

const Button = styled(BootstrapButton)`
  width: 10%;
  display: flex;
  height: auto;
  justify-content: center;
`;
const DeleteButton = styled(BootstrapButton)`
  margin-top: 1rem;
  height:auto;
  font-size:0.8em;
`;
const CheckboxWrapper = styled.div`
    margin-right:2rem;

    input[type="checkbox"] {
        transform : scale(1.5);
        margin-right :0.5rem; 
    }
`;
const item: BasketItem[] = [
    {
    id: 1,
    seller_id: 1,
    main_image: peach,
    name: "복숭아",
    price: 12000,
    category:"과일",
    count: 2,
},
{
    id: 2,
    seller_id: 2,
    main_image: Cereal,
    name: "견과",
    price: 10000,
    category:"곡물",
    count: 3,
},
];

export const Basket = () => {
  const [basket, setBasket] = useRecoilState(basketState);
  const [selectedItems, setSelectedItems] = useState<boolean[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    setBasket(item);
  }, [setBasket]);

  useEffect(()=>{
    setSelectedItems(item.map(()=>false));      
 },[]);

  const handleQuantityChange = (index:number, event:React.ChangeEvent<HTMLInputElement>) => {
    const newBasket = [...basket];
    newBasket[index] = { ...newBasket[index], count: parseInt(event.target.value, 10), };
    setBasket(newBasket);
  };

  const handleItemDelete = (index: number) => {
    const newBasket = [...basket];
    newBasket.splice(index, 1);
    setBasket(newBasket);
  };
  
  const toggleCheckbox=(index:number)=>{
    setSelectedItems(selectedItems.map((v,i)=>i===index?!v:v));
  };

  const alertMessage = () => {
    if (selectedItems.every((selected) => !selected)) {
      alert("선택된 상품이 없습니다.");
    } else {
      navigate("/payment");
    }
  };
  
  return (
    <BasketContainer>
      <Text>장바구니</Text>
      {basket.map((item, index) => (
        <ItemWrapper key={index}>
          <CheckboxWrapper>
            <input 
              type="checkbox"
              checked={selectedItems[index]} 
              onChange={()=>toggleCheckbox(index)}
            />
          </CheckboxWrapper>
          <img src={item.main_image} alt={item.name} />
          <ItemInfo>
            <Text1>{item.name}</Text1>
            <p className="mb-2">가격: <Box>{item.price}</Box></p>
            <p>수량: 
            <QuantityInput
              type="number"
              min="1"
              value={item.count}
              className="rounded-lg bg-slate-100"
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleQuantityChange(index, event)}
            /></p>
            <DeleteButton className="bg-mainGreen" onClick={() => handleItemDelete(index)} >삭제하기</DeleteButton>
          </ItemInfo>
        </ItemWrapper>
      ))}
      <Button onClick={alertMessage} className="bg-mainGreen" >
      
        결제하기
      
      </Button>
    </BasketContainer>
  );
};
