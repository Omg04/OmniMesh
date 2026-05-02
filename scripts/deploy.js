const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts to Monad Testnet...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy IdentityNFT
  const IdentityNFT = await hre.ethers.getContractFactory("IdentityNFT");
  const identityNFT = await IdentityNFT.deploy();
  await identityNFT.waitForDeployment();
  const identityAddress = await identityNFT.getAddress();
  console.log("IdentityNFT deployed to:", identityAddress);

  // Deploy CollectionRegistry
  const CollectionRegistry = await hre.ethers.getContractFactory("CollectionRegistry");
  const collectionRegistry = await CollectionRegistry.deploy();
  await collectionRegistry.waitForDeployment();
  const collectionAddress = await collectionRegistry.getAddress();
  console.log("CollectionRegistry deployed to:", collectionAddress);

  console.log("\nDeployment complete!");
  console.log("-------------------");
  console.log("NEXT_PUBLIC_IDENTITY_NFT_ADDRESS=" + identityAddress);
  console.log("NEXT_PUBLIC_COLLECTION_REGISTRY_ADDRESS=" + collectionAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
