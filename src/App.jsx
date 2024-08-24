import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Info from "./components/Info";
import Result from "./components/Result";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import CoinFlipABI from "./CoinFlipABI.json";

const App = () => {
  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const setupContract = async () => {
      if (window.ethereum && account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
        const newContract = new ethers.Contract(
          contractAddress,
          CoinFlipABI,
          signer
        );
        setContract(newContract);
        setConnected(true);
      }
    };

    setupContract();
  }, [account]);

  return (
    <div className="bg-black/95 relative overflow-x-hidden text-slate-100">
      <div className="absolute w-64 h-64 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full opacity-70 -top-20 -left-20 filter blur-xl"></div>
      <motion.div
        initial={{
          x: "50%",
          y: 12,
          opacity: 0,
        }}
        animate={{
          x: 0,
          y: 0,
          opacity: 1,
          transition: {
            duration: 1,
            stiffness: 60,
            type: "spring",
          },
        }}
        className="absolute w-72 h-72 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 rounded-full opacity-70 -bottom-20 -right-20 filter blur-xl"
      ></motion.div>
      <motion.div className="absolute w-48 h-48 bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-50 top-1/3 left-1/3 filter blur-lg"></motion.div>
      <Header account={account} setAccount={setAccount} />
      <div className="text-center relative *:my-3 mt-12">
        <h2 className="font-bold tracking-wide text-7xl max-w-4xl mx-auto">
          Flip & Win: Double Your Tokens!
        </h2>
        <h3 className="text-md text-gray-400">
          Choose your side, place your bet, and
          <strong className="text-slate-100">
            {" "}
            let the coin decide your fortune
          </strong>
        </h3>
      </div>
      <Info contract={contract} connected={connected} />
      <Result />
    </div>
  );
};

export default App;
