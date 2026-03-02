import type { ClientStatus } from "../../types/client";
import { ClientStatusOptions } from "../../types/client";

interface Props {
    search: string,
    statusFilter: "all" | ClientStatus,
    onSearchChange: (term: string) => void,
    onStatusChange: (status: "all" | ClientStatus) => void,
    onClear: () => void,
}

export default function SearchBar({ search, statusFilter, onSearchChange, onStatusChange, onClear }: Props) {
    return (
        <div className="mb-4 md:flex md:gap-4">
            <div className="flex items-center gap-4 flex-col md:flex-row">
                <div className="flex items-center w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full max-w-sm border p-2 pl-10 rounded bg-white"
                    />
                </div>
                <div className="flex items-center gap-4 self-start">
                    <label htmlFor="status" className="font-bold">Status: </label>
                    <select
                        id="status"
                        value={statusFilter}
                        onChange={(e) => onStatusChange(e.target.value as "all" | ClientStatus)}
                        className="border p-2 rounded bg-white hover:cursor-pointer"
                    >
                        <option value="all">All</option>
                        {ClientStatusOptions.map((s) => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                    </select>
                </div>
            </div>
            {(search || statusFilter !== "all") && (
                <button
                    onClick={onClear}
                    className="text-sm text-blue-600 hover:underline whitespace-nowrap mt-4 md:mt-0"
                >
                    Clear filters
                </button>
            )}
        </div>
    )
}