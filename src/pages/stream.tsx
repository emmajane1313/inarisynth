import { NextPage } from "next";
import React from "react";
import { useFeedTimeline } from "./../modules/feed/hooks/useFeedTimeline";
import { IoIosRefreshCircle, IoMdArrowRoundBack } from "react-icons/io";
import { TimelineSwitch } from "../modules/feed/TimelineSwitch";

const Stream: NextPage = (): JSX.Element => {
  const {
    publicationsFeed,
    getMoreFeed,
    getFeedData,
    setStream,
    setId,
    stream,
    getMoreCollected,
    collectsFeed,
    getMoreMirrored,
    mirrorsFeed,
    getMoreCommented,
    commentsFeed,
  } = useFeedTimeline();
  return (
    <div className="flex text-center w-full min-h-screen lg:h-[70vw] items-center">
      <div className="justify-center items-center flex">
        <div className="tablet:w-[70%] w-full tablet:h-[60vw] h-[80%] bg-offBlack z-30 absolute rounded-lg tablet:top-[10%] top-[15%] left-0 tablet:left-[14%] shadow-2xl shadow-black backdrop-blur-lg flex fixed">
          <div
            id="scrollableDiv"
            className="bg-white h-full w-full item-center rounded-lg overflow-y-hidden p-8 mr-4 ml-4 select-text overflow-x-clip"
          >
            <div className="relative flex justify-end -top-3 cursor-pointer">
              <IoIosRefreshCircle
                color="#86EEB4"
                size={30}
                onClick={getFeedData}
              />
            </div>
            {(stream === "Mirrors" ||
              stream === "Comments" ||
              stream === "Collects") && (
              <div
                className="absolute flex justify-end top-5 cursor-pointer"
                onClick={() => setStream("POSTS")}
              >
                <IoMdArrowRoundBack color="#86EEB4" size={30} />
              </div>
            )}
            <TimelineSwitch
              stream={stream}
              publicationsFeed={publicationsFeed}
              getMoreFeed={getMoreFeed}
              setStream={setStream}
              setId={setId}
              getMoreCollected={getMoreCollected}
              collectsFeed={collectsFeed}
              getMoreMirrored={getMoreMirrored}
              mirrorsFeed={mirrorsFeed}
              getMoreCommented={getMoreCommented}
              commentsFeed={commentsFeed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stream;
