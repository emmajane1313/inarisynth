import Image from "next/image";
import React, { FunctionComponent, useContext } from "react";
import { HomeAnimation } from "../../common/components/gallery/Gallery";
import { GlobalContext } from "../../pages/_app";
import { PromptBox } from "../promptbox/PromptBox";
import { RiArrowUpLine } from "react-icons/ri";

export const Landing: FunctionComponent = (): JSX.Element => {
  const { profileExists } = useContext(GlobalContext);
  return (
    <div className="flex text-center relative w-full tablet:h-[70vw] min-h-screen h-[120vw]">
      <HomeAnimation />
      {!profileExists && (
        <div>
          <div className="left-[39%] sm:left-[45%] top-[25%] cursor-pointer absolute hover:rotate-3">
            <Image
              priority
              src="/images/icons/logoinari.png"
              width={100}
              height={144}
              alt="logo"
            />
          </div>
          <div className="text-distro text-offBlack top-1/2 sm:top-[43%] w-full text-7xl sm:text-9xl absolute justify-center">
            INARI SYNTH
          </div>
        </div>
      )}
      {profileExists && <PromptBox />}
      {!profileExists && (
        <div className="animate-bounce font-sourceReg text-offBlack text-l absolute right-14 top-28">
          <RiArrowUpLine color="#111313" className="absolute right-16 -top-6" />
          Connect to Synth!
        </div>
      )}
    </div>
  );
};
