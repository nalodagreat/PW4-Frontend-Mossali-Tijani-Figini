import React, { useEffect, useState } from 'react';
import {router} from "next/client";

export default function Clients() {
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/clients', {
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
                console.error('Errore nel recupero dei clienti');
            }
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/auth/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                setClients(clients.filter(client => client.id !== id));
                alert('Cliente eliminato con successo!');
            } else {
                console.error('Errore nell\'eliminazione del cliente');
                alert('Errore nell\'eliminazione del cliente');
            }
        } catch (error) {
            console.error('Errore durante la richiesta DELETE:', error);
            alert('Errore durante la richiesta DELETE');
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div>
            <h1>Clienti</h1>

            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Verifica</th>
                    <th>Azioni</th>
                </tr>
                </thead>
                <tbody>
                {clients.length === 0 ? (
                    <tr>
                        <td colSpan="4">Nessun cliente trovato</td>
                    </tr>
                ) : (
                    clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phoneNumber}</td>
                            <td>{client.verification}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(client.id)}
                                    style={{ color: 'red' }}
                                    aria-label={`Elimina ${client.name}`}
                                >
                                    Elimina
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
