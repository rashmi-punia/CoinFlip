
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ethers } from "ethers";

const Info = ({ contract, connected }) => {
  const [selectedSide, setSelectedSide] = useState("Head");
  const [betAmount, setBetAmount] = useState("");
  const [result, setResult] = useState("");

  console.log(result);

  useEffect(() => {
    if (contract) {
      console.log("Setting up event listener");
      contract.on("CoinFlipped", (player, won, amount) => {
        console.log("Event received:", player, won, amount);
        setResult(won ? "You won!" : "You lost!");
      });

      return () => {
        contract.removeAllListeners("CoinFlipped");
      };
    }
  }, [contract]);


  const flipCoin = async (guess) => {
    if (!connected) return;

    try {
      const tx = await contract.flipCoin(guess, {
        value: ethers.utils.parseEther(betAmount),
      });
      await tx.wait(); 
      contract.on("CoinFlipped", (player, won, amount) => {
        setResult(won ? "You won!" : "You lost!");
      });
    } catch (error) {
      console.error("Error flipping coin:", error);
      setResult("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="mt-12 relative text-center *:mb-8 sm:max-w-3xl max-w-xl mx-auto">
      <div className="flex items-center justify-between">
        <input
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          type="text"
          required
          placeholder="Enter your Bet Amount in ETH"
          className="py-3 pr-6 pl-1 h-fit rounded-sm text-black outline-2 focus:outline outline-purple-600"
        />

        <div className="flex gap-6">
          <button
            onClick={() => {
              setSelectedSide("Head");
              flipCoin(true);
            }}
            className={`${
              selectedSide === "Head"
                ? "bg-gradient-to-br from-sky-300 to-purple-400 font-bold shadow-md border-none shadow-purple-600"
                : ""
            } rounded-full w-20 h-20 border hover:bg-gradient-to-tr from-sky-300 to-purple-400 hover:font-bold`}
          >
            Head
          </button>
          <button
            onClick={() => {
              setSelectedSide("Tail");
              flipCoin(false);
            }}
            className={`${
              selectedSide === "Tail"
                ? "bg-gradient-to-tr from-sky-300 to-purple-400 font-bold shadow-md border-none shadow-sky-400"
                : ""
            } rounded-full w-20 h-20 border hover:bg-gradient-to-tr from-sky-300 to-purple-400 hover:font-bold`}
          >
            Tail
          </button>
        </div>
      </div>

      <Button
        variant="outlined"
        color="success"
        sx={{
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: "success.main", 
            color: "white", 
            border: "none", 
          },
        }}
      >
        Flip the Coin
      </Button>

      {result && (
        <div className="mt-8">
          <p className="text-2xl font-bold text-purple-600">{result}</p>
        </div>
      )}
    </div>
  );
};

export default Info;

