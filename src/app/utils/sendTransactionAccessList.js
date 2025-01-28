import { ethers, parseUnits, BaseContract, Transaction } from "ethers";
import { getWallet } from "./getWallet";
import { getProvider } from "./getProvier";
import { USDC_CONTRACT_ADDRESS, USDC_CONTRACT_ABI } from "@/constants/USDC";
import { CALLER_ADDRESS, CALLER_CONTRACT_ABI } from "@/constants/CALLER";
import {
  CALCULATOR_ADDRESS,
  CALCULATOR_CONTRACT_ABI,
} from "@/constants/CALCULATOR";

export default async function sendTransactionAccessList(privateKey, formData) {
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

    const tx1 = {
      to: CALLER_ADDRESS,
      data: "0xf4acc7b5",
      value: 0,
      type: 2,
      gasLimit: 210000,
      maxFeePerGas: hexMaxFeePerGas,
      maxPriorityFeePerGas: hexMaxPriorityFeePerGas,
      nonce: hexNonce,
      chainId: await provider.getNetwork().then((network) => network.chainId),
      accessList: [
        {
          address: CALCULATOR_ADDRESS,
          storageKeys: [
            "0x0000000000000000000000000000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000000000000000000000000001",
          ],
        },
      ],
    };

    const callerContract = new BaseContract(
      CALLER_ADDRESS,
      CALLER_CONTRACT_ABI,
      wallet
    );

    const calculatorContract = new BaseContract(
      CALCULATOR_ADDRESS,
      CALCULATOR_CONTRACT_ABI,
      wallet
    );

    const signedTransaction = await wallet.signTransaction(tx1);

    const ethersTransactionObject = Transaction.from(signedTransaction);

    const unsignedSerialized = ethersTransactionObject.unsignedSerialized;

    const unsignedHash = ethersTransactionObject.unsignedHash;

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
