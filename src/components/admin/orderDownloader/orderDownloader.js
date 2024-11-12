import React, { useState } from 'react';

const handleDownload = async (date) => {
    try {
        const response = await fetch(`http://localhost:8080/api/order/date/${date}/export`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (response.ok) {
            // Response is expected to be a binary file, so we read it as a blob
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = `orders_${date}.xlsx`;  // Set the filename with the chosen date
            link.click();

            // Clean up the temporary URL
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

export default function OrderDownloader() {
    const [date, setDate] = useState('');

    const handleButtonClick = () => {
        if (!date) {
            alert('Inserisci una data valida nel formato yyyy-MM-dd');
            return;
        }
        handleDownload(date);
    };

    return (
        <div>
            <h1>Downloader</h1>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="yyyy-MM-dd"
            />
            <button onClick={handleButtonClick}>Scarica ordini</button>
        </div>
    );
}
