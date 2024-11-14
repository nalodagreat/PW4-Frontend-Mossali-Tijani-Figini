"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/components/header/header.module.css";
import logo from "@/public/images/header/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import profilo from "@/public/images/header/profilo.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Stato del menu hamburger
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/profile", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUserName(data.name);
          setIsAdmin(data.role === "admin");
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

  // Disabilita scroll della pagina quando il menu è aperto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // Disabilita lo scroll della pagina
    } else {
      document.body.style.overflow = "auto"; // Abilita lo scroll quando il menu è chiuso
    }
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setIsLoggedIn(false);
        setUserName("");
        router.push("/login");
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

      {/* Bottone hamburger per dispositivi mobili */}
      <div
        className={`${styles.menuIcon} ${menuOpen ? styles.menuOpen : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Menu navigazione */}
      <nav
        className={`${styles.navigation} ${menuOpen ? styles.menuOpen : ""}`}
      >
        {/* X per chiudere il menu */}
        <div className={styles.closeMenu} onClick={() => setMenuOpen(false)}>
          <span>&times;</span>
        </div>
        <div className={styles.desktopNavigation}>
        <a href="/">Home</a>
        <a href="/products">Prodotti</a>
        <a href="/contacts">Contatti</a>
        </div>
       


        {isLoggedIn ? (
          <div className={styles.welcomeSection}>
            <Link
              href={isAdmin ? "/admin" : "/user"}
              className={styles.userLink}
            >
              Ciao, {userName}
            </Link>
          </div>
        ) : (
          <Link href="/login">
            <Image src={profilo} alt="Profilo" className={styles.userIcon} />
          </Link>
        )}

        {/* Logout in basso a destra */}
        {isLoggedIn && (
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
