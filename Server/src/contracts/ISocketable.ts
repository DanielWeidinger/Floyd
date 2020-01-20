import { Server } from "socket.io";

export interface ISocketabel{
    initSockets(io: Server): void;
}