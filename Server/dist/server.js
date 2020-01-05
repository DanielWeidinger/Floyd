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
var app = new app_1.default(5000, 
//Middleware  
[
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
], 
//Controller 
[new ApiController_1.ApiController("/api")]);
app.listen();
