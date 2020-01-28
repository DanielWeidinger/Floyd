"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = __importDefault(require("../models/User"));
var Message_1 = __importDefault(require("../models/Message"));
var FloydController = /** @class */ (function () {
    function FloydController(path) {
        this.router = express_1.Router();
        this.path = path;
        this.initRoutes();
    }
    FloydController.prototype.initRoutes = function () {
        this.router.get(this.path, function (req, res) {
            res.send("Running");
        });
        this.router.get(this.path + "/contacts", function (req, res) {
            User_1.default.findById(req.user.id).exec(function (err, dbUser) {
                if (err) {
                    throw err;
                }
                if (!dbUser) {
                    throw new Error('REST: User not found');
                }
                User_1.default.find({ '_id': {
                        $in: dbUser.contacts
                    } }).exec(function (err, dbContracts) {
                    if (err) {
                        throw err;
                    }
                    var payload = dbContracts.map(function (contact) {
                        return { username: contact.username };
                    });
                    res.send(payload);
                });
            });
        });
        this.router.post(this.path + "/contact", function (req, res) {
            User_1.default.findById(req.user.id).exec(function (err, dbUser) {
                if (err) {
                    throw err;
                }
                if (!dbUser) {
                    throw new Error('REST: User not found');
                }
                var newContact = req.body.contactUsername;
                User_1.default.findOne({ 'username': newContact }, function (err, dbContact) {
                    if (err) {
                        throw err;
                    }
                    if (!dbContact) {
                        return res.status(400).json({ message: "user not found" });
                    }
                    User_1.default.exists({ "_id": dbUser._id, "contacts": { $in: [dbContact._id] } }, function (err, exists) {
                        if (err) {
                            throw err;
                        }
                        if (exists) {
                            return res.status(400).json({ message: "already added to contacts!" });
                        }
                        dbUser.contacts.push(dbContact._id);
                        dbUser.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return res.send({ username: newContact });
                        });
                    });
                });
            });
        });
        this.router.get(this.path + "/messages", function (req, res) {
            User_1.default.findById(req.user.id).exec(function (err, dbUser) {
                if (err) {
                    throw err;
                }
                if (!dbUser) {
                    throw new Error('REST: User not found');
                }
                Message_1.default.find({ "$and": [{ "$or": [{ recipient: dbUser.username }, { username: dbUser.username }] },
                        { read: true }] }, function (err, dbMessages) {
                    if (err) {
                        throw err;
                    }
                    var messages = dbMessages.map(function (message) {
                        return {
                            username: message.username,
                            recipient: message.recipient,
                            text: message.text,
                            timestamp: message.timestamp,
                            read: message.read,
                            multipleRecipients: message.multipleRecipients
                        };
                    });
                    return res.send(messages);
                });
            });
        });
    };
    return FloydController;
}());
exports.FloydController = FloydController;
