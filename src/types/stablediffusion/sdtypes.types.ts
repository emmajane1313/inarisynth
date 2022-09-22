<<<<<<< HEAD
import { FormEventHandler } from "react";

export type UseEnterPromptResult = {
  prompt: string;
  handlePromptInput: (e: any) => void;
  handleRunPrompt: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  promptImages: string[];
  handleImageModalOpen: (image: string) => void;
  imageOpen: boolean;
  handleImageSelect: (image: string) => void;
  expandedImage: string;
  handleImageModalClose: () => void;
};
export type EnterPromptProps = {
  onPromptInput: (e: any) => void;
  onRunPrompt: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
=======
export type UseEnterPromptResult = {
  prompt: string;
  handlePromptInput: (e: any) => void;
  handleRunPrompt: (e: any) => Promise<void>;
  promptImages: string[];
  handleImageModalOpen: (image: string) => void;
  imageOpen: boolean;
  expandedImage: string;
  handleImageModalClose: () => void;
  setScale: (e: any) => void;
  setSteps: (e: any) => void;
  scale: number;
  steps: number;
  onReSynth: (image: string) => void;
  setStrength: (e: any) => void;
  strength: number;
  loading: boolean;
  downloadImage: (image: string) => void;
  cudaMemoryModal: boolean;
  setCudaMemoryModal: (e: boolean) => void;
  nsfwModal: boolean;
  setNsfwModal: (e: boolean) => void;
  height: number;
};
export type EnterPromptProps = {
  onPromptInput: (e: any) => void;
  onRunPrompt: (e: any) => Promise<void>;
  setScale: (e: any) => void;
  setSteps: (e: any) => void;
  scale: number;
  steps: number;
  prompt: string;
>>>>>>> newer/main
};

export type InputType = {
  prompt: string;
  width: number;
  height: number;
  num_outputs: number;
  num_inference_steps: number;
  guidance_scale: number;
  safety: boolean;
<<<<<<< HEAD
=======
  init_image: string;
  prompt_strength: number;
>>>>>>> newer/main
};

export type ImageSequenceProps = {
  promptImages: string[];
  onImageModalOpen: (image: string) => void;
<<<<<<< HEAD
  onImageSelect: (image: string) => void;
  imageSelect: string[];
  onImageClick: (image: string) => any;
=======
  imageSelect: string[];
  onImageClick: (image: string) => any;
  onReSynth: (image: string) => void;
  setStrength: (e: any) => void;
  strength: number;
  loading: boolean;
  downloadImage: (image: string) => void;
>>>>>>> newer/main
};

export type ImageExpandProps = {
  expandedImage: string;
  imageOpen: boolean;
  onImageModalClose: () => void;
<<<<<<< HEAD
=======
  height: number;
};

export type CudaMemoryProps = {
  setCudaMemoryModal: (e: boolean) => void;
};

export type NsfwContentProps = {
  setNsfwModal: (e: boolean) => void;
>>>>>>> newer/main
};
