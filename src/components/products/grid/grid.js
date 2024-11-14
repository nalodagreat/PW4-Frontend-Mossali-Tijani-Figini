'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '../card/card';
import styles from '../grid/grid.module.css';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [userEmail, setUserEmail] = useState("");
    const [comment, setComment] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("14:00");
    const [errorMessage, setErrorMessage] = useState(""); // Stato per il messaggio di errore

    // Funzione per generare orari ogni 10 minuti tra le 14:00 e le 18:00
    const generateAvailableTimes = () => {
        const times = [];
        let currentHour = 14;
        let currentMinute = 0;

        while (currentHour < 18 || (currentHour === 18 && currentMinute === 0)) {
            const time = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
            times.push(time);
            currentMinute += 10;
            if (currentMinute === 60) {
                currentMinute = 0;
                currentHour += 1;
            }
        }

        return times;
    };

    const availableTimes = generateAvailableTimes();

    const handleAccountInfo = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/profile", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setUserEmail(data.email);
            } else {
                const data = await response.json();
                console.error("Errore:", data.message || "Errore durante il caricamento dei dati.");
            }
        } catch (error) {
            console.error("Errore di rete:", error);
        }
    };

    useEffect(() => {
        handleAccountInfo();
    }, []);

    const createOrder = async (orderData) => {
        try {
            const response = await fetch("http://localhost:8080/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
                credentials: "include",
            });
            if (response.ok) {
                const result = await response.json();
                alert("Ordine creato con successo!");
                setCart({});
                return result;
            } else {
                const errorText = await response.text();
                console.error("Errore nella creazione dell'ordine:", errorText);
                alert(`Errore nella creazione dell'ordine: ${errorText}`);
            }
        } catch (err) {
            console.error("Errore nella richiesta:", err);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/product");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Errore nel recupero dei prodotti:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (productId, quantity) => {
        setCart((prevCart) => ({
            ...prevCart,
            [productId]: { quantity }
        }));
    };

    const handleRemoveFromCart = (productId) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            delete updatedCart[productId];
            return updatedCart;
        });
    };

    const handleComment = (event) => {
        setComment(event.target.value);
    };

    const handleDeliveryTimeChange = (event) => {
        setDeliveryTime(event.target.value);
    };

    // Funzione per controllare se la data selezionata è un sabato o una domenica
    const isWeekend = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDay();
        return day === 0 || day === 6; // 0 è domenica, 6 è sabato
    };

    const handleCreateOrder = async () => {
        // Controlla se la data di consegna è un sabato o una domenica
        if (isWeekend(deliveryDate)) {
            setErrorMessage("Non è possibile effettuare ordini per il sabato o la domenica. Scegli un altro giorno.");
            return;
        } else {
            setErrorMessage(""); // Resetta il messaggio di errore se la data è valida
        }

        const orderData = {
            userEmail: userEmail,
            comment: comment,
            deliverDate: `${deliveryDate}T${deliveryTime}:00`,
            details: cart
        };
        await createOrder(orderData);
    };

    return (
        <section className={styles.container}>
            <section className={styles.productGrid}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        productId={product.id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        stock={product.stock}
                        availability={product.availability}
                        onAddToCart={(productId, quantity) => handleAddToCart(productId, quantity)}
                    />
                ))}
            </section>

            <h2>Carrello</h2>
            <div className={styles.cartContainer}>
                {Object.keys(cart).length === 0 ? (
                    <p>Il carrello è vuoto</p>
                ) : (
                    Object.keys(cart).map((productId) => {
                        const product = products.find((p) => p.id === parseInt(productId, 10));
                        return product ? (
                            <div key={productId} className={styles.cartItem}>
                                <span>{product.name}</span>
                                <span>Quantità: {cart[productId].quantity}</span>
                                <span>Prezzo: {product.price * cart[productId].quantity} €</span>
                                <button onClick={() => handleRemoveFromCart(productId)}>Rimuovi</button>
                            </div>
                        ) : null;
                    })
                )}

                <input
                    type="text"
                    placeholder="Aggiungi un commento per il pasticcere"
                    onChange={handleComment}
                    value={comment}
                />

                <input
                    type="date"
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    value={deliveryDate}
                    min={new Date().toISOString().split("T")[0]}
                    required
                />

                <select value={deliveryTime} onChange={handleDeliveryTimeChange} required>
                    {availableTimes.map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>

                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                <button onClick={handleCreateOrder} className={styles.orderButton}>
                    Effettua ordine
                </button>
            </div>
        </section>
    );
};

export default ProductGrid;
