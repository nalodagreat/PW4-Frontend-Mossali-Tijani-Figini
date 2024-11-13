import React, {useEffect, useState} from 'react';

export default function Products() {
    const [products, setProducts] = useState([]);

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
            } else {
                console.error('Errore nel recupero dei prodotti');
            }
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }
    };

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



    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Prodotti</h1>
            <button onClick={handleAdd}>Aggiungi prodotto</button>

            <table>
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
                {products.length === 0 ? (
                    <tr>
                        <td colSpan="7">Nessun prodotto trovato</td>
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
                                    style={{color: 'red'}}
                                    aria-label={`Elimina prodotto ${product.name}`}
                                >
                                    Elimina
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleUpdate(product.name)}
                                    style={{color: 'blue'}}
                                    aria-label={`Modifica prodotto ${product.name}`}
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
