import { ethers, Wallet } from "ethers";

const provider = new ethers.JsonRpcProvider(
  "https://eth-sepolia.public.blastapi.io"
);

export function getWallet(privateKey) {
  const wallet = new Wallet(privateKey, provider);

  return wallet;
}
