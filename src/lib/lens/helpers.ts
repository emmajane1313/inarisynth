import omitDeep from "omit-deep";
import { utils } from "ethers";

export const omit = (object: any, name: string) => {
    return omitDeep(object, name);
  };

  export const splitSignature = (signature: any) => {
    return utils.splitSignature(signature);
  };
  