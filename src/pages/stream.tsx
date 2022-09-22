import { NextPage } from "next";
import React from "react";
import { FeedBox } from "../modules/feed/FeedBox";

const Feed: NextPage = (): JSX.Element => {
  return (
    <div>
      <FeedBox />
    </div>
  );
};

export default Feed;
