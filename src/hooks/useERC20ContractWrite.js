import { ethers } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ERC20_CONTRACT } from "../config";

export const useERC20Write = (functionName = "", amount) => {
  const { config } = usePrepareContractWrite({
    ...ERC20_CONTRACT,
    functionName,
    // overrides: {
    //   value: ethers.utils.parseEther(value ? value?.toString() : "0"),
    // },
    args: [amount]
  });

  const { data, isError, isLoading, write, writeAsync } =
    useContractWrite(config);

  return { data, isError, isLoading, write, writeAsync };
};

// export default usePiggyCreateBank;
