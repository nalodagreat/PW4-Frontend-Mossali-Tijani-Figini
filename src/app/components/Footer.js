import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Prima parte - Contatti e Orari */}
      <div className={styles.contactsSection}>
        <div className={styles.innerContainer}>
          <div className={styles.contactItem}>
            <h3 style={{ marginBottom: "2rem" }}>Sede e contatti</h3>
            <p>Via Carlo Croce, 4 - 21100 Varese (VA)</p>
            <p>Via Giuseppe Garibaldi, 5 - 21100 Varese (VA)</p>
            <p>+39 327 7380932</p>
            <p>pasticceriacestlavie@gmail.com</p>
          </div>
        </div>
        <div className={styles.innerContainer}>
          <div className={styles.contactItem}>
            <h3>Orari boutique</h3>
            <div className={styles.hoursBox}>
              <div className={styles.hoursRow}>
                <p>Lunedì</p>
                <p>Chiuso</p>
              </div>
              <div className={styles.hoursRow}>
                <p>Mar - Ven</p>
                <div>
                  <p>08:30 - 13:00</p>
                  <p>14:30 - 19:00</p>
                </div>
              </div>
              <div className={styles.hoursRow}>
                <p>Sabato</p>
                <p>09:00 - 19:00</p>
              </div>
              <div className={styles.hoursRow}>
                <p>Domenica</p>
                <div>
                  <p>09:00 - 13:00</p>
                  <p>15:00 - 19:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.innerContainer}>
          <div className={styles.contactItem}>
            <h3>Orari laboratorio</h3>
            <div className={styles.hoursBox}>
              <div className={styles.hoursRow}>
                <p>Lunedì</p>
                <p>Chiuso</p>
              </div>
              <div className={styles.hoursRow}>
                <p>Mar - Sab</p>
                <div>
                  <p>07:30 - 13:00</p>
                  <p>14:30 - 16:00</p>
                </div>
              </div>
              <div className={styles.hoursRow}>
                <p>Domenica</p>
                <p>08:00 - 12:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seconda parte - P.IVA */}
      <div className={styles.taxSection}>
        <p>P.I. 03468950120</p>
      </div>

      {/* Terza parte - Informazioni legali */}
      <div className={styles.legalSection}>
        <p>
          Informazioni Legali | Privacy Policy e Cookie Policy | Questa azienda
          è presente anche su Pagine Gialle e Pagine Bianche
        </p>
      </div>
    </footer>
  );
};

export default Footer;
