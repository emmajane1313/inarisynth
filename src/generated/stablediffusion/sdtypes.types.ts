export type UseEnterPromptResult = {
  prompt: any;
  handlePromptInput: (e: any) => void;
  handleRunPrompt: (prompt: string) => Promise<void>;
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
};