import React, { useEffect, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "../../Atom/user";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import axiosInstance from "../../API/axios";
export const MypageEdit = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState("");
  const formData = new FormData();
  const [file, setFile] = useState<File | null>(null);

  const handleonClickEditProfile = async () => {
    if (user.address === "") {
      alert("주소를 입력해주세요");
      return;
    }
    if (user.detailAddress === "") {
      alert("상세 주소를 입력해주세요");
      return;
    }

    formData.append("name", user.name);
    formData.append("phone", user.phone);
    formData.append("address", user.address);
    formData.append("detailAddress", user.detailAddress);
    if (user.certificate) formData.append("certificate", user.certificate);
    if (file) formData.append("profile", file);

    const response = await axiosInstance.patch("/v1/user/update", formData);

    navigate(-1);
  };

  const handelClickSecession = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=be84e5c954c05f4d77886292167f2621&redirect_uri=https://115.85.181.92/login/oauth2/kakao-unlink";
  };

  const handleChangeImageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    try {
      // 이미지 미리보기
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
      if (file) {
        reader.readAsDataURL(file);
        formData.append("profile", file);
        setFile(file);
      }
    } catch (error) {
      console.error("Error image load:", error);
    }
  };

  const handleSearchAddr = {
    clickButton: () => {
      setOpenPostcode(!openPostcode);
    },

    selectAddress: (data: any) => {
      setUser({ ...user, address: data.address });
      setOpenPostcode(false);
    },
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Container>
      <div className="flex w-full h-full justify-center items-center flex-col">
        <div className="mt-20 flex items-start w-[70vw]">
          <span className="font-black text-[3.5rem]">마이페이지</span>
        </div>
        <div className="flex justify-between flex-col w-[70vw] mt-2 p-10 bg-[#9EEBA5] rounded-3xl">
          <Button
            variant="primary"
            className="ml-10 h-10 rounded-md outline-none border-none bg-mint text-black w-32"
            onClick={handelClickSecession}
          >
            회원탈퇴
          </Button>
          <div className="flex w-full h-[18vh] justify-center items-center flex-col">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <img
              src={image}
              alt="profile"
              className="h-[13vh] aspect-square rounded-full"
            />
            <Button
              variant="primary"
              className="h-10 rounded-md outline-none border-none bg-mint text-black w-32 mt-3"
              onClick={handleChangeImageClick}
            >
              사진 수정하기
            </Button>
          </div>
          <div className="flex flex-row w-full h-[15%] justify-center items-center my-10">
            <label className="flex text-xl font-semibold w-32">성함</label>
            <input
              type="text"
              value={user.name}
              className=" ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3"
              disabled={true}
            />
          </div>
          <div className="flex flex-row w-full h-[15%] justify-center items-center my-10">
            <label className="flex text-xl font-semibold w-32">연락처</label>
            <input
              type="tel"
              value={user.phone}
              className=" ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3"
              disabled={true}
            />
          </div>
          {user.role === "seller" && (
            <div className="flex flex-row w-full h-[15%] justify-center items-center my-10 ">
              <label className="flex text-xl font-semibold w-32">
                마켓 소개
              </label>
              <input
                name="marketInfo"
                value={`${user.name} + "의 마켓입니다.`}
                onChange={handleInput}
                type="text"
                disabled={true}
                className=" ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3"
              />
            </div>
          )}
          <div
            className="flex flex-col w-full justify-center items-end"
            onClick={handleSearchAddr.clickButton}
          >
            <Button
              variant="primary"
              className=" h-10 rounded-md outline-none border-none  bg-mint text-black  w-32 mr-20"
            >
              주소 검색
            </Button>
            {openPostcode && (
              <DaumPostcode
                onComplete={handleSearchAddr.selectAddress}
                autoClose={false}
                defaultQuery="판교역로 235"
                className="flex w-[80%]"
              />
            )}
          </div>
          <div className="flex flex-row w-full justify-center items-center my-10">
            <label className="flex text-xl font-semibold w-32 px-3">주소</label>
            <input
              type="text"
              value={user.address}
              className=" ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3 "
            ></input>
          </div>
          <div className="flex flex-row w-full justify-center items-center my-10">
            <label className="flex text-xl font-semibold w-32">상세 주소</label>
            <input
              name="detailAddress"
              type="text"
              onChange={handleInput}
              className="ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3"
              value={user.detailAddress}
            />
          </div>
          <div className="flex w-full justify-center">
            <Button
              variant="primary"
              className="h-10 rounded-md outline-none border-none bg-mint text-black w-32"
              onClick={handleonClickEditProfile}
            >
              수정완료
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
