import Link from "next/link";
import { ReactNode } from "react";
import Header from "../components/Header";
import Headers from "./header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex   ">
      <div className="bg-blue-400 h-[1204px] w-[10vw]">
        <img src="/footerlogo.svg" alt="" />
        <Link href={"/foodmenu"}>
          <button className="w-[165px] h-[40px]">Food menu</button>
        </Link>
        <Link href={"/orders"}>
          <button className="w-[165px] h-[40px]">Orders</button>
        </Link>
      </div>
      <div className="flex flex-col">
        <Headers />
        {children}
      </div>
    </div>
  );
}
