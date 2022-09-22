<<<<<<< HEAD
import { useCallback, useMemo, useState } from "react";
import { InputType } from "./../../../types/stablediffusion/sdtypes.types";
import { UseEnterPromptResult } from "./../../../types/stablediffusion/sdtypes.types";
=======
import { useState } from "react";
import { InputType } from "./../../../types/stablediffusion/sdtypes.types";
import { UseEnterPromptResult } from "./../../../types/stablediffusion/sdtypes.types";
import { saveAs } from "file-saver";
>>>>>>> newer/main

export const useEnterPrompt = (): UseEnterPromptResult => {
  const [prompt, setPrompt] = useState<string>("");
  const [promptImages, setPromptImages] = useState<string[]>([]);
  const [imageOpen, setImageOpen] = useState<boolean>(false);
<<<<<<< HEAD
  const [imageSelect, setImageSelect] = useState<string[]>([]);
  const [expandedImage, setExpandedImage] = useState<string>("");
  const [promptFile, setPromptFile] = useState<any>();
=======
  const [expandedImage, setExpandedImage] = useState<string>("");
  const [steps, setSteps] = useState<number>();
  const [scale, setScale] = useState<number>();
  const [init, setInit] = useState<any>();
  const [strength, setStrength] = useState<number>();
  const [loading, setLoading] = useState<boolean>();
  const [cudaMemoryModal, setCudaMemoryModal] = useState<boolean>();
  const [nsfwModal, setNsfwModal] = useState<boolean>();
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
>>>>>>> newer/main

  const handlePromptInput = (e: any): void => {
    e.preventDefault();
    const promptValue: string = e.target.value;
<<<<<<< HEAD
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

=======
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
      safety: false,
      init_image: init ? init : undefined,
      prompt_strength: init ? Number(strength) : undefined,
    };

    setHeight(heightValue);
    setWidth(widthValue);

>>>>>>> newer/main
    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (response.status !== 200) {
        console.log("ERROR", response);
      } else {
        let responseJSON = await response.json();
<<<<<<< HEAD
        setPromptImages(responseJSON);
=======
        setLoading(false);
        if (responseJSON === null) {
          setNsfwModal(true);
          const previousImages = sessionStorage.getItem("images");
          setPromptImages(JSON.parse(previousImages));
        } else {
          sessionStorage.setItem("images", responseJSON);
          setPromptImages(responseJSON);
        }
        console.log(nsfwModal);
>>>>>>> newer/main
        return responseJSON;
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

<<<<<<< HEAD
=======
  const onReSynth = (image: string): void => {
    setInit(image);
  };

>>>>>>> newer/main
  const handleImageModalOpen = (image: string): void => {
    setImageOpen(true);
    setExpandedImage(image);
  };

<<<<<<< HEAD
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

=======
>>>>>>> newer/main
  const handleImageModalClose = (): void => {
    setImageOpen(false);
  };

<<<<<<< HEAD
=======
  const downloadImage = (image: string): void => {
    const splitImage = image.split("/");
    const name = splitImage.pop();
    console.log(name);
    saveAs(image, "inarisynth/" + name);
  };

>>>>>>> newer/main
  return {
    prompt,
    handlePromptInput,
    handleRunPrompt,
    promptImages,
    handleImageModalOpen,
    imageOpen,
<<<<<<< HEAD
    handleImageSelect,
    expandedImage,
    handleImageModalClose,
=======
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
>>>>>>> newer/main
  };
};
