import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import logo from "../images/logo.png";
import profilo from "../images/profilo.png";
import carrello from "../images/carrello.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image src={logo} alt="Logo" style={{ marginTop: "0.5rem" }} />
        </Link>
      </div>
      <nav className={styles.navigation}>
        <Link href="/">Home</Link>
        <Link href="/prodotti">Prodotti</Link>
        <Link href="/contatti">Contatti</Link>
      </nav>
      <div className={styles.navigation}>
        <div className={styles.socialIcons}>
          <Link href="/profiloAdmin"> {/*bisogna mettere che accede o ad utente o ad admin in base al login/registrazione*/}
            <Image src={profilo} alt="Profilo" className={styles.userIcon} />
          </Link>
        </div>
        <Link href="/carrello">
        <div className={styles.shoppingCart}>
          <Image src={carrello} alt="Carrello" className={styles.cartIcon} />
        </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
