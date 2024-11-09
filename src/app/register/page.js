"use client";

import { useState, useEffect } from 'react';
import styles from './register.module.css';
import logo from "@/public/images/header/logo.png";
import Image from 'next/image';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setIsRegistered(true); // Registrazione riuscita
        alert("Codice di verifica inviato! Controlla la tua email o telefono.");
      } else {
        setError("Errore nella registrazione, riprova.");
      }
    } catch (err) {
      setError("Errore durante la registrazione, riprova.");
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      if (isRegistered && verificationCode) {
        try {
          const response = await fetch("http://localhost:8080/auth/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              verification_token: verificationCode,
            }),
          });
          const data = await response.json();
          if (data.success) {
            setIsVerified(true);
            alert("Registrazione completata con successo!");
          } else {
            setError("Codice di verifica errato, riprova.");
          }
        } catch (err) {
          setError("Errore durante la verifica, riprova.");
        }
      }
    };
    verifyUser();
  }, [isRegistered, verificationCode]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.topSection}>
        <h2 className={styles.loginTitle}>Registrati</h2>
        <Image src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.formSection}>
        {isVerified ? (
          <p>Registrazione completata!</p>
        ) : (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefono"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <button type="submit" className={styles.button}>
              Registrati
            </button>
          </form>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!isVerified && isRegistered && (
          <div>
            <h3>Inserisci il codice di verifica</h3>
            <input
              type="text"
              placeholder="Codice di verifica"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
