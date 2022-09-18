import React, { FunctionComponent } from "react";
import { EnterPromptProps } from "../../../types/stablediffusion/sdtypes.types";

export const EnterPrompt: FunctionComponent<EnterPromptProps> = ({onPromptInput, onRunPrompt}): JSX.Element => {

  return (
    <div className="relative w-full h-fit p-1 rounded-lg">
      <form onSubmit={(e) => onRunPrompt(e)} className="m-0 p-0 box-border">
      <textarea name="prompt" className="resize-none bg-white rounded-t-lg border-solid border-8 box-border align-top p-4 -left-5 border-grad3 from-grad1 via-grad2 via-grad3 to-grad4 relative w-full h-16"
      onChange={onPromptInput}
      />
        <button
          type="submit"
          className="top-2 left-[4.4rem] relative p-2 m-2 rounded-b-lg text-distro text-white text-base bg-offBlack"
        >
          SYNTH
        </button>
      </form>
    </div>
  );
};
