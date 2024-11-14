"use client";

import React from "react";
import Account from "@/components/user/accountInfo/account";
import Order from "@/components/user/orderLog/order";
import styles from "./page.module.css";

export default function User() {
  return (
    <div className={styles.container}>
      <div className={styles.componentBox}>
        <Account />
      </div>
      <div className={`${styles.componentBox} ${styles.orderBox}`}>
        <Order />
      </div>
    </div>
  );
}
