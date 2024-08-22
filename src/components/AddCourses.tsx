"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import API from "../app/api";
import InputBox from "./InputBox";
import ModalLayout from "./Modal";

enum FormItem {
  Img = "image",
  Title = "title",
  Dis = "description",
}

const AddCourses = () => {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {

      const response = await API.user.AddCourse(formData);
      if (!API.validators.checkSuccessCode(response)) {
        console.error("Technical error");
      } else {
        alert("Form Submitted Successfully");
        setFormData({
          title: "",
          image: "",
          description: "",
        });
        setOpenForm(false)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleOnChangeOfInp = (e: ChangeEvent<HTMLInputElement>) => {
    const { id,value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    // }
  };

  return (
    <div className="p-4 md:p-8 bg-white w-full md:w-[30%] lg:w-[20%] h-[93vh] text-black border border-r">
      <button onClick={() => setOpenForm(!openForm)}>+ Add Items</button>
      {openForm && (
        <ModalLayout setCloseModal={setOpenForm}>
          <div className="mt-8 w-[300px] md:w-[500px]">
            <InputBox
              id={FormItem.Title}
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={handleOnChangeOfInp}
            />
            <InputBox
              id={FormItem.Img}
              type="text"
              placeholder="Image"
              value={formData.image}
              onChange={handleOnChangeOfInp}
            />
            <InputBox
              id={FormItem.Dis}
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={handleOnChangeOfInp}
            />
            <div className="w-[200px] mx-auto">
            <button onClick={handleSubmit} className="bg-blue-500 px-4 py-2  text-center text-white w-full">Submit</button>
            </div>
            
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default AddCourses;
