import Image from "next/image";
import styles from "./form.module.css";
import formImage from "@/public/images/contacts/formImage.webp";

export default function ContactForm() {
  return (
    <section className={styles.contactFormSection}>
      <div className={styles.formWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={formImage}
            alt="Contact Form Image"
            layout="responsive"
            objectFit="cover"
            className={styles.formImage}
          />
        </div>
        <div className={styles.formContainer}>
          <h2>COMPLETA IL FORM PER INFORMAZIONI</h2>
          <form>
            <div className={styles.formRow}>
              <label htmlFor="name">Nome:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="surname">Cognome:</label>
              <input type="text" id="surname" name="surname" required />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="phone">Telefono:</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="message">Messaggio:</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <div className={styles.privacy}>
              <label>
                <input type="checkbox" required /> Accetto la lettura e le
                dichiarazioni di privacy
              </label>
            </div>
            <button type="submit" className={styles.submitButton}>
              Invia
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
