const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account: ' + deployer.address);

  const Insurance = await ethers.getContractFactory("Insurance");
  console.log("Deploying Insurence Contract...");
  const insurance = await Insurance.deploy();
  console.log("Insurence Contract deployed to address:", insurance.address);

  const content = '\nINSURANCE_CONTRACT=' + insurance.address;

  fs.appendFileSync('./.env', content, (err) => {
    if (err) throw err;
    console.log('Insurance contract adddress updated in .env');
  })
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });