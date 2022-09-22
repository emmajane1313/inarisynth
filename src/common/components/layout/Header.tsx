import React, { FunctionComponent } from "react";
import { ConnectWallet } from "../buttons/ConnectWallet";
import Image from "next/image";
import Link from "next/link";
import { LensAuth } from "../lens/LensAuth";
<<<<<<< HEAD

export const Header: FunctionComponent = (): JSX.Element => {
    return (
        <div className="w-full inline-flex p-5 bg-transparent absolute z-30">
            <div className="absolute right-6 top-8">
                <ConnectWallet />
            </div>
            <div className="cursor-pointer absolute hover:rotate-3 left-7">
                <Link href="/">
                    <a>
                    <Image priority src="/images/icons/logoinari.png" width={40} height={50} alt="logo"/>
                    </a>
                </Link>
            </div>
            <div className="cursor-pointer left-20 top-8 text-distro text-offBlack sm:text-base absolute">
                <Link href="/">
                    INARI SYNTH
                </Link>
            </div>
            <div className="absolute right-48">
                <LensAuth />
            </div>
        </div>
    )
}
=======
import { useAccount } from "wagmi";

export const Header: FunctionComponent = (): JSX.Element => {
  const { isConnected } = useAccount();
  return (
    <div className="w-full inline-flex p-5 bg-transparent absolute z-30">
      <div className="absolute right-6 top-8">
        <ConnectWallet />
      </div>
      <div className="cursor-pointer absolute hover:rotate-3 left-7">
        <Link href="/">
          <a>
            <Image
              priority
              src="/images/icons/logoinari.png"
              width={40}
              height={50}
              alt="logo"
            />
          </a>
        </Link>
      </div>
      <div className="cursor-pointer left-20 top-8 text-distro text-offBlack sm:text-base absolute">
        <Link href="/">INARI SYNTH</Link>
      </div>
      <div className="absolute right-48">
        <LensAuth />
      </div>
      {isConnected ? (
        <div className="absolute right-60 text-offBlack top-8 right-60 underline font-sourceReg">
          <Link href="/stream">STREAM</Link>
        </div>
      ) : (
        <div className="absolute right-[12rem] text-offBlack top-8 right-60 underline font-sourceReg">
          <Link href="/stream">STREAM</Link>
        </div>
      )}
    </div>
  );
};
>>>>>>> newer/main
