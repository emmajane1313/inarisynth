import React, { useEffect, useState } from "react";
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
    height,
    init,
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
    changed,
    setChanged,
    imageUploadLoading
  } = useLensPost();

  return (
    <div className="tablet:w-[70%] w-full md:h-[80vw] tablet:h-[60vw] fixed bg-offBlack z-30 absolute rounded-lg tablet:left-[14%] left-0 tablet:top-[8%] top-[10%] shadow-2xl shadow-black backdrop-blur-lg">
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
        init={init}
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
        {(promptImages?.length !== 0 || sessionStorage.getItem("images")) && (
          <LensPost
            removeFromImageArray={removeFromImageArray}
            prompt={prompt}
            showPostButton={showPostButton}
            onPostWrite={handlePostWrite}
            onPostData={handlePostData}
            imageSelect={imageSelect}
            loadingIPFS={loadingIPFS}
            loadingPost={loadingPost}
            changed={changed}
            setChanged={setChanged}
            imageUploadLoading={imageUploadLoading}
          />
        )}
      {imageOpen && (
        <ImageExpand
          onImageModalClose={handleImageModalClose}
          expandedImage={expandedImage}
          height={height}
        />
      )}

      {cudaMemoryModal && (
        <CudaMemory setCudaMemoryModal={setCudaMemoryModal} />
      )}
      {nsfwModal && <NSFWContent setNsfwModal={setNsfwModal} />}
    </div>
  );
};
