"use client";

import { useEffect, useState } from "react";
import customImageLoader from "./customImageLoader";
import { useRouter } from "next/navigation";
import API from "../app/api";
import Image from "next/image";
import { useButtonContext } from "@/Context";

const AllCourses = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropDown, setDropDown] = useState("");
  const { visibleButtonIndices, setVisibleButtonIndices } = useButtonContext();
  const fetchData = async () => {
    const coursesGet = await API.user.AllCourses();
    if (!API.validators.checkSuccessCode(coursesGet)) {
      return console.error("Technical error");
    }
    setItems(coursesGet.data);
    setLoading(false);
  };
  const clickOnList = (id: string) => {
    router.push(`/course/${id}`);
  };
  const handleThreeDotsClick = (id: string) => {
    setVisibleButtonIndices(id);
    setDropDown('')
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!items) {
    return <div>No details found</div>; // Handle case where no details are available
  }

  return (
    <div className="bg-gray-200  w-full md:w-[70%] lg:w-[80%] text-black min-h-[100vh] pb-8">
      <div className="w-full bg-white px-4 md:px-8 py-4">
        <h1 className="text-3xl">My Items</h1>
      </div>

      {loading ? (
        <h2 className="flex min-h-[100vh] justify-center items-center ">
          Loading...
        </h2>
      ) : (
        <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4  px-4 md:px-8 mt-8">
          {items?.map((item: any, index: number) => {
            return (
              <div
                className="bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] relative p-4"
                key={index}
              >
                <Image
                  src={item?.image}
                  alt="card_img"
                  width={200}
                  height={160}
                  className="w-full h-[160px] xl:h-[200px] shadow-lg p-4"
                  loader={customImageLoader}
                />

                <div className="flex justify-between items-center mt-2 relative">
                  <p
                    className="text-lg text-black cursor-pointer"
                    onClick={() => clickOnList(item?.id)}
                  >
                    {item?.category}
                  </p>
                  <p
                    className="text-xl text-black cursor-pointer "
                    onClick={() => setDropDown(item?.id)}
                  >
                    ...
                  </p>
                  {dropDown === item.id && (
                    <div className="absolute top-8 right-6 p-2 bg-white shadow-2xl border z-40">
                      <button
                        className="bg-blue-200 px-2 rounded text-blue-600 w-[200px] text-left h-[32px]"
                        onClick={() => handleThreeDotsClick(item?.id)}
                      >
                        Enroll
                      </button>
                    </div>
                  )}
                </div>
                {visibleButtonIndices?.includes(item?.id) && (
                  <button className="absolute top-8 left-4 bg-red-600 px-2 rounded">
                    Enrolled
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
