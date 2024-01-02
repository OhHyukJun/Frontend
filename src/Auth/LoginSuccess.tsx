import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { loginState } from "../Atom/user";
import axiosInstance from "../API/axios";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { Main } from "../Pages/Main/Main";

const MainContainer = styled(Container)`
  display: flex;
  justify-contents:center;
`;

export const LoginSuccess = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useRecoilState(loginState);
  const [searchParam] = useSearchParams();

  const loginUser = async (token: string) => {
    try {
      const response = await axiosInstance.post(
        `/v1/login?access_token=${token}`
      );
      if (response.status === 200) {
        setLogin(true);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const accessToken = searchParam.get("access_token");
    if(accessToken) loginUser(accessToken as string);
    else navigate("/loginPage");
  }, []);

  return <MainContainer>로그인 처리 중...</MainContainer>;
};
