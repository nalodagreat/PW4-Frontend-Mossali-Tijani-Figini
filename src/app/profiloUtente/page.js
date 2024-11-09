"use client";

import React from "react";
import styles from "../profiloUtente/page.module.css";
import profiloFoto from "../images/profilo.png";
import Image from "next/image";

const ProfiliUtente = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Primo livello - 2 box in alto */}
      <div className={styles.topRow}>
        {/* Box immagine profilo e benvenuto */}
        <div className={styles.profileBox}>
          <Image
            src={profiloFoto}
            alt="Profile"
            className={styles.profileImage}
          />
          <div className={styles.welcomeBox}>
            <h2>Welcome <br/> Mario Rossi</h2>
            <br /><p>Email: mario.rossi@example.com</p>
          </div>
        </div>

        {/* Box per il tracciamento ordine */}
        <div className={styles.orderTrackingBox}>
          <h2>Tracciamento Ordine</h2>
          <p>Ordine #: 12345</p>
          <p>Stato: In Preparazione</p>
        </div>
      </div>

      {/* Secondo livello - 2 box in basso */}
      <div className={styles.bottomRow}>
        {/* Box per le notifiche push */}
        <div className={styles.notificationsBox}>
          <h2>Notifiche Push</h2>
          <ul>
            <li>Ordine accettato dal pasticcere</li>
            <li>L'ordine è pronto per il ritiro</li>
            <li>Nuova promozione disponibile</li>
          </ul>
        </div>

        {/* Box per lo storico ordini */}
        <div className={styles.orderHistoryBox}>
          <h2>Storico Ordini</h2>
          <ul>
            <li>Ordine #12345 - Completo</li>
            <li>Ordine #12344 - Completo</li>
            <li>Ordine #12343 - Annullato</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfiliUtente;
