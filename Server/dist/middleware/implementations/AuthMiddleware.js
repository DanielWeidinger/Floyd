"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var Config_1 = require("../../config/Config");
function verifyToken(req, res, next) {
    var token = req.header("token");
    if (!token)
        return res.status(401).json({ message: "REST: Authentication error" });
    try {
        var decoded = jsonwebtoken_1.verify(token, Config_1.Config.secret);
        req.user = decoded.user;
        next();
    }
    catch (e) {
        console.error(e);
        res.status(500).send({ message: "Invalid Token" });
    }
}
exports.verifyToken = verifyToken;
function allowCrossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}
exports.allowCrossOrigin = allowCrossOrigin;
