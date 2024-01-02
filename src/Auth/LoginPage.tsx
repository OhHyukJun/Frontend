import axios from "axios";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "../Atom/user";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { SERVER } from "../config";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../API/axios";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-left: 2vw;
  margin-left: 20vw;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 65vh;
  background-color: #9eeba5;
  margin-top: 2vw;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  margin-top: 2vw;
  font-size: 3.5rem;
  font-weight: bold;
`;

const KakaoLoginButton = styled(Button)`
  font-size: 1vw;
  background-color: #f7bc0c;
  width: 80%;
  height: 20%;
`;

export const LoginPage = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const navigate = useNavigate();
  const onClick = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=be84e5c954c05f4d77886292167f2621&redirect_uri=https://115.85.181.92/login/oauth2/code/kakao";
    navigate("/login-success");
  };
  
  const fetchLoginInfo = async () => {
    try {
      const response = await axios.post(
        "https://115.85.181.92/api/v1/seller/oauth"
      );
      if (response.status === 200) {
        setLogin(true);
      }
    } catch (error: any) {
      console.log(error);
     
    }
  };

  useEffect(() => {
    //fetchLoginInfo();
  }, []);

  return (
    <PageContainer>
      <Title>로그인</Title>
      <ContentContainer className="rounded-md">
        <LoginButtonContainer onClick={onClick}>
          <KakaoLoginButton variant="warning">카카오 로그인</KakaoLoginButton>
        </LoginButtonContainer>
      </ContentContainer>
    </PageContainer>
  );
};
