const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('deploying contracts with the account: ' + deployer.address);

  const Insurance = await ethers.getContractFactory("Insurance");
  console.log("deploying insurence contract...");
  const insurance = await Insurance.deploy();
  console.log("insurence contract deployed to address:", insurance.address);

  const content = '\nINSURANCE_CONTRACT=' + insurance.address;

  fs.appendFileSync('./.env', content, (err) => {
    if (err) throw err;
    console.log('insurance contract adddress updated in .env');
  })
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
