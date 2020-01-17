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
var app_1 = __importDefault(require("./app"));
var ApiController_1 = require("./controller/ApiController");
var bodyParser = __importStar(require("body-parser"));
var Middleware_1 = require("./middleware/Middleware");
var Config_1 = require("./config/Config");
var AuthController_1 = require("./controller/AuthController");
var DB_1 = require("./config/DB");
var config = new Config_1.Config();
DB_1.getMongoInstance(config.connectionString).then(function (mongoose) {
    var app = new app_1.default(5000, 
    //Middleware  
    [
        new Middleware_1.Middleware('/', bodyParser.json()),
        new Middleware_1.Middleware('/', bodyParser.urlencoded({ extended: true })),
    ], 
    //Controller 
    [new ApiController_1.ApiController('/api'),
        new AuthController_1.AuthController('/auth', mongoose)]);
    app.listen();
});
