import { Facebook, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [category, setCategory] = useState();
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
    <div className="bg-[#18181B] h-[528px] flex flex-col ">
      <div className="bg-[#18181B] w-[100vw] flex  ">
        {Array.from(Array(7)).map((_: any, index: any) => {
          return (
            <div key={index} className="w-[100vw] ">
              <h1 className="bg-red-600 h-[79px]  items-center m-auto justify-center mt-[60px] text-white font-semibold text-2xl flex flex-wrap ">
                fresh fast delivered
              </h1>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between w-[1264px] h-[228px] m-auto text-white items-center    ">
        <div>
          <img src="./footerlogo.svg" alt="" />
        </div>
        <div>
          <h1>NOMNOM</h1>
          <p>Home</p>
          <p>Contact us</p>
          <p> Delivery zone</p>
          <p> Delivery zone</p>
        </div>
        <div>
          {category?.map((name: string, index: number) => {
            return (
              <div key={index} className="flex">
                <div>
                  <p>{name.categoryName}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h1>Follow us</h1>
          <div className="flex gap-2">
            <Facebook />
            <Instagram />
          </div>
        </div>
      </div>

      <div className="flex  w-[1264px]  m-auto justify-center gap-[20px] border-t-[0.5px]  ">
        <div className="flex gap-[20px]">
          <p>Copy right 2024 © Nomnom LLC</p>
          <p>Privacy policy</p>
          <p>Terms and conditoin</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </div>
  );
}
