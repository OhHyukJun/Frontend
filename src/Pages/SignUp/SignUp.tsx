import React, { useEffect, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { imageFileState, signupState } from "../../Atom/signup";
import axios from "axios";
import { SERVER } from "../../config";
import { loginState } from "../../Atom/user";
import { ImageUpload } from "./ImageUpload";

export const SignUp = () => {
  const setLogin = useSetRecoilState(loginState);
  const naviagate = useNavigate();
  const param = useParams();
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [signup, setSignup] = useRecoilState(signupState);
  const [searchParams] = useSearchParams();
  const imageFile = useRecoilValue(imageFileState);
  const formData = new FormData();

  useEffect(() => {
    if (!param.role) return;
    setSignup({ ...signup, role: param.role });
  }, []);

  const handleSearchAddr = {
    clickButton: () => {
      setOpenPostcode(!openPostcode);
    },

    selectAddress: (data: any) => {
      setSignup({ ...signup, address: data.address });
      setOpenPostcode(false);
    },
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    if (signup.name === "") {
      alert("이름을 입력해주세요");
      return;
    }
    if (signup.phone === "") {
      alert("번호를 입력해주세요");
      return;
    }
    if (signup.address === "") {
      alert("주소를 입력해주세요");
      return;
    }
    if (signup.detailAddress === "") {
      alert("상세 주소를 입력해주세요");
      return;
    }
    if (signup.role === "seller" && imageFile === null) {
      alert("사업자 등록증을 등록해주세요");
      return;
    }

    formData.append("name", signup.name);
    formData.append("phone", signup.phone);
    formData.append("address", signup.address);
    formData.append("detailAddress", signup.detailAddress);
    formData.append("role", signup.role);
    if (imageFile) {
      formData.append("certificate", imageFile);
    }

    const res = await axios.post(
      SERVER.SERVER_API +
        `/v1/user/add?access_token=${searchParams.get("access_token")}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res.data);
    naviagate("/");
  };

  return (
    <Container>
      <div className="flex w-full h-full justify-center items-center flex-col">
        <div className="mt-20 flex items-start w-[70vw]">
          <span className="font-black text-[3.5rem]">회원가입</span>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="flex justify-between flex-col w-[70vw] mt-2 p-10 bg-[#9EEBA5] rounded-3xl">
            <div className="flex flex-row w-full h-[15%] justify-center items-center my-10">
              <label className="flex text-xl font-semibold w-32">성함</label>
              <input
                type="text"
                name="name"
                value={signup.name}
                className=" ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3"
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-row w-full h-[15%] justify-center items-center my-10">
              <label className="flex text-xl font-semibold w-32">연락처</label>
              <input
                type="tel"
                name="phone"
                value={signup.phone}
                className=" ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3"
                onChange={handleInput}
              />
            </div>
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
            <div className="flex flex-col w-full">
              {signup.address !== "" ? (
                <div className="flex flex-row w-full justify-center items-center my-10">
                  <label className="flex text-xl font-semibold w-32 px-3">
                    주소
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={signup.address}
                    className=" ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3 "
                    disabled={true}
                  ></input>
                </div>
              ) : null}
              <div className="flex flex-row w-full justify-center items-center my-10">
                <label className="flex text-xl font-semibold w-32">
                  상세 주소
                </label>
                <input
                  name="detailAddress"
                  type="text"
                  value={signup.detailAddress}
                  className="ml-10 flex w-[80%] h-10 rounded-md outline-none border-none px-3"
                  onChange={handleInput}
                />
              </div>
            </div>
            {param.role === "seller" ? (
              <div className="flex flex-row w-full h-[15%] justify-center items-center my-10">
                <label className="flex text-xl font-semibold w-320">
                  사업자 등록증
                </label>
                <div className=" ml-10 flex w-[80%] rounded-md outline-none border-none">
                  <ImageUpload />
                </div>
              </div>
            ) : null}
            <div className="flex w-full justify-center">
              <Button
                type="submit"
                variant="primary"
                className=" h-10 rounded-md outline-none border-none bg-mint text-black w-32"
              >
                회원가입
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};
