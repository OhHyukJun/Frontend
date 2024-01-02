import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axiosInstance from "../API/axios";
import { loginState, userState } from "../Atom/user";

export const DeleteSuccess = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useRecoilState(loginState);

  const logout = async () => {
    setLoggedIn(false);
    navigate("/");
    console.log(await axiosInstance.get("/v1/logout"));
    window.location.reload();
  };

  useEffect(() => {
    logout();
    console.log("회원탈퇴..");
  }, []);

  return <div>회원탈퇴</div>;
};
