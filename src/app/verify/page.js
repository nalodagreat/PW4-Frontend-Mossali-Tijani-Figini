"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Verify() {
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleVerifyClick = async () => {
        const requestBody = {
            token: verificationCode,
        };

        console.log("Request body:", requestBody);

        try {
            const response = await fetch("http://localhost:8080/auth/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            // Controlla se la risposta è ok (200-299) e se il contenuto è un JSON valido
            const data = await response.json();
            console.log("Response data:", data);

            if (response.ok) {
                alert("Registrazione completata con successo!");
                router.push("/login");
            } else {
                // Se il backend restituisce un messaggio, visualizzalo
                setError(data.message || "Codice di verifica errato, riprova.");
            }
        } catch (err) {
            // Cattura errori di rete o problemi con la risposta
            setError("Errore durante la verifica, riprova.");
        }
    };

    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    return (
        <div>
            <h2>Verifica</h2>
            <p>Inserisci il codice di verifica che ti è stato inviato via email</p>
            <input
                type="text"
                placeholder="Codice di verifica"
                required
                value={verificationCode}
                onChange={handleVerificationCodeChange}
            />
            <button onClick={handleVerifyClick}>Verifica</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
