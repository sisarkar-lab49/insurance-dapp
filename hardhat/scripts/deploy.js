async function main() {
  const Insurance = await ethers.getContractFactory("Insurance");

  // Start deployment, returning a promise that resolves to a contract object
  const insurance = await Insurance.deploy();
  console.log("Contract deployed to address:", insurance.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });