"use client";
import { useParams } from "next/navigation";
import API from "../../api";
import Image from "next/image";
import { useEffect, useState } from "react";
import customImageLoader from "@/components/customImageLoader";
import { ButtonProvider, useButtonContext } from "@/Context";

// Define type for course details
interface CourseDetailsType {
  title: string;
  description: string;
  category: string;
  image: string;
  id: string;
}

const CourseDetails = () => {
  const [details, setDetails] = useState<CourseDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const courseId = params.id ? (params.id as string) : null;
  const { visibleButtonIndices, setVisibleButtonIndices } = useButtonContext();
  const callDetailsApi = async (courseId: string) => {
    try {
      const coursesDetails = await API.user.CourseDetails({ id: courseId });
      if (!API.validators.checkSuccessCode(coursesDetails)) {
        throw new Error("Technical error");
      }
      setDetails(coursesDetails.data);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show a notification to the user)
    } finally {
      setLoading(false);
    }
  };

  const enrollBtnClick = (id: string) => {
    setVisibleButtonIndices(id);
  };

  useEffect(() => {
    if (courseId) {
      callDetailsApi(courseId);
    }
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>; // Simple loading state
  }

  if (!details) {
    return <div>No details found</div>; // Handle case where no details are available
  }

  return (
    <div className="px-4 pt-4 flex justify-between text-black w-full md:w-[70%] lg:w-[80%]">
      <div className="relative w-[50%] pt-[40px] rounded">
        <Image
          src={details?.image}
          alt="card_img"
          width={200}
          height={200}
          className="w-full h-[74vh] shadow-lg rounded"
          loader={customImageLoader}
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
          <h1 className="text-white w-[60%] text-2xl text-center">
            {details?.category}
          </h1>
        </div>
      </div>
      <div className="w-[48%]">
        <div className="shadow-2xl h-[70vh] overflow-scroll p-8">
          <h2 className="text-xl font-bold">{details?.title}</h2>
          <h2 className="text-base opacity-55 mt-4">{details?.description}</h2>
        </div>
        {visibleButtonIndices.includes(details?.id) ? (
          <button className="bg-green-500 px-2 rounded w-full text-white mt-4 h-[50px] text-left">
            Already Enrolled
          </button>
        ) : (
          <button
            className="bg-blue-600 px-2 rounded w-full text-white mt-4 h-[50px] text-left"
            onClick={() => enrollBtnClick(details.id)}
          >
            Enroll
          </button>
        )}
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <ButtonProvider>
      <CourseDetails />
    </ButtonProvider>
  );
}
