import React, { FunctionComponent } from "react";
import { ImageSequenceProps } from "../../../types/stablediffusion/sdtypes.types";
import Image from "next/image";
import {IoMdExpand} from "react-icons/io"

export const ImageSequence: FunctionComponent<ImageSequenceProps> = ({
  promptImages,
  onImageModalOpen,
  onImageSelect,
  imageSelect
}): JSX.Element => {
  return (
    <div>
      <div className="grid top-0 m-3 grid-cols-4 align-center gap-1 w-full absolute h-full">
        {promptImages?.map((image, index) => {
          return (
            <div
              key={index}
              id={image}
              className="w-36 h-64 cursor-pointer"
            >
              <img
                src={image}
                className={`hover:opacity-90 active:border-4 active:border-themeBlue ${imageSelect.includes(image) && "border-4 border-themeBlue"}`}
                onClick={() => onImageSelect(image)}
              />   
              <IoMdExpand
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
