import React from "react";
import Image from "next/image";
import styles from "@/app/login/page.module.css";
import logo from "@/public/images/header/logo.png";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <h2 className={styles.loginTitle}>Login</h2>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="Logo" className={styles.logo} />
        </div>
      </div>
      <div className={styles.formSection}>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className={styles.button}>Accedi</button>
        </form>
      </div>
    </div>
  );
}
