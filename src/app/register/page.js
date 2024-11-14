"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./register.module.css";
import logoRegister from "@/public/images/contacts/logoRegister.png";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Stato per il caricamento

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Avvia il caricamento

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Errore durante la registrazione");
      }

      const data = await response.json();
      alert(`Registrazione completata! Benvenuto, ${data.name}.`);
      router.push("/verify");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Ferma il caricamento
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <h2 className={styles.loginTitle}>Registrati</h2>
          <Link href="/">
            <Image src={logoRegister} alt="Logo" className={styles.logo} />
          </Link>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.formSection} onSubmit={handleSubmit}>
          <div>
            <label className={styles.label}>Nome</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Numero di Telefono</label>
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Registrazione in corso..." : "Registrati"}
          </button>
        </form>
        <div className={styles.registerPrompt}>
          <p>
            Hai già un account?{" "}
            <Link href="/login" className={styles.registerLink}>
              Accedi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
