"use client"
import AllCourses from "../components/AllCourses";
import AddCourses from "../components/AddCourses";
import { ButtonProvider } from "../Context";

const Page = () => {
  return (
    <ButtonProvider>
    <div className="md:flex pt-[51px] max-w-[1300px] mx-auto">
      <AddCourses/>
      <AllCourses/>
    </div>
    </ButtonProvider>
  );
};

export default Page;
