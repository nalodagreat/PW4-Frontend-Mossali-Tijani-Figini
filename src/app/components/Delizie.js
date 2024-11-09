"use client";

import React, { useState } from "react";
import styles from "../styles/Delizie.module.css";
import Image from "next/image";
import img1 from "../images/confetture.webp";
import img2 from "../images/biscmac.png";
import img3 from "../images/cioccolato.webp";
import img4 from "../images/torte.webp";

const Delizie = () => {
  const [showAll, setShowAll] = useState(false);

  const toggleShow = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <h1 className={styles.title1}>Le Nostre Delizie</h1>
      <div className={styles.presentazioneContainer}>
        <div className={styles.left}>
          <h1 className={styles.title}>Confetture e Marmellate</h1>
          <p className={styles.paragraph}>
            Nella nostra bellissima Boutique troverete ad aspettarvi anche le
            buonissime marmellate e confetture homemade. Dai gusti audaci, le
            nostre marmellate sono uniche e irresistibili, ma soprattutto buone!
            Prodotte esclusivamente in modo artigianale e con ingredienti di
            prima scelta sono ideali per una sana colazione o per una deliziosa
            merenda. Le trovate di vari gusti: arancia rossa e castagna,
            albicocca e camomilla, fragola e fava tonka, pesca e lavanda,
            pompelmo e pepe rosa e tanti altri! Le varianti sono molte e
            cambiano anche in base alla stagionalità! Queste deliziose
            confetture sono anche perfette come cadeau o come bomboniera per il
            vostro evento!
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <Image src={img1} className={styles.image} />
          </div>
        </div>
      </div>

      <div
        className={`${styles.presentazioneContainer} ${styles.reverseContainer}`}
      >
        <div className={styles.left}>
          <h1 className={styles.title}>Biscotti e Macarons</h1>
          <p className={styles.paragraph}>
            La pasticceria C’est la Vie propone deliziosi biscotti artigianali,
            pensati per accompagnare con gusto ogni momento della giornata:
            dalla colazione al tè del pomeriggio, dalla pausa mattutina alla
            coccola della sera. I nostri biscotti non sono semplici dolci, ma
            piccoli capolavori di pasticceria, con combinazioni uniche come
            nocciola e caramello salato, lampone e cioccolato, cioccolato e
            caffè, pistacchio e limone, cocco e rhum, e cocco con frutti
            esotici. Non dimenticare di assaporare i nostri macarons, dolcetti
            piccoli e coloratissimi che racchiudono un’esplosione di sapore tra
            due gusci morbidi e un cremoso ripieno, disponibili in una grande
            varietà di gusti.
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <Image src={img2} className={styles.image} />
          </div>
        </div>
      </div>

      {showAll && (
        <>
          <div className={styles.presentazioneContainer}>
            <div className={styles.left}>
              <h1 className={styles.title}>Tavolette di Cioccolato</h1>
              <p className={styles.paragraph}>
                Vieni a provare le nostre tavolette di cioccolato gourmet, un
                prodotto unico realizzato con passione e amore per la
                pasticceria. Ogni tavoletta è un'esperienza di gusto che unisce
                ingredienti di alta qualità e tecniche artigianali, pensata per
                sorprendere anche i palati più raffinati. Le nostre tavolette di
                Cioccolato Gourmet sono caratterizzate da contrasti di sapori
                innovativi e sorprendenti, progettate per seguire le evoluzioni
                del gusto e conquistare i nostri clienti. Un esempio della
                nostra creatività è la tavoletta gold: un delizioso cioccolato
                fondente Chimelb, arricchito da una golosa farcitura alla
                nocciola pralinata, con un profumo avvolgente di limone e
                zenzero.
              </p>
            </div>
            <div className={styles.right}>
              <div className={styles.imageWrapper}>
                <Image src={img3} className={styles.image} />
              </div>
            </div>
          </div>

          <div
            className={`${styles.presentazioneContainer} ${styles.reverseContainer}`}
          >
            <div className={styles.left}>
              <h1 className={styles.title}>Torte per eventi</h1>
              <p className={styles.paragraph}>
                Le nozze sono uno dei giorni più importanti della vita e le
                torte nuziali ne rappresentano il simbolo per eccellenza.
                Scegliete la nostra pasticceria per realizzare la vostra torta:
                un pasticciere esperto vi accompagnerà dagli assaggi fino al
                grande giorno, garantendo un’esperienza personalizzata e
                memorabile. Le nostre torte nuziali sono completamente
                personalizzabili, con la possibilità di optare per una torta a
                piani o più torte singole, entrambe di grande effetto e perfette
                per ogni stile di matrimonio. Collaboriamo con le migliori
                realtà di catering della zona per creare la decorazione perfetta
                e rendere il vostro giorno indimenticabile.
              </p>
            </div>
            <div className={styles.right}>
              <div className={styles.imageWrapper}>
                <Image src={img4} className={styles.image} />
              </div>
            </div>
          </div>
        </>
      )}

      <br />
      <br />
      <button className={styles.showMoreButton} onClick={toggleShow}>
        {showAll ? "Mostra meno" : "Mostra altro"}
      </button>
    </>
  );
};

export default Delizie;
