import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { salesState } from "../../Atom/sales";

export const ImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [sales, setSales] = useRecoilState(salesState);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader: FileReader | null = new FileReader();
    if (!file) return;

    try {
      // 이미지 미리보기
      reader.onload = () => {
        if (reader.result) {
          setSales((prevSales) => ({
            ...prevSales,
            main_image: reader.result as string,
          }));
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error image load:", error);
    }
  };

  const handleChangeImageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <>
      <span className="font-bold text-xl">대표 이미지</span>
      <div className="flex h-[20vh] aspect-square bg-gray-200 justify-center items-center">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        {sales.main_image ? (
          <img
            src={sales.main_image}
            className="w-full h-full image-contain"
            alt="main_image"
            onClick={handleChangeImageClick}
          />
        ) : (
          <img
            src={require("../../public/images/camera.png")}
            className="w-16 h-16"
            alt="camera"
            onClick={handleChangeImageClick}
          />
        )}
      </div>
    </>
  );
};
