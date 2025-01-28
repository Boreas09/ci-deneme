"use client";

import React from "react";
import styles from "./txResult.module.css";
import ResultCard from "./resultCard";

export default function TxResult({ ethReceipt, ethloading }) {
  return (
    <div className={styles.resultContainer}>
      <div className={styles.header}>
        <h1>Ethereum Result</h1>
      </div>
      <ResultCard
        jsonRpc="2.0"
        id="-"
        result={ethReceipt}
        loading={ethloading}
      />
      <div className={styles.header}>
        <h1>Rosettanet Result</h1>
      </div>
      <ResultCard jsonRpc="2.0" id="15" result="0x0" />
    </div>
  );
}
