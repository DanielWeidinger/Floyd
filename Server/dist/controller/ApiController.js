"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Pusher = require('pusher');
var ApiController = /** @class */ (function () {
    function ApiController(path) {
        this.router = express_1.Router();
        this.path = path;
        this.pusher = new Pusher({
            appId: '926344',
            key: '93da0690b2a2d810e34f',
            secret: 'c2efbd368c4389734391',
            cluster: 'eu'
        });
        this.initRoutes();
    }
    ApiController.prototype.initRoutes = function () {
        var _this = this;
        this.router.get(this.path, function (req, res) {
            res.send("Running");
        });
        this.router.post(this.path + '/auth', function (req, res) {
            console.log('POST to /pusher/auth');
            var socketId = req.body.socket_id;
            var channel = req.body.channel_name;
            var auth = _this.pusher.authenticate(socketId, channel);
            res.send(auth);
        });
        this.router.get(this.path + '/test', function (req, res) {
            console.log('Tesing');
            _this.pusher.trigger('private-messages', 'client-new-message', 'lol');
            res.send('sent');
        });
    };
    return ApiController;
}());
exports.ApiController = ApiController;
