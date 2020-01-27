"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = __importDefault(require("../models/Message"));
var User_1 = __importDefault(require("../models/User"));
var MessagingSockets = /** @class */ (function () {
    function MessagingSockets() {
        this.connectedUserMap = new Map();
    }
    MessagingSockets.prototype.initSockets = function (io) {
        var _this = this;
        io.on('connection', function (socket) {
            User_1.default.findById(socket.decoded.user.id).exec(function (err, dbUser) {
                if (err) {
                    throw err;
                }
                if (!dbUser) {
                    throw new Error("Socket: User not found");
                }
                _this.connectedUserMap.set(dbUser.username, socket.id);
                Message_1.default.find({ read: false, recipient: dbUser.username }).exec(function (err, messages) {
                    if (err) {
                        return socket.emit("error", err.message); //TODO error event client
                    }
                    messages.forEach(function (message) {
                        _this.sendMessage("message", io, socket.id, message.recipient, dbUser.username, message);
                    });
                });
                socket.on('message', function (message) {
                    User_1.default.findOne({ username: message.recipient }).exec(function (err, dbRecipient) {
                        if (err) {
                            throw err;
                        }
                        if (!dbRecipient) {
                            return socket.emit("error", "Recipient not found!");
                        }
                        var newDbMessage = new Message_1.default(message);
                        newDbMessage.username = dbUser.username;
                        newDbMessage.save(function (err, dbMessage) {
                            if (err) {
                                throw err;
                            }
                            //Send if user is online
                            var socketId = _this.connectedUserMap.get(message.recipient);
                            if (socketId) {
                                _this.sendMessage("message", io, socketId, message.username, message.recipient, dbMessage);
                            }
                        });
                    });
                });
            });
        });
    };
    MessagingSockets.prototype.sendMessage = function (event, io, socketId, username, recipientName, message) {
        message.updateOne({ read: true }, function (err, updated) {
            if (err) {
                throw err;
            }
            var messageDto = {
                username: username,
                recipient: recipientName,
                text: message.text,
                timestamp: message.timestamp,
                read: false,
            };
            io.to(socketId).emit(event, messageDto);
        });
    };
    return MessagingSockets;
}());
exports.MessagingSockets = MessagingSockets;
