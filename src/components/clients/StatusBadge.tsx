import type { ClientStatus } from "../../types/client";

interface Props {
    status: ClientStatus;
}

export default function StatusBadge({ status }: Props) {
    const styles =
        status === "active"
        ? "bg-green-200 text-green-700"
        : status === "paused"
        ? "bg-yellow-200 text-yellow-700"
        : "bg-gray-200 text-gray-700";

    return (
        <span className={`px-2 py-1 rounded text-sm font-medium ${styles}`}>
            {status}
        </span>
    );
}
