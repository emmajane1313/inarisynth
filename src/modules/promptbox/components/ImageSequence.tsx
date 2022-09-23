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
      <div className="grid top-52 grid-cols-4 align-center gap-4 w-fit absolute h-fit font-sourceReg">
        {promptImages?.map((image, index) => {
          return (
            <div key={index} id={image} className="w-full h-fit cursor-pointer">
              <div>
              <img
                src={image}
                className={`hover:opacity-40 active:border-4 active:border-themeBlue ${
                  imageSelect.includes(image) && "border-4 border-themeBlue"
                }`}
                onClick={() => onImageClick(image)} 
              />
                <div className="absolute bg-opacity-70 -left-[3.65rem] w-full h-fit">
                  <button
                    className="absolute bg-grad2 rounded-lg w-3/4 text-offBlack hover:opacity-80 focus:border-2 focus:border-solid focus:border-color-grad1 text-xs top-10"
                    onClick={() => onReSynth(image)}
                  >
                    Add as Init to RESYNTH
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step=".1"
                    id="strength"
                    defaultValue="0.5"
                    name="strength"
                    className="absolute top-32 left-[4.5rem]"
                    onChange={(e: any) => setStrength(e.target.value)}
                  />
                  { strength ? <div className="text-white text-sm absolute top-36 w-full whitespace-nowrap left-14">
                    Strength: {strength}
                  </div> : <div className="text-white text-sm absolute top-36 w-full whitespace-nowrap left-14">
                    Strength: 0.5
                  </div>}
                </div>
              </div>
              <IoMdDownload
                className="relative top-52 left-2"
                color="white"
                onClick={() => downloadImage(image)}
              />
              <IoMdExpand
                className="relative top-48 left-7"
                onClick={() => onImageModalOpen(image)}
                color="white"
              />

              </div>
          );
        })}
      </div>
    </div>
  );
};
