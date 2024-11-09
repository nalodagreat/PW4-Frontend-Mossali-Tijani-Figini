// src/pages/login.js
import React from "react";
import Image from "next/image";
import styles from "../Login/page.module.css";
import logo from "../public/images/logo.png";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Accedi</button>
        </form>
      </div>
      <div className={styles.right}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="Logo" width={80} height={80} />
        </div>
        <div className={styles.nome}>Pasticceria <br /> C'est La Vie</div>
      </div>
    </div>
  );
}
