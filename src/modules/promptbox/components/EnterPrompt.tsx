import React from "react";
import { useEnterPrompt } from "../hooks/useEnterPrompt";

export const EnterPrompt = (): JSX.Element => {
  const { handlePromptInput } = useEnterPrompt();

  return (
    <div className="relative left-[10%] top-[30%] bg-offWhite w-[35%] h-[40%] rounded-lg">
      <form onSubmit={handlePromptInput}>
      <input name="prompt" className="bg-white rounded-t-lg border-solid border-2 left-[10%] top-[5%] border-offBlack relative w-[80%] h-[75%]"/>
        <button
          type="submit"
          className="top-[7%] left-[26.5%] relative p-2 rounded-b-lg text-distro text-white text-base bg-offBlack"
        >
          SYNTH
        </button>
      </form>
    </div>
  );
};
