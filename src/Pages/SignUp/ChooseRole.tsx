import { sign } from "crypto";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { signupState } from "../../Atom/signup";

export const ChooseRole = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSignUp = (event: any) => {
    const role = event.currentTarget.id;
    console.log("회원가입");
    navigate(
      `/signup/${role}?access_token=${searchParams.get("access_token")}`
    );
  };

  return (
    <Container>
      <div className="flex w-full h-full justify-center items-center flex-col">
        <div className="mt-20 flex items-start w-[60vw]">
          <span className="font-black text-[3.5rem]">회원가입</span>
        </div>
        <div className="mt-10 flex justify-between w-[60vw] h-[60vh] bg-[#9EEBA5] px-5 py-10">
          <div
            id="seller"
            className="flex w-[26vw] h-full p-24 bg-white rounded-2xl flex-col items-center justify-center"
            onClick={handleSignUp}
          >
            <img
              src={require("../../public/images/sellerImage.png")}
              alt="seller"
              className="h-2/3"
            />
            <span className="font-semibold text-[2.5rem] mt-5">판매자</span>
          </div>
          <div
            id="buyer"
            className="flex w-[26vw] h-full p-24 bg-white rounded-2xl flex-col items-center justify-center"
            onClick={handleSignUp}
          >
            <img
              src={require("../../public/images/customerImage.png")}
              alt="buyer"
              className="h-2/3"
            />
            <span className="font-semibold text-[2.5rem] mt-5">구매자</span>
          </div>
        </div>
      </div>
    </Container>
  );
};
