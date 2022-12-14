import { FunctionComponent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MirrorsProps } from "../../../../types/lens/lenstypes.types";

export const Mirrors: FunctionComponent<MirrorsProps> = ({
  getMoreMirrored,
  mirrorsFeed,
}): JSX.Element => {
  return (
    <InfiniteScroll
      dataLength={mirrorsFeed.length}
      next={getMoreMirrored}
      hasMore={true}
      loader={""}
      height={"40rem"}
      scrollableTarget="scrollableDiv"
    >
      {mirrorsFeed.map((mirror: any, index: number) => {
        let profileImage: any;
        if (!mirror.picture) {
          profileImage = <></>;
        } else if (mirror.picture.original) {
          if (mirror.picture.original.url.includes("http")) {
            profileImage = mirror.picture.original.url;
          } else {
            const cut = mirror.picture.original.url.split("/");
            profileImage = "https://" + cut[2] + ".ipfs.dweb.link/";
          }
        } else {
          profileImage = mirror.picture.uri;
        }
        return (
          <div key={index} className="w-full shadow-md shadow-grad2 h-12 p-2 inline-flex m-3">
            <div className="w-10 flex flex-col justify-start float-left">
              <a
                href={`https://lenster.xyz/u/${mirror.handle}`}
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
                href={`https://lenster.xyz/u/${mirror.handle}`}
                target="_blank"
                rel="noreferrer"
              >
                <b className="text-lensDark relative float-left font-sourceReg text-xs sm:text-base inline-flex">
                  @{mirror.handle}
                </b>
              </a>
            </div>
          </div>
        );
      })}
    </InfiniteScroll>
  );
};
