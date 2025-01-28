import { ethers, BaseContract, Transaction, parseEther } from "ethers";
import { getWallet } from "./getWallet";
import { getProvider } from "./getProvier";
import { WETH_CONTRACT_ABI, WETH_CONTRACT_ADDRESS } from "@/constants/WETH";

export default async function sendTransactionWETH(privateKey, formData) {
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
      gasLimit: 21000000,
      maxFeePerGas: hexMaxFeePerGas,
      maxPriorityFeePerGas: hexMaxPriorityFeePerGas,
      nonce: hexNonce,
      chainId: await provider.getNetwork().then((network) => network.chainId),
      type: 2,
    };

    const wethContract = new BaseContract(
      WETH_CONTRACT_ADDRESS,
      WETH_CONTRACT_ABI,
      wallet
    );
    const amount = parseEther(formData.input6);

    const tx = await wethContract.deposit({ value: amount });

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
