import { useCallback, useMemo, useState } from "react";
import { InputType } from "./../../../types/stablediffusion/sdtypes.types";
import { UseEnterPromptResult } from "./../../../types/stablediffusion/sdtypes.types";

export const useEnterPrompt = (): UseEnterPromptResult => {
  const [prompt, setPrompt] = useState<string>("");
  const [promptImages, setPromptImages] = useState<string[]>([]);
  const [imageOpen, setImageOpen] = useState<boolean>(false);
  const [imageSelect, setImageSelect] = useState<any>([]);
  const [expandedImage, setExpandedImage] = useState<string>("");

  const handlePromptInput = (e: any): void => {
    e.preventDefault();
    const promptValue: string = e.target.value;
    setPrompt(promptValue);
  };

  const handleRunPrompt = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    // e.preventDefault();
    const input: InputType = {
      prompt: prompt,
      width: 512,
      height: 768,
      num_outputs: 4,
      num_inference_steps: 75,
      guidance_scale: 10,
      safety: false,
    };

    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (response.status !== 200) {
        console.log("ERROR", response);
      } else {
        let responseJSON = await response.json();
        setPromptImages(responseJSON);
        return responseJSON;
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleImageModalOpen = (image: string): void => {
    setImageOpen(true);
    setExpandedImage(image);
  };

  const handleImageSelect = (e: any, image: string, index: any): void => {
    // let imagesArray = [];
    // if (imageSelect.includes(image)) {
    //   imagesArray = imageSelect.filter((images: string) => images !== image);
    // } else {
    //   imagesArray = [...imageSelect, image];
    // }
    // setImageSelect(imagesArray);
    // console.log(imagesArray);
  };

  const handleImageModalClose = (): void => {
    setImageOpen(false);
  };

  return {
    prompt,
    handlePromptInput,
    handleRunPrompt,
    promptImages,
    handleImageModalOpen,
    imageOpen,
    handleImageSelect,
    imageSelect,
    expandedImage,
    handleImageModalClose,
  };
};
