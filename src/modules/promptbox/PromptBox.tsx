import React from "react";
import { EnterPrompt } from "./components/EnterPrompt";
import { ImageSequence } from "./components/ImageSequence";
import { LensPost } from "./components/LensPost";
import { useEnterPrompt } from "./hooks/useEnterPrompt";
import { useLensPost } from "./hooks/useLensPost";

export const PromptBox = (): JSX.Element => {
  const { handlePromptInput, prompt, handleRunPrompt } = useEnterPrompt();
  const {handlePostWrite, handlePostData, handleFileChange, showPostButton} = useLensPost();

  return (
    <div className="w-[45%] h-[80%] fixed bg-gradient-to-r from-grad1 via-grad2 via-grad3 to-grad4 z-30 absolute rounded-lg top-[10%] left-[27.5%] shadow-2xl shadow-black	">
      <ImageSequence />
      <EnterPrompt onPromptInput={handlePromptInput} onRunPrompt={handleRunPrompt} />
      <LensPost prompt={prompt} showPostButton={showPostButton} onPostWrite={handlePostWrite} onPostData={handlePostData} onFileChange={handleFileChange} />
    </div>
  );
};
