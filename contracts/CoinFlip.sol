// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;

    event CoinFlipped(address indexed player, bool won, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function flipCoin(bool guess) public payable {
        require(msg.value > 0, "You need to bet some ether");

        // Generate a pseudo-random number (either 0 or 1)
        bool outcome = block.timestamp % 2 == 0;

        if (guess == outcome) {
            // Player wins, send double the amount back
            payable(msg.sender).transfer(msg.value * 2);
            emit CoinFlipped(msg.sender, true, msg.value * 2);
        } else {
            // Player loses, the contract keeps the ether
            emit CoinFlipped(msg.sender, false, msg.value);
        }
    }

    // Withdraw function for the owner to withdraw accumulated funds
    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    // Fallback function to receive ether
    receive() external payable {}
}
