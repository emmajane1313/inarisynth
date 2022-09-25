import React, { FunctionComponent, useEffect } from "react";
import { ImageSequenceProps } from "../../../types/stablediffusion/sdtypes.types";
import { IoMdExpand, IoMdDownload } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";

export const ImageSequence: FunctionComponent<ImageSequenceProps> = ({
  promptImages,
  onImageModalOpen,
  imageSelect,
  onImageClick,
  onReSynth,
  setStrength,
  strength,
  loading,
  downloadImage,
  init,
}): JSX.Element => {
  if (loading) {
    return (
      <div className="grid top-48 grid-cols-4 align-center gap-4 w-full absolute h-fit left-[10%]">
        <div className="animate-spin h-5 w-5 relative top-24">
          <AiOutlineLoading color="white" />
        </div>
        <div className="animate-spin h-5 w-5 relative top-24">
          <AiOutlineLoading color="white" />
        </div>
        <div className="animate-spin h-5 w-5 relative top-24">
          <AiOutlineLoading color="white" />
        </div>
        <div className="animate-spin h-5 w-5 relative top-24">
          <AiOutlineLoading color="white" />
        </div>
      </div>
    );
  }

  let promptImagesToShow: any;
  if (sessionStorage.getItem("images")) {
    promptImagesToShow = JSON.parse(sessionStorage.getItem("images"));
  } else {
    promptImagesToShow = promptImages;
  }

  return (
    <div>
      <div className="grid top-52 grid-cols-2 md:grid-cols-4 align-center gap-4 w-full absolute max-h-fit font-sourceReg justify-items-center">
        {promptImagesToShow?.map((image: any, index: any) => {
          return (
            <div
              key={index}
              id={image}
              className="w-full h-fit m-2 sm:m-0 cursor-pointer relative"
            >
              <img
                src={image}
                className={`active:border-4 active:border-themeBlue block w-fit tablet:w-full h-fit ${
                  imageSelect.includes(image) && "border-4 border-themeBlue"
                }`}
                onClick={() => onImageClick(image)}
              />
              <div className="group absolute bottom-0 left-0 w-full h-2/3">
                <div className="bg-offBlack bg-opacity-70 w-full h-full align-center justify-center flex-col invisible flex group-hover:visible">
                  <button
                    className={`absolute bg-grad2 rounded-lg w-3/4 text-offBlack hover:opacity-80 focus:bg-grad3 active:bg-grad3 text-xs top-2 left-5 && ${
                      init === image && "bg-grad3"
                    }`}
                    onClick={() => onReSynth(image)}
                  >
                    ADD AS INIT TO RESYNTH
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step=".1"
                    id="strength"
                    defaultValue="0.5"
                    name="strength"
                    className="absolute left-3 w-5/6"
                    onChange={(e: any) => setStrength(e.target.value)}
                  />
                  {strength ? (
                    <div className="text-white top-24 absolute text-sm w-full whitespace-nowrap">
                      Strength: {strength}
                    </div>
                  ) : (
                    <div className="text-white top-24 absolute text-sm w-full whitespace-nowrap">
                      Strength: 0.5
                    </div>
                  )}
                  <IoMdDownload
                    className="relative top-[4.5rem] left-1"
                    color="white"
                    onClick={() => downloadImage(image)}
                  />
                  <IoMdExpand
                    className="relative top-[3.5rem] left-6"
                    onClick={() => onImageModalOpen(image)}
                    color="white"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
