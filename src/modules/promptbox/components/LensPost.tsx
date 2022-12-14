import React, { FunctionComponent, useEffect } from "react";
import { LensPostProps } from "../../../types/lens/lenstypes.types";
import { AiFillCloseCircle, AiOutlineLoading } from "react-icons/ai";
import { CollectionSettings } from "./CollectionSettings";

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
  imageUploadLoading,
  collectionModule,
  setCollectionModule,
  setReferral,
  referral,
  currencies,
}): JSX.Element => {
  return (
    <div className="relative text-xs font-sourceReg bg-grad3 w-full lg:h-[35%] rounded-lg tablet:top-[27.3rem] lg:top-[40vw] top-[175vw] h-[100vw] sm:top-[157vw] sm:h-[50vw]  tablet:mt-0 mt-4">
      <form
        onSubmit={onPostData}
        className="bg-white rounded-t-lg border-solid border-2 left-[10%] lg:left-[5%] top-[40%] md:top-[25%] border-offBlack relative w-[85%] lg:w-[93%] h-[53vw] sm:h-[26vw] lg:h-[67%]"
      >
        <div className="flex">
          <div
            className="absolute border-b-2 border-solid border-offBlack w-full break-all h-[30%] p-4 flex overflow-y-scroll overflow-x-hidden text-sm text-left"
            id="prompt"
          >
            Prompt: {prompt ? prompt : sessionStorage.getItem("prompt")}
          </div>
          <textarea
            placeholder="Select an image to share. Have more to say? Describe your synthed images and share what’s on your mind."
            name={"description"}
            className={
              "resize-none flex justify-start overflow-y-scroll p-4 top-16 absolute w-full md:min-h-[7rem] min-h-[0.1rem] max-h-max focus:outline-0 text-base relative"
            }
            onChange={() => setChanged(true)}
          />
        </div>
        <div className="sm:relative sm:-top-28 absolute w-1/2">
          <CollectionSettings
            collectionModule={collectionModule}
            setCollectionModule={setCollectionModule}
            currencies={currencies}
            referral={referral}
            setReferral={setReferral}
            setChanged={setChanged}
          />
        </div>
        {(!showPostButton || changed) && (
          <div className="absolute z-100 right-[4.4rem] bottom-10">
            {/* <div className="absolute z-100 tablet:-right-56 -right-[36vw] bottom-[4.5vw] w-full h-full tablet:top-[8.65rem] flex flex-col justify-end"></div> */}
            <button
              type="submit"
              className="absolute p-2 text-white w-[4.5rem] h-10 text-base bg-offBlack"
            >
              {" "}
              {(loadingIPFS && (!showPostButton || changed)) ||
              (imageUploadLoading && (!showPostButton || changed)) ? (
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
        <div className="absolute right-5 bottom-7 z-100 w-fit sm:bottom-[8%] md:bottom-[23%] sm:right-[5%] lg:right-[2%] lg:bottom-[8%] tablet:bottom-auto tablet:left-auto tablet:right-[5.83rem] tablet:top-[15.65rem]">
          <button
            onClick={onPostWrite}
            className="relative tablet:absolute p-2 text-white text-base w-[4.5rem] h-10 bg-offBlack"
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
      <div className="relative grid -top-[10%] md:-top-[25%] lg:-top-[40%] left-2 sm:left-4 md:left-8 lg:left-5 m-0 auto-rows-min grid-flow-row align-center w-10 absolute overflow-y-scroll h-[50%] lg:h-[65%] scrollbar-thin scrollbar-thumb-offWhite">
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
