import {
  Comment,
  FeeCollectModuleSettings,
  FeeFollowModuleSettings,
  FreeCollectModuleSettings,
  LimitedFeeCollectModuleSettings,
  LimitedTimedFeeCollectModuleSettings,
  Mirror,
  Notification,
  Post,
  Profile,
  ProfileFollowModuleSettings,
  ProfileMedia,
  RevertCollectModuleSettings,
  RevertFollowModuleSettings,
  TimedFeeCollectModuleSettings,
} from "./types.types";

export type LensterPublication = Post & Mirror & Comment & { pubId: string };
export type LensterNotification = Notification & { profile: Profile };
export type Community = Post;
export type LensterCollectModule = FreeCollectModuleSettings &
  FeeCollectModuleSettings &
  LimitedFeeCollectModuleSettings &
  LimitedTimedFeeCollectModuleSettings &
  RevertCollectModuleSettings &
  TimedFeeCollectModuleSettings;
export type LensterFollowModule = FeeFollowModuleSettings &
  ProfileFollowModuleSettings &
  RevertFollowModuleSettings;
export type LensterAttachment = { item: string; type: string; altTag: string };
export type UserSuggestion = {
  uid: string;
  id: string;
  display: string;
  name: string;
  picture: string;
};
export type UseLensSignInResults = {
  lensProfile?: Profile;
  lensLogin: () => void;
  handleLensModalClose: () => void;
  modalClose: boolean;
  hasProfile: string;
};
export type UseAuthResult = { auth: string; setAuth: (e: string) => void };
export type GetProfileProps = {
  handleLensModalClose: () => void;
  modalClose: boolean;
  lensLogin: () => void;
};
export type LensSignInProps = { lensLogin: () => void };
export type ProfileHandleProps = { lensProfile?: Profile };
export type useLensPostResult = {
  handlePostWrite: () => Promise<void>;
  handlePostData: (e: any) => void;
  showPostButton: boolean;
  onImageClick: (image: string) => any;
  imageSelect: any;
  removeFromImageArray: (image: string) => void;
  loadingIPFS: boolean;
  loadingPost: boolean;
  isConnected: boolean;
  indexed: boolean;
};
export type LensPostProps = {
  prompt: string;
  showPostButton: boolean;
  onPostWrite: () => Promise<void>;
  onPostData: (e: any) => void;
  imageSelect: string[];
  removeFromImageArray: (image: string) => void;
  promptImages: string[];
  loadingIPFS: boolean;
  loadingPost: boolean;
  indexed: boolean;
};
export type PostData = {
  prompt: string;
  description: string;
  files: {
    file1: string;
    file2: string;
    file3: string;
  };
};
export type PostArgsType = {
  profileId: string;
  contentURI: string;
  collectModule: string;
  collectModuleInitData: string;
  referenceModule: string;
  referenceModuleInitData: string;
  sig: {
    v: number;
    r: string;
    s: string;
    deadline: number;
  };
};

export type postContentType = {
  prompt: string;
  description: string;
  files?: string[];
};

export type useFeedTimelineResult = {
  publicationsFeed: any[];
  getMoreFeed: () => Promise<any>;
  getAvatar: (e: any) => any;
  checkImage: (e: any) => void;
  imageURL: string;
  profilePicture: any;
};

export type FeedPostsProps = {
  publicationsFeed: any[];
  getMoreFeed: () => Promise<any>;
  getAvatar: (e: any) => any;
  checkImage: (e: any) => void;
  imageURL: string;
  profilePicture: any;
};

export type GlobalProfileState = {
  profileExists: boolean;
  setProfileExists: (e: boolean) => void;
};

export type PostSwitchProps = {
  loadingIPFS: boolean;
  showPostButton: boolean;
  loadingPost: boolean;
  onPostWrite: () => Promise<void>;
  indexed: boolean;
};
