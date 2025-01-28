"use client";

import React, { useState } from "react";
import styles from "./txSenderForm.module.css";
import { getPublicAddress } from "@/app/utils/getPublicAddress";
import { sendTransaction } from "@/app/utils/sendTransaction";
import sendTransactionUSDC from "@/app/utils/sendTransactionUSDC";
import sendTransactionAccessList from "@/app/utils/sendTransactionAccessList";
import sendTransactionWETH from "@/app/utils/sendTransactionWETH";

export default function TxSenderForm({
  onReceiptUpdate,
  onResultUpdate,
  onSignedTransactionUpdate,
  onTransactionObjectUpdate,
  onUnsignedSerialized,
  onUnsignedHash,
}) {
  const initialState = {
    input1: "1",
    input2: "",
    input3: "",
    input4: "",
    input5: getPublicAddress(""),
    input6: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      if (name === "input4" && (value.length === 64 || value.length === 66)) {
        updatedData.input5 = getPublicAddress(value);
      } else {
        updatedData.input5 = getPublicAddress("");
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.input1 === "1") {
      if (formData.input4.length > 10) {
        console.log("broadcast 1");
        const {
          receipt,
          signedTransaction,
          ethersTransactionObject,
          unsignedSerialized,
          unsignedHash,
        } = await sendTransaction(formData.input4, formData);
        onReceiptUpdate(receipt);
        onResultUpdate(true);
        onSignedTransactionUpdate(signedTransaction);
        onTransactionObjectUpdate(ethersTransactionObject);
        onUnsignedSerialized(unsignedSerialized);
        onUnsignedHash(unsignedHash);
      } else {
        alert("please enter private key");
      }
    } else if (formData.input1 === "2") {
      if (formData.input4.length > 10) {
        console.log("broadcast 2");
        const {
          receipt,
          ethersTransactionObject,
          unsignedSerialized,
          unsignedHash,
        } = await sendTransactionUSDC(formData.input4, formData);
        onReceiptUpdate(JSON.stringify(receipt, null, 2));
        onResultUpdate(true);
        onTransactionObjectUpdate(ethersTransactionObject);
        onUnsignedSerialized(unsignedSerialized);
        onUnsignedHash(unsignedHash);
      }
    } else if (formData.input1 === "3") {
      if (formData.input4.length > 10) {
        console.log("broadcast 3");
        const {
          receipt,
          signedTransaction,
          ethersTransactionObject,
          unsignedSerialized,
          unsignedHash,
        } = await sendTransactionAccessList(formData.input4, formData);
        onReceiptUpdate(JSON.stringify(receipt, null, 2));
        onResultUpdate(true);
        onSignedTransactionUpdate(signedTransaction);
        onTransactionObjectUpdate(ethersTransactionObject);
        onUnsignedSerialized(unsignedSerialized);
        onUnsignedHash(unsignedHash);
      }
    } else if (formData.input1 === "4") {
      if (formData.input4.length > 10) {
        console.log("broadcast 4");
        const {
          receipt,
          ethersTransactionObject,
          unsignedSerialized,
          unsignedHash,
        } = await sendTransactionWETH(formData.input4, formData);
        onReceiptUpdate(JSON.stringify(receipt, null, 2));
        onResultUpdate(true);
        onTransactionObjectUpdate(ethersTransactionObject);
        onUnsignedSerialized(unsignedSerialized);
        onUnsignedHash(unsignedHash);
      }
    }
  };

  const handleReset = () => {
    setFormData(initialState);
    onReceiptUpdate(null);
    onResultUpdate(false);
    onSignedTransactionUpdate(null);
  };

  const handleRosettaSubmit = () => {
    console.log("Form submitted to Rosetta", formData);
    // Add your logic to submit to Server 2 here
    // fetch("https://server2.example.com/submit", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log("Server 2 Response:", data))
    //   .catch((error) => console.error("Error submitting to Server 2:", error));
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formInputContainer}>
          <label>Method</label>

          <select
            type="text"
            name="input1"
            value={formData.input1}
            onChange={handleChange}
            className={styles.formInput}
          >
            <option value="1">Send Native Ethereum</option>
            <option value="2">Send USDC</option>
            <option value="3">Send With Access List</option>
            <option value="4">Deposit ETH to get WETH</option>
          </select>
        </div>
        <div className={styles.formInputContainer}>
          <label>Id</label>
          <input
            type="text"
            name="input2"
            value={formData.input2}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formInputContainer}>
          <label>Params</label>
          <input
            type="text"
            name="input3"
            value={formData.input3}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="Recipient Address"
          />
          <input
            type="text"
            name="input6"
            value={formData.input6}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="Value (ETH)"
          />
        </div>
        <div className={styles.formInputContainer}>
          <label>Private Key</label>
          <input
            type="text"
            name="input4"
            value={formData.input4}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formInputContainer}>
          <label>Public Address</label>
          <input
            type="text"
            name="input5"
            value={formData.input5}
            onChange={handleChange}
            className={styles.formInput}
            readOnly
            disabled
          />
        </div>
        <div className={styles.formButtonContainer}>
          <button type="submit" className={styles.formButton}>
            Submit to Ethereum
          </button>
          <button
            type="button"
            onClick={handleRosettaSubmit}
            className={styles.formButton}
          >
            Submit to Rosetta
          </button>
          <button
            type="button"
            onClick={handleReset}
            className={styles.formButton}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
