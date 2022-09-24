import { NextPage } from "next";
import React from "react";
import { FeedPosts } from "./../modules/feed/components/FeedPosts";
import { useFeedTimeline } from "./../modules/feed/hooks/useFeedTimeline";

import { Mirrors } from "./../modules/feed/components/reactions/Mirrors";
import { Comments } from "./../modules/feed/components/reactions/Comments";
import { IoIosRefreshCircle } from "react-icons/io";

const Stream: NextPage = (): JSX.Element => {
  const {
    publicationsFeed,
    getMoreFeed,
    getFeedData
  } = useFeedTimeline();
  return (
    <div className="flex text-center w-full min-h-screen items-center">
      <div className="justify-center items-center flex">
      <div className="w-[45%] h-[80%] bg-offBlack z-30 absolute rounded-lg top-[10%] left-[27.5%] shadow-2xl shadow-black backdrop-blur-lg flex fixed">
        <div
          id="scrollableDiv"
          className="bg-white h-full w-full item-center rounded-lg overflow-y-hidden p-8 mr-4 ml-4 select-text overflow-x-clip"
        >
          <div className="relative flex justify-end -top-3 cursor-pointer"
          onClick={() => getFeedData()}
          >
            <IoIosRefreshCircle color="#86EEB4" size={30} />
          </div>
          <FeedPosts
            publicationsFeed={publicationsFeed}
            getMoreFeed={getMoreFeed}
          />
          {/* <Mirrors />
            <Comments /> */}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Stream;
