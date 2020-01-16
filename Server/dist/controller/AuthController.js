"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Pusher = require('pusher');
var AuthController = /** @class */ (function () {
    function AuthController(path) {
        this.router = express_1.Router();
        this.path = path;
        this.initRoutes();
    }
    AuthController.prototype.initRoutes = function () {
        this.router.post('/sign-up', function (req, res, next) { });
        this.router.post('/login', function (req, res, next) { });
        this.router.get('/secret-route', function (req, res, next) {
            res.send('This is the secret content. Only logged in users can see that!');
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
