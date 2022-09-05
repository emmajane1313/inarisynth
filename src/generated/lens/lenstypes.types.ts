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
  RevertCollectModuleSettings,
  RevertFollowModuleSettings,
  TimedFeeCollectModuleSettings
} from './types.types';

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
export type UseLensSignInResults = {lensProfile: Profile, lensLogin: () => void, hasProfile: string, handleLensModalClose: () => void, modalClose: boolean}
export type UseAuthResult = {auth: string, setAuth: (e:string) => void}
export type GetProfileProps = { handleLensModalClose: () => void, modalClose: boolean, lensLogin: () => void}
export type LensSignInProps = {lensLogin: () => void}