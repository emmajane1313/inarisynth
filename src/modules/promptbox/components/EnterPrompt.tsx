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
        <div className="sm:w-full sm:p-4 sm:pt-8 sm:pl-8 w-3/4">
          {steps ? (
            <div className="text-white float-left absolute text-base">
              Inference Steps: {steps}
            </div>
          ) : (
            <div className="text-white float-left absolute text-base">
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
            className="w-1/2"
            onChange={(e: any) => {
              setSteps(e.target.value);
              sessionStorage.setItem("steps", e.target.value);
            }}
          />
        </div>
        <div className="w-full p-4 pl-8">
          {scale ? (
            <div className="text-white float-left absolute text-base">
              Guidance Scale: {scale}
            </div>
          ) : (
            <div className="text-white float-left absolute text-base">
              Guidance Scale: 10
            </div>
          )}

          <input
            type="range"
            id="scale"
            name="scale"
            min="6"
            max="20"
            className="w-1/2"
            defaultValue="10"
            onChange={(e: any) => {
              setScale(e.target.value);
              sessionStorage.setItem("scale", e.target.value);
            }}
          />
        </div>
        <div>
          <div className="absolute right-24 top-28">
            <div className="text-white float-left text-base">Width: </div>
            <select
              name="width"
              id="width"
              defaultValue="512"
              className="relative m-4 -top-3"
            >
              <option value="768">768</option>
              <option value="512">512</option>
              <option value="256">256</option>
            </select>
          </div>
          <div className="absolute right-6 top-36">
            <div className="text-white relative right-32 top-4 float-left text-base">
              Height:{" "}
            </div>
            <div id="dimensionsHeight">
              <select
                name="height"
                id="height"
                defaultValue="768"
                className="relative m-4 -top-5 right-16"
              >
                <option value="768">768</option>
                <option value="512">512</option>
                <option value="256">256</option>
              </select>
            </div>
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
