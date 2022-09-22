import React from "react";
import { CudaMemory } from "../../common/components/modals/CudaMemory";
import { ImageExpand } from "../../common/components/modals/ImageExpand";
import { NSFWContent } from "../../common/components/modals/NSFWContent";
import { EnterPrompt } from "./components/EnterPrompt";
import { ImageSequence } from "./components/ImageSequence";
import { LensPost } from "./components/LensPost";
import { useEnterPrompt } from "./hooks/useEnterPrompt";
import { useLensPost } from "./hooks/useLensPost";

export const PromptBox = (): JSX.Element => {
  const {
    handlePromptInput,
    prompt,
    handleRunPrompt,
    promptImages,
    handleImageModalOpen,
    imageOpen,
    expandedImage,
    handleImageModalClose,
    setSteps,
    setScale,
    steps,
    scale,
    onReSynth,
    setStrength,
    strength,
    loading,
    downloadImage,
    setCudaMemoryModal,
    cudaMemoryModal,
    nsfwModal,
    setNsfwModal,
    height
  } = useEnterPrompt();
  const {
    handlePostWrite,
    handlePostData,
    showPostButton,
    onImageClick,
    imageSelect,
    removeFromImageArray,
    loadingIPFS,
    loadingPost,
    isConnected,
    indexed,
  } = useLensPost();

  return (
    <div className="w-[45%] h-[80%] fixed bg-offBlack z-30 absolute rounded-lg top-[10%] left-[27.5%] shadow-2xl shadow-black backdrop-blur-lg">
      <ImageSequence
        setStrength={setStrength}
        strength={strength}
        onReSynth={onReSynth}
        promptImages={promptImages}
        onImageModalOpen={handleImageModalOpen}
        imageSelect={imageSelect}
        onImageClick={onImageClick}
        loading={loading}
        downloadImage={downloadImage}
      />
      <EnterPrompt
        setSteps={setSteps}
        setScale={setScale}
        scale={scale}
        steps={steps}
        onPromptInput={handlePromptInput}
        onRunPrompt={handleRunPrompt}
        prompt={prompt}
      />
      <LensPost
        promptImages={promptImages}
        removeFromImageArray={removeFromImageArray}
        prompt={prompt}
        showPostButton={showPostButton}
        onPostWrite={handlePostWrite}
        onPostData={handlePostData}
        imageSelect={imageSelect}
        loadingIPFS={loadingIPFS}
        loadingPost={loadingPost}
        indexed={indexed}
        height={height}
      />
      <ImageExpand
        onImageModalClose={handleImageModalClose}
        expandedImage={expandedImage}
        imageOpen={imageOpen}
        height={height}
      />
      {cudaMemoryModal && (
        <CudaMemory setCudaMemoryModal={setCudaMemoryModal} />
      )}
      {nsfwModal && <NSFWContent setNsfwModal={setNsfwModal} />}
    </div>
  );
};
