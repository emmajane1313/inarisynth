import React from "react";
import { useLensSignIn } from "../../common/hooks/useLensSignIn";
import { Profile } from "../../generated/lens/types.types";
import { EnterPrompt } from "./components/EnterPrompt";
import { ImageSequence } from "./components/ImageSequence";
import { LensPost } from "./components/LensPost";
import { useEnterPrompt } from "./hooks/useEnterPrompt";
import { useLensPost } from "./hooks/useLensPost";

export const PromptBox = (): JSX.Element => {
  const { handlePromptInput, prompt } = useEnterPrompt();
  const {writePublication, handleHashImages, handleFileChange} = useLensPost();

  return (
    <div className="w-[45%] h-[80%] fixed bg-gradient-to-r from-grad1 via-grad2 via-grad3 to-grad4 z-30 absolute rounded-lg top-[10%] left-[27.5%] shadow-2xl shadow-black	">
      <ImageSequence />
      <EnterPrompt onPromptInput={handlePromptInput} />
      <LensPost prompt={prompt} writePublication={writePublication} onHashImages={handleHashImages} onFileChange={handleFileChange} />
    </div>
  );
};
