'use client';

import React, {useEffect, useState} from 'react';

export default function Orders() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/order', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                console.error('Errore nel recupero degli ordini');
            }
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/order/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                setOrders(orders.filter(order => order.id !== id));
                alert('Ordine eliminato con successo!');
            } else {
                console.error('Errore nell\'eliminazione dell\'ordine');
                alert('Errore nell\'eliminazione dell\'ordine');
            }
        } catch (error) {
            console.error('Errore durante la richiesta DELETE:', error);
            alert('Errore durante la richiesta DELETE');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatus = async (order) => {
        if (order.status === 'pending') {
            try {
                const response = await fetch(`http://localhost:8080/api/order/accept/${order.id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (response.ok) {
                    fetchOrders();
                    alert('Ordine aggiornato con successo!');
                } else {
                    console.error('Errore nell\'aggiornamento dell\'ordine');
                    alert('Errore nell\'aggiornamento dell\'ordine');
                }
            } catch (error) {
                console.error('Errore durante la richiesta PUT:', error);
                alert('Errore durante la richiesta PUT');
            }
        } else if (order.status === 'accepted') {x
            try {
                const response = await fetch(`http://localhost:8080/api/order/deliver/${order.id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (response.ok) {
                    fetchOrders();
                    alert('Ordine aggiornato con successo!');
                } else {
                    console.error('Errore nell\'aggiornamento dell\'ordine');
                    alert('Errore nell\'aggiornamento dell\'ordine');
                }
            } catch (error) {
                console.error('Errore durante la richiesta PUT:', error);
                alert('Errore durante la richiesta PUT');
            }
        }
    }

    return (
        <div>
            <h1>Ordini</h1>

            <table>
                <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Dettagli</th>
                    <th>Prezzo</th>
                    <th>Status</th>
                    <th>Elimina</th>
                    <th>Modifica</th>
                </tr>
                </thead>
                <tbody>
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan="5">Nessun ordine trovato</td>
                    </tr>
                ) : (
                    orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.userEmail}</td>
                            <td>{JSON.stringify(order.details)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.status}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(order.id)}
                                    style={{color: 'red'}}
                                    aria-label={`Elimina ordine ${order.id}`}
                                >
                                    Elimina
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleStatus(order)}
                                    style={{color: 'blue'}}
                                    aria-label={`Modifica ordine ${order.id}`}
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