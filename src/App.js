import { useEffect, useState } from "react";
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers';
import BaseButton from "./components/BaseButton";
import { injected } from "./utils/connectors";
import { toast } from 'react-toastify';

import KonomiToken from './artifacts/contracts/KonomiToken.sol/KonomiToken.json';

const tokenAddress = "0x8f782ab9BDC53F4F99C004257ecF36EFA7940F79";

function App() {
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [amount, setAmount] = useState(null);
  const [receiverAccount, setReceiverAccount] = useState('');
  const [isLoadingTransferToken, setIsLoadingTransferToken] = useState(false);

  toast.configure({
    autoClose: 7000,
    draggable: true,
  });

  const { active, account, library, connector, activate, deactivate } = useWeb3React();

  async function connectWallet() {
    setLoadingWallet(true)
    try {
      await activate(injected)
      setLoadingWallet(false);
    } catch (error) {
      console.log(error.message);
      setLoadingWallet(false);
    }
  }
  async function transferToken(e) {
    e.preventDefault();
    setIsLoadingTransferToken(true);

    try {
      if (typeof window.ethereum !== 'undefined') {
        const signer = library.getSigner();
        console.log("Signer: ", signer);
        const contract = new ethers.Contract(tokenAddress, KonomiToken.abi, signer);
        console.log("Contract: ", contract);
        const transaction = await contract.transfer(account, amount);
        console.log("Transaction: ", transaction);

        await transaction.wait();
        
        setIsLoadingTransferToken(false);


        const receiver = `${receiverAccount.substring(0, 6).concat('...')}${receiverAccount.slice(0, 4)}`;
        console.log(`${amount} Coins successfully sent to ${receiver}`);

        toast.dismiss();
        toast.success(`${amount} coins successfully sent to ${receiver}`, {
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
        });
      }
    } catch (error) {
      console.log(error)
      setIsLoadingTransferToken(false);

      toast.dismiss();
      toast.error(error.message, {
          position: "top-right",
          pauseOnHover: true,
          draggable: false,
      });
    }
  }

  return (
    <div>
      {!account ? (<div className="flex justify-center items-center min-h-screen">
        <button className="cursor-pointer bg-gray-700 text-white px-8 py-3 rounded font-medium" onClick={connectWallet}>
          {loadingWallet ? "Loading..." : 'Connect Wallet 💳'}
        </button>
      {/* { active ? <span> Connected with {account} </span> : 'Not Connected' } */}
      </div>) 
      : (
          <div className="flex flex-col justify-center items-center min-h-screen w-100 mx-auto">
            <h3 className="text-4xl font-medium">
              Transfer <br />
              <span className="text-lg font-normal">Transfer your Token here.</span>
            </h3>

            <form className="mt-3">
              <div className="mt-2">
                  <label>Address</label>
                  <br />
                  <input
                      onChange={e => setReceiverAccount(e.target.value)}
                      placeholder="Recipient Address"
                      autoFocus
                      className="w-full border p-2 focus:outline-none rounded"
                      disabled={isLoadingTransferToken}
                  />
              </div>
              <div className="mt-3">
                <label>Token Amount</label>
                <input
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-full border p-2 focus:outline-none rounded"
                  disabled={isLoadingTransferToken}
                />
              </div>
              <p className="">Make sure you have Konomi Token</p>

              <div className="mt-2">
                {
                  isLoadingTransferToken
                    ? <BaseButton
                      className="bg-gray-700 text-white px-8 py-2 rounded font-medium"
                      text="Loading..."
                      disabled={isLoadingTransferToken}
                    />
                    : <BaseButton
                        disabled={!amount && !receiverAccount}
                        className="bg-gray-700 text-white px-8 py-2 rounded font-medium"
                        text="Transfer"
                        onClick={transferToken}
                    />
                }
              </div>
            </form>
          </div>
        )
      }
    </div>
  );
}

export default App;
