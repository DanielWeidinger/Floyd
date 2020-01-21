"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Middleware = /** @class */ (function () {
    function Middleware(route, handler) {
        this.route = route;
        this.handler = handler;
    }
    return Middleware;
}());
exports.Middleware = Middleware;
