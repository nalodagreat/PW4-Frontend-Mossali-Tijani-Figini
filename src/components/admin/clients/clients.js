import React, { useEffect, useState } from "react";
import styles from "./clients.module.css";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [visibleClientsCount, setVisibleClientsCount] = useState(6);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/clients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setClients(data);
      } else {
        console.error("Errore nel recupero dei clienti");
      }
    } catch (error) {
      console.error("Errore durante la richiesta:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/auth/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        setClients(clients.filter((client) => client.id !== id));
        alert("Cliente eliminato con successo!");
      } else {
        console.error("Errore nell'eliminazione del cliente");
        alert("Errore nell'eliminazione del cliente");
      }
    } catch (error) {
      console.error("Errore durante la richiesta DELETE:", error);
      alert("Errore durante la richiesta DELETE");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const showMoreClients = () => {
    setVisibleClientsCount((prevCount) => prevCount + 6);
  };

  return (
    <div className={styles.container}>
      <h1>Clienti</h1>
      <div className={styles.cardsContainer}>
        {clients.length === 0 ? (
          <p className={styles.noClients}>Nessun cliente trovato</p>
        ) : (
          clients.slice(0, visibleClientsCount).map((client) => (
            <div key={client.id} className={styles.card}>
              <p>
                <strong>Nome:</strong> {client.name}
              </p>
              <p>
                <strong>Email:</strong> {client.email}
              </p>
              <p>
                <strong>Telefono:</strong> {client.phoneNumber}
              </p>
              <p>
                <strong>Verifica:</strong> {client.verification}
              </p>
              <button
                onClick={() => handleDelete(client.id)}
                style={{ color: "red" }}
                aria-label={`Elimina ${client.name}`}
              >
                Elimina
              </button>
            </div>
          ))
        )}
      </div>
      {visibleClientsCount < clients.length && clients.length > 0 && (
        <button onClick={showMoreClients} className={styles.showMoreButton}>
          Mostra altri
        </button>
      )}
    </div>
  );
}
