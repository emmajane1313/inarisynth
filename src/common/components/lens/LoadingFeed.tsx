import { FunctionComponent } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export const LoadingFeed: FunctionComponent = (): JSX.Element => {
    // console.log(pageInfo.totalCount, "info")
  return (<div>
    <div className="animate-spin absolute left-[50%] top-[93%] mt-2">
        <AiOutlineLoading color="black" />
    </div>
  </div>);
};
