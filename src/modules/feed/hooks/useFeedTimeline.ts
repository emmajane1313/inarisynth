import { useState, useEffect } from "react";
import { useFeedTimelineResult } from "../../../types/lens/lenstypes.types";
import exploreInariPublications from "../../../graphql/queries/explorePublications";

export const useFeedTimeline = (): useFeedTimelineResult => {
  const [publicationsFeed, setPublicationsFeed] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState<any>([]);
  const [imageURL, setImageURL] = useState<string>();
  const [profilePicture, setProfilePicture] = useState<any>();

  useEffect(() => {
    getFeedData();
  }, []);

  const getFeedData = async (): Promise<any[]> => {
    try {
      const response = await exploreInariPublications({
        sources: "inarisynth",
        publicationTypes: ["POST", "COMMENT", "MIRROR"],
        limit: 30,
        sortCriteria: "LATEST",
        noRandomize: true,
      });
      const arr: any[] = [...response.data.explorePublications.items];
      const sortedArr: any[] = arr.sort(
        (a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
      setPublicationsFeed(sortedArr);
      console.log(sortedArr);
      return sortedArr;
    } catch (err) {
      console.error(err.message);
    }
  };

  const getMoreFeed = async (): Promise<any> => {
    try {
      const response = await exploreInariPublications({
        sources: "inarisynth",
        publicationTypes: ["POST", "COMMENT", "MIRROR"],
        limit: 30,
        sortCriteria: "LATEST",
        noRandomize: true,
        cursor: pageInfo.next,
      });
      const arr: any[] = [...response.data.explorePublications.items];
      const sortedArr: any[] = arr.sort(
        (a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
      setPublicationsFeed([...publicationsFeed, ...sortedArr]);
      setPageInfo(response.data.explorePublications.pageInfo);
      return pageInfo;
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkImage = (media: any): void => {
    if (media.original.url.includes("http")) {
      setImageURL(media.original.url);
    } else {
      const cut = media.original.url.split("/");
      const link = "https://lens.infura-ipfs.io/ipfs/" + cut[cut.length - 1];
      setImageURL(link);
    }
  };

  const getAvatar = (profile: any): any => {
    if (!profile.picture) {
      setProfilePicture("default");
    } else if (profile.picture.original) {
      if (profile.picture.original.url.includes("http")) {
        setProfilePicture(profile.picture.original.url);
      } else {
        const cut = profile.picture.original.url.split("/");
        const link = "https://lens.infura-ipfs.io/ipfs/" + cut[cut.length - 1];
        setProfilePicture(link);
      }
    } else {
      setProfilePicture(profile.picture.uri);
    }
  };

  return { publicationsFeed, getMoreFeed, getAvatar, checkImage, imageURL, profilePicture };
};
