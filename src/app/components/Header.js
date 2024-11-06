// src/components/Header.js
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
        <a href="#home">Home</a>
        <a href="#products">Prodotti</a>
        <a href="#contacts">Contatti</a>
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
