import { FormEventHandler } from "react";

export type UseEnterPromptResult = {
  prompt: string;
  handlePromptInput: (e: any) => void;
  handleRunPrompt: (prompt: string) => Promise<void>;
  promptImages: string[];
  handleImageModalOpen: (image: string) => void;
  imageOpen: boolean;
  handleImageSelect: (e: any, image: string, index: any) => void;
  imageSelect: any;
  expandedImage: string;
  handleImageModalClose: () => void;
};
export type EnterPromptProps = {
  onPromptInput: (e: any) => void;
  onRunPrompt: (prompt: string) => Promise<void>;
};

export type InputType = {
  prompt: string;
  width: number;
  height: number;
  num_outputs: number;
  num_inference_steps: number;
  guidance_scale: number;
  safety: boolean;
};

export type ImageSequenceProps = {
  promptImages: string[];
  onImageModalOpen: (image: string) => void;
  onImageSelect: (e: any, image: string, index: any) => void;
  imageSelect: string[];
}

export type ImageExpandProps = {
  expandedImage: string;
  imageOpen: boolean;
  onImageModalClose: () => void;
}