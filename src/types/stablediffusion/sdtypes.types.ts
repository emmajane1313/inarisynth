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
};

export type InputType = {
  prompt: string;
  width: number;
  height: number;
  num_outputs: number;
  num_inference_steps: number;
  guidance_scale: number;
  safety: boolean;
  init_image: string;
  prompt_strength: number;
};

export type ImageSequenceProps = {
  promptImages: string[];
  onImageModalOpen: (image: string) => void;
  imageSelect: string[];
  onImageClick: (image: string) => any;
  onReSynth: (image: string) => void;
  setStrength: (e: any) => void;
  strength: number;
  loading: boolean;
  downloadImage: (image: string) => void;
};

export type ImageExpandProps = {
  expandedImage: string;
  imageOpen: boolean;
  onImageModalClose: () => void;
  height: number;
};

export type CudaMemoryProps = {
  setCudaMemoryModal: (e: boolean) => void;
};

export type NsfwContentProps = {
  setNsfwModal: (e: boolean) => void;
};
