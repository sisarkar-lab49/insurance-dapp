import React from "react";
import { useEffect, useState } from "react";
import {
  buyPolicy,
  connectWallet,
  loadContractBalance,
  getCurrentWalletConnected,
} from "./util/interact.js";

const Insurance = () => {
  const [walletAddress, setWallet] = useState("");
  const [balance, setBalance] = useState("No connection to the network."); 

  //called only once
  useEffect(async () => {
    const balance = await loadContractBalance();
    setBalance(balance);

    const { address } = await getCurrentWalletConnected();

    setWallet(address);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };

  const balanceClicked = async () => {
    const response = await buyPolicy();
    console.log("response on buy policy: ", response);
  };

  //the UI of our component
  return (
    <div id="container">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <h2 style={{ paddingTop: "50px" }}>Current Contract Balance:</h2>
      <p onClick={balanceClicked}>{balance}</p>
    </div>
  );
};

export default Insurance;
