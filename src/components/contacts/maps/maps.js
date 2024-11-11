import React from "react";
import styles from "./maps.module.css";

export default function Map() {
  return (
    <div className={styles.mapContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.addressContainer}>
          <h2 className={styles.title}>SEDE E CONTATTI</h2>
          <p className={styles.address}>C'est la Vie</p>
          <p className={styles.address}>
            Via Carlo Croce, 4 - 21100 Varese (VA)
          </p>
          <p className={styles.address}>+39 327 7380932</p>
          <p className={styles.address}>pasticceriacestlavie@gmail.com</p>
        </div>
        <div className={styles.mapWrapper}>
          <iframe
            className={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2780.6023261549662!2d8.824324976125322!3d45.819222171082004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478680831df813a5%3A0x59e2eeb682bd2280!2sPasticceria%20C&#39;est%20la%20Vie!5e0!3m2!1sit!2sit!4v1731337229056!5m2!1sit!2sit"
            width="600"
            height="400"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
