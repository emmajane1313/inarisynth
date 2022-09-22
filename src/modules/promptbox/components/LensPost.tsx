<<<<<<< HEAD
import React, { FunctionComponent } from "react";
import { LensPostProps } from "../../../types/lens/lenstypes.types";
=======
import React, { FunctionComponent, useEffect } from "react";
import { LensPostProps } from "../../../types/lens/lenstypes.types";
import { AiFillCloseCircle } from "react-icons/ai";
import { PostSwitch } from "./PostSwitch";
>>>>>>> newer/main

export const LensPost: FunctionComponent<LensPostProps> = ({
  prompt,
  showPostButton,
  onPostWrite,
  onPostData,
  imageSelect,
<<<<<<< HEAD
}): JSX.Element => {
  return (
    <div className="relative left-[50%] bg-gradient-to-r from-grad1 via-grad2 via-grad3 to-grad4 w-[40%] h-[50%] rounded-lg">
      <form
        onSubmit={onPostData}
        className="bg-white rounded-t-lg border-solid border-2 left-[10%] top-[5%] border-offBlack relative  w-[80%] h-[75%]"
      >
        {prompt ? (
          <div>
            <div
              className="absolute border-b-2 border-solid border-offBlack w-full h-16 p-2 flex overflow-scroll"
              id="prompt"
            >
              {prompt}
            </div>
            <textarea
              placeholder="Include a message with your new synths"
              name={"description"}
              className="resize-none flex justify-start overflow-y-scroll p-2 top-16 absolute w-full h-[11.4rem]"
            />
          </div>
        ) : (
          <div>
            <textarea
              placeholder="Share your prompt"
              name={"prompt"}
              className="absolute border-b-2 border-solid border-offBlack w-full h-16 p-2 flex overflow-scroll"
            />
            <textarea
              placeholder="Post something and upload your synths or make a new one in the prompt box to the left!"
              name={"description"}
              className="flex justify-start overflow-y-scroll p-2 top-16 absolute w-full h-[11.4rem]"
            />
            <input
              name={"file"}
              accept="image/*"
              multiple
              id="filesInput"
              type="file"
              className="flex justify-start overflow-y-scroll p-2 top-16 absolute w-fit"
            />
          </div>
        )}
        <button
          type="submit"
          className="top-[103%] left-[76%] absolute p-2 rounded-b-lg text-distro text-white text-base bg-offBlack"
        >
          CREATE
        </button>
      </form>
      <div className="grid top-6 left-6 m-0 auto-cols-min gap-1 grid-flow-col align-center w-28 relative h-full overflow-x-scroll h-fit scrollbar-thin scrollbar-thumb-offWhite">
        {imageSelect &&
          imageSelect.map((image: string, index: any) => {
            return (
              <div key={index} id={image} className="w-6 h-10">
                <img src={image} />
              </div>
            );
          })}
        {showPostButton && (
          <button
            className="top-[10%] left-[10%] absolute p-2 rounded-b-lg text-distro text-white text-base bg-offBlack"
            onClick={onPostWrite}
          >
            POST
          </button>
        )}
=======
  removeFromImageArray,
  promptImages,
  loadingIPFS,
  loadingPost,
  indexed,
  height,
}): JSX.Element => {
  return (
    <div
      className={`relative text-xs font-sourceReg bg-grad3 w-full h-[31%] top-72 rounded-lg ${
        promptImages.length == 0 && "hidden none"
      }`}
    >
      <form
        onSubmit={onPostData}
        className="bg-white rounded-t-lg border-solid border-2 left-[10%] top-[5%] border-offBlack relative w-[87%] h-[11.3rem]"
      >
        <div>
          <div
            className="absolute border-b-2 border-solid border-offBlack w-full h-fit p-4 flex overflow-scroll"
            id="prompt"
          >
            Prompt: {prompt}
          </div>
          <textarea
            placeholder="Select an image to share. Have more to say? Describe your synthed images and share what’s on your mind."
            name={"description"}
            className={
              "resize-none flex justify-start overflow-y-scroll p-4 top-16 absolute w-full h-[6.5rem] focus:outline-0"
            }
          />
        </div>
        <div className="absolute z-100 right-[4.5rem] top-[8.65rem]">
          <PostSwitch
            loadingIPFS={loadingIPFS}
            showPostButton={showPostButton}
            loadingPost={loadingPost}
            onPostWrite={onPostWrite}
            indexed={indexed}
          />
        </div>
      </form>
      <div className="grid top-6 left-5 m-0 auto-cols-min grid-flow-row align-center w-10 absolute overflow-y-scroll h-40 scrollbar-thin scrollbar-thumb-offWhite">
        {imageSelect &&
          imageSelect.map((image: string, index: any) => {
            return (
              <div key={index}>
                <div id={image} className={`w-6 h-${height} mt-1`}>
                  <img src={image} />
                </div>
                <AiFillCloseCircle
                  className="hover:opacity-100 opacity-0 relative -top-3 left-1.5 w-fit h-fit cursor-pointer z-100"
                  color="white"
                  onClick={() => removeFromImageArray(image)}
                />
              </div>
            );
          })}
>>>>>>> newer/main
      </div>
    </div>
  );
};
