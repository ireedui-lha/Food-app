"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import FristPage from "./FirstPage";
import SecondPage from "./SecondPage";
export default function Signup() {
  const [ChangePage, setChangePage] = useState<number>(0);
  const FormStep = [FristPage, SecondPage][ChangePage];
  const next = () => {
    setChangePage(ChangePage + 1);
  };
  return (
    <AnimatePresence initial={false}>
      <motion.div
        initial={{ opacity: 0, x: 80, scale: 1, y: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 1 }}
        className=" w-[480px] h-[655px] bg-[#FFF] rounded-[8px] p-[32px] flex flex-col justify-between"
      >
        <div>
          <FormStep next={next} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
