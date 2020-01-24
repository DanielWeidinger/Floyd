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
                var user = dbUser;
                _this.connectedUserMap.set(user.username, socket.id);
                Message_1.default.find({ read: true, recipient: user._id }).exec(function (err, messages) {
                    if (err) {
                        return socket.emit("error", err.message); //TODO error event client
                    }
                    messages.forEach(function (message) {
                        socket.emit("message", message);
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
                        message.recipient = dbRecipient._id;
                        message.save(function (err, dbMessage) {
                            if (err) {
                                throw err;
                            }
                            //Send if user is online
                            var recipient = _this.connectedUserMap.get(message.recipient);
                            if (!recipient) {
                                throw new Error("Socket: Recipient not found");
                            }
                            io.to(recipient).emit("message", message);
                        });
                    });
                });
            });
        });
    };
    return MessagingSockets;
}());
exports.MessagingSockets = MessagingSockets;
