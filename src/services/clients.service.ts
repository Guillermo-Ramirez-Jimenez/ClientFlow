import axios from "axios";
import type { Client, ClientData } from "../types/client";

const API_URL = "https://6977b7955b9c0aed1e87335c.mockapi.io/clients";

export const getClients = async (): Promise<Client[]> => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const createClient = async (client: ClientData) => {
    const res = await axios.post(API_URL, client);
    return res.data;
};

export const updateClient = async (id: string, client: ClientData) => {
    const res = await axios.put(`${API_URL}/${id}`, client);
    return res.data;
};

export const deleteClient = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
};
