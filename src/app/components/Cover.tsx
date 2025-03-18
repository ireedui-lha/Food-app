"use client";

import { type } from "@/types";
import { useEffect, useState } from "react";

export default function Cover() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const data = await fetch("http://localhost:4000/food");
      const jsonData = await data.json();
      console.log(jsonData);
      setCategory(jsonData.getfood);
      console.log("category", jsonData);
    };
    getCategory();
  }, []);

  return (
    <div className="w-[100vw] justify-center ">
      <img src="/cover.svg" alt="" className="w-[100vw] rounded-none" />
      <div className="bg-[#404040]">
        <h1 className="text-2xl">Categories</h1>
        <div className="flex gap-10 justify-center  ">
          {category?.map((category: type, index: number) => {
            return (
              <div key={index} className="bg-white  rounded-3xl ">
                {category.categoryName}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
