export type ClientStatus = "active" | "paused" | "closed";

export const ClientStatusOptions: ClientStatus[] = ["active", "paused", "closed"];

export type Client = ClientData & {
    id: string;
    createdAt: string;
}

export type ClientData = {
    name: string;
    email: string;
    status: ClientStatus;
}