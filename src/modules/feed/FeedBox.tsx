import { FeedPosts } from "./components/FeedPosts";
import { useFeedTimeline } from "./hooks/useFeedTimeline";
import InfiniteScroll from "react-infinite-scroll-component";
import { Mirrors } from "./components/reactions/Mirrors";
import { Comments } from "./components/reactions/Comments";
import { LoadingFeed } from "../../common/components/lens/LoadingFeed";

export const FeedBox = (): JSX.Element => {
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
          <InfiniteScroll
            dataLength={publicationsFeed.length}
            next={getMoreFeed}
            hasMore={true}
            loader={<LoadingFeed />}
          >
            <FeedPosts
              publicationsFeed={publicationsFeed}
              getMoreFeed={getMoreFeed}
              getAvatar={getAvatar}
              checkImage={checkImage}
              imageURL={imageURL}
              profilePicture={profilePicture}
            />
            <Mirrors />
            <Comments />
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};
