"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = __importDefault(require("../models/User"));
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
                    res.send({ contracts: dbContracts.map(function (contact) { return contact.username; }) });
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
                        throw new Error("REST: Contact not found!");
                    }
                    dbUser.contacts.push(dbContact._id);
                    dbUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        res.send({ contacts: dbUser.contacts.map(function (contact) { return contact.username; }) });
                    });
                });
            });
        });
        this.router.post;
    };
    return FloydController;
}());
exports.FloydController = FloydController;
