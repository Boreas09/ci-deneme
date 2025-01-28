import { ethers, parseUnits, BaseContract, Transaction } from "ethers";
import { getWallet } from "./getWallet";
import { getProvider } from "./getProvier";
import { USDC_CONTRACT_ADDRESS, USDC_CONTRACT_ABI } from "@/constants/USDC";

export default async function sendTransactionUSDC(privateKey, formData) {
  try {
    const wallet = getWallet(privateKey);
    const provider = getProvider();
    const gasPrice = (await provider.getFeeData()).gasPrice;
    const hexGasPrice = ethers.toBeHex(gasPrice);
    const maxFeePerGas = (await provider.getFeeData()).maxFeePerGas;
    const hexMaxFeePerGas = ethers.toBeHex(maxFeePerGas);
    const maxPriorityFeePerGas = (await provider.getFeeData())
      .maxPriorityFeePerGas;
    const hexMaxPriorityFeePerGas = ethers.toBeHex(maxPriorityFeePerGas);
    const nonce = await provider.getTransactionCount(wallet.address);
    const hexNonce = ethers.toBeHex(nonce);

    const transaction = {
      to: formData.input3,
      value: formData.input6,
      gasLimit: 21000,
      maxFeePerGas: hexMaxFeePerGas,
      maxPriorityFeePerGas: hexMaxPriorityFeePerGas,
      nonce: hexNonce,
      chainId: await provider.getNetwork().then((network) => network.chainId),
      type: 2,
    };

    const usdcContract = new BaseContract(
      USDC_CONTRACT_ADDRESS,
      USDC_CONTRACT_ABI,
      wallet
    );
    const amount = parseUnits(formData.input6, 6);

    const tx = await usdcContract.transfer(formData.input3, amount);

    const ethersTransactionObject = Transaction.from(tx);
    const unsignedSerialized = ethersTransactionObject.unsignedSerialized;
    const unsignedHash = ethersTransactionObject.unsignedHash;

    const receipt = await tx.wait();
    console.log(receipt);
    return {
      receipt,
      ethersTransactionObject,
      unsignedHash,
      unsignedSerialized,
    };
  } catch (e) {
    console.log(e);
  }
}
