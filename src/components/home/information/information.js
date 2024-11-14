import React from 'react';
import styles from '@/components/home/information/information.module.css';
import Image from 'next/image';
import img1 from '@/public/images/home/information/imgInfo1.webp';
import img2 from '@/public/images/home/information/imgInfo2.webp';
import img3 from '@/public/images/home/information/imgInfo3.webp';
import Link from 'next/link'; // Importa il componente Link

const Information = () => {
  return (
    <div className={styles.informationContainer}>
      
      {/* Sezione sinistra */}
      <div className={styles.leftSection}>
        <div className={styles.hoursBox}>
          <div className={styles.hoursRow}>
            <p>Lunedì</p><p>Chiuso</p>
          </div>
          <div className={styles.hoursRow}>
            <p>Mar - Ven</p>
            <div>
              <p>08:00 - 13:00</p>
              <p>14:30 - 19:00</p>
            </div>
          </div>
          <div className={styles.hoursRow}>
            <p>Sab - Dom</p><p>14:30 - 19:00</p>
          </div>
        </div>
        <Image src={img1} alt="Pasticceria" className={styles.sideImage} width={300} height={300} style={{marginBottom:"-3re"}} />
      </div>

      {/* Sezione centrale */}
      <div className={styles.centerSection}>
        <Image src={img2} alt="Dolci" className={styles.centerImage} layout="responsive" width={600} height={900} />
      </div>

      {/* Sezione destra */}
      <div className={styles.rightSection}>
        <Image src={img3} alt="Pasticceria" className={styles.sideImage} width={300} height={300} />
        <div className={styles.shopInvitation}>
          <p style={{marginBottom:"1rem"}}>Visita il nostro shop <br/> per gustare i nostri dolci unici!</p>
          <Link href="/products">
            <button className={styles.shopButton}>Scopri di più</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Information;
