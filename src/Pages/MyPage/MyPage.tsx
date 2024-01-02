import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { userState } from "../../Atom/user";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axios";
import { SERVER } from "../../config";

export const MyPage = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const [img, setImg] = useState("");

  const handleonClickEditProfile = () => {
    navigate("/mypage-edit");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get("/v1/user/me");
      setUser(res.data);
      console.log(res.data);
      const encodedImageFileName = encodeURIComponent(res.data.profile);
      setImg(SERVER.SERVER + `images/${encodedImageFileName}`);
    };
    fetchUser();
  }, []);

  return (
    <Container>
      <div className="flex w-full h-full justify-center items-center flex-col">
        <div className="mt-20 flex items-start w-[70vw]">
          <span className="font-black text-[3.5rem]">마이페이지</span>
        </div>
        <div className="flex justify-between flex-col w-[70vw] mt-2 p-10 bg-[#9EEBA5] rounded-3xl">
          <div className="flex w-full h-[15vh] justify-center items-center">
            <img
              src={SERVER.SERVER + img}
              alt="profile"
              className="h-[13vh] aspect-square rounded-full"
            />
          </div>
          <div className="flex flex-row w-full h-[15%] justify-center items-center my-10">
            <label className="flex text-xl font-semibold w-32">성함</label>
            <span className="items-center ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3 ">
              {user.name}
            </span>
          </div>
          <div className="flex flex-row w-full h-[15%] justify-center items-center my-10">
            <label className="flex text-xl font-semibold w-32">연락처</label>
            <span className="items-center ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3 ">
              {user.phone}
            </span>
          </div>
          <div className="flex flex-row w-full h-[15%] justify-center items-center my-10 ">
            <label className="flex text-xl font-semibold w-32">닉네임</label>
            <span className="items-center ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3 ">
              {user.email}
            </span>
          </div>
          {user.role === "seller" && (
            <div className="flex flex-row w-full h-[15%] justify-center items-center my-10 ">
              <label className="flex text-xl font-semibold w-32">
                마켓 소개
              </label>
              <span className="items-center ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3">
                {`${user.name}의 마켓입니다.`}
              </span>
            </div>
          )}
          <div className="flex flex-row w-full justify-center items-center my-10">
            <label className="flex text-xl font-semibold w-32 px-3">주소</label>
            <span className="items-center ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3 ">
              {user.address}
            </span>
          </div>
          <div className="flex flex-row w-full justify-center items-center my-10">
            <label className="flex text-xl font-semibold w-32">상세 주소</label>
            <span className="items-center ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3 ">
              {user.detailAddress}
            </span>
          </div>
          <div className="flex w-full justify-center">
            <Button
              variant="primary"
              className="h-10 rounded-md outline-none border-none bg-mint text-black w-32"
              onClick={handleonClickEditProfile}
            >
              수정하기
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
