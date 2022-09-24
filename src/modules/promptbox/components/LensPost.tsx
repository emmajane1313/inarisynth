import React, { FunctionComponent, useEffect } from "react";
import { LensPostProps } from "../../../types/lens/lenstypes.types";
import { AiFillCloseCircle, AiOutlineLoading } from "react-icons/ai";

export const LensPost: FunctionComponent<LensPostProps> = ({
  prompt,
  showPostButton,
  onPostWrite,
  onPostData,
  imageSelect,
  removeFromImageArray,
  loadingIPFS,
  loadingPost,
  changed,
  setChanged,
}): JSX.Element => {
  return (
    <div className="relative text-xs font-sourceReg bg-grad3 w-full h-[31%] top-72 rounded-lg">
      <form
        onSubmit={onPostData}
        className="bg-white rounded-t-lg border-solid border-2 left-[10%] top-[5%] border-offBlack relative w-[87%] h-[11.3rem]"
      >
        <div>
          <div
            className="absolute border-b-2 border-solid border-offBlack w-full h-fit p-4 flex overflow-scroll"
            id="prompt"
          >
            Prompt: {prompt ? prompt : sessionStorage.getItem("prompt")}
          </div>
          <textarea
            placeholder="Select an image to share. Have more to say? Describe your synthed images and share what’s on your mind."
            name={"description"}
            className={
              "resize-none flex justify-start overflow-y-scroll p-4 top-16 absolute w-full h-[6.5rem] focus:outline-0"
            }
            onChange={() => setChanged(true)}
          />
        </div>
        {(!showPostButton || changed) && (
          <div className="absolute z-100 right-[4.5rem] top-[8.65rem]">
            <button
              type="submit"
              className="absolute p-2 text-white w-[4.5rem] h-10 text-base bg-offBlack"
            >
              {" "}
              {loadingIPFS && (!showPostButton || changed) ? (
                <div className="animate-spin inline-flex">
                  <AiOutlineLoading
                    color="white"
                    width={"5px"}
                    height={"5px"}
                  />
                </div>
              ) : (
                "CREATE"
              )}
            </button>
          </div>
        )}
      </form>
      {showPostButton && !changed && (
        <div className="absolute z-100 right-[5.8rem] top-[9.45rem]">
          <button
            onClick={onPostWrite}
            className="absolute p-2 text-white text-base w-[4.5rem] h-10 bg-offBlack"
          >
            {" "}
            {loadingPost ? (
              <div className="animate-spin inline-flex">
                <AiOutlineLoading color="white" width={"5px"} height={"5px"} />
              </div>
            ) : (
              "POST"
            )}
          </button>
        </div>
      )}
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
