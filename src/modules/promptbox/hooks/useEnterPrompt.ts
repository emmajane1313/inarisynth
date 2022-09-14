import { useState } from "react";
import { InputType } from "zlib";
import { UseEnterPromptResult } from "./../../../generated/stablediffusion/sdtypes.types";

export const useEnterPrompt = (): UseEnterPromptResult => {
  const [prompt, setPrompt] = useState<string>("");
  const [promptImage, setPromptImage] = useState();

  const handlePromptInput = (e: any): void => {
    e.preventDefault();
    console.log(e.target.value);
    const promptValue: string = e.target.value;
    setPrompt(promptValue);
  };

  const handleRunPrompt = async (e: any): Promise<void> => {
    e.preventDefault();
    const input: InputType = {
        prompt: prompt,
        width: 768,
        height: 768,
        num_outputs: 3,
        num_inference_steps: 75,
        guidance_scale: 10,
    };

    console.log(input, "diz")

    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (response.status !== 200) {
        console.log("ERROR", response);
      } else {
        console.log("Prediction successfully submitted!");
        let responseJSON = await response.json();
        console.log("Prediction:", responseJSON);
        // setPromptImage(responseJSON);
        return responseJSON;
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return { prompt, handlePromptInput, handleRunPrompt };
};
