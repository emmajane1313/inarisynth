import React, { FunctionComponent } from "react";
import { EnterPromptProps } from "../../../generated/stablediffusion/sdtypes.types";

export const EnterPrompt: FunctionComponent<EnterPromptProps> = ({onPromptInput, onRunPrompt}): JSX.Element => {

  return (
    <div className="relative left-[10%] top-[30%] bg-offWhite w-[35%] h-[43%] rounded-lg">
      <form onSubmit={onRunPrompt} className="m-0 p-0 box-border">
      <input type="text" name="prompt" className="bg-white rounded-t-lg border-solid border-2 -left-[0.1rem] box-border align-top p-4 top-3 border-offBlack relative w-52 h-48"
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
