"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = __importDefault(require("../models/Message"));
var MessagingSockets = /** @class */ (function () {
    function MessagingSockets() {
    }
    MessagingSockets.prototype.initSockets = function (io) {
        io.sockets.on('connection', function (socket) {
            //const user = User.findById(socket.decoded.user.id)
            var unreadMessages = Message_1.default.find({ read: true, recipient: socket.user });
            //console.log(unreadMessages)
            socket.on('message', function (message) {
                console.log(message);
            });
        });
    };
    return MessagingSockets;
}());
exports.MessagingSockets = MessagingSockets;
