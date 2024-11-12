const handleDownload = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/product/export`, {
            method: 'GET',
            credentials: "include",  // Include session cookie
        });

        if (response.ok) {
            // Convert response to a binary blob
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Set the fixed filename
            const filename = `products.xlsx`;

            // Create a temporary link to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;  // Fixed filename
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

export default function ProductDownloader() {
    return (
        <div>
            <h1>Downloader</h1>
            <button onClick={handleDownload}>Scarica prodotti</button>
        </div>
    );
}
// Compare this snippet from src/components/admin/products/products.js: