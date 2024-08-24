// import React, { useState } from "react";
// import { ethers } from "ethers";
// import CoinFlipABI from "./CoinFlipABI.json";

// const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

// const CoinFlip = () => {
//   const [guess, setGuess] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const flipCoin = async () => {
//     if (!window.ethereum) return alert("MetaMask not detected!");

//     setLoading(true);
//     setMessage("");

//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(contractAddress, CoinFlipABI, signer);

//     try {
//       const tx = await contract.flipCoin(guess, {
//         value: ethers.utils.parseEther("0.01"),
//       });
//       await tx.wait();

//       setMessage("Coin flipped successfully!");
//     } catch (error) {
//       setMessage("Error flipping coin: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div>
//         <button
//           onClick={() => setGuess(true)}
//           className={`p-2 m-2 ${guess ? "bg-green-500" : "bg-gray-500"}`}
//         >
//           Heads
//         </button>
//         <button
//           onClick={() => setGuess(false)}
//           className={`p-2 m-2 ${!guess ? "bg-green-500" : "bg-gray-500"}`}
//         >
//           Tails
//         </button>
//       </div>
//       <button
//         onClick={flipCoin}
//         className="bg-blue-500 text-white p-2 rounded"
//         disabled={loading}
//       >
//         {loading ? "Flipping..." : "Flip Coin"}
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default CoinFlip;
