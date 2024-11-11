import React from "react";
import Image from "next/image";
import styles from "@/components/home/hero/hero.module.css";
import imageHero from "@/public/images/contacts/background.svg";

const HeroContacts = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroImageWrapper}>
        <Image
          src={imageHero}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle} style={{color: "black", fontFamily: 'Montserrat', fontWeight:"normal"} }>CONTATTI</h1>
      </div>
    </section>
  );
};

export default HeroContacts;
