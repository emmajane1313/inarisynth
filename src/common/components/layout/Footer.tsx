<<<<<<< HEAD
import React, { FunctionComponent } from "react";

export const Footer: FunctionComponent = (): JSX.Element => {
    return (
        <div>
        </div>
    )
}
=======
import Link from "next/link";
import React, { FunctionComponent } from "react";
import { GrTwitter } from "react-icons/gr";

export const Footer: FunctionComponent = (): JSX.Element => {
  return (
    <div className="bg-offBlack h-52 w-full font-sourceReg">
      <div className="text-white pb-2 text-2xl pt-16 pl-10">
        An image synthesis social network.
      </div>
      <div className="text-white p-1 pl-10 text-xl">
        Make it easy to run your own node, one prompt at a time.
      </div>
      <a href="diysynth">
        <div className="text-white text-base absolute right-20 -bottom-[11.2rem] cursor-pointer underline">
          DIY SYNTH
        </div>
      </a>
      <Link href={"https://twitter.com"} rel="noreferrer" target="_blank">
        <a>
          <GrTwitter
            color="white"
            className="absolute right-10 -bottom-44 cursor-pointer"
          />
        </a>
      </Link>
    </div>
  );
};
>>>>>>> newer/main
