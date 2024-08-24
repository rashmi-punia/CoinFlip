import { Button } from '@mui/material';
import React, { useState } from 'react'
import { LiaBitcoin } from "react-icons/lia";
import {motion} from "framer-motion"
import { ethers } from 'ethers';
import WalletConnect from './WalletConnect';


const Header = ({account,setAccount}) => {
    const [walletAddress, setWalletAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


   const connectWallet = async () => {
     if (typeof window.ethereum !== "undefined") {
       try {
         // Request account access if needed
         await window.ethereum.request({ method: "eth_requestAccounts" });

         // Create an instance of Web3Provider
         const provider = new ethers.providers.Web3Provider(window.ethereum);

         // Get the signer (an abstraction for an Ethereum account)
         const signer = provider.getSigner();
         const address = await signer.getAddress();

         // Set the wallet address
         setWalletAddress(address);
       } catch (error) {
         setErrorMessage(error.message);
       }
     } else {
       setErrorMessage("Please install MetaMask!");
     }
   };

  return (
    <motion.div
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 50,
          damping: 10,
          duration: 1,
        },
      }}
      className="py-3 relative sm:px-5 lg:px-20 mx-auto"
    >
      <div className="bg-gray-800 flex items-center justify-between rounded-full py-3 sm:px-10 px-5 mx-10 text-slate-200">
        <div>
          <LiaBitcoin className="size-9" />
        </div>

       {
        account && (
            <p>Connected : {account}</p>
        )
       }

        {/* <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={connectWallet}
        >
          Connect Wallet
        </Button> */}
        <WalletConnect account={account} setAccount={setAccount} />
      </div>
    </motion.div>
  );
}

export default Header
