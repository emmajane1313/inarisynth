import {
  PostArgsType,
  postContentType,
  useLensPostResult,
} from "../../../types/lens/lenstypes.types";
import { v4 as uuidv4 } from "uuid";
import {
  useAccount,
  usePrepareContractWrite,
  useSignTypedData,
  useContractWrite,
} from "wagmi";
import LensHubProxy from "./../../../abis/LensHubProxy.json";
import {
  LENS_HUB_PROXY_ADDRESS_MATIC,
  LENS_HUB_PROXY_ADDRESS_MUMBAI,
} from "../../../lib/lens/constants";
import { splitSignature, omit } from "../../../lib/lens/helpers";
import createPostTypedData from "../../../graphql/mutations/createPost";
import getDefaultProfile from "../../../graphql/queries/userProfile";
import checkIndexed from "../../../graphql/queries/indexer";
import { useState } from "react";

export const useLensPost = (): useLensPostResult => {
  const [args, setArgs] = useState<PostArgsType | undefined>();
  const [showPostButton, setShowPostButton] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [images, setImages] = useState<any[]>([]);
  const [contentURI, setContentURI] = useState<string>("");
  const { signTypedDataAsync } = useSignTypedData();
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    addressOrName: LENS_HUB_PROXY_ADDRESS_MUMBAI,
    contractInterface: LensHubProxy,
    functionName: "postWithSig",
    onError(error) {
      console.error("Error", error);
    },
    onSettled(error) {
      console.log("Settled", error);
    },
    onSuccess(error) {
      console.log("Success", error);
    },
    enabled: Boolean(enabled),
    args: [args],
  });

  const { writeAsync } = useContractWrite(config);

  const handleFileChange = (e: any): void => {
    e.preventDefault();
    let filesArray: any[] = [];
    if (e.target.files.length > 3) {
      alert("Maximum of 3 image uploads");
    } else {
      for (let i = 0; i < e.target.files.length; i++) {
        filesArray.push(e.target.files[i]);
      }
    }

    let finalImages: any[] = [];

    filesArray.forEach(async (image, index) => {
      let imageData = new FormData();
      imageData.append(`image${index}`, image);
      try {
        const response = await fetch("/api/media", {
          method: "POST",
          body: imageData
        });
        if (response.status !== 200) {
          console.log("ERROR", response);
        } else {
          console.log("File successfully submitted!");
          let responseJSON = await response.json();
          finalImages.push(responseJSON.cid);
          console.log("CID:", responseJSON.cid);
          return finalImages;
        }
      } catch (err) {
        console.error(err.message);
      } 
    });
    setImages(finalImages)
  };

  const uploadFiles = async (e: any): Promise<string> => {
    let newImages = [];
    images.forEach((image) => {
      newImages.push({
        item: "ipfs://" + image,
        type: "image/png",
        altTag: "",
      });
    });

    const data = {
      version: "2.0.0",
      metadata_id: uuidv4(),
      description: e.target.description.value,
      content: e.target.description.value,
      external_url: "https://www.inarisynth.xyz/",
      image: images[0] ? "ipfs://"+images[0] : null,
      imageMimeType: "image/png",
      name: e.target.prompt.value,
      mainContentFocus: "IMAGE",
      contentWarning: null,
      attributes: [
        {
          traitType: "string",
          key: "type",
          value: "post",
        },
      ],
      media: newImages,
      locale: "en",
      createdOn: new Date(),
      appId: "inarisynth",
    };

    console.log(JSON.stringify(data), "push this!!!")

    try {
      const response = await fetch("/api/ipfs", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.status !== 200) {
        console.log("ERROR", response);
      } else {
        console.log("Form successfully submitted!");
        let responseJSON = await response.json();
        console.log("CID:", responseJSON);
        setContentURI(responseJSON);
        return responseJSON;
      }
    } catch (err: any) {
      console.error(err.message);
    }
    return contentURI;
  };

  const handlePostData = async (e: any): Promise<void> => {
    e.preventDefault();

    try {
      const contentURI: string = await uploadFiles(e);

      const profile: any = await getDefaultProfile(address);

      const result: any = await createPostTypedData({
        profileId: profile.data.defaultProfile.id,
        contentURI: "ipfs://" + contentURI,
        collectModule: {
          revertCollectModule: true,
        },
        referenceModule: {
          followerOnlyReferenceModule: false,
        },
      });

      const typedData: any = result.data.createPostTypedData.typedData;

      const signature: any = await signTypedDataAsync({
        domain: omit(typedData?.domain, "__typename"),
        types: omit(typedData?.types, "__typename"),
        value: omit(typedData?.value, "__typename"),
      });

      const { v, r, s } = splitSignature(signature);

      const postArgs: PostArgsType = {
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
      setEnabled(true);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handlePostWrite = async (): Promise<void> => {
    console.log(args, ">>> args")
    const tx = await writeAsync?.();
    const res = await tx?.wait();

    setTimeout(async () => {
      const result = await checkIndexed(tx?.hash);
      console.log(result);
    }, 10000);
  };

  return {
    handlePostWrite,
    handlePostData,
    handleFileChange,
    showPostButton,
  };
};
