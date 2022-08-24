require("dotenv").config();
const {REACT_APP_ALCHEMY_KEY, REACT_APP_CONTRACT_ADDRESS} = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(REACT_APP_ALCHEMY_KEY);

const contractABI = require("./insurance.json");

export const insuranceContract = new web3.eth.Contract(
  contractABI.abi,
  REACT_APP_CONTRACT_ADDRESS
);

export const loadContractBalance = async () => {
  const balance = await insuranceContract.methods.getBalance().call();
  return balance;
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        address: addressArray[0]
      };
      return obj;
    } catch (err) {
      return {
        address: ""
      };
    }
  } else {
    return {
      address: ""
    };
  }
};

export const buyPolicy = async () => {
  const response = await insuranceContract.methods.buyPolicy(
      "Gold",
      20,
      300000,
      0,
      20
  ).send({
      from:'0x75a562D72c3E31343E9C66B259aE72e346DEBc62',
      value: web3.utils.toWei('3000000', "Gwei")
  });
  return response;
}

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0]
        };
      } else {
        return {
          address: ""
        };
      }
    } catch (err) {
      return {
        address: ""
      };
    }
  } else {
    return {
      address: ""
    };
  }
};
