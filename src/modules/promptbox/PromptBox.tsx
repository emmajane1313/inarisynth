import React from "react";
import { ImageExpand } from "../../common/components/modals/ImageExpand";
import { EnterPrompt } from "./components/EnterPrompt";
import { ImageSequence } from "./components/ImageSequence";
import { LensPost } from "./components/LensPost";
import { useEnterPrompt } from "./hooks/useEnterPrompt";
import { useLensPost } from "./hooks/useLensPost";

export const PromptBox = (): JSX.Element => {
  const { handlePromptInput, prompt, handleRunPrompt, promptImages, handleImageModalOpen, imageOpen, handleImageSelect, imageSelect, expandedImage, handleImageModalClose} = useEnterPrompt();
  const {handlePostWrite, handlePostData, handleFileChange, showPostButton} = useLensPost();

  return (
    <div className="w-[45%] h-[80%] fixed bg-offBlack z-30 absolute rounded-lg top-[10%] left-[27.5%] shadow-2xl shadow-black backdrop-blur-lg">
      <ImageSequence promptImages={promptImages} onImageModalOpen={handleImageModalOpen} onImageSelect={handleImageSelect} imageSelect={imageSelect}/>
      <EnterPrompt onPromptInput={handlePromptInput} onRunPrompt={handleRunPrompt} />
      <LensPost prompt={prompt} showPostButton={showPostButton} onPostWrite={handlePostWrite} onPostData={handlePostData} onFileChange={handleFileChange} imageSelect={imageSelect}/>
      <ImageExpand onImageModalClose={handleImageModalClose} expandedImage={expandedImage} imageOpen={imageOpen} />
    </div>
  );
};
