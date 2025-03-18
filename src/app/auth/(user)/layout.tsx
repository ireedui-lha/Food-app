import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Userlayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="w-[1440px] h-[1024px] m-auto flex gap-[24px] justify-center items-center">
      <div>{children}</div>
      <div>
        <img src="/hurgelt.svg" alt="" />
      </div>
    </div>
  );
}
