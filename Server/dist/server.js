"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __importDefault(require("./App"));
var FloydController_1 = require("./controller/FloydController");
var bodyParser = __importStar(require("body-parser"));
var Middleware_1 = require("./middleware/Middleware");
var Config_1 = require("./config/Config");
var AuthController_1 = require("./controller/AuthController");
var DB_1 = require("./config/DB");
var AuthMiddleware_1 = require("./middleware/implementations/AuthMiddleware");
var SocketAuthMiddleware_1 = require("./middleware/implementations/SocketAuthMiddleware");
var MessagingSockets_1 = require("./sockets/MessagingSockets");
var cors_1 = __importDefault(require("cors"));
DB_1.connectMongoInstance(Config_1.Config.connectionString).then(function (mongoose) {
    var app = new App_1.default(5000, 
    //Middleware  
    [
        new Middleware_1.Middleware('/', bodyParser.json()),
        new Middleware_1.Middleware('/', bodyParser.urlencoded({ extended: true })),
        new Middleware_1.Middleware('/socket.io', cors_1.default({
            credentials: true,
            origin: function (origin, callback) {
                if (Config_1.Config.corsWhitelist.includes(origin))
                    return callback(null, true);
                callback(new Error('Not allowed by CORS'));
            }
        })),
        new Middleware_1.Middleware('/messaging', AuthMiddleware_1.verifyToken),
    ], 
    //Controller 
    [new FloydController_1.FloydController('/messaging'),
        new AuthController_1.AuthController('/auth')], 
    //SocketMiddleware
    [
        SocketAuthMiddleware_1.socketVerifyToken,
    ], 
    //Sockets
    [
        new MessagingSockets_1.MessagingSockets()
    ]);
    app.listen();
});
