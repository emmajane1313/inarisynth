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
  hasProfile: string;
  handleLensModalClose: () => void;
  modalClose: boolean;
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
  writePublication: (e: any) => void;
  handleHashImages: (e: any) => void;
  handleFileChange: (e: any) => any[];
};
export type LensPostProps = {
  prompt: string;
  writePublication: (e: any) => void;
  onHashImages: (e: any) => void;
  onFileChange: (e: any) => any[];
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
