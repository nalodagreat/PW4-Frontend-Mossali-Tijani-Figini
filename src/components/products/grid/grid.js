
import React, { useEffect, useState } from 'react';
import ProductCard from '../card/card';
import styles from '../grid/grid.module.css';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");
    const [comment, setComment] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("14:00");
    const [errorMessage, setErrorMessage] = useState("");

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
                setUserRole(data.role);
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
        if (orderData.details.length === 0) {
            alert("Il carrello è vuoto. Aggiungi almeno un prodotto.");
            return;
        }
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

    const isWeekend = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    const handleCreateOrder = async () => {
        if (Object.keys(cart).length === 0) {
            setErrorMessage("Il carrello è vuoto. Aggiungi almeno un prodotto prima di effettuare l'ordine.");
            return;
        }

        if (isWeekend(deliveryDate)) {
            setErrorMessage("Non è possibile effettuare ordini per il sabato o la domenica. Scegli un altro giorno.");
            return;
        } else {
            setErrorMessage("");
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
                        showCartOptions={userRole === "client" || userRole === "admin"}
                    />
                ))}
            </section>
            <div className={styles.cartContainer}>
                {Object.keys(cart).length === 0 ? (
                    <p className={styles.carelloBeforeOrder}>Il carrello è vuoto</p>
                ) : (
                    Object.keys(cart).map((productId) => {
                        const product = products.find((p) => p.id === parseInt(productId, 10));
                        return product ? (
                            <div key={productId} className={styles.cartItem}>
                                <span className={styles.productName}>{product.name}</span>
                                <span style={{fontSize:"11px"}}>Quantità: {cart[productId].quantity}</span>
                                <span  style={{fontSize:"11px"}}>Prezzo: {product.price * cart[productId].quantity} €</span>
                                <button onClick={() => handleRemoveFromCart(productId)}>Rimuovi</button>
                            </div>
                        ) : null;
                    })
                )}

                <input
                    type="text"
                    placeholder="Aggiungi un commento per il pasticcere"
                    onChange={handleComment}
                    className={styles.commentInput}
                    value={comment}
                />

                <input
                    type="date"
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    value={deliveryDate}
                    className={styles.dateInput}
                    min={new Date().toISOString().split("T")[0]}
                    required
                />

                <select value={deliveryTime} onChange={handleDeliveryTimeChange} required className={styles.select}>
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
