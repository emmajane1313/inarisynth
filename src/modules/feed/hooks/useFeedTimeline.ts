import { useState, useEffect } from "react";
import { useFeedTimelineResult } from "../../../types/lens/lenstypes.types";
import exploreInariPublications from "../../../graphql/queries/explorePublications";

export const useFeedTimeline = (): useFeedTimelineResult => {
  const [publicationsFeed, setPublicationsFeed] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState<any>([]);

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
      console.log("info pages", response.data.explorePublications.pageInfo)
      return pageInfo;
    } catch (err) {
      console.error(err.message);
    }
  };

  return { publicationsFeed, getMoreFeed, pageInfo, getFeedData };
};
