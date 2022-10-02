import React, { FunctionComponent } from "react";
import { EnterPromptProps } from "../../../types/stablediffusion/sdtypes.types";

export const EnterPrompt: FunctionComponent<EnterPromptProps> = ({
  onPromptInput,
  onRunPrompt,
  setSteps,
  setScale,
  scale,
  steps,
  prompt,
}): JSX.Element => {
  return (
    <div className="w-full h-fit rounded-lg font-sourceReg text-xs">
      <form
        onSubmit={(e: any) => onRunPrompt(e)}
        className="m-0 p-0 box-border"
      >
        <textarea
          name="prompt"
          className="resize-none bg-white rounded-t-lg border-solid border-8 box-border align-top p-4  border-grad3 relative w-full h-20 focus:outline-0 text-offBlack pr-16 text-base"
          onChange={onPromptInput}
          placeholder="Craft what you want to create, with words first. Add modifiers for more spectacular results."
        />
        <div className="w-full p-4 pt-8 pl-8">
          {steps ? (
            <div className="text-white float-left absolute text-xs lg:text-base left-[4%] lg:left-16">
              Inference Steps: {steps}
            </div>
          ) : (
            <div className="text-white float-left absolute text-xs lg:text-base left-[4%] lg:left-16">
              Inference Steps: 75
            </div>
          )}
          <input
            type="range"
            id="steps"
            name="steps"
            min="10"
            max="100"
            defaultValue="75"
            className="w-1/2 lg:left-0 sm:right-[1vw] -right-[15vw] relative"
            onChange={(e: any) => {
              setSteps(e.target.value);
              sessionStorage.setItem("steps", e.target.value);
            }}
          />
        </div>
        <div className="w-full p-4 pl-8">
          {scale ? (
            <div className="text-white float-left absolute text-xs lg:text-base left-[4%] lg:left-16">
              Guidance Scale: {scale}
            </div>
          ) : (
            <div className="text-white float-left absolute text-xs lg:text-base left-[4%] lg:left-16">
              Guidance Scale: 10
            </div>
          )}

          <input
            type="range"
            id="scale"
            name="scale"
            min="6"
            max="20"
            className="w-1/2 lg:left-0 sm:right-[1vw] -right-[15vw] relative"
            defaultValue="10"
            onChange={(e: any) => {
              setScale(e.target.value);
              sessionStorage.setItem("scale", e.target.value);
            }}
          />
        </div>
        <div className="relative top-24 sm:top-0">
          <div className="absolute left-[4%] sm:left-auto right-0 sm:right-[3%] lg:right-24 -top-20">
            <div className="text-white float-left text-xs lg:text-base">Width: </div>
            <select
              name="width"
              id="width"
              defaultValue="512"
              className="relative m-4 -top-4 lg:-top-3 sm:right-auto right-[35%]"
            >
              <option value="768">768</option>
              <option value="512">512</option>
              <option value="256">256</option>
            </select>
          </div>
          <div className="absolute left-[37%] sm:left-auto right-[3%] lg:right-24 -top-20 sm:-top-9">
            <div className="text-white float-left text-xs lg:text-base">Height: </div>
            <select
              name="height"
              id="height"
              defaultValue="768"
              className="relative m-4 -top-4 lg:-top-3 sm:right-auto right-[25%]"
            >
              <option value="768">768</option>
              <option value="512">512</option>
              <option value="256">256</option>
            </select>
          </div>
        </div>
        {prompt ? (
          <button
            type="submit"
            className="top-0 h-16 -right-0.5 absolute p-4 m-2 text-distro text-white text-base bg-offBlack hover:opacity-90"
          >
            SYNTH
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};
