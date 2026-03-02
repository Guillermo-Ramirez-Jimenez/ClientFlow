import { useEffect, useState } from "react";
import type { Client, ClientData } from "../types/client";
import * as clientsService from "../services/clients.service";

export const useClients = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addClient = async (client: ClientData) => {
        try {
            setError(null);
            const newClient = await clientsService.createClient(client);
            setClients((prev) => [...prev, newClient]);
        } catch {
            setError("Error creating client");
        }
    };

    const editClient = async (id: string, client: ClientData) => {
        try {
            setError(null);
            const updated = await clientsService.updateClient(id, client);
            setClients((prev) => prev.map((c) => (c.id === id ? updated : c)));
        } catch {
            setError("Error updating client");
        }
    };

    const removeClient = async (id: string) => {
        try {
            setError(null);
            await clientsService.deleteClient(id);
            setClients((prev) => prev.filter((c) => c.id !== id));
        } catch {
            setError("Error deleting client");
        }
    };

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await clientsService.getClients();
                setClients(data);
            } catch {
                setError("Error fetching clients");
            } finally {
                setLoading(false)
                // setTimeout(() => setLoading(false), 5000);  // timeout delay for testing
            }
        };

        load();
    }, []);

    return {
        clients,
        loading,
        error,
        addClient,
        editClient,
        removeClient,
    };
};
