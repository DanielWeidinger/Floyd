import { Socket } from "socket.io";
import { verify } from "jsonwebtoken";
import { Config } from "../../config/Config";


export function socketVerifyToken(socket: any, next: any){
    if (socket.handshake.query && socket.handshake.query.token){
        verify(socket.handshake.query.token, Config.secret, function(err: Error, decoded: any) {
          if(err) return next(new Error('Authentication error'));
          socket.user = decoded;
          next();
        });
      } else {
          next(new Error('Socket: Authentication error'));
      } 
}