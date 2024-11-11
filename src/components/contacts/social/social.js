import React from "react";
import Image from "next/image"; 
import styles from "./social.module.css";

import instagram from "@/public/images/contacts/instagram.png";
import facebook from "@/public/images/contacts/facebook.png"; 

export default function Social() {
  return (
    <div className={styles.socialContainer}>
      <h2>Seguici sui social</h2>
      <div className={styles.socialBox}>
        <a href="https://www.instagram.com/pasticceriacestlavie/" target="_blank" rel="noopener noreferrer" className={styles.socialProfile}>
          <Image 
            src={instagram} 
            alt="Instagram" 
            width={32} 
            height={32} 
            className={styles.icon} 
          />
          <span className={styles.profileName}>@pasticceriacestlavie</span>
        </a>
        <a href="https://www.facebook.com/pasticceriacestlavie" target="_blank" rel="noopener noreferrer" className={styles.socialProfile}>
          <Image 
            src={facebook} 
            alt="Facebook" 
            width={32} 
            height={32} 
            className={styles.icon} 
          />
          <span className={styles.profileName}>Pasticceria C'est la Vie</span>
        </a>
      </div>
    </div>
  );
}
