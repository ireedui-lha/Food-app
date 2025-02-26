import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-[#18181B] w-[100vw] h-[68px] flex justify-between">
      <div className="flex w-[1440px] justify-between m-auto">
        <img src="./logo.svg" alt="" />
        <div className="flex gap-2 w-[152px] h-[36px]">
          <Link href={"./signup"}>
            <button className="bg-white w-[80px] rounded-2xl">signup</button>
          </Link>
          <Link href={"./login"}>
            <button className="bg-[red] w-[80px] rounded-2xl">login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
