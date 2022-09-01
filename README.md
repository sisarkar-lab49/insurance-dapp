# Project with Hardhat, React, Alchemy and Metamask

## Deploys a ****insureance, keeper, registrar*** contract on Goerli testnet. 
## React frontend connects with metamask wallet and interacts with smart contract usin ABI.

##### **SETUP**

* Run below commands:
```
pushd hardhat && npm install && popd
pushd frontend && npm install && popd
```
* create a .env file in ***insurance-dapp***
```
API_URL = <alchemy api url>
PRIVATE_KEY = <metamask private key>
REACT_APP_ALCHEMY_KEY = <alchemy websocket url>
```

##### **COMMANDS**
```
compile smart contract: pushd hardhat && npm run compile && popd
deploy smart contract:  pushd hardhat && npm run deploy && popd
build ui:               pushd frontend && npm run build && popd
start ui:               pushd frontend && npm start && popd
```
