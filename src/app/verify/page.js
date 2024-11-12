"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './page.module.css';  // Importa il CSS module

export default function Verify() {
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleVerifyClick = async () => {
        const requestBody = { token: verificationCode };

        try {
            const response = await fetch("http://localhost:8080/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Registrazione completata con successo!");
                router.push("/login");
            } else {
                setError(data.message || "Codice di verifica errato, riprova.");
            }
        } catch (err) {
            setError("Errore durante la verifica, riprova.");
        }
    };

    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    return (
        <div className={styles.verifyContainer}>
            <h2 className={styles.verifyTitle}>Verifica</h2>
            <p className={styles.verifyDescription}>Inserisci il codice di verifica che ti è stato inviato via email</p>
            <input
                type="text"
                placeholder="Codice di verifica"
                required
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                className={styles.verifyInput}
            />
            <button onClick={handleVerifyClick} className={styles.verifyButton}>Verifica</button>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
}
