import moment from "moment";
import { FunctionComponent } from "react";
import { FaComments, FaRetweet } from "react-icons/fa";
import { HiCollection } from "react-icons/hi";
import InfiniteScroll from "react-infinite-scroll-component";
import { CommentsProps } from "../../../../types/lens/lenstypes.types";

export const Comments: FunctionComponent<CommentsProps> = ({
  getMoreCommented,
  commentsFeed,
  setStream,
  setId
}): JSX.Element => {
  return (
    <InfiniteScroll
      dataLength={commentsFeed.length}
      next={getMoreCommented}
      hasMore={true}
      loader={""}
      height={"40rem"}
      scrollableTarget="scrollableDiv"
    >
      {commentsFeed.map((comment: any, index: number) => {
        const splitContent = comment.metadata.content.split("\n");
        const description = splitContent[2];
        let profileImage: any;
        if (!comment.profile.picture) {
          profileImage = <></>;
        } else if (comment.profile.original) {
          if (comment.profile.picture.original.url.includes("http")) {
            profileImage = comment.profile.picture.original.url;
          } else {
            const cut = comment.profile.picture.original.url.split("/");
            profileImage = "https://" + cut[2] + ".ipfs.dweb.link/";
          }
        } else {
          profileImage = comment.profile.picture.uri;
        }

        return (
          <div key={index}>
            <div className="w-10 flex flex-col justify-start float-left">
              <a
                href={`https://lenster.xyz/u/${comment.profile.handle}`}
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
                href={`https://lenster.xyz/u/${comment.profile.handle}`}
                target="_blank"
                rel="noreferrer"
              >
                <b className="text-lensDark relative float-left font-sourceReg text-xs sm:text-base inline-flex">
                  @{comment.profile.handle}
                </b>
              </a>
              <div className="text-space text-xs font-sourceReg flex justify-end">
                {moment(`${comment.createdAt}`).fromNow()}
              </div>
              {comment.__typename === "Mirror" && (
                <div className="w-full flex justify-end relative">
                  <FaRetweet />
                </div>
              )}
            </div>
            <div className="mt-6 mb-24 rounded pt-4 pl-8 pr-8 pb-4 text-xs sm:text-base  shadow-md shadow-grad2">
              <div className="text-sm mt-10 text-offBlack font-sourceReg">
                {description}
              </div>
              {comment.metadata.media.length !== 0 && (
                <div>
                  {comment.metadata.media.map((media: any, index: number) => {
                    const newLink = media.original.url.split("/");
                    return (
                      <div key={index} className="mt-6 mb-4">
                        <img
                          src={"https://" + newLink[2] + ".ipfs.dweb.link/"}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              <ul className="mt-2 inline-block cursor-pointer font-sourceReg text-sm sm:text-base">
                <li
                  className="float-left ml-0 sm:m-1"
                  onClick={() => {
                    setStream("Collects");
                    setId(comment.id);
                  }}
                >
                  <HiCollection className="float-left relative top-[0.15rem] m-2 ml-0 align-middle" />
                  <span className="relative top-2 text-xs sm:top-1">
                    {comment.stats.totalAmountOfCollects}
                  </span>
                </li>
                <li
                  className="float-left sm:m-1"
                  onClick={() => {
                    setStream("Comments");
                    setId(comment.id);
                  }}
                >
                  <FaComments className="float-left relative top-1 text-xs m-2 align-middle" />
                  <span className="relative top-2 text-xs sm:top-1">
                    {comment.stats.totalAmountOfComments}
                  </span>
                </li>
                <li
                  className="float-left sm:m-1"
                  onClick={() => {
                    setStream("Mirrors");
                    setId(comment.id);
                  }}
                >
                  <FaRetweet className="float-left relative top-1 text-xs m-2 align-middle" />
                  <span className="relative top-2 text-xs sm:top-1">
                    {comment.stats.totalAmountOfMirrors}
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
