import { FunctionComponent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CollectsProps } from "../../../../types/lens/lenstypes.types";

export const Collects: FunctionComponent<CollectsProps> = ({
  getMoreCollected,
  collectsFeed,
}): JSX.Element => {
  return (
    <InfiniteScroll
      dataLength={collectsFeed.length}
      next={getMoreCollected}
      hasMore={true}
      loader={""}
      height={"40rem"}
      scrollableTarget="scrollableDiv"
    >
      {collectsFeed.map((collect: any, index: number) => {
        let profileImage: any;
        if (!collect.defaultProfile.picture) {
          profileImage = <></>;
        } else if (collect.defaultProfile.original) {
          if (collect.defaultProfile.picture.original.url.includes("http")) {
            profileImage = collect.defaultProfile.picture.original.url;
          } else {
            const cut = collect.defaultProfile.picture.original.url.split("/");
            profileImage = "https://" + cut[2] + ".ipfs.dweb.link/";
          }
        } else {
          profileImage = collect.defaultProfile.picture.uri;
        }
        return (
          <div
            key={index}
            className="w-full shadow-md shadow-grad2 h-12 p-2 inline-flex m-3"
          >
            <div className="w-10 flex flex-col justify-start float-left">
              <a
                href={`https://lenster.xyz/u/${collect.defaultProfile.handle}`}
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
                href={`https://lenster.xyz/u/${collect.defaultProfile.handle}`}
                target="_blank"
                rel="noreferrer"
              >
                <b className="text-lensDark relative float-left font-sourceReg text-xs sm:text-base inline-flex">
                  @{collect.defaultProfile.handle}
                </b>
              </a>
            </div>
          </div>
        );
      })}
    </InfiniteScroll>
  );
};
