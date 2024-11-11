import React from "react";
import Image from "next/image";
import styles from "./banner.module.css";
import bannerImg from "@/public/images/home/banner/macarons.jpg";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <Image
        src={bannerImg}
        alt="Macarons banner"
        layout="fill" // Copre tutta l'area del container
        objectFit="cover" // Adatta l'immagine all'interno dell'area
        quality={100} // (Opzionale) imposta la qualità dell'immagine
        priority // Carica l'immagine con priorità
      />
    </div>
  );
};

export default Banner;
