import React, { FC, HTMLAttributes, ChangeEvent } from "react";

interface InpProps extends HTMLAttributes<HTMLInputElement> {
  type?: string; // Changed to optional
  id: string;
  placeholder?: string;
  value?: string | number; // Specify the type for value
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // Explicitly type the onChange handler
}

const InputBox: FC<InpProps> = ({
  type = "text",
  id,
  placeholder = "Enter Text Please",
  value,
  onChange,
  ...props
}) => {
  return (
    <div className="rounded bg-white border mb-3 md:mb-4 flex justify-between items-center">
      <input
        type={type}
        id={id}
        value={type === "file" ? undefined : value} // Handle file inputs correctly
        className="p-2 w-full text-sm md:text-lg focus:outline-none rounded bg-white border-gray-200 mb-"
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default InputBox;
