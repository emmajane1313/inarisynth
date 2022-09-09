import { useLensPostResult } from "./../../../generated/lens/lenstypes.types";
import {
  useAccount,
  usePrepareContractWrite,
  useSignTypedData,
  useContractWrite,
} from "wagmi";
import LensHubProxy from "./../../../abis/LensHubProxy.json";
import { LENS_HUB_PROXY_ADDRESS } from "../../../lib/lens/constants";
import { splitSignature, omit } from "../../../lib/lens/helpers";
import createPostTypedData from "../../../graphql/mutations/createPost";
import getDefaultProfile from "../../../graphql/queries/userProfile";
import { useState } from "react";

export const useLensPost = (): useLensPostResult => {
  const [args, setArgs] = useState({});
  const [showPostButton, setShowPostButton] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const { signTypedDataAsync } = useSignTypedData();
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    addressOrName: LENS_HUB_PROXY_ADDRESS,
    contractInterface: LensHubProxy,
    functionName: "postWithSig",
    onError(error) {
      console.log('Error', error)
    },
    onSettled(error) {
      console.log('Settled', error, "my args", args)
    },
    onSuccess(error) {
      console.log('Success', error, "my args", args)
    },
    enabled: Boolean(enabled),
    args: [args]
  });

  const { writeAsync } = useContractWrite(config);

  const handlePostData = async (e: any) => {
    e.preventDefault();
    try {
      const profile = await getDefaultProfile(address);
      console.log(profile.data.defaultProfile.id);

      const result = await createPostTypedData({
        profileId: profile.data.defaultProfile.id,
        contentURI: "https://ipfs.infura.io/ipfs/",
        collectModule: {
          revertCollectModule: true,
        },
        referenceModule: {
          followerOnlyReferenceModule: false,
        },
      });

      const typedData = result.data.createPostTypedData.typedData;

      const signature = await signTypedDataAsync({
        domain: omit(typedData?.domain, "__typename"),
        types: omit(typedData?.types, "__typename"),
        value: omit(typedData?.value, "__typename"),
      });

      const { v, r, s } = splitSignature(signature);

      const postArgs = {
        profileId: typedData.value.profileId,
        contentURI: typedData.value.contentURI,
        collectModule: typedData.value.collectModule,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      };

      setArgs(postArgs);
      setShowPostButton(true);
      console.log("inside", enabled)
      setEnabled(true);

    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handlePostWrite = async (): Promise<void> => {
    console.log("outside", enabled)
    console.log("outside", args)
    const tx = await writeAsync?.()
    console.log("tx", tx)
    const res = await tx?.wait()
    console.log("res",res)
  }


  const handleFileChange = (e: any): any[] => {
    const allFiles = [e.target.files[0], e.target.files[1], e.target.files[2]];
    console.log(allFiles[0]);
    return allFiles;
  };

  // HASH IMAGES FIRST
  // THEN TAKE HAS STRINGS AND APPEND IN POST OBJECT
  // PUT POST OBJECT INTO FORM DATA API
  // PASS THAT BACK TO IPFS HASH
  // PASS URI TO LENS

  const handleHashImages = (e: any): void => {
    e.preventDefault();
  };
  return { handlePostWrite, handlePostData, handleHashImages, handleFileChange, showPostButton };
};
