"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../card/card";
import styles from "../grid/grid.module.css";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [comment, setComment] = useState("");

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
        console.error(
          "Errore:",
          data.message || "Errore durante il caricamento dei dati."
        );
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
        // setProducts([])
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
      [productId]: { quantity },
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

  const handleCreateOrder = async () => {
    const orderData = {
      userEmail: userEmail,
      comment: comment,
      details: cart,
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
            onAddToCart={(productId, quantity) =>
              handleAddToCart(productId, quantity)
            }
          />
        ))}
      </section>

      <section className={styles.carrelloGrid}>
  <div className={styles.cartContainer}>
    {Object.keys(cart).length === 0 ? (
      <p className={styles.carelloBeforeOrder}>Il carrello è vuoto</p>
    ) : (
      <>
        {Object.keys(cart).map((productId) => {
          const product = products.find((p) => p.id === parseInt(productId, 10));
          return product ? (
            <div key={productId} className={styles.cartItem}>
              <div className={styles.productNameAndRemove}>
                <div className={styles.productDetails}>
                  <span className={styles.productName} >{product.name}</span>
                  <span className={styles.productInformation}>
                    Quantità: {cart[productId].quantity}
                  </span>
                  <span className={styles.productInformation}>
                    Prezzo: {product.price * cart[productId].quantity} €
                  </span>
                </div>

                <button onClick={() => handleRemoveFromCart(productId)}>
                  Rimuovi
                </button>
              </div>
            </div>
          ) : null;
        })}
        
        {/* Div commentAndOrder posizionato fuori dal ciclo */}
        <div className={styles.commentAndOrder}>
          <input
            placeholder={"aggiungi un commento per il pasticcere"}
            onChange={handleComment}
          />
          <button
            onClick={handleCreateOrder}
            className={styles.orderButton}
          >
            Effettua ordine
          </button>
        </div>
      </>
    )}
  </div>
</section>

    </section>
  );
};

export default ProductGrid;
