import { useContractRead } from "wagmi";
import { DIAMOND_CONTRACT } from "../config";

export const useERC20Read = (functionName = "") => {
  const { data, isError, isLoading } = useContractRead({
    ...DIAMOND_CONTRACT,
    functionName,
  });

  return { data, isError, isLoading };
};

// export default usePiggyCreateBank;
