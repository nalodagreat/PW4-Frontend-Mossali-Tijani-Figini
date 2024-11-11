import React, { useState, useEffect } from "react";

export default function Account() {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState("");


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
                <p>Caricamento delle informazioni in corso...</p>
            )}
        </div>
    );
}
