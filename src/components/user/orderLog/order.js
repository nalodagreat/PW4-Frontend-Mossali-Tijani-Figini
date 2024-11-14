'use client';

import { useState, useEffect } from "react";
import styles from "./order.module.css"; 

export default function Order() {
    const [orders, setOrders] = useState(null);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");

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
                setEmail(data.email);
            } else {
                const data = await response.json();
                setError(data.message || "Errore durante il caricamento dei dati.");
            }
        } catch (error) {
            setError("Errore di rete durante il caricamento dei dati.");
        }
    };

    const handleAccountOrders = async (userEmail) => {
        try {
            const response = await fetch(`http://localhost:8080/api/order/user/${userEmail}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                const data = await response.json();
                setError(data.message || "Errore durante il caricamento degli ordini.");
            }
        } catch (error) {
            setError("Errore di rete durante il caricamento degli ordini.");
        }
    };

    useEffect(() => {
        handleAccountInfo();
    }, []);

    useEffect(() => {
        if (email) {
            handleAccountOrders(email);
        }
    }, [email]);

    if (error) {
        return <div className={styles.errorMessage}>Errore: {error}</div>;
    }

    if (!orders) {
        return <div className={styles.loadingMessage}>Caricamento...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.orderBox}>
                <h1>I tuoi ordini</h1><br/>
                {orders.length === 0 ? (
                    <p>Non hai ordini.</p>
                ) : (
                    <ul>
                        {orders.map((order) => (
                            <li key={order.id}>
                                <h3>Ordine: {order.id}</h3>
                                <p>Data Ordine: {new Date(order.orderDate).toLocaleDateString()}</p>
                                <p>Data Consegna: {new Date(order.deliverDate).toLocaleDateString()}</p>
                                <p>Commento: {order.comment}</p>
                                <p>Prezzo Totale: {order.totalPrice}€</p>
                                <p>Status: {order.status}</p><br/>
                                <h4>Dettagli Ordine:</h4>
                                <ul>
                                    {Object.keys(order.details).map((productId) => {
                                        const detail = order.details[productId];
                                        return (
                                            <li key={productId}>
                                                <p>Prodotto ID: {productId}</p>
                                                <p>Nome: {detail.name}</p>
                                                <p>Quantità: {detail.quantity}</p>
                                                <p>Prezzo: {detail.price}€</p><br/>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
