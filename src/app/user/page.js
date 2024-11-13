"use client";

import React from "react";
import Account from "@/components/user/accountInfo/account";
import Products from "@/components/user/products/products";
import Order from "@/components/user/orderLog/order";
import styles from './page.module.css';  // Importa il CSS

export default function User() {
    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.topRow}>
                <div className={styles.profileBox}>
                    <Account />
                </div>
                <div className={styles.orderTrackingBox}>
                    <h2>Tracking Ordini</h2>
                    <p>Informazioni sul tracking degli ordini.</p>
                </div>
            </div>
            <div className={styles.bottomRow}>
                <div className={styles.notificationsBox}>
                    <h2>Notifiche</h2>
                    <ul>
                        <li>Notifica 1</li>
                        <li>Notifica 2</li>
                    </ul>
                </div>
                <div className={styles.orderHistoryBox}>
                    <h2>Storico Ordini</h2>
                    <ul>
                        <li>Ordine 1</li>
                        <li>Ordine 2</li>
                    </ul>
                </div>
            </div>
            <Products />
            <Order />
        </div>
    );
};
