const fs = require('fs');
require('dotenv').config();

const { INSURANCE_CONTRACT } = process.env;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account: ', deployer.address);

  const Keeper = await ethers.getContractFactory("Keeper");
  console.log("Deploying Keeper Contract for insurance contract: ", INSURANCE_CONTRACT);
  const keeper = await Keeper.deploy(INSURANCE_CONTRACT);
  console.log("Keeper Contract deployed to address:", keeper.address);

  const content = '\nKEEPER_CONTRACT=' + keeper.address;

  fs.appendFileSync('./.env', content, (err) => {
    if (err) throw err;
    else console.log('Keeper contract adddress updated in .env');
  })
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });