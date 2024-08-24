import React, { useState, useEffect } from "react";

const WalletConnect = ({account,setAccount}) => {

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("MetaMask not detected! Please install MetaMask.");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center">
   
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Connect Wallet
        </button>
      
    </div>
  );
};

export default WalletConnect;
