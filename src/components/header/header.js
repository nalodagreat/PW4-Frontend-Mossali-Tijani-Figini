"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/components/header/header.module.css";
import logo from "@/public/images/header/logo.png";
import profilo from "@/public/images/header/profilo.png";
import carrello from "@/public/images/header/carrello.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Verifica se l'utente è loggato e ottieni i dettagli dell'utente
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/profile", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);  // Imposta lo stato di login su true
          setUserName(data.name);  // Memorizza il nome dell'utente per il saluto
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Errore nella verifica della sessione:", error);
        setIsLoggedIn(false);
      }
    };
    
    checkSession();
  }, []);

  // Funzione di logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setIsLoggedIn(false);
        setUserName(""); // Resetta il nome dell'utente
        router.push("/login"); // Reindirizza alla pagina di login
      }
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

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
      <div className={styles.socialIcons}>
        {isLoggedIn ? (
          <div className={styles.welcomeSection}>
            <Link href="/user" className={styles.userLink}>
              Ciao, {userName}
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login">
            <Image src={profilo} alt="Profilo" className={styles.userIcon} />
          </Link>
        )}
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
