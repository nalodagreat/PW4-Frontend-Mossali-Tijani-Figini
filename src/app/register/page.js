"use client";

import { useState, useEffect } from 'react';
import styles from '@/components/styles/RegisterForm.module.css'; // Import del CSS

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  // Gestore della registrazione
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Invio della richiesta di registrazione all'API
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setIsRegistered(true); // Registrazione riuscita
        alert('Codice di verifica inviato! Controlla la tua email o telefono.');
      } else {
        setError('Errore nella registrazione, riprova.');
      }
    } catch (err) {
      setError(' riprova.');
    }
  };

  // Effetto per inviare il codice di verifica quando l'utente è registrato
  useEffect(() => {
    const verifyUser = async () => {
      if (isRegistered && verificationCode) {
        try {
          const response = await fetch('http://localhost:8080/auth/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              verification_token: verificationCode,
            }),
          });
          const data = await response.json();
          if (data.success) {
            setIsVerified(true);
            alert('Registrazione completata con successo!');
          } else {
            setError('Codice di verifica errato, riprova.');
          }
        } catch (err) {
          setError('Errore durante la verifica, riprova.');
        }
      }
    };
    verifyUser();
  }, [isRegistered, verificationCode]);

  // Gestione dell'input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.formColumn}>
          <div className={styles.formContent}>
            <header className={styles.headingWrapper}>
              <h1 className={styles.mainTitle}>c'est la vie</h1>
              <p className={styles.subtitle}>benvenuto alla nostra patecceria</p>
            </header>
            {isVerified ? (
              <p>Registrazione completata!</p>
            ) : (
              <form onSubmit={handleRegister}>
                <div className={styles.inputWrapper}>
                  <label htmlFor="name" className={styles['visually-hidden']}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <label htmlFor="email" className={styles['visually-hidden']}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <label htmlFor="password" className={styles['visually-hidden']}>Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <label htmlFor="phone" className={styles['visually-hidden']}>Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={styles.inputField}
                  />
                </div>

                <button type="submit" className={styles.registerButton}>Register</button>
              </form>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

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

        <div className={styles.imageColumn}>
          <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2805c8a3eed69b7aac0797b784091484440d486b14d5e0169e52e073df7bf6d?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d" 
            alt="Decorative bakery image" 
            className={styles.sideImage} 
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
