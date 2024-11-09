
import Image from "next/image";
import styles from "@/components/header/header.module.css";
import logo from "@/public/images/header/logo.png";
import profilo from "@/public/images/header/profilo.png";
import carrello from "@/public/images/header/carrello.png";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image src={logo} alt="Logo" style={{ marginTop: "0.5rem" }} />
        </Link>
      </div>
      <nav className={styles.navigation}>
        <a href="/">Home</a>
        <a href="/products">Prodotti</a>
        <a href="/contacts">Contatti</a>
      </nav>
      <div className={styles.navigation}>
        <div className={styles.socialIcons}>
          <Link href="/login"> {/*bisogna mettere che accede o ad utente o ad admin in base al login/registrazione*/}
            <Image src={profilo} alt="Profilo" className={styles.userIcon} />
          </Link>
        </div>
        <Link href="/cart">
        <div className={styles.shoppingCart}>
          <Image src={carrello} alt="Carrello" className={styles.cartIcon} />
        </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
