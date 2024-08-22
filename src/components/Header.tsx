"use client";
import Image from "next/image";
import customImageLoader from "./customImageLoader";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter()
  return (
    <div className="flex  justify-between items-center bg-white shadow-lg px-8 py-2 fixed top-0 left-0 w-full z-50">
      <Image
        src="https://cartedo.com/assets/images/home-eight/logo.svg"
        alt="logo"
        width={150}
        height={70}
        loader={customImageLoader}
        onClick={()=>{
          router.push("/")
        }}
        className="cursor-pointer"
      />
      <div className="flex items-center">
        <Image
          src="/assets/magnifier.png"
          alt="search"
          width={24}
          height={24}
          loader={customImageLoader}
          className=" w-6 h-6"
        />
        <Image
          src="/assets/bell.png"
          alt="search"
          width={24}
          height={24}
          loader={customImageLoader}
          className="ml-4 w-6 h-6"
        />
        <Image
          src="/assets/woman.png"
          alt="search"
          width={32}
          height={32}
          loader={customImageLoader}
          className="ml-4"
        />
      </div>
    </div>
  );
};
export default Header;
