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
            <h2>
              Welcome <br /> Giacomo Aceti
            </h2>
            <br />
            <p>Email: giacomo.aceti@example.com</p>
          </div>
        </div>

        {/* Box per il tracciamento ordine */}
        <div className={styles.orderTrackingBox}>
          <h2 style={{ textAlign: "center" }}>Gestione Ordini in Lavorazione</h2>
          <div style={{ textAlign: "left" }}>
            <li>Ordine #12345 - Da Imballare</li>
            <li>Ordine #12344 - In Transito</li>
            <li>Ordine #12343 - Da Spedire</li>
          </div>
        </div>
      </div>

      {/* Secondo livello - 2 box in basso */}
      <div className={styles.bottomRow}>
        {/* Box per le notifiche push */}
        <div className={styles.notificationsBox}>
          <h2>Gestione Utenti</h2>
          <ul>
            <li>Mario Rossi - Da Accettare</li>
            <li>Luigi Verdi - Accettato</li>
            <li>Luca Bianchi - Da Accettare</li>
          </ul>
        </div>

        {/* Box per lo storico ordini */}
        <div className={styles.orderHistoryBox}>
          <h2>Storico Ordini</h2>
          <ul>
            <li>Ordine #12345 - Arrivato</li>
            <li>Ordine #12344 - Arrivato</li>
            <li>Ordine #12343 - Arrivato</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfiliUtente;
