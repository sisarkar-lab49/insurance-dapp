const fs = require('fs');
require('dotenv').config();

const { INSURANCE_CONTRACT } = process.env;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('deploying contracts with the account: ', deployer.address);

  const Keeper = await ethers.getContractFactory("Keeper");
  console.log("deploying keeper contract for insurance contract: ", INSURANCE_CONTRACT);
  const keeper = await Keeper.deploy(INSURANCE_CONTRACT);
  console.log("keeper contract deployed to address:", keeper.address);

  const content = '\nKEEPER_CONTRACT=' + keeper.address;

  fs.appendFileSync('./.env', content, (err) => {
    if (err) throw err;
    else console.log('keeper contract adddress updated in .env');
  })
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
