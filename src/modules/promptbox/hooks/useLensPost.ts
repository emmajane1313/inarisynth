import {
  PostArgsType,
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
import { useMemo, useState } from "react";
import enabledCurrencies from "../../../graphql/queries/enabledCurrencies";

export const useLensPost = (): useLensPostResult => {
  const [args, setArgs] = useState<PostArgsType | undefined>();
  const [showPostButton, setShowPostButton] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [images, setImages] = useState<any[]>([]);
  const [contentURI, setContentURI] = useState<string>("");
  const { signTypedDataAsync } = useSignTypedData();
  const { address, isConnected } = useAccount();
  const [imageSelect, setImageSelect] = useState<string[]>([]);
  const [loadingIPFS, setLoadingIPFS] = useState<boolean>();
  const [loadingPost, setLoadingPost] = useState<boolean>();
  const [changed, setChanged] = useState<boolean>(false);
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>();
  const [collectionModule, setCollectionModule] = useState<string>();
  const [referral, setReferral] = useState<number>(0);
  const [currencies, setCurrencies] = useState<any[]>();
  const [timedCollectModal, setTimedCollectModal] = useState<boolean>();
  const [notAgain, setNotAgain] = useState<boolean>(false);

  const { config } = usePrepareContractWrite({
    addressOrName: LENS_HUB_PROXY_ADDRESS_MATIC,
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

  const onImageClick = async (image: string): Promise<void> => {
    setImageUploadLoading(true);
    let imagesArray = [];
    if (imageSelect.includes(image)) {
      imagesArray = imageSelect.filter((images: string) => images !== image);
    } else {
      imagesArray = [...imageSelect, image];
    }
    setImageSelect(imagesArray);
    if (imagesArray.length !== 0) {
      const finalImages: any = await mapNewImageArray(imagesArray);
    }
    setChanged(true);
  };

  const mapNewImageArray = async (imagesArray: string[]): Promise<any> => {
    let finalImages: any[] = [];
    imagesArray.map(async (img: any, index: number) => {
      const base64: any = await getBase64FromUrl(img);
      const res: Response = await fetch(base64);
      const blob: Blob = await res.blob();
      const file = new File([blob], "imageone", { type: "image/png" });

      let imageData = new FormData();
      imageData.append(`image${index}`, file);
      try {
        const response = await fetch("/api/media", {
          method: "POST",
          body: imageData,
        });
        if (response.status !== 200) {
          console.log("ERROR", response);
          setImageUploadLoading(false);
        } else {
          let responseJSON = await response.json();
          finalImages.push(responseJSON.cid);
          setImageUploadLoading(false);
          return finalImages;
        }
      } catch (err) {
        console.error(err.message);
      }
    });

    setImages(finalImages);
    return finalImages;
  };

  const getBase64FromUrl = async (url: string) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  const removeFromImageArray = (image: string) => {
    let imagesArray = [];
    if (imageSelect.includes(image)) {
      imagesArray = imageSelect.filter((images: string) => images !== image);
    }
    setImageSelect(imagesArray);
    setChanged(true);
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

    const promptValue = sessionStorage.getItem("prompt");
    const scaleValue = sessionStorage.getItem("scale");
    const stepsValue = sessionStorage.getItem("steps");
    const allContent =
      "Prompt: " +
      promptValue +
      "\n\n" +
      "Inference Steps: " +
      stepsValue +
      "    " +
      "Guidance Scale: " +
      scaleValue +
      "\n\n" +
      e.target.description.value;
     

    enum postTags {
      INARISYNTH = "INARISYNTH",
      DIYSYNTH = "DIYSYNTH",
      IMAGESYNTHESIS = "IMAGESYNTHESIS",
      AIART = "AIART",
      PROMPTENGINEERING = "PROMPTENGINEERING",
    }

    const data = {
      version: "2.0.0",
      metadata_id: uuidv4(),
      description: allContent ? allContent : "",
      content: allContent ? allContent : "",
      external_url: "https://www.inarisynth.xyz/",
      image: images[0] ? "ipfs://" + images[0] : null,
      imageMimeType: "image/png",
      name: promptValue !== "" ? "Inari Synth" : promptValue,
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
      postTags: postTags,
      createdOn: new Date(),
      appId: "inarisynth",
    };

    try {
      const response = await fetch("/api/ipfs", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.status !== 200) {
        console.log("ERROR", response);
      } else {
        let responseJSON = await response.json();
        setContentURI(responseJSON);
        return responseJSON;
      }
    } catch (err: any) {
      console.error(err.message);
    }
    return contentURI;
  };

  const handlePostData = async (e: any): Promise<void> => {
    e.preventDefault(e);
    setLoadingIPFS(true);
    let collectModuleType: any;
    let subCollectType: any;
    if (e.target.collect.value == "Free") {
      collectModuleType = {
        freeCollectModule: {
          followerOnly:
            e.target.follower.value == "0"
              ? false
              : Boolean(e.target.follower.value),
        },
      };
    } else if (e.target.collect.value == "Revert") {
      collectModuleType = {
        revertCollectModule: true,
      };
    } else if (
      e.target.collect.value == "Fee" ||
      e.target.collect.value == "Timed Fee"
    ) {
      subCollectType = {
        amount: {
          currency: e.target.currency.value,
          value: e.target.valueAmount.value,
        },
        recipient: address,
        referralFee: Number(Number(e.target.referral.value).toFixed(2)),
        followerOnly:
          e.target.follower.value == "0"
            ? false
            : Boolean(e.target.follower.value),
      };

      if (e.target.collect.value == "Fee") {
        collectModuleType = {
          feeCollectModule: subCollectType,
        };
      } else if (e.target.collect.value == "Timed Fee") {
        collectModuleType = {
          timedFeeCollectModule: subCollectType,
        };
      }
    } else if (
      e.target.collect.value == "Limited Fee" ||
      e.target.collect.value == "Limited Timed Fee"
    ) {
      subCollectType = {
        collectLimit: e.target.collectLimit.value ? e.target.collectLimit.value : "10",
        amount: {
          currency: e.target.currency.value,
          value: e.target.valueAmount.value,
        },
        recipient: address,
        referralFee: Number(Number(e.target.referral.value).toFixed(2)),
        followerOnly:
          e.target.follower.value == "0"
            ? false
            : Boolean(e.target.follower.value),
      };
      if (e.target.collect.value == "Limited Fee") {
        collectModuleType = {
          limitedFeeCollectModule: subCollectType,
        };
      } else if (e.target.collect.value == "Limited Timed Fee") {
        collectModuleType = {
          limitedTimedFeeCollectModule: subCollectType,
        };
      }
    }

    try {
      const contentURI: string = await uploadFiles(e);

      const profile: any = await getDefaultProfile(address);

      const result: any = await createPostTypedData({
        profileId: profile.data.defaultProfile.id,
        contentURI: "ipfs://" + contentURI,
        collectModule: collectModuleType,
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
      setEnabled(true);
      setShowPostButton(true);
      setChanged(false);
    } catch (err: any) {
      console.error(err.message);
      setShowPostButton(false);
    }
    setLoadingIPFS(false);
  };

  const handlePostWrite = async (): Promise<void> => {
    setLoadingPost(true);
    try {
      const tx = await writeAsync?.();
      const res = await tx?.wait();

      setTimeout(async () => {
        const result = await checkIndexed(tx?.hash);
        if (!result.data) {
          alert("Transaction Failed. Please Try Again.");
        } 
      }, 10000);
    } catch (err) {
      console.error(err);
      setLoadingPost(false);
    }
    setLoadingPost(false);
    setShowPostButton(false);
  };

  const availableCurrencies = async (): Promise<void> => {
    const response = await enabledCurrencies();
    setCurrencies(response.data.enabledModuleCurrencies);
  };

  useMemo(() => {
    availableCurrencies();
    if (!notAgain) {
      setTimedCollectModal(true);
    }
  }, [collectionModule]);

  return {
    handlePostWrite,
    handlePostData,
    showPostButton,
    onImageClick,
    imageSelect,
    removeFromImageArray,
    loadingIPFS,
    loadingPost,
    isConnected,
    changed,
    setChanged,
    imageUploadLoading,
    collectionModule,
    setCollectionModule,
    referral,
    setReferral,
    currencies,
    setTimedCollectModal,
    setNotAgain,
    notAgain,
    timedCollectModal,
  };
};
