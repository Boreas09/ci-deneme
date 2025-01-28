import { getWallet } from "./getWallet";

export function getPublicAddress(privateKey) {
  if (privateKey.length === 64 || privateKey.length === 66) {
    try {
      const wallet = getWallet(privateKey);
      const publicAddress = wallet.address;
      return publicAddress;
    } catch {
      return "Invalid private key";
    }
  }

  return "Please enter private key";
}
