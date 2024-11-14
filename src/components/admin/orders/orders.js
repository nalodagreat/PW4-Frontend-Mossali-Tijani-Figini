import React, { useEffect, useState } from "react";
import styles from "./orders.module.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [visibleOrdersCount, setVisibleOrdersCount] = useState(6);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/order", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        const data =
          contentType && contentType.includes("application/json")
            ? await response.json()
            : { message: await response.text() };
        setOrders(data);
      } else {
        console.error("Errore nel recupero degli ordini");
      }
    } catch (error) {
      console.error("Errore durante la richiesta:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/order/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        setOrders(orders.filter((order) => order.id !== id));
        alert("Ordine eliminato con successo!");
      } else {
        console.error("Errore nell'eliminazione dell'ordine");
        alert("Errore nell'eliminazione dell'ordine");
      }
    } catch (error) {
      console.error("Errore durante la richiesta DELETE:", error);
      alert("Errore durante la richiesta DELETE");
    }
  };

  const handleStatus = async (order) => {
    const url =
      order.status === "pending"
        ? `http://localhost:8080/api/order/accept/${order.id}`
        : `http://localhost:8080/api/order/deliver/${order.id}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        fetchOrders();
        alert("Ordine aggiornato con successo!");
      } else {
        console.error("Errore nell'aggiornamento dell'ordine");
        alert("Errore nell'aggiornamento dell'ordine");
      }
    } catch (error) {
      console.error("Errore durante la richiesta PUT:", error);
      alert("Errore durante la richiesta PUT");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const showMoreOrders = () => {
    setVisibleOrdersCount((prevCount) => prevCount + 6);
  };

  return (
    <div className={styles.container}>
      <h1>Ordini</h1>
      <div className={styles.cardsContainer}>
        {orders.length === 0 ? (
          <p className={styles.noOrders}>Nessun ordine trovato</p>
        ) : (
          orders.slice(0, visibleOrdersCount).map((order) => (
            <div key={order.id} className={styles.card}>
              <p>
                <strong>Cliente:</strong> {order.userEmail}
              </p>
              <p>
                <strong>Dettagli:</strong> {JSON.stringify(order.details)}
              </p>
              <p>
                <strong>Prezzo Totale:</strong> {order.totalPrice}€
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <button
                onClick={() => handleDelete(order.id)}
                className={styles.button + " " + styles.buttonRed}
                aria-label={`Elimina ordine ${order.id}`}
              >
                Elimina
              </button><br/>
              <button
                onClick={() => handleStatus(order)}
                className={styles.button + " " + styles.buttonBlue}
                aria-label={`Modifica ordine ${order.id}`}
              >
                Modifica
              </button>
            </div>
          ))
        )}
      </div>
      {visibleOrdersCount < orders.length && orders.length > 0 && (
        <button onClick={showMoreOrders} className={styles.showMoreButton}>
          Mostra altri
        </button>
      )}
    </div>
  );
}
