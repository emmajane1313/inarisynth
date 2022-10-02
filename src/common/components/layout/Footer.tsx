import Link from "next/link";
import React, { FunctionComponent } from "react";
import { GrTwitter } from "react-icons/gr";

export const Footer: FunctionComponent = (): JSX.Element => {
  return (
    <div className="bg-offBlack h-52 w-full font-sourceReg">
      <div className="text-white pb-2 text-sm pl-6 md:text-lg lg:text-2xl pt-16 md:pl-10">
        An image synthesis social network.
      </div>
      <div className="text-white p-1 pl-6 pr-6 md:pr-0 md:pl-10 text-xs md:text-base lg:text-xl">
        Make it easy to run your own node, one prompt at a time.
      </div>
      <div className="flex justify-end relative -bottom-6 sm:-bottom-3 tablet:bottom-14">
      <a href="https://diysynth.xyz/">
        <div className="text-white text-sm md:text-base absolute right-20 flex justify-end tablet:-bottom-[6.2rem] cursor-pointer underline">
          DIY SYNTH
        </div>
      </a>
      <Link href={"https://twitter.com"} rel="noreferrer" target="_blank">
        <a className="absolute right-10 tablet:flex tablet:top-20">
          <GrTwitter
            color="white"
            className="cursor-pointer inline-flex"
          />
        </a>
      </Link>
      </div>
    </div>
  );
};
