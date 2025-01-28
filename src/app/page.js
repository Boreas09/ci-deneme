"use client";

import { useState } from "react";
import styles from "./page.module.css";
import TxSenderForm from "@/components/txSenderForm/txSenderForm";
import TxResult from "@/components/txResult/txResult";
import TxUtils from "@/components/txUtils/txUtils";

export default function Home() {
  const [ethReceipt, setEthReceipt] = useState(null);
  const [ethResultLoading, setEthResultLoading] = useState(false);
  const [signedTransaction, setSignedTransaction] = useState(null);
  const [ethTransactionObject, setEthTransactionObject] = useState(null);
  const [ethUnsignedSerialized, setEthUnsignedSerialized] = useState(null);
  const [ethUnsignedHash, setEthUnsignedHash] = useState(null);

  return (
    <div className={styles.container}>
      <TxSenderForm
        onReceiptUpdate={setEthReceipt}
        onResultUpdate={setEthResultLoading}
        onSignedTransactionUpdate={setSignedTransaction}
        onTransactionObjectUpdate={setEthTransactionObject}
        onUnsignedSerialized={setEthUnsignedSerialized}
        onUnsignedHash={setEthUnsignedHash}
      />
      <TxResult ethReceipt={ethReceipt} ethloading={ethResultLoading} />
      <TxUtils
        signedTransaction={signedTransaction}
        ethTransactionObject={ethTransactionObject}
        ethUnsignedSerialized={ethUnsignedSerialized}
        ethUnsignedHash={ethUnsignedHash}
      />
    </div>
  );
}
