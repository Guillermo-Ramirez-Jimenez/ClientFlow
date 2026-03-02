import { useClients } from "../hooks/useClients";
import ClientsTable from "../components/clients/ClientsTable";
import ClientModal from "../components/clients/ClientModal";
import { useState, useMemo } from "react";
import type { Client, ClientStatus } from "../types/client";
import SearchBar from "../components/clients/SearchBar";
import type { SortField, SortDirection } from "../types/sort";
import { useDebounce } from "../hooks/useDebounce";

export default function Clients() {
    const { clients, loading, error, addClient, editClient, removeClient } = useClients();
    const [editingClient, setEditingClient] = useState<Client | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<"all" | ClientStatus>("all");
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
    const debouncedSearch = useDebounce(search, 300);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const handleClearFilters = () => {
        setSearch("");
        setStatusFilter("all");
    };

    const processedClients = useMemo(() => {
        const filtered = clients.filter((client) => {
            const matchesSearch =
                client.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                client.email.toLowerCase().includes(debouncedSearch.toLowerCase());

            const matchesStatus =
                statusFilter === "all" || client.status === statusFilter;

            return matchesSearch && matchesStatus;
        });

        if (!sortField) return filtered;

        return [...filtered].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [clients, debouncedSearch, statusFilter, sortField, sortDirection]);

    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <div className="p-6 min-h-screen bg-gray-200">
            <div className={`fixed inset-0 z-50 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                loading ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
                <div className={`flex flex-col justify-center items-center gap-4 bg-white p-6 rounded transition-all duration-300 ${
                    loading ? "scale-100 translate-y-0 opacity-100" : "scale-95 -translate-y-8 opacity-0"
                }`}>
                    <p className="text-lg font-medium">Loading clients...</p>
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                </div>
            </div>
            <h1 className="text-2xl font-semibold mb-4">Clients</h1>
            <div className="flex flex-col md:flex-row justify-between">
                <SearchBar search={search} statusFilter={statusFilter} onSearchChange={setSearch} onStatusChange={setStatusFilter} onClear={handleClearFilters}/>
                <button 
                    onClick={() => {
                        setEditingClient(undefined);
                        setIsModalOpen(true);
                    }}
                    className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">New client
                </button>
            </div>
            {clients.length === 0 ? (
                <div className="text-center p-8 text-gray-500">
                    No clients yet. Create your first one.
                </div>
            ) : processedClients.length === 0 ? (
                <p className="text-gray-500 my-4">
                    No clients match your search.
                </p>
            ) : (<ClientsTable 
                    clients={processedClients} 
                    onEdit={(client) => {
                        setEditingClient(client);
                        setIsModalOpen(true);
                    }
                    }
                    onDelete={(client) => {
                        removeClient(client);
                    }}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                />
            )}
            <div className="text-sm text-gray-600 mb-4">
                Showing {processedClients.length} of {clients.length} clients
            </div>
            {isModalOpen && (
                <ClientModal
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingClient(undefined);
                    }}
                    onCreate={addClient}
                    onEdit={editClient}
                    client={editingClient}
                />
            )}
        </div>
    );
}
