"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
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
        this.router.post;
    };
    return FloydController;
}());
exports.FloydController = FloydController;
