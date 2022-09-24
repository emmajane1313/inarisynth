import { FunctionComponent, useEffect } from "react";
import { FeedPostsProps } from "../../../types/lens/lenstypes.types";
import { Comments } from "./reactions/Comments";
import { FaComments, FaRetweet } from "react-icons/fa";
import { HiCollection } from "react-icons/hi";
import moment from "moment";
import JSONPretty from "react-json-pretty";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingFeed } from "./../../../common/components/lens/LoadingFeed";

export const FeedPosts: FunctionComponent<FeedPostsProps> = ({
  publicationsFeed,
  getMoreFeed,
}): JSX.Element => {
  return (
    <InfiniteScroll
      dataLength={publicationsFeed.length}
      next={getMoreFeed}
      hasMore={true}
      loader={""}
      height={"40rem"}
      scrollableTarget="scrollableDiv"
    >
      {publicationsFeed.map((publication: any, index: number) => {
        const splitContent = publication.metadata.content.split("\n");
        const prompt = splitContent[0];
        const description = splitContent[2];
        let profileImage: any;
        if (!publication.profile.picture) {
          profileImage = <></>;
        } else if (publication.profile.picture.original) {
          if (publication.profile.picture.original.url.includes("http")) {
            profileImage = publication.profile.picture.original.url;
          } else {
            const cut = publication.profile.picture.original.url.split("/");
            profileImage = "https://" + cut[2] + ".ipfs.dweb.link/";
          }
        } else {
          profileImage = publication.profile.picture.uri;
        }
        return (
          <div key={index}>
            <div className="w-10 flex flex-col justify-start float-left">
              <a
                href={`https://lenster.xyz/u/${publication.profile.handle}`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={profileImage}
                  className="w-8 h-8 rounded-full drop-shadow-md"
                />
              </a>
            </div>
            <div>
              <a
                href={`https://lenster.xyz/u/${publication.profile.handle}`}
                target="_blank"
                rel="noreferrer"
              >
                <b className="text-lensDark relative float-left font-sourceReg text-xs sm:text-base inline-flex">
                  @{publication.profile.handle}
                </b>
              </a>
              <div className="text-space text-xs font-sourceReg flex justify-end">
                {moment(`${publication.createdAt}`).fromNow()}
              </div>
              {publication.__typename === "Mirror" && (
                <div className="w-full flex justify-end relative">
                  <FaRetweet />
                </div>
              )}
            </div>
            <div className="mt-6 mb-24 rounded pt-4 pl-8 pr-8 pb-4 border-solid text-xs sm:text-base border drop-shadow-md">
              <div className="text-black text-sm m-2 font-sourceSemi">
                {prompt}
              </div>
              <div className="text-sm mt-10 text-offBlack font-sourceReg">
                {description}
              </div>
              {publication.metadata.media.length !== 0 && (
                <div>
                  {publication.metadata.media.map(
                    (media: any, index: number) => {
                      const newLink = media.original.url.split("/");
                      return (
                        <div key={index} className="mt-6">
                          <img
                            src={"https://" + newLink[2] + ".ipfs.dweb.link/"}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              )}
              <ul className="mt-2 inline-block cursor-pointer font-sourceReg text-sm sm:text-base">
                <li className="float-left ml-0 sm:m-1">
                  <HiCollection className="float-left relative top-[0.15rem] m-2 ml-0 align-middle" />
                  <span className="relative top-2 text-xs sm:top-1">
                    {publication.stats.totalAmountOfCollects}
                  </span>
                </li>
                <li className="float-left sm:m-1">
                  <FaComments className="float-left relative top-1 text-xs m-2 align-middle" />
                  <span className="relative top-2 text-xs sm:top-1">
                    {publication.stats.totalAmountOfComments}
                  </span>
                </li>
                <li className="float-left sm:m-1">
                  <FaRetweet className="float-left relative top-1 text-xs m-2 align-middle" />
                  <span className="relative top-2 text-xs sm:top-1">
                    {publication.stats.totalAmountOfMirrors}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </InfiniteScroll>
  );
};
