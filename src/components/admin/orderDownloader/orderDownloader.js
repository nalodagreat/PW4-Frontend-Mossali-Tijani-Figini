"use client";

import React, { useState } from 'react';
import styles from './orderDownloader.module.css';

// Funzione per il download ordini
const handleDownloadOrders = async (date) => {
    try {
        const response = await fetch(`http://localhost:8080/api/order/date/${date}/export`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `orders_${date}.xlsx`;  // Nome file con la data
            link.click();
            window.URL.revokeObjectURL(url);
            alert('Download avviato con successo!');
        } else {
            console.error('Errore nel download del file');
            alert('Errore nel download del file');
        }
    } catch (error) {
        console.error('Errore durante il download:', error);
        alert('Errore durante il download');
    }
};

// Funzione per il download prodotti
const handleDownloadProducts = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/product/export`, {
            method: 'GET',
            credentials: "include",  // Include session cookie
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const filename = `products.xlsx`;
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;  // Nome file fisso
            link.click();
            window.URL.revokeObjectURL(url);
            alert('Download avviato con successo!');
        } else {
            console.error('Errore nel download del file');
            alert('Errore nel download del file');
        }
    } catch (error) {
        console.error('Errore durante il download:', error);
        alert('Errore durante il download');
    }
};

export default function OrderAndProductDownloader() {
    const [date, setDate] = useState('');

    const handleOrderButtonClick = () => {
        if (!date) {
            alert('Inserisci una data valida nel formato yyyy-MM-dd');
            return;
        }
        handleDownloadOrders(date);
    };

    return (
        <div className={styles.container}>
            {/* Sezione per scaricare ordini */}
            <div className={styles.downloaderSection}>
                <h2 className={styles.sectionTitle}>Scarica Ordini</h2>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={styles.dateInput}
                />
                <button onClick={handleOrderButtonClick} className={styles.downloadButton}>
                    Scarica ordini
                </button>
            </div>

            {/* Sezione per scaricare prodotti */}
            <div className={styles.downloaderSection}>
                <h2 className={styles.sectionTitle}>Scarica Prodotti</h2>
                <button className={styles.downloadButton} onClick={handleDownloadProducts}>
                    Scarica prodotti
                </button>
            </div>
        </div>
    );
}
