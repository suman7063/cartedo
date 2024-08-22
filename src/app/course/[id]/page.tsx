"use client";
import { useParams } from "next/navigation";
import API from "../../api";
import Image from "next/image";
import { useEffect, useState } from "react";
import customImageLoader from "@/components/customImageLoader";
import { useButtonContext } from "@/Context";
const CourseDetails = () => {
  const [details, setDetails] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const courseId = params.id ? (params.id as string) : null;

  const callDetailsApi = async (courseId: string) => {
    const { visibleButtonIndices, setVisibleButtonIndices } = useButtonContext();
    const coursesDetails = await API.user.CourseDetails({ id: courseId });
    if (!API.validators.checkSuccessCode(coursesDetails)) {
      return console.error("Technical error");
    }
    setDetails(coursesDetails.data);
    setLoading(false);
  };
  useEffect(() => {
    if (courseId) {
      callDetailsApi(courseId);
    }
  }, [courseId]);
  console.log(details, "details");

  return (
    <div className="mt-16 px-4 max-w-[1300px] mx-auto">
    <div className="relative w-[50%] pt-[40px] rounded">
      <Image
        src={details?.image}
        alt="card_img"
        width={200}
        height={160}
        className="w-full h-[85vh] shadow-lg rounded"
        loader={customImageLoader}
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
        <h1 className="text-white w-[60%] text-2xl">{details.title}</h1>
      </div>
    </div>
    </div>
  );
};
export default CourseDetails;
