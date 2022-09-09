import React, { FunctionComponent } from "react";
import { LensPostProps } from "../../../generated/lens/lenstypes.types";

export const LensPost: FunctionComponent<LensPostProps> = ({
  prompt,
  showPostButton,
  handlePostWrite,
  handlePostData,
  onHashImages,
  onFileChange
}): JSX.Element => {

  return (
    <div className="relative left-[50%] bg-offWhite w-[40%] h-[50%] rounded-lg">
      <form
        onSubmit={handlePostData}
        className="bg-white rounded-t-lg border-solid border-2 left-[10%] top-[5%] border-offBlack relative  w-[80%] h-[75%]"
      >
        {prompt ? (
          <div>
            <div className="absolute border-b-2 border-solid border-offBlack w-full h-16 p-2 flex overflow-scroll"
            id="prompt">
              {prompt}
            </div>
            <input
              placeholder="Include a message with your new synths"
              name="description"
              className="flex justify-start overflow-y-scroll p-2 top-16 absolute w-full h-[11.4rem]"
            />
          </div>
        ) : (
          <div>
            <input
              placeholder="Share your prompt"
              type="text"
              name="prompt"
              className="absolute border-b-2 border-solid border-offBlack w-full h-16 p-2 flex overflow-scroll"
            />
            <input
              placeholder="Post something and upload your synths or make a new one in the prompt box to the left!"
              name="description"
              type="text"
              className="flex justify-start overflow-y-scroll p-2 top-16 absolute w-full h-[11.4rem]"
            />
            <input
            name="file"
            onChange={onFileChange}
            accept="image/png, image/jpeg"
            multiple
            type="file" className="flex justify-start overflow-y-scroll p-2 top-16 absolute w-fit"/>
            {/* <button
              onClick={onHashImages}
              className="z-10 absolute p-2 left-[20%] top-[103%] rounded-b-lg text-distro text-white text-base bg-offBlack"
            >
              Hash Images
            </button> */}
          </div>
        )}
        <button
          type="submit"
          className="top-[103%] left-[76%] absolute p-2 rounded-b-lg text-distro text-white text-base bg-offBlack"
        >
          Create
        </button>
      </form>
      { showPostButton &&
          <button
          className="top-[103%] left-[20%] absolute p-2 rounded-b-lg text-distro text-white text-base bg-offBlack"
          onClick={handlePostWrite}>
            post
          </button>
        }
    </div>
  );
};
