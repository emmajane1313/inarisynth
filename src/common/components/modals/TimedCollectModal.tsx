import React, { FunctionComponent } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { TimedCollectProps } from "../../../types/lens/lenstypes.types";

export const TimedCollectModal: FunctionComponent<TimedCollectProps> = ({
  setTimedCollectModal,
  setNotAgain,
  notAgain,
}): JSX.Element | null => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-sourceReg">
      <div className="relative bg-grad2 p-4 cursor-pointer rounded w-72">
        <AiFillCloseCircle
          color="#00501e"
          className="item-center right-0 top-0 p-0 m-2 absolute cursor-pointer"
          onClick={() => {
            setTimedCollectModal(false);
            sessionStorage.setItem("notAgain", String(notAgain));
          }}
        />
        <input
          type="checkbox"
          name="checkedNotAgain"
          onChange={() => setNotAgain(!notAgain)}
        />
        <h1 className="font-semibold text-center text-xl text-lensDark mt-4 mb-4">
          Your Post will only be live for collection of 24 hours!
        </h1>
      </div>
    </div>
  );
};
