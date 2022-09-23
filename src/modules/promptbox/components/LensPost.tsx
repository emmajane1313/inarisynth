import React, { FunctionComponent, useEffect } from "react";
import { LensPostProps } from "../../../types/lens/lenstypes.types";
import { AiFillCloseCircle } from "react-icons/ai";
import { PostSwitch } from "./PostSwitch";

export const LensPost: FunctionComponent<LensPostProps> = ({
  prompt,
  showPostButton,
  onPostWrite,
  onPostData,
  imageSelect,
  removeFromImageArray,
  promptImages,
  loadingIPFS,
  loadingPost,
  indexed,
}): JSX.Element => {
  return (
    <div
      className={`relative text-xs font-sourceReg bg-grad3 w-full h-[31%] top-72 rounded-lg ${
        promptImages?.length == 0 || promptImages == null && "hidden none"
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
      <div className="grid top-6 left-5 m-0 auto-rows-min grid-flow-row align-center w-10 absolute overflow-y-scroll h-40 scrollbar-thin scrollbar-thumb-offWhite">
        {imageSelect &&
          imageSelect.map((image: string, index: any) => {
            return (
                <div id={image} key={index} className={`w-6 h-fit m-0`}>
                  <img src={image} />
                <AiFillCloseCircle
                  className="hover:opacity-100 opacity-0 relative -top-6 left-1.5 w-fit h-fit cursor-pointer z-100"
                  color="white"
                  onClick={() => removeFromImageArray(image)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
