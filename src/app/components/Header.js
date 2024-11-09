// src/components/Header.js
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
        <Image src={logo} />
      </div>
      <nav className={styles.navigation}>
        <Link href="/page">Home</Link>
        <Link href="/Prodotti">Prodotti</Link>
        <Link href="/contacts">Contatti</Link>
      </nav>
      <div className={styles.navigation}>
        <div className={styles.socialIcons}>
          <Image src={profilo} />
        </div>
        <div className={styles.shoppingCart}>
          <Image src={carrello} />
        </div>
      </div>
    </header>
  );
};

export default Header;
