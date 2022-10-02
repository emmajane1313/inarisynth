import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { MenuModalProps } from "../../../types/general/general.types";

export const Menu: FunctionComponent<MenuModalProps> = ({
  setMenuModal,
}): JSX.Element => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 bg-offBlack flex items-center justify-center z-50">
      <AiFillCloseCircle
        color="#F7F8E8"
        size={25}
        className="item-center right-3 top-3 p-0 m-2 absolute cursor-pointer"
        onClick={() => setMenuModal(false)}
      />
      <div className="absolute cursor-pointer text-offWhite top-20 text-lg md:text-xl underline font-sourceReg">
        {router.pathname === "/" ? (
          <Link href="/stream">
            <div onClick={() => setMenuModal(false)}>STREAM</div>
          </Link>
        ) : (
          <Link href="/">
            <div onClick={() => setMenuModal(false)}>SYNTH</div>
          </Link>
        )}
      </div>
    </div>
  );
};
