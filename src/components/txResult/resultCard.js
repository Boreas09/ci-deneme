import React, { useEffect, useState } from "react";
import styles from "./resultCard.module.css";

export default function ResultCard({ jsonRpc, id, result, loading }) {
  const [resultJSX, setResultJSX] = useState(null);

  useEffect(() => {
    if (
      result &&
      typeof result === "object" &&
      !Array.isArray(result) &&
      Object.keys(result).length > 5
    ) {
      const jsx = Object.entries(result).map(([key, value]) => (
        <div key={key}>
          <span className={styles.label}>{key}:</span>{" "}
          <span className={styles.value}>
            {typeof value === "bigint"
              ? value.toString()
              : JSON.stringify(value)}
          </span>
        </div>
      ));
      setResultJSX(jsx);
      loading = false;
    }

    // ! else ile json stringfy edilmiş result u düzgün yazdır
  }, [result]);

  return (
    <div className={styles.card}>
      {loading ? (
        <>
          <div className={styles.wrapper}>
            <span className={styles.label}>JSON-RPC:</span>
            <span className={styles.value}>{jsonRpc}</span>
          </div>
          <div className={styles.wrapper}>
            <span className={styles.label}>ID:</span>
            <span className={styles.value}>{id}</span>
          </div>
          <div className={styles.wrapper}>
            <span className={styles.label}>Result:</span>
            <span className={styles.value}>{result}</span>
          </div>
          <div>{resultJSX}</div>
        </>
      ) : (
        <div className={styles.wrapper}>
          <span className={styles.label}>Waiting for transaction</span>
        </div>
      )}
    </div>
  );
}
