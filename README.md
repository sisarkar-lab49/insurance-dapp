# Project with Hardhat, React, Alchemy and Metamask

## Deploys a hello world contract to Goerli testnet. 
## React frontend connects with metamask wallet and interacts with smart contract usin ABI.

##### **SETUP**

* Run below commands:
```
npm install
cd frontend && npm install
```
* create a .env file in ***insurance-dapp***
```
API_URL = <alchemy api url>
PRIVATE_KEY = <metamask private key>
REACT_APP_ALCHEMY_KEY = <alchemy websocket url>
```

##### **COMMANDS**
```
compile smart contract: npm run compile
deploy smart contract:  npm run deploy
run react ui:           npm run ui
```