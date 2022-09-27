import { useState, useEffect, useCallback } from "react";
import { useFeedTimelineResult } from "../../../types/lens/lenstypes.types";
import exploreInariPublications from "../../../graphql/queries/explorePublications";
import whoCollectedPublications from "../../../graphql/queries/whoCollectedPublication";
import whoMirroredPublications from "../../../graphql/queries/whoMirroredPublication";
import whoCommentedPublications from "../../../graphql/queries/whoCommentedPublication";

export const useFeedTimeline = (): useFeedTimelineResult => {
  const [publicationsFeed, setPublicationsFeed] = useState<any[]>([]);
  const [mirrorsFeed, setMirrorsFeed] = useState<any[]>([]);
  const [commentsFeed, setCommentsFeed] = useState<any[]>([]);
  const [collectsFeed, setCollectsFeed] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState<any>([]);
  const [stream, setStream] = useState<string>();
  const [id, setId] = useState<string>();

  useEffect(() => {
    getFeedData();
  }, []);

  useEffect(() => {
    if (stream === "Collects") {
      getCollected();
    }

    if (stream === "Mirrors") {
      getMirrored();
    }

    if (stream === "Comments") {
      getCommented();
    }
  }, [stream]);

  const getFeedData = async (): Promise<any[]> => {
    try {
      const response = await exploreInariPublications({
        sources: "inarisynth",
        publicationTypes: ["POST", "COMMENT", "MIRROR"],
        limit: 30,
        sortCriteria: "LATEST",
        noRandomize: true,
      });
      console.log(response);
      const arr: any[] = [...response.data.explorePublications.items];
      const sortedArr: any[] = arr.sort(
        (a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
      console.log(sortedArr);
      setPublicationsFeed(sortedArr);
      setPageInfo(response.data.explorePublications.pageInfo);
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
      return sortedArr;
    } catch (err) {
      console.error(err.message);
    }
  };

  const getCollected = async (): Promise<any[]> => {
    try {
      const response = await whoCollectedPublications({
        publicationId: id,
        limit: 30,
      });
      const arr: any[] = [...response.data.whoCollectedPublication.items];
      const sortedArr: any[] = arr.sort(
        (a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
      setCollectsFeed(sortedArr);
      setPageInfo(response.data.whoCollectedPublication.pageInfo);
      return sortedArr;
    } catch (err) {
      console.error(err.message);
    }
  };

  const getMoreCollected = async (): Promise<any> => {
    try {
      const response = await whoCollectedPublications({
        publicationId: id,
        limit: 30,
        cursor: pageInfo.next,
      });
      const arr: any[] = [...response.data.whoCollectedPublication.items];
      const sortedArr: any[] = arr.sort(
        (a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
      setCollectsFeed([...collectsFeed, ...sortedArr]);
      setPageInfo(response.data.whoCollectedPublication.pageInfo);
      return sortedArr;
    } catch (err) {
      console.error(err.message);
    }
  };

  const getMirrored = async (): Promise<any> => {
    try {
      const response = await whoMirroredPublications({
        whoMirroredPublicationId: id,
        limit: 30,
      });
      const arr: any[] = [...response.data.profiles.items];
      const sortedArr: any[] = arr.sort(
        (a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
      setMirrorsFeed(sortedArr);
      setPageInfo(response.data.profiles.pageInfo);
      return sortedArr;
    } catch (err) {
      console.error(err.message);
    }
  };

  const getMoreMirrored = async (): Promise<any> => {
    try {
      const response = await whoMirroredPublications({
        whoMirroredPublicationId: id,
        limit: 30,
        cursor: pageInfo.next,
      });
      const arr: any[] = [...response.data.profiles.items];
      const sortedArr: any[] = arr.sort(
        (a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
      setMirrorsFeed([...mirrorsFeed, ...sortedArr]);
      setPageInfo(response.data.profiles.pageInfo);
      return sortedArr;
    } catch (err) {
      console.error(err.message);
    }
  };

  const getCommented = async (): Promise<any> => {
    try {
      const response = await whoCommentedPublications({
        commentsOf: id,
        limit: 30,
      });
      const arr: any[] = [...response.data.publications.items];
      const sortedArr: any[] = arr.sort(
        (a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
      setCommentsFeed(sortedArr);
      setPageInfo(response.data.publications.pageInfo);
      return sortedArr;
    } catch (err) {
      console.error(err.message);
    }
  };

  const getMoreCommented = async (): Promise<any> => {
    try {
      const response = await whoCommentedPublications({
        commentsOf: id,
        limit: 30,
        cursor: pageInfo.next,
      });
      const arr: any[] = [...response.data.publications.items];
      const sortedArr: any[] = arr.sort(
        (a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
      setCommentsFeed([...commentsFeed, ...sortedArr]);
      setPageInfo(response.data.publications.pageInfo);
      return sortedArr;
    } catch (err) {
      console.error(err.message);
    }
  };

  return {
    publicationsFeed,
    getMoreFeed,
    pageInfo,
    getFeedData,
    stream,
    setStream,
    setId,
    collectsFeed,
    getMoreCollected,
    getMoreMirrored,
    mirrorsFeed,
    getMoreCommented,
    commentsFeed,
  };
};
