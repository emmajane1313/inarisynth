import { useCallback, useMemo, useState } from "react";
import { InputType } from "./../../../types/stablediffusion/sdtypes.types";
import { UseEnterPromptResult } from "./../../../types/stablediffusion/sdtypes.types";

export const useEnterPrompt = (): UseEnterPromptResult => {
  const [prompt, setPrompt] = useState<string>("");
  const [promptImages, setPromptImages] = useState<string[]>([]);
  const [imageOpen, setImageOpen] = useState<boolean>(false);
  const [imageSelect, setImageSelect] = useState<string[]>([]);
  const [expandedImage, setExpandedImage] = useState<string>("");
  const [promptFile, setPromptFile] = useState<any>();

  const handlePromptInput = (e: any): void => {
    e.preventDefault();
    const promptValue: string = e.target.value;
    setPrompt(promptValue);
  };

  const handleRunPrompt = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
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

  const handleImageSelect = (image: string): void => {
    let imagesArray = [];
    if (imageSelect.includes(image)) {
      imagesArray = imageSelect.filter((images: string) => images !== image);
    } else {
      imagesArray = [...imageSelect, image];
    }
    setImageSelect(imagesArray);
    let newImageArray = [{}]
    imagesArray.map( async (img, index) => {
      const base64: any = await getBase64FromUrl(img);
      const file: any = await base64ToFile(base64, "fileone.png");
      console.log(file);
      newImageArray.push(file)
      console.log(file, "at", index)
      console.log(newImageArray, "at", index)
      
    })
    setPromptFile(newImageArray);
  };

  const base64ToFile = async (dataurl: any, filename: any) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const getBase64FromUrl = async (url: string) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
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
    expandedImage,
    handleImageModalClose,
  };
};
