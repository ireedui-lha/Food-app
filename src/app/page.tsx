"use client";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cover from "./components/Cover";
import { useState } from "react";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const Nextclick = () => {
    setCurrent(current - 1);
  };
  return (
    <div>
      <Header />
      <Cover />
      <Footer />
    </div>
  );
}
