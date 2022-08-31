
const REACT_APP_ALCHEMY_KEY='wss://eth-goerli.g.alchemy.com/v2/HLPGu3vt9K-3TkEI2rOVblnsm5zY-9_4'

const REACT_APP_CONTRACT_ADDRESS='0x16453f4F466f4B34321935d1ABc736903D0D2014'

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

export const getAllPolicies = async () => {
    const policies = await insuranceContract.methods.getAllPolicies().call();
    return policies;
};

export const loadContractBalanceInUSD = async () => {
  const balance = await insuranceContract.methods.getBalanceInUSD().call();
  return balance;
};

export const calculatePremium = async (premiumcalculatorInput) => {
    const response = await insuranceContract.methods.calculatePremium(
        premiumcalculatorInput.policyName,
        premiumcalculatorInput.tenure,
        premiumcalculatorInput.sumInsured,
        premiumcalculatorInput.premiumFrequency,
        premiumcalculatorInput.age
    ).call();
    return response;
}

export const getGweiForDollar = async (amount) => {
    const response = await insuranceContract.methods.getGweiForDollar(amount).call();
    return response;
}

export const buyPolicy = async (inputRequest) => {
    const amount = inputRequest?.amountWei; 
  const amountToSend = web3.utils.toWei(amount.toString(), "Gwei")
  console.log('amount:::',amountToSend);
    const response = await insuranceContract.methods.buyPolicy(
        inputRequest.policyName,
        inputRequest.tenure,
        inputRequest.sumInsured,
        inputRequest.premiumFrequency,
        inputRequest.age
    ).send({
        from:inputRequest?.address,
        value: amountToSend
    });
    return response;
}

export const getSubscriptionForUser = async (address) => {
    const response = await insuranceContract.methods.getSubscriptions().call({from:address});
    return response;
}

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
