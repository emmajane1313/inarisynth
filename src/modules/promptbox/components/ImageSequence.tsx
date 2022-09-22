import React, { FunctionComponent } from "react";
import { ImageSequenceProps } from "../../../types/stablediffusion/sdtypes.types";
<<<<<<< HEAD
import Image from "next/image";
import {IoMdExpand} from "react-icons/io"
=======
import { IoMdExpand, IoMdDownload } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
>>>>>>> newer/main

export const ImageSequence: FunctionComponent<ImageSequenceProps> = ({
  promptImages,
  onImageModalOpen,
<<<<<<< HEAD
  onImageSelect,
  imageSelect,
  onImageClick
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
                onClick={() => onImageClick(image)}// change this to handleFileChange
              />   
              <IoMdExpand
=======
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
            <div key={index} id={image} className="w-fit h-fit cursor-pointer">
              <img
                src={image}
                className={`hover:opacity-40 active:border-4 active:border-themeBlue ${
                  imageSelect.includes(image) && "border-4 border-themeBlue"
                }`}
                onClick={() => onImageClick(image)} 
              />
              <div className="opacity-100 hover:opacity-100 w-fit h-fit relative">
                <div className="absolute bg-opacity-70 -top-28 left-10  w-full h-fit">
                  <button
                    className="absolute left-[0.05rem] w-full text-offWhite"
                    onClick={() => onReSynth(image)}
                  >
                    Add as init to resynth
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step=".1"
                    id="strength"
                    defaultValue="0.5"
                    name="strength"
                    className="absolute -left-8"
                    onChange={(e: any) => setStrength(e.target.value)}
                  />
                  { strength ? <div className="text-white absolute -left-2 -top-12 w-full whitespace-nowrap">
                    Strength: {strength}
                  </div> : <div className="text-white absolute -left-2 -top-12 w-full whitespace-nowrap">
                    Strength: 0.5
                  </div>}
                </div>
              </div>
              <IoMdDownload
                className="relative -top-6 left-5"
                color="white"
                onClick={() => downloadImage(image)}
              />
              <IoMdExpand
                className="relative -top-10 left-0"
>>>>>>> newer/main
                onClick={() => onImageModalOpen(image)}
                color="white"
              />
            </div>
          );
        })}
<<<<<<< HEAD
        <button className="text-white">Click Me please!</button>
=======
>>>>>>> newer/main
      </div>
    </div>
  );
};
