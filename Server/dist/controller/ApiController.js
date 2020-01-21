"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ApiController = /** @class */ (function () {
    function ApiController(path) {
        this.router = express_1.Router();
        this.path = path;
        this.initRoutes();
    }
    ApiController.prototype.initRoutes = function () {
        this.router.get(this.path, function (req, res) {
            res.send("Running");
        });
    };
    return ApiController;
}());
exports.ApiController = ApiController;
