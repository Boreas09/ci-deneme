import React, { useEffect, useState } from "react";
import styles from "./txUtils.module.css";
import { decodeRlp, encodeRlp, hexlify, toBeHex } from "ethers";

export default function TxUtils({
  signedTransaction,
  ethTransactionObject,
  ethUnsignedSerialized,
  ethUnsignedHash,
}) {
  const [decodedRlp, setDecodedRlp] = useState(null);
  const [encodedRlp, setEncodedRlp] = useState(null);

  useEffect(() => {
    if (signedTransaction || ethUnsignedSerialized) {
      try {
        if (signedTransaction) {
          const signedTransactionWoutPrefix = "0x" + signedTransaction.slice(4);
          const decoded = decodeRlp(signedTransactionWoutPrefix);
          setDecodedRlp(decoded);
        } else {
          setDecodedRlp("No data");
        }
        if (ethUnsignedSerialized) {
          const encoded = encodeRlp(ethUnsignedSerialized);
          setEncodedRlp(encoded);
        } else {
          setEncodedRlp("No data");
        }
      } catch (error) {
        console.error("Error in utils:", error);
        setDecodedRlp("Invalid RLP data");
        setEncodedRlp("Invalid RLP data");
      }
    }
  }, [signedTransaction, ethUnsignedSerialized]);

  return (
    <div className={styles.txUtils}>
      <div className={styles.wrapper}>
        <h1>Transaction Object</h1>
        <pre className={styles.pre}>
          {ethTransactionObject
            ? JSON.stringify(ethTransactionObject, null, 2)
            : "No data"}
        </pre>
      </div>
      <div className={styles.wrapper}>
        <h1>Unsigned Serialized</h1>
        <pre className={styles.pre}>
          {ethUnsignedSerialized
            ? JSON.stringify(ethUnsignedSerialized, null, 2)
            : "No data"}
        </pre>
      </div>
      <div className={styles.wrapper}>
        <h1>Unsigned Hash</h1>
        <pre className={styles.pre}>
          {ethUnsignedHash
            ? JSON.stringify(ethUnsignedHash, null, 2)
            : "No data"}
        </pre>
      </div>
      <div className={styles.wrapper}>
        <h1>Encoded RLP</h1>
        <pre className={styles.pre}>
          {encodedRlp ? JSON.stringify(encodedRlp, null, 2) : "No data"}
        </pre>
      </div>
      <div className={styles.wrapper}>
        <h1>Decoded RLP</h1>
        <pre className={styles.pre}>
          {decodedRlp ? JSON.stringify(decodedRlp, null, 2) : "No data"}
        </pre>
      </div>
      <div className={styles.wrapper}>
        <h1>Signed Transaction</h1>
        <code>{signedTransaction ? signedTransaction : "No data"}</code>
      </div>
    </div>
  );
}
