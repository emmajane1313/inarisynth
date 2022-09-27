import { useState } from "react";
import { InputType } from "./../../../types/stablediffusion/sdtypes.types";
import { UseEnterPromptResult } from "./../../../types/stablediffusion/sdtypes.types";
import { saveAs } from "file-saver";

export const useEnterPrompt = (): UseEnterPromptResult => {
  const [prompt, setPrompt] = useState<string>("");
  const [promptImages, setPromptImages] = useState<string[]>([]);
  const [imageOpen, setImageOpen] = useState<boolean>(false);
  const [expandedImage, setExpandedImage] = useState<string>("");
  const [steps, setSteps] = useState<number>();
  const [scale, setScale] = useState<number>();
  const [init, setInit] = useState<any>();
  const [strength, setStrength] = useState<number>(0.5);
  const [loading, setLoading] = useState<boolean>();
  const [cudaMemoryModal, setCudaMemoryModal] = useState<boolean>();
  const [nsfwModal, setNsfwModal] = useState<boolean>();
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();

  const handlePromptInput = (e: any): void => {
    e.preventDefault();
    const promptValue: string = e.target.value;
    sessionStorage.setItem("prompt", promptValue);
    setPrompt(promptValue);
  };

  const handleRunPrompt = async (e: any): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    let widthValue: any = e.target?.width.value;
    let heightValue: any = e.target.height.value;

    if (e.target.width.value == 768 && e.target.height.value == 768) {
      setCudaMemoryModal(true);
      widthValue = 512;
      heightValue = 768;
      e.target.width.value = 512;
      e.target.height.value = 768;
    }

    const input: InputType = {
      prompt: e.target.prompt.value,
      width: widthValue ? Number(widthValue) : 512,
      height: heightValue ? Number(heightValue) : 768,
      num_outputs: 4,
      num_inference_steps: steps ? Number(steps) : 75,
      guidance_scale: scale ? Number(scale) : 10,
      init_image: init ? init : undefined,
      prompt_strength: init ? Number(strength) : undefined,
    };

    setHeight(heightValue);
    setWidth(widthValue);

    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (response.status !== 200) {
        console.log("ERROR", response);
      } else {
        let responseJSON = await response.json();
        setLoading(false);
        if (responseJSON === null) {
          setNsfwModal(true);
          const previousImages = sessionStorage.getItem("images");
          setPromptImages(JSON.parse(previousImages));
        } else {
          sessionStorage.setItem("images", JSON.stringify(responseJSON));
          setPromptImages(responseJSON);
        }
        return responseJSON;
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onReSynth = (image: string): void => {
    setInit(image);
  };

  const handleImageModalOpen = (image: string): void => {
    setImageOpen(true);
    setExpandedImage(image);
  };

  const handleImageModalClose = (): void => {
    setImageOpen(false);
  };

  const downloadImage = (image: string): void => {
    const splitImage = image.split("/");
    const name = splitImage.pop();
    saveAs(image, "inarisynth/" + name);
  };

  return {
    prompt,
    handlePromptInput,
    handleRunPrompt,
    promptImages,
    handleImageModalOpen,
    imageOpen,
    expandedImage,
    handleImageModalClose,
    setScale,
    setSteps,
    scale,
    steps,
    onReSynth,
    setStrength,
    strength,
    loading,
    downloadImage,
    cudaMemoryModal,
    setCudaMemoryModal,
    nsfwModal,
    setNsfwModal,
    height,
    init,
  };
};
