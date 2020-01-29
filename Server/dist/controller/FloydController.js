"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = __importDefault(require("../models/User"));
var Message_1 = __importDefault(require("../models/Message"));
var Group_1 = __importDefault(require("../models/Group"));
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
                    } }).exec(function (err, dbContacts) {
                    if (err) {
                        throw err;
                    }
                    var payload = dbContacts.map(function (contact) {
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
        this.router.get(this.path + "/groups", function (req, res) {
            User_1.default.findById(req.user.id).exec(function (err, dbUser) {
                if (err) {
                    throw err;
                }
                if (!dbUser) {
                    throw new Error('REST: User not found');
                }
                Group_1.default.find({ '_id': {
                        $in: dbUser.groups
                    } }).exec(function (err, dbGroups) {
                    if (err) {
                        throw err;
                    }
                    var payload = dbGroups.map(function (group) {
                        return { id: group.id,
                            name: group.name,
                            users: group.users };
                    });
                    res.send(payload);
                });
            });
        });
        this.router.post(this.path + "/group", function (req, res) {
            User_1.default.findById(req.user.id).exec(function (err, dbUser) {
                if (err) {
                    throw err;
                }
                if (!dbUser) {
                    throw new Error('REST: User not found');
                }
                var groupName = req.body.name;
                var groupMembers = req.body.groupMembers;
                if (!groupName || !groupMembers || groupMembers.length < 1) {
                    return res.status(400).json({ message: "bad group config" });
                }
                User_1.default.find({ "username": { $in: groupName } }, function (err, dbMembers) {
                    if (err) {
                        throw err;
                    }
                    if (!dbMembers) {
                        return res.status(400).json({ message: "no group member was found!" });
                    }
                    var newGroup = new Group_1.default({
                        name: groupName,
                        users: dbMembers.map(function (member) { return member.username; })
                    });
                    newGroup.save(function (err, dbNewGroup) {
                        if (err) {
                            throw err;
                        }
                        var payload = {
                            id: dbNewGroup._id,
                            name: dbNewGroup.name,
                            users: dbNewGroup.users
                        };
                        return res.send(payload);
                    });
                });
            });
        });
    };
    return FloydController;
}());
exports.FloydController = FloydController;
