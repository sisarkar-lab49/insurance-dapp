# Project with Hardhat, React, Alchemy and Metamask

## Deploys a hello world contract to Goerli testnet. React frontend connects with metamask wallet to interact with smart contract.


* create a .env file in ***insurance-dapp***
```
API_URL = <alchemy api url>
PRIVATE_KEY = <metamask private key>
```
* create a .env file in ***frontend***
```
REACT_APP_ALCHEMY_KEY = <alchemy websocket url>
```

* commands:
```
npm install && npm run compile && npm run deploy
npm run ui
```