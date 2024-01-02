import React, { useEffect, useState } from "react";
import {
  Button as BootstrapButton,
  Container,
  Col,
  Row,
  FormControl,
} from "react-bootstrap";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import axiosInstance from "../../API/axios";
import { userState } from "../../Atom/user";
import { buyerState } from "../../Atom/buy";
const CustomInfo = {
  id: 7,
  name: "손흥민",
  email: "son@gmail.com",
  profile: "https://picsum.photos/200",
  address: "영국",
  detailAddress: "런던",
  phone: "010-2929-5959",
  role: "buyer",
};

const MainContainer = styled(Container)`
  display:flex;
  item-align: space-between;
`;

const ProfileWrap = styled.div`
  display:flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display:flex;
  justify-contents:center;
  align-items: center;
  width:80vw;
  margin-bottom:3vw;
`;

const ReviewBox = styled.div`
  display:flex;
  justify-contents:center;
`;

const Button = styled(BootstrapButton)`
  display: flex;
  height: 2em; 
  color:black;
  border: none;
  justify-content: center;
  margin-top: 0.5vw;
  font-size: 1rem;
  padding-top:0.2em;
`;



const ProfileImage = styled.img`
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  object-fit: cover;
`;
const ProfileButton = styled(BootstrapButton)`
  display: flex;
  height: 2em; 
  justify-content: center;
  width: 50%;
  margin-top: 0.5vw;
  font-size: 0.8rem;
  padding-top:0.2em;
`;

export const CusMyPage = () => {
  const [reviewImages, setReviewImages] = useState([]);
  const [asyncErr, setAsyncErr] = useState(false);
  const [user,setUser] = useRecoilState(userState);
  const [buyer,setBuyer] = useRecoilState(buyerState);
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/mypage-edit");
  };  

  useEffect(() => {
    const fetchReviewImages = async () => {
      try {
        
        const response = await axiosInstance.get(
          `/v1/review/view_by_buyer/${buyer.buyerId}$`
        );
        const fetchedReviewImages = response.data.map((review:any) => review.reviewImage );
        setReviewImages(fetchedReviewImages);
      } catch (err) {
        setAsyncErr(true);
      }
    }
    
    fetchReviewImages();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get(`/v1/user/${user.id}`);
        setBuyer(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  },[]);

  return (
    <>
    <MainContainer>
    <div>
    <Wrapper className="mt-5">
    <ProfileImage
      src={user.profile}
      alt="profile"
      className="mr-5"
    />
    <ProfileWrap>
      <p style={{fontSize:"1.5rem"}}>구매자님 반갑습니다. </p>
      <ProfileButton onClick={onClick} className="bg-mainGreen">나의 프로필</ProfileButton>
    </ProfileWrap>
     </Wrapper> 
      <Wrapper>
      <span style={{fontSize:"2rem" ,marginRight:"45vw"}}>리뷰를 남긴 상품</span>
      <Button variant="outline-light">더보기</Button>
      </Wrapper>
      <ReviewBox className="bg-[#9EEBA5]">
      {asyncErr && (
        <span>리뷰 이미지를 불러오는 데 실패했습니다</span>
        
     )}
      {!asyncErr && (
        <div>
          {reviewImages.map((img, index) => (
            <img key={index} src={img} alt={`리뷰 - ${index}`} />
          ))}
        </div>
      )}
      
      </ReviewBox>
    </div>
    </MainContainer>
    </>
  );
};