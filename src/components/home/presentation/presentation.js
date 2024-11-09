import styles from "@/components/home/presentation/presentation.module.css";
import imageChef from "@/public/images/home/presentation/pasticciere.webp";
import Image from "next/image";

const Presentation = () => {
  return (
    <div className={styles.presentazioneContainer}>
      <div className={styles.left}>
        <h1 className={styles.title}>
          Pasticceria C'est la Vie: <br /> “Emozioni Dolci a Varese”
        </h1>
        <p className={styles.paragraph}>
          Mi chiamo Giacomo Aceti e sono il titolare di C’est la Vie, una
          pasticceria artigianale nata nel 2015. <br />
          Nel laboratorio produciamo tutti i prodotti messi a disposizione del
          pubblico, con una continua ricerca di materie prime di alta qualità e
          una lavorazione che unisce tradizione e innovazione. <br />
          Accanto a me, uno staff giovane e preparato. <br />
          Formo personalmente il mio team trasmettendo valori fondamentali in
          questo lavoro:{" "}
          <strong>
            divertimento, passione, ricercatezza, innovazione e attenzione al
            dettaglio.
          </strong>{" "}
          <br />
          C’est la Vie è un luogo capace di sorprendere per l’amore trasmesso
          attraverso l’arte della pasticceria, ma anche per l’accoglienza
          informale: “Ci piace coinvolgere il cliente e trasmettere la nostra
          passione”. <br />
          Già dall’esterno, con la nostra elegante vetrina, è possibile ammirare
          i nostri deliziosi prodotti. <br />
          Una volta entrati, vi perderete in meravigliosi profumi e colori
          capaci di sorprendere e incuriosire.
        </p>
      </div>
      <div className={styles.right}>
        <Image src={imageChef} className={styles.image} />
      </div>
    </div>
  );
};

export default Presentation;
