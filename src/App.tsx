import React, { useEffect, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { ethers } from "ethers";
import { ERC20_CONTRACT } from "./config";
import { LoadingContent, SuccessContent } from "./components/core/AlertContent";
import { toast } from "material-react-toastify";
import Navbar from "./components/Navbar";
import LoadingBtn from "./components/core/LoadingBtn";
import ConnectionButton from "./components/core/ConnectionButton";

function App() {
  const [amount, setAmount] = useState<string>("");
  const [receiverAccount, setReceiverAccount] = useState<string>("");
  const { address } = useAccount();

  const {
    isError: transferError,
    isSuccess: successTransfer,
    isLoading: loadingTransfer,
    write: transferToken,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...ERC20_CONTRACT,
    functionName: "transfer",
    args: [
      receiverAccount,
      ethers.utils.parseEther(amount ? amount?.toString() : "0"),
    ],
  });

  useEffect(() => {
    if (transferError) {
      toast.error("Encountered an error", { autoClose: false });
    } else if (loadingTransfer) {
      toast(<LoadingContent message={`Transferring ${amount} KNT!`} />);
    } else if (successTransfer) {
      toast(
        <SuccessContent message={`Transferred ${amount} KNT successfully!`} />
      );
      setAmount("");
      setReceiverAccount("");
    }
  }, [transferError, successTransfer, loadingTransfer, amount]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (address === receiverAccount) {
      toast.error("Cannot transfer token to the same address!");
      return;
    }

    // @ts-ignore;
    transferToken();
  };

  return (
    <div className="font-mono bg-blue_dark relative">
      <Navbar />

      {!address ? (
        <div className="flex flex-col justify-center items-center he__ro w-100 mx-auto">
          <ConnectionButton />

        </div>
      ) : (
        <div className="text-grey flex flex-col justify-center items-center he__ro w-100 mx-auto">
          <div className="border border-blue_deep p-12 rounded">
          <h3 className="text-3xl md:text-4xl font-medium text-center">
            KONOMI Transfer <br />
            <span className="text-lg font-normal">
              Transfer your Token here.
            </span>
          </h3>

          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="mt-2 form-field">
              <label className="md:hidden">Address</label>
              <input
                onChange={(e: any) => setReceiverAccount(e.target.value)}
                placeholder=" "
                autoFocus
                className="w-full border p-3 text-grey_dark border-blue_deep focus:outline-none rounded"
                disabled={loadingTransfer}
                />
                <label className="hidden md:block text-blue_deep">Address</label>
            </div>

            <div className="form-field mt-7">
              <label className="md:hidden">Amount</label>
              <input
                type={"number"}
                onChange={(e: any) => setAmount(e.target.value)}
                placeholder=" "
                className="w-full border p-3 text-grey_dark border-blue_deep focus:outline-none rounded"
                disabled={loadingTransfer}
              />
              <label className="hidden md:block text-blue_deep">Amount</label>
            </div>
            <p className="">Make sure you have Konomi Token [KNT]</p>

            <div className="mt-4">
              <LoadingBtn
                loading={loadingTransfer}
                loadingCopy={"Loading..."}
                copy={"Transfer"}
              />
            </div>
          </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
