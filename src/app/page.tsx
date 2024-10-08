"use client";
import AllCourses from "../components/AllCourses";
import { ButtonProvider } from "../Context";

const Page = () => {
  return (
    <ButtonProvider>
      <AllCourses />
    </ButtonProvider>
  );
};

export default Page;
