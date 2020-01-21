"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var App = /** @class */ (function () {
    function App(port, middleWare, controllers, socketMiddleware, sockets) {
        this.app = express_1.default();
        this.http = http_1.default.createServer(this.app);
        this.io = socket_io_1.default();
        this.port = port;
        this.middlewares(middleWare);
        this.routes(controllers);
        this.socketMiddleware(socketMiddleware);
        this.sockets(sockets);
    }
    App.prototype.middlewares = function (middleWares) {
        var _this = this;
        middleWares.forEach(function (middleWare) {
            _this.app.use(middleWare.route, middleWare.handler);
        });
    };
    App.prototype.routes = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/', controller.router);
        });
    };
    App.prototype.socketMiddleware = function (middleWare) {
        var _this = this;
        middleWare.forEach(function (middleWare) {
            _this.io.use(middleWare);
        });
    };
    App.prototype.sockets = function (sockets) {
        var _this = this;
        sockets.forEach(function (socketable) {
            socketable.initSockets(_this.io);
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        this.http.listen(this.port, function () {
            console.log("App listening on the http://localhost:" + _this.port);
        });
        this.io.listen(this.http);
    };
    return App;
}());
exports.default = App;
