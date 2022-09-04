import React from "react";

export const LensPost = (): JSX.Element => {
  return (
    <div className="relative left-[50%] bg-offWhite w-[40%] h-[50%] rounded-lg">
      <div className="bg-white rounded-t-lg border-solid border-2 left-[10%] top-[5%] border-offBlack relative  w-[80%] h-[75%]"></div>
      <button className="top-[7%] left-[29.5%] relative p-2 rounded-b-lg text-distro text-white text-base bg-offBlack">
        POST
      </button>
    </div>
  );
};
