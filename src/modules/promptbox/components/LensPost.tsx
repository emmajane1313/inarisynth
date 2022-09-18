import React, { FunctionComponent } from "react";
import { LensPostProps } from "../../../types/lens/lenstypes.types";

export const LensPost: FunctionComponent<LensPostProps> = ({
  prompt,
  showPostButton,
  onPostWrite,
  onPostData,
  onFileChange,
  imageSelect
}): JSX.Element => {

  return (
    <div className="relative left-[50%] bg-gradient-to-r from-grad1 via-grad2 via-grad3 to-grad4 w-[40%] h-[50%] rounded-lg">
      <form
        onSubmit={onPostData}
        className="bg-white rounded-t-lg border-solid border-2 left-[10%] top-[5%] border-offBlack relative  w-[80%] h-[75%]"
      >
        {prompt ? (
          <div>
            <div className="absolute border-b-2 border-solid border-offBlack w-full h-16 p-2 flex overflow-scroll"
            id="prompt">
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
            onChange={(e) => onFileChange(e)}
            accept="image/*"
            multiple
            id="filesInput"
            type="file" className="flex justify-start overflow-y-scroll p-2 top-16 absolute w-fit"/>
          </div>
        )}
        <button
          type="submit"
          className="top-[103%] left-[76%] absolute p-2 rounded-b-lg text-distro text-white text-base bg-offBlack"
        >
          CREATE
        </button>
      </form>
      { showPostButton &&
          <button
          className="top-[103%] left-[20%] absolute p-2 rounded-b-lg text-distro text-white text-base bg-offBlack"
          onClick={onPostWrite}>
            POST
          </button>
        }
        <div className="grid top-6 left-6 m-0 auto-cols-min gap-1 grid-flow-col align-center w-28 relative h-full overflow-x-scroll h-fit scrollbar-thin scrollbar-thumb-offWhite">
        {imageSelect &&
          imageSelect.map((image: string, index: any) => {
            return (
              <div key={index} id={image} className="w-6 h-10">
                <img src={image} />
              </div>
            );
          }) 
          } 

      </div>
    </div>
  );
};
