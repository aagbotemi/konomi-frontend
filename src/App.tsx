import React, { useEffect, useState } from "react";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { ethers } from "ethers";
import { DIAMOND_CONTRACT, DIAMOND_CONTRACT_ADDRESS } from "./config";
import { LoadingContent, SuccessContent } from "./components/core/AlertContent";
import { toast } from "material-react-toastify";
import Navbar from "./components/Navbar";
import LoadingBtn from "./components/core/LoadingBtn";
import ConnectionButton from "./components/core/ConnectionButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillCopy, AiOutlineCopy } from "react-icons/ai";

function App() {
  const [amount, setAmount] = useState<string>("");
  const [receiverAccount, setReceiverAccount] = useState<string>("");
  const { address } = useAccount();

  const {
    data: dataTransfer,
    isError: transferError,
    isLoading: loadingTransfer,
    write: transferToken,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...DIAMOND_CONTRACT,
    functionName: "transfer",
    args: [
      receiverAccount,
      ethers.utils.parseEther(amount ? amount?.toString() : "0"),
    ],
  });

  const { isLoading: isLoadingTxnWait } = useWaitForTransaction({
    hash: dataTransfer?.hash,
    onSuccess(data) {
      toast(
        <SuccessContent message={`Transferred ${amount} KNT successfully!`} />
      );
      setAmount("");
      setReceiverAccount("");
    },
    onError(error) {
      toast.error("Encountered an error", { autoClose: false });
    },
  })

  useEffect(() => {
    if (transferError) {
      toast.error("Encountered an error", { autoClose: false });
    } else if (loadingTransfer || isLoadingTxnWait) {
      toast(<LoadingContent message={`Transferring ${amount} KNT!`} />);
    }
  }, [transferError, loadingTransfer, amount, isLoadingTxnWait]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (address === receiverAccount) {
      toast.error("Cannot transfer token to the same address!");
      return;
    }

    // @ts-ignore;
    transferToken();
  };


  const [copy, setCopy] = useState(false);

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 3000);
    }
  }, [copy]);

  return (
    <div className="font-mono bg-blue_dark relative">
      <Navbar />

      {!address ? (
        <div className="flex flex-col justify-center items-center he__ro w-100 mx-auto">
          <ConnectionButton />
        </div>
      ) : (
        <div className="text-grey flex flex-col justify-center items-center he__ro w-100 mx-auto">
          <div className="text-xl mb-2">
          Contract Address:
          {DIAMOND_CONTRACT_ADDRESS.substring(0, 6).concat("...")}
              {DIAMOND_CONTRACT_ADDRESS.slice(-6)}
          <CopyToClipboard
                text={DIAMOND_CONTRACT_ADDRESS}
                onCopy={() => setCopy(true)}
              >
                <button>
                  {copy ? (
                    <AiFillCopy className="ml-2" color="teal" />
                  ) : (
                    <AiOutlineCopy className="ml-2" />
                  )}
                </button>
              </CopyToClipboard>
        </div>
          <div className="border border-blue_deep p-12 rounded">
            <h3 className="text-3xl md:text-4xl font-medium text-center">
              KONOMI Transfer
            </h3>
            <p className="text-lg leading-tight font-normal my-2 text-center">
              Transfer your Token here.
            </p>

            <form className="mt-5" onSubmit={handleSubmit}>
              <div className="mt-2 form-field">
                <label className="md:hidden">Address</label>
                <input
                  onChange={(e: any) => setReceiverAccount(e.target.value)}
                  placeholder=" "
                  value={receiverAccount}
                  autoFocus
                  className="w-full border p-3 text-grey_dark border-blue_deep focus:outline-none rounded"
                  disabled={loadingTransfer || isLoadingTxnWait}
                />
                <label className="hidden md:block text-blue_deep">
                  Address
                </label>
              </div>

              <div className="form-field mt-7">
                <label className="md:hidden">Amount</label>
                <input
                  type={"number"}
                  value={amount}
                  onChange={(e: any) => setAmount(e.target.value)}
                  placeholder=" "
                  className="w-full border p-3 text-grey_dark border-blue_deep focus:outline-none rounded"
                  disabled={loadingTransfer || isLoadingTxnWait}
                />
                <label className="hidden md:block text-blue_deep">Amount</label>
              </div>
              <p className="">Make sure you have Konomi Token [KNT]</p>

              <div className="mt-4">
                <LoadingBtn
                  loading={loadingTransfer || isLoadingTxnWait}
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
