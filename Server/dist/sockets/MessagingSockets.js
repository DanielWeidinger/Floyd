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
        io.on('connection', function (socket) {
            //const user = User.findById(socket.decoded.user.id)
            var unreadMessages = Message_1.default.find({ read: true, recipient: socket.decoded });
            socket.on('message', function (message) {
            });
        });
    };
    return MessagingSockets;
}());
exports.MessagingSockets = MessagingSockets;
