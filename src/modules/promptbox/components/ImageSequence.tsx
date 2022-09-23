import React, { FunctionComponent } from "react";
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
  init
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

  return (
    <div>
      <div className="grid top-52 grid-cols-4 align-center gap-4 w-fit absolute max-h-fit font-sourceReg">
        {promptImages?.map((image, index) => {
          return (
            <div
              key={index}
              id={image}
              className="w-full h-fit cursor-pointer relative"
            >
              <img
                src={image}
                className={`active:border-4 active:border-themeBlue block w-full h-fit ${
                  imageSelect.includes(image) && "border-4 border-themeBlue"
                }`}
                onClick={() => onImageClick(image)}
              />
              <div className="group absolute top-0 left-0 w-full h-full">
                <div className="bg-offBlack bg-opacity-70 w-full h-full align-center justify-center flex-col invisible flex group-hover:visible">
                  <button
                    className={`absolute bg-grad2 rounded-lg w-3/4 text-offBlack hover:opacity-80 focus:bg-grad3 active:bg-grad3 text-xs top-10 left-5 && ${init===image && "bg-grad3"}`}
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
                    <div className="text-white top-28 absolute text-sm w-full whitespace-nowrap">
                      Strength: {strength}
                    </div>
                  ) : (
                    <div className="text-white top-28 absolute text-sm w-full whitespace-nowrap">
                      Strength: 0.5
                    </div>
                  )}
                  <IoMdDownload
                    className="relative top-24 left-1"
                    color="white"
                    onClick={() => downloadImage(image)}
                  />
                  <IoMdExpand
                    className="relative top-20 left-6"
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
