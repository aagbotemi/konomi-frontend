import { useContractRead } from "wagmi";
import { ERC20_CONTRACT } from "../config";

export const useERC20Read = (functionName = "") => {
  const { data, isError, isLoading } = useContractRead({
    ...ERC20_CONTRACT,
    functionName,
  });

  return { data, isError, isLoading };
};

// export default usePiggyCreateBank;
