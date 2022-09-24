import { FunctionComponent } from "react";
import { TimelineSwitchProps } from "../../types/lens/lenstypes.types";
import { FeedPosts } from "./components/FeedPosts";
import { Collects } from "./components/reactions/Collects";
import { Comments } from "./components/reactions/Comments";
import { Mirrors } from "./components/reactions/Mirrors";

export const TimelineSwitch: FunctionComponent<TimelineSwitchProps> = ({
  stream,
  publicationsFeed,
  setStream,
  setId,
  getMoreFeed,
  getMoreCollected,
  collectsFeed,
  getMoreMirrored,
  mirrorsFeed,
  getMoreCommented,
  commentsFeed,
}): JSX.Element => {
  let action = "POSTS";

  const decideStringAction = () => {
    if (stream === "Mirrors") {
      action = "MIRRORS";
    }

    if (stream === "Comments") {
      action = "COMMENTS";
    }

    if (stream === "Collects") {
      action = "COLLECTS";
    }

    return action;
  };

  switch (decideStringAction()) {
    case "MIRRORS":
      return mirrorsFeed.length !== 0 ? (
        <Mirrors getMoreMirrored={getMoreMirrored} mirrorsFeed={mirrorsFeed} />
      ) : (
        <>Be the first to Mirror this Synth!</>
      );

    case "COMMENTS":
      return commentsFeed.length !== 0 ? (
        <Comments
          getMoreCommented={getMoreCommented}
          commentsFeed={commentsFeed}
          setStream={setStream}
          setId={setId}
        />
      ) : (
        <>Be the first to Comment on this Synth!</>
      );

    case "COLLECTS":
      return collectsFeed.length !== 0 ? (
        <Collects
          getMoreCollected={getMoreCollected}
          collectsFeed={collectsFeed}
        />
      ) : (
        <>Collect Module Coming Soon!</>
      );

    default:
      return (
        <FeedPosts
          publicationsFeed={publicationsFeed}
          getMoreFeed={getMoreFeed}
          setStream={setStream}
          setId={setId}
        />
      );
  }
};
