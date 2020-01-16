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
var AuthMiddleware_1 = require("./middleware/AuthMiddleware");
var app = new app_1.default(5000, 
//Middleware  
[
    new Middleware_1.Middleware('/', bodyParser.json()),
    new Middleware_1.Middleware('/', bodyParser.urlencoded({ extended: true })),
    new Middleware_1.Middleware('/auth/register', AuthMiddleware_1.signUpMiddleware)
], 
//Controller 
[new ApiController_1.ApiController('/api'),
    new ApiController_1.ApiController('/auth')]);
app.listen();
