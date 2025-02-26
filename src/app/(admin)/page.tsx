"use client";
import { Anybody } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);
  const PRESET_NAME = "food-delivery";
  const CLOUDINARY_NAME = "duivg9iia";

  const handleFile = (e: any) => {
    const newfile = e.target.files[0];
    if (newfile) {
      setFile(newfile);
    }
  };
  const handleupload = async () => {
    if (!file) {
      alert("please");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET_NAME);
    formData.append("api_key", CLOUDINARY_NAME);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImage(data.secure_url);
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("Failed");
    }
  };
  console.log(file);
  return (
    <div className="w-[412px] h-[160px] justify-center items-center bg-blue-600 ">
      <div className="flex justify-center m-auto items-center flex-col ">
        <div className="border-2 border-dashed w-[416px] h-[180px] rounded-md flex flex-col items-center justify-center bg-[#F9FAFB] mb-4">
          {file ? (
            <p className="text-gray-600"></p>
          ) : (
            <>
              <label
                htmlFor="fileInput"
                className="text-blue-500 cursor-pointer"
              >
                <input type="file" onChange={handleFile} />
              </label>
            </>
          )}

          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFile}
          />
          <img src={file} alt="" />
        </div>
        <button onClick={handleupload} className="bg-red-500">
          upload
        </button>
        {image && (
          <div>
            <Image alt="uploaded" src={image} width={400} height={400} />
          </div>
        )}{" "}
      </div>
    </div>
  );
}
