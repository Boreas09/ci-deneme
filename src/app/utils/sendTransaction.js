import { ethers, getBigInt, Transaction } from "ethers";
import { getWallet } from "./getWallet";
import { getProvider } from "./getProvier";

export async function sendTransaction(privateKey, formData) {
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
      value: getBigInt(formData.input6),
      gasLimit: 21000,
      maxFeePerGas: hexMaxFeePerGas,
      maxPriorityFeePerGas: hexMaxPriorityFeePerGas,
      nonce: hexNonce,
      chainId: await provider.getNetwork().then((network) => network.chainId),
      type: 2,
    };

    const signedTransaction = await wallet.signTransaction(transaction);

    const ethersTransactionObject = Transaction.from(signedTransaction);

    const unsignedSerialized = ethersTransactionObject.unsignedSerialized;

    const unsignedHash = ethersTransactionObject.unsignedHash;

    console.log(ethersTransactionObject);

    const txResponse = await provider.broadcastTransaction(signedTransaction);

    const receipt = await txResponse.wait();

    console.log(receipt);
    return {
      receipt,
      signedTransaction,
      ethersTransactionObject,
      unsignedSerialized,
      unsignedHash,
    };
  } catch (e) {
    console.log(e);
  }
}
