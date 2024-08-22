import React, { FC, HTMLAttributes,useRef,useEffect } from "react";

interface CustomDivProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  contentClasses?: string;
  setCloseModal: any;
  notShowCrossBtn?: boolean;
}

const ModalLayout: FC<CustomDivProps> = ({
  children,
  className,
  contentClasses,
  setCloseModal,
  notShowCrossBtn,
  ...props
}) => {

  const modalRef = useRef<HTMLDivElement>(null);
  const baseClassesForMain =
    "w-full fixed bg-black h-full z-[52] opacity-75 top-0 left-0";

  const finalBaseClassesForMain = `${baseClassesForMain} ${className ?? ""}`;
  const modalContentClasses =
    "bg-white p-2 md:p-4 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] relative";
  const modalContentClassesFinal = `${modalContentClasses} ${
    contentClasses ?? ""
  }`;

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node)
    ) {
      setCloseModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <>
      <div className={finalBaseClassesForMain} {...props}/>
      <div className="px-2 md:px-8 flex justify-center items-center fixed top-0 left-0 w-full h-full m-auto z-[53]"  >
        <div className={modalContentClassesFinal} ref={modalRef}>
          {!notShowCrossBtn &&
          <div className="flex justify-end w-full absolute">
            <button
              onClick={() => {
                setCloseModal(false);
              }}
              type="button"
              className="text-white cursor-pointer bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-3 py-1 text-center relative top-[-14px] left-[0px] md:top-[-32px] md:left-[0px] w-[32px] h-[32px]"
            >
              X
            </button>
          </div>
}
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalLayout;
