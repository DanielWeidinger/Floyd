import { Socket } from "socket.io";

export interface SocketMiddleware{
    (socket: Socket, next: any): void
}