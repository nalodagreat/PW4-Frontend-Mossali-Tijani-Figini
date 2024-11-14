import React, { useEffect, useState } from 'react';
import styles from './products.module.css';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [productsPerPage] = useState(5); // Numero di prodotti per pagina

    // Funzione per recuperare i prodotti dalla API
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/product', {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
                setTotalPages(Math.ceil(data.length / productsPerPage)); // Calcola il numero totale di pagine
            } else {
                console.error('Errore nel recupero dei prodotti');
            }
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }
    };

    // Funzione per gestire l'aggiunta di un nuovo prodotto
    const handleAdd = async () => {
        const newProduct = {
            name: prompt('Nome del prodotto'),
            description: prompt('Descrizione del prodotto'),
            ingredients: prompt('Ingredienti del prodotto'),
            price: parseFloat(prompt('Prezzo del prodotto')),
            stock: parseInt(prompt('Quantità disponibile')),
            image: prompt('URL dell\'immagine del prodotto'),
            availability: true,
        };

        if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.stock) {
            alert('Inserisci tutti i campi richiesti');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/product', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                const data = await response.json();
                setProducts([...products, data]);
                alert('Prodotto aggiunto con successo!');
            } else {
                console.error('Errore nell\'aggiunta del prodotto');
                alert('Errore nell\'aggiunta del prodotto');
            }
        } catch (error) {
            console.error('Errore durante la richiesta POST:', error);
            alert('Errore durante la richiesta POST');
        }
    };

    // Funzione per eliminare un prodotto
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/product/${id}`, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                credentials: "include",
            });

            if (response.ok) {
                setProducts(products.filter(product => product.id !== id));
                alert('Prodotto eliminato con successo!');
            } else {
                console.error('Errore nell\'eliminazione del prodotto');
                alert('Errore nell\'eliminazione del prodotto');
            }
        } catch (error) {
            console.error('Errore durante la richiesta DELETE:', error);
            alert('Errore durante la richiesta DELETE');
        }
    };

    // Funzione per aggiornare un prodotto
    const handleUpdate = async (id) => {
        try {
            const newName = prompt('Nuovo nome del prodotto');
            const newDescription = prompt('Nuova descrizione del prodotto');
            const newIngredients = prompt('Nuovi ingredienti del prodotto');
            const newPrice = parseFloat(prompt('Nuovo prezzo del prodotto'));
            const newStock = parseInt(prompt('Nuova quantità disponibile'));
            const newImage = prompt('Nuovo URL dell\'immagine del prodotto');
            const newAvailability = true;

            if (!newName || !newPrice || !newDescription || !newStock) {
                alert('Inserisci tutti i campi richiesti');
                return;
            }

            const updatedProduct = {
                name: newName,
                description: newDescription,
                ingredients: newIngredients,
                price: newPrice,
                stock: newStock,
                image: newImage,
                availability: newAvailability,
            };

            const response = await fetch(`http://localhost:8080/api/product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                const data = response.headers.get('Content-Length') !== '0' ? await response.json() : updatedProduct;

                setProducts(products.map(product => product.id === id ? data : product));
                alert('Prodotto modificato con successo!');
            } else {
                console.error('Errore nella modifica del prodotto');
                alert('Errore nella modifica del prodotto');
            }
        } catch (error) {
            console.error('Errore durante la richiesta PUT:', error);
            alert('Errore durante la richiesta PUT');
        }
    };

    // Calcola i prodotti per la pagina corrente
    const paginateProducts = () => {
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        return products.slice(indexOfFirstProduct, indexOfLastProduct);
    };

    // Funzione per cambiare pagina
    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Prodotti</h1>
            <button className={styles.addProductButton} onClick={handleAdd}>Aggiungi prodotto</button>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID Prodotto</th>
                        <th>Nome</th>
                        <th>Prezzo</th>
                        <th>Descrizione</th>
                        <th>Disponibilità</th>
                        <th>Elimina</th>
                        <th>Modifica</th>
                    </tr>
                </thead>
                <tbody>
                    {paginateProducts().length === 0 ? (
                        <tr>
                            <td colSpan="7" className={styles.noProducts}>Nessun prodotto trovato</td>
                        </tr>
                    ) : (
                        paginateProducts().map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price} €</td>
                                <td>{product.description}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className={`${styles.button} ${styles.deleteButton}`}
                                    >
                                        Elimina
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleUpdate(product.id)}
                                        className={`${styles.button} ${styles.updateButton}`}
                                    >
                                        Modifica
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Paginazione fuori dalla tabella */}
            <div className={styles.paginationWrapper}>
                <div className={styles.pagination}>
                    <button 
                        onClick={() => changePage(1)} 
                        className="prevPage" 
                        disabled={currentPage === 1}
                    >
                        ‹‹
                    </button>
                    <button 
                        onClick={() => changePage(currentPage - 1)} 
                        className="prevPage" 
                        disabled={currentPage === 1}
                    >
                        ‹
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button 
                            key={index + 1} 
                            onClick={() => changePage(index + 1)} 
                            className={currentPage === index + 1 ? "activePage" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button 
                        onClick={() => changePage(currentPage + 1)} 
                        className="nextPage" 
                        disabled={currentPage === totalPages}
                    >
                        ›
                    </button>
                    <button 
                        onClick={() => changePage(totalPages)} 
                        className="nextPage" 
                        disabled={currentPage === totalPages}
                    >
                        ››
                    </button>
                </div>
            </div>
        </div>
    );
}
