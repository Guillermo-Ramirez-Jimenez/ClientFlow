import { useState, useEffect } from "react";
import type { Client, ClientData, ClientStatus } from "../../types/client";
import { ClientStatusOptions } from "../../types/client";

interface Props {
    client?: Client;
    onClose: () => void;
    onCreate: (data: ClientData) => Promise<void>;
    onEdit: (id: string, data: ClientData) => Promise<void>;
}

const emptyForm: ClientData = {
    name: "",
    email: "",
    status: "active",
}

export default function ClientModal({ client, onClose, onCreate, onEdit }: Props) {
    const [formData, setFormData] = useState<ClientData>(
        client ? {
            name: client.name,
            email: client.email,
            status: client.status,
        } : emptyForm
    )

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        if(client) {
            await onEdit(client.id, formData);
        } else {
            await onCreate(formData);
        }

        setLoading(false);
        handleClose();
    }

    function handleClose() {
        setShow(false);
        setTimeout(onClose, 300);
    }

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`fixed inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                show ? "opacity-100" : "opacity-0"
            }`}>
            <div className={`bg-white p-6 rounded w-full max-w-md transition-all duration-300 ${
                    show ? "scale-100 translate-y-0 opacity-100" : "scale-95 -translate-y-8 opacity-0"
                }`}>
                <h2 className="text-xl font-semibold mb-4">{client ? "Edit client" : "New client"}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-[auto,1fr] items-center gap-4">
                        <label htmlFor="name">Name: </label>
                        <input
                            id="name"
                            className="w-full border p-2 rounded"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                        <label htmlFor="email">Email: </label>
                        <input
                            id="email"
                            className="w-full border p-2 rounded"
                            placeholder="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                        <label htmlFor="status">Status: </label>
                        <select
                            id="status"
                            className="w-full border p-2 rounded"
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value as ClientStatus})}
                        >
                            {ClientStatusOptions.map((s) => (
                                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 border rounded"
                        >Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                        {loading 
                            ? (client ? "Editing..." : "Creating...")
                            : (client ? "Edit" : "Create")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
