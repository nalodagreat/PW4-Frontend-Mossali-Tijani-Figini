import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [stockValues, setStockValues] = useState({});

    // Recupera i prodotti dal backend
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/product', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Errore nel recupero dei prodotti');
            }
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }
    };

    // Funzione per eliminare un prodotto
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/product/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
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

    const handleStockChange = async (id) => {
    }

    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <div>
            <h1>Prodotti</h1>

            <table>
                <thead>
                <tr>
                    <th>ID Prodotto</th>
                    <th>Nome</th>
                    <th>Prezzo</th>
                    <th>Descrizione</th>
                    <th>Disponibilità</th>
                    <th>Azioni</th>
                </tr>
                </thead>
                <tbody>
                {products.length === 0 ? (
                    <tr>
                        <td colSpan="6">Nessun prodotto trovato</td>
                    </tr>
                ) : (
                    products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price} €</td>
                            <td>{product.description}</td>
                            <td>{product.stock}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    style={{ color: 'red' }}
                                    aria-label={`Elimina prodotto ${product.name}`}
                                >
                                    Elimina
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleStockChange(product.id)}
                                    style={{ color: 'blue' }}
                                    aria-label={`Modifica stock prodotto ${product.name}`}
                                >
                                    Modifica
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}
