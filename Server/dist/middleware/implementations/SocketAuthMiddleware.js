"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var Config_1 = require("../../config/Config");
function socketVerifyToken(socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
        jsonwebtoken_1.verify(socket.handshake.query.token, Config_1.Config.secret, function (err, decoded) {
            if (err)
                return next(new Error('Authentication error'));
            socket.user = decoded;
            next();
        });
    }
    else {
        next(new Error('Socket: Authentication error'));
    }
}
exports.socketVerifyToken = socketVerifyToken;
