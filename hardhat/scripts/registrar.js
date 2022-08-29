const fs = require('fs');
require('dotenv').config();

const { KEEPER_CONTRACT } = process.env;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('deploying contracts with the account: ', deployer.address);

  const Registrar = await ethers.getContractFactory("Registrar");
  console.log("deploying registrar contract for keeper contract: ", KEEPER_CONTRACT);
  const registrar = await Registrar.deploy(KEEPER_CONTRACT);
  console.log("registrar contract deployed to address:", registrar.address);

  const content = '\nREGISTRAR_CONTRACT=' + registrar.address;

  fs.appendFileSync('./.env', content, (err) => {
    if (err) throw err;
    else console.log('registrar contract adddress updated in .env');
  })
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
