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
        layout="fill" 
        objectFit="cover" 
        quality={100} 
        priority
      />
    </div>
  );
};

export default Banner;
