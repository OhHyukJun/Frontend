import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { salesState } from "../../Atom/sales";

export const ImagesPick = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [sales, setSales] = useRecoilState(salesState);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const selectedImages: string[] = [];
    const reader = new FileReader();

    if (!files || files.length === 0) return;

    if (files.length > 3) {
      alert("이미지는 최대 10장까지 업로드 가능합니다.");
      return;
    }

    reader.onload = () => {
      if (reader.result) {
        selectedImages.push(reader.result as string);

        if (selectedImages.length === files.length) {
          setSales((prevSales) => ({
            ...prevSales,
            detailImage: selectedImages,
          }));

          setPreviewImages(selectedImages);
        } else {
          readImage(files[selectedImages.length]);
        }
      }
    };

    const readImage = (file: File) => {
      reader.readAsDataURL(file);
    };

    readImage(files[0]);
  };

  const handleChangeImageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <>
      <span className="font-bold text-xl ">상세 이미지</span>
      <div className="flex h-[25vh] overflow-x-auto bg-gray-200 justify-center items-center mt-4">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          multiple
          style={{ display: "none" }}
        />
        {previewImages.length > 0 ? (
          <div style={{ display: "flex" }}>
            {previewImages.map((image, index) => (
              <div className="flex w-[22vh] aspect-square justify-center items-center">
                <img
                  key={index}
                  src={image}
                  className="w-[20vh] image-contain"
                  alt={`mainImage-${index}`}
                  onClick={handleChangeImageClick}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img
              src={require("../../public/images/camera.png")}
              className="w-16 h-16"
              alt="camera"
              onClick={handleChangeImageClick}
            />
            <span>이미지는 최대 10장까지 업로드 가능합니다.</span>
          </div>
        )}
      </div>
    </>
  );
};
