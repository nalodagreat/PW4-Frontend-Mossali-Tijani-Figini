'use client';

import { useState, useEffect } from "react";

export default function Account() {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState("");

    const handleAccountInfo = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUserInfo(data);
            } else {
                const data = await response.json();
                setError(data.message || "Errore durante il caricamento dei dati.");
            }
        } catch (error) {
            setError("Errore di rete durante il caricamento dei dati.");
        }
    };


    useEffect(() => {
        handleAccountInfo();
    }, []);

    return (
        <div>
            <h2>Informazioni Account</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {userInfo ? (
                <div>
                    <p><strong>Nome:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Telefono:</strong> {userInfo.phoneNumber}</p>
                    <p><strong>Ruolo:</strong> {userInfo.role}</p>
                </div>
            ) : (
                <p>Caricamento informazioni account...</p>
            )}
        </div>
    );
}
