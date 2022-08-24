async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account: ' + deployer.address);

  const Insurance = await ethers.getContractFactory("Insurance");
  console.log("Deploying Insurence Contract...");
  const insurance = await Insurance.deploy();
  console.log("Insurence Contract deployed to address:", insurance.address);

  const Keeper = await ethers.getContractFactory("Keeper");
  console.log("Deploying Keeper Contract...");
  const keeper = await Keeper.deploy(insurance.address);
  console.log("Keeper Contract deployed to address:", keeper.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });