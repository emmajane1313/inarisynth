import { useState, FormEvent } from "react";
import { UseEnterPromptResult } from "../../../generated/stablediffusion/sdtypes.types";

export const useEnterPrompt = (): UseEnterPromptResult => {
  const [prompt, setPrompt] = useState("");

  const handlePromptInput = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // const promptValue = e.target.prompt.value;
    // setPrompt(promptValue);
  };

  return { prompt, handlePromptInput };
};
