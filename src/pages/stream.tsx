import { NextPage } from "next";
import React from "react";
import { FeedPosts } from "./../modules/feed/components/FeedPosts";
import { useFeedTimeline } from "./../modules/feed/hooks/useFeedTimeline";

import { Mirrors } from "./../modules/feed/components/reactions/Mirrors";
import { Comments } from "./../modules/feed/components/reactions/Comments";

const Stream: NextPage = (): JSX.Element => {
  const {
    publicationsFeed,
    getMoreFeed,
    getAvatar,
    checkImage,
    imageURL,
    profilePicture,
  } = useFeedTimeline();
  return (
    <div className="flex text-center relative w-full min-h-screen">
      <div className="w-[45%] h-[80%] fixed bg-offBlack z-30 absolute rounded-lg top-[10%] left-[27.5%] shadow-2xl shadow-black backdrop-blur-lg">
        <div className="cursor-auto p-6 mr-2 ml-2 rounded-lg mb-5 item-center overflow-none select-text h-full">
            <FeedPosts
              publicationsFeed={publicationsFeed}
              getMoreFeed={getMoreFeed}
              getAvatar={getAvatar}
              checkImage={checkImage}
              imageURL={imageURL}
              profilePicture={profilePicture}
            />
            {/* <Mirrors />
            <Comments /> */}
        </div>
      </div>
    </div>
  );
};

export default Stream;
