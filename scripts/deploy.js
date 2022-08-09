const fs = require('fs');

async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");

  // Start deployment, returning a promise that resolves to a contract object
  const hello_world = await HelloWorld.deploy("Hello World!");   
  console.log("Contract deployed to address:", hello_world.address);

  const content = '\nREACT_APP_CONTRACT_ABI='+ hello_world.address;

  fs.appendFileSync('./frontend/.env', content, (err) => {
    if(err) throw err;
    console.log('contract adddress updated in frontend/.env');
  })
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });