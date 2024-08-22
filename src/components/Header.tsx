"use client"
import Image from "next/image"
import customImageLoader from "./customImageLoader"

const Header = ()=>{

return(
  <div className="flex  justify-between items-center bg-white shadow-lg px-8 py-2 fixed top-0 left-0 w-full z-50">
    <div>
      <Image src="https://cartedo.com/assets/images/home-eight/logo.svg" alt="logo" width={150} height={70} loader={customImageLoader}/>
    </div>
  </div>
)
}
export default Header