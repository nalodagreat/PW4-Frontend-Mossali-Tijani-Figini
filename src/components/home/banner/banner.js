import React from 'react';
import bannerImg from '@/public/images/home/banner/macarons.jpg';
import styles from './banner.module.css';

const Banner = () => {
  return (
    <div 
      className={styles.banner}
      style={{ backgroundImage: `url(${bannerImg.src})` }} // Imposta dinamicamente lo sfondo
    >
      {/* Altri contenuti */}
    </div>
  );
};

export default Banner;
