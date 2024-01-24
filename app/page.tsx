import PAINTING_PAGE from "@/clientComponents/painting";
import React from "react";

const HOME = () => {
  return (
    <>
      <div className="relative w-full min-h-screen flex justify-center items-center ">
        <PAINTING_PAGE />
        <div className="absolute  mix-blend-difference ">
          <span className="text-[26px] sm:text-[32px] font-black uppercase text-white mix-blend-difference cursor-default px-5">
            we create beauty
          </span>
        </div>
      </div>
    </>
  );
};

export default HOME;
