import React from "react";
import Image from "next/image";
import styles from "@/components/home/hero/hero.module.css";
import imageHero from "@/public/images/home/hero/imageHero.png";
import signature from "@/public/images/home/hero/signature.png";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroImageWrapper}>
        <Image
          src={imageHero}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className={styles.heroBackground}
        />
      </div>
      <div className={styles.heroContent}>
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroTitle}>
            <span className={styles.leftText}>"Dove ogni dolce</span>
            <span className={styles.rightText}>racconta una storia"</span>
          </h1>

          <div className={styles.heroSignatureWrapper}>
            <Image
              src={signature}
              alt="Signature of the Pastry Chef"
              className={styles.heroSignature}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
