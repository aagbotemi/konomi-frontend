import { ethers } from "ethers";
import { toast } from "material-react-toastify";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { DIAMOND_CONTRACT } from "../config";
import { LoadingContent, SuccessContent } from "./core/AlertContent";
import BaseButton from "./core/BaseButton";
import ConnectionButton from "./core/ConnectionButton";
import LoadingBtn from "./core/LoadingBtn";

const Navbar = () => {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    data: mintTokenData,
    isError: errorMintToken,
    isLoading: loadingMintToken,
    write: mintToken,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...DIAMOND_CONTRACT,
    functionName: "mint",
    args: [ethers.utils.parseEther("1000")],
  });

  const { isLoading: isLoadingTxnWait } = useWaitForTransaction({
    hash: mintTokenData?.hash,
    onSuccess(data) {
      console.log('Success', data)
      toast(<SuccessContent message={"Minted 1000 KNT successfully!"} />);
    },
    onError(error) {
      toast.error("Encountered an error", { autoClose: false });
    },
  })

  useEffect(() => {
    if (errorMintToken) {
      toast.error("Encountered an error", { autoClose: false });
    } else if (loadingMintToken) {
      toast(<LoadingContent message={"Minting 1000 KNT!"} />);
    }
  }, [loadingMintToken, errorMintToken]);


  return (
    <Fragment>
      <div className="nav__bar flex items-center justify-between px-6 md:px-14 py-4">
        <div className="text-xl sm:text-2xl md:text-3xl text-blue_deep">
          <i>KONOMI</i>
        </div>

        <div className="md:flex hidden">
          {address && (
            <div className="mr-5">
              <LoadingBtn
                onClick={mintToken}
                loading={loadingMintToken || isLoadingTxnWait}
                loadingCopy={"Loading..."}
                copy={"Mint"}
              />
            </div>
          )}

          <ConnectionButton />
        </div>

        <AiOutlineMenu
          size={24}
          className="text-white flex md:hidden cursor-pointer"
          onClick={() => setIsOpen(true)}
          />
      </div>
      {isOpen && (
        <div
        className="animate__animated animate__fadeInRight absolute right-0 top-0 bg-purple_dark w-[80%] h-screen z-50"
        style={{ zIndex: "9999" }}
        >
          <AiOutlineClose
          onClick={() => setIsOpen(false)}
            size={24}
            className={"absolute cursor-pointer top-5 right-5 text-white font-bold"}
          />

          <div className="mt-20 flex flex-col justify-center items-center mx-auto w-[100%]">
            {address && (
              <div className="mb-4">
                <BaseButton
                  disabled={loadingMintToken || isLoadingTxnWait}
                  className="bg-blue text-white px-16 py-3 rounded-lg font-bold"
                  text={(loadingMintToken || isLoadingTxnWait) ? "Loading..." : "Mint"}
                  onClick={mintToken}
                />
              </div>
            )}

            <ConnectionButton />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Navbar;
