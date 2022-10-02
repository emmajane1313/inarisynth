import React, { FunctionComponent, useState } from "react";
import { ConnectWallet } from "../buttons/ConnectWallet";
import Image from "next/image";
import Link from "next/link";
import { LensAuth } from "../lens/LensAuth";
import { useAccount } from "wagmi";
import { TiThMenu } from "react-icons/ti";
import { HeaderProps } from "../../../types/general/general.types";

export const Header: FunctionComponent<HeaderProps> = ({
  setMenuModal,
}): JSX.Element => {
  const { isConnected } = useAccount();
  return (
    <div className="w-full inline-flex p-5 bg-transparent absolute z-30">
      <div className="absolute top-8 right-6 cursor-pointer">
        <TiThMenu
          color="#111313"
          size={25}
          onClick={() => setMenuModal(true)}
        />
      </div>
      <div className="absolute right-16 top-8">
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
      <div className="cursor-pointer hidden md:block left-20 top-8 text-distro text-offBlack sm:text-base absolute">
        <Link href="/">INARI SYNTH</Link>
      </div>
      <div className="absolute right-56">
        <LensAuth />
      </div>
    </div>
  );
};
