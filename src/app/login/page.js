'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/app/login/page.module.css";
import logo from "@/public/images/header/logo.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();  // Inizializza useRouter per il reindirizzamento

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Errore sconosciuto");
            }

            const data = await response.json();
            console.log("Login effettuato con successo:", data);

            // Controlla il ruolo e reindirizza di conseguenza
            if (data.role === "admin") {
                router.push("/admin");  // Reindirizza alla pagina admin
            } else if (data.role === "client") {
                router.push("/user");  // Reindirizza alla pagina user
            } else {
                throw new Error("Ruolo non riconosciuto");
            }

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.topSection}>
                <h2 className={styles.loginTitle}>Login</h2>
                <div className={styles.logoContainer}>
                    <Image src={logo} alt="Logo" className={styles.logo} />
                </div>
            </div>
            <div className={styles.formSection}>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.button}>Accedi</button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
}
