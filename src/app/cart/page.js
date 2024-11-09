"use client";

import React, { useState } from "react";
import styles from "@/app/cart/page.module.css";

const Carrello = () => {
  const [prodotti, setProdotti] = useState([
    { id: 1, nome: "Prodotto 1", prezzo: 10, quantita: 2 },
    { id: 2, nome: "Prodotto 2", prezzo: 15, quantita: 1 },
    { id: 3, nome: "Prodotto 3", prezzo: 8, quantita: 3 },
  ]);

  const costiSpedizione = 5;

  // Calcola il totale provvisorio
  const totaleProvvisorio = prodotti.reduce(
    (totale, prodotto) => totale + prodotto.prezzo * prodotto.quantita,
    0
  );

  // Rimuovi un prodotto dal cart
  const rimuoviProdotto = (id) => {
    setProdotti(prodotti.filter((prodotto) => prodotto.id !== id));
  };

  return (
    <div className={styles.carrelloContainer}>
      {/* Sezione Lista products */}
      <div className={styles.listaProdotti}>
        <h2>IL TUO CARRELLO</h2>
        <table>
          <thead>
            <tr>
              <th>Prodotto</th>
              <th>Prezzo</th>
              <th>Quantità</th>
              <th>Rimuovi</th>
            </tr>
          </thead>
          <tbody>
            {prodotti.map((prodotto) => (
              <tr key={prodotto.id}>
                <td>{prodotto.nome}</td>
                <td>€{prodotto.prezzo.toFixed(2)}</td>
                <td>{prodotto.quantita}</td>
                <td>
                  <button
                    className={styles.rimuoviButton}
                    onClick={() => rimuoviProdotto(prodotto.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sezione Dettagli Carrello */}
      <div className={styles.dettagliCarrello}>
        <h2>DETTAGLI DEL CARRELLO</h2>
        <p>Totale provvisorio: €{totaleProvvisorio.toFixed(2)}</p>
        <p>Costi di spedizione: €{costiSpedizione.toFixed(2)}</p>
        <hr />
        <p className={styles.totale}>
          Totale: €{(totaleProvvisorio + costiSpedizione).toFixed(2)}
        </p>
        <button className={styles.prenotaOrdineButton}>Prenota Ordine</button>
      </div>
    </div>
  );
};

export default Carrello;
