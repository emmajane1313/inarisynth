import { useLensSignIn } from "../../../common/hooks/useLensSignIn";
import { PostData, useLensPostResult } from "../../../generated/lens/lenstypes.types";
import CREATE_POST from "../../../graphql/mutations/createPost";
import { client } from "../../../lib/lens/client";
import { useAccount } from "wagmi";


export const useLensPost = (): useLensPostResult => {

    const {lensProfile} = useLensSignIn();

    const {address} = useAccount();


  const writePublication = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
        const response = await client.mutation(CREATE_POST, {
            request: {
                profileId: lensProfile?.id,
                contentURI: `ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl`,
                collectModule: {
                    freeCollectModule: {
                        followerOnly: true
                    }
                },
                referenceModule: {
                    followerOnlyReferenceModule: false
                } 
            }
        }).toPromise()

        console.log(response)
        console.log(lensProfile)
        console.log(lensProfile?.id)


    } catch (err: any) {
        console.error(err.message)
    }
  }
 
  const handleFileChange = (e: any): any[] => {
    const allFiles = [e.target.files[0], e.target.files[1], e.target.files[2]]
    console.log(allFiles[0])
    return allFiles
  }

  // HASH IMAGES FIRST
  // THEN TAKE HAS STRINGS AND APPEND IN POST OBJECT
  // PUT POST OBJECT INTO FORM DATA API 
  // PASS THAT BACK TO IPFS HASH
  // PASS URI TO LENS

  const handleWritePost = (e: any): void => {
    e.preventDefault();
  
    // let Post: PostData = {
    //     prompt: e.target.prompt.value,
    //     description: e.target.description.value,
    //     files: {
    //         file1: ,
    //         file2: ,
    //         file3: ,
    //     }
    // }

    // let formData = new FormData()

  }

  const handleHashImages = (e: any): void => {
    e.preventDefault();
  }
  return { writePublication, handleHashImages, handleFileChange };
};
