import React, { FunctionComponent } from "react";
import { PostSwitchProps } from "../../../types/lens/lenstypes.types";

export const PostSwitch: FunctionComponent<PostSwitchProps> = ({
  loadingIPFS,
  showPostButton,
  loadingPost,
  onPostWrite,
  indexed
}): JSX.Element => {
  let action = "CREATE";

  // LOADING POST DOESNT WORK + AN EXTRA SIGNATURE REQUEST GETS CALLED FOR POSTING!!!!!

  const decideStringAction = () => {
    if (loadingIPFS || loadingPost) {
      action = "LOADING";
    }

    if (showPostButton) {
      action = "POST";
    }

    if (indexed) {
        action = "CREATE"
    }

    return action;
  };

  switch (decideStringAction()) {
    case "LOADING":
      return (
        <button
          type="submit"
          className="absolute p-2 text-white text-base bg-offBlack"
        >
          <div className="animate-spin bg-white"></div>
        </button>
      );

    case "POST":
      return (
        <button
          className="absolute p-2 text-white text-base bg-offBlack"
          onClick={onPostWrite}
        >
          POST
        </button>
      );

    default:
      return (
        <button
          type="submit"
          className="absolute p-2 text-white text-base bg-offBlack"
        >
          CREATE
        </button>
      );
  }
};
