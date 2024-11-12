'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/app/login/page.module.css";
import logo from "@/public/images/header/logo.png";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Errore sconosciuto");
            }

            const data = await response.json();
            console.log("Login effettuato con successo:", data);

            if (data.role === "admin") {
                window.location.href ="/admin";
            } else if (data.role === "client") {
                window.location.href = "/";
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
                
                {/* Frase "Non hai un account? Registrati!" */}
                <p className={styles.registerPrompt}>
                    Non hai un account?{" "}
                    <Link href="/register" className={styles.registerLink}>
                        Registrati!
                    </Link>
                </p>
            </div>
        </div>
    );
}
