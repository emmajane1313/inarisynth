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
  getAvatar,
  checkImage,
  imageURL,
  profilePicture,
  getMoreFeed
}): JSX.Element => {

  return (
    <InfiniteScroll
    dataLength={publicationsFeed.length}
    next={getMoreFeed}
    hasMore={true}
    loader={<LoadingFeed />}
  >
    <div className="bg-white w-full h-[40rem] overflow-y-scroll overlow-x-hidden">
      {publicationsFeed.map((publication: any, index: number) => {
        return (
          <div key={index}>
            <div className="w-12 float-left">
              <a
                href={`https://lenster.xyz/u/${publication.profile.handle}`}
                target="_blank"
                rel="noreferrer"
              >
                {/* {getAvatar(publication.profile)} */}
              </a>
            </div>
            <div>
              <a
                href={`https://lenster.xyz/u/${publication.profile.handle}`}
                target="_blank"
                rel="noreferrer"
              >
                <b className="text-lensDark relative top-1 font-sourceReg text-xs sm:text-base float-left">
                  @{publication.profile.handle}
                </b>
              </a>
              <div className="text-space text-xs inline-block align-middle font-sourceReg mt-1.5 ml-2">
                {moment(`${publication.createdAt}`).fromNow()}
              </div>
            </div>
            <div className="mt-6 font-sourceReg mb-8 rounded pt-4 pl-8 pr-8 pb-4 border-solid text-xs sm:text-base border drop-shadow-md">
              <JSONPretty
                data={publication.metadata.content}
                className="break-words"
              />
              <div className="block relative -left-[10px]">
                {/* {publication.metadata.media.map((media: any, index: number) =>
                  media.original.mimeType.includes("image")
                    ? checkImage(media)
                    : null
                )} */}
              </div>
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
    </div>
    </InfiniteScroll>
  );
};
