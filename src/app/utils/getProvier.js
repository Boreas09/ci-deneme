import { ethers } from "ethers";

export function getProvider() {
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.public.blastapi.io"
  );
  return provider;
}
