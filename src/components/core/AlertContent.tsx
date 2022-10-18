import { BsFillPatchCheckFill } from "react-icons/bs";
import { ClipLoader } from "react-spinners";

export const SuccessContent = ({ message }: { message: string }) => (
  <div className="flex items-center">
    <BsFillPatchCheckFill fontSize={18} className="text-green mr-3" />
    <span className="text-grey_dark text-sm">{message}</span>
  </div>
);

export const LoadingContent = ({ message }: { message: string }) => (
  <div className="d-flex items-center">
    <ClipLoader size={18} loading={true} className={"text-blue_deep"} />
    <span className="text-grey_dark text-sm ml-3">{message}</span>
  </div>
);
