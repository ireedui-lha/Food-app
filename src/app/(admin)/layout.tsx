import Link from "next/link";
import { ReactNode } from "react";

import { Headers } from "./header";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutDashboardIcon, LayoutPanelLeft, Truck } from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex   ">
      <div className=" h-[1204px] w-[10vw]">
        <img src="/footerlogo.svg" alt="" />
        <Link href={"/foodmenu"}>
          <ToggleGroup type="single">
            {" "}
            <ToggleGroupItem className="w-[165px]" value="bold">
              <LayoutDashboardIcon />
              foodmenu
            </ToggleGroupItem>
          </ToggleGroup>
        </Link>
        <Link href={"/orders"}>
          {/* <Button className="w-[165px] h-[40px]">Orders</Button> */}
          <ToggleGroup type="single">
            {" "}
            <ToggleGroupItem className="w-[165px]" value="aria">
              <Truck />
              orders
            </ToggleGroupItem>
          </ToggleGroup>
        </Link>
      </div>
      <div className="flex flex-col">
        {" "}
        <Headers />
        {children}
      </div>
    </div>
  );
}
