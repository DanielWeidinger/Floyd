"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HeaderMorphing = /** @class */ (function () {
    function HeaderMorphing() {
        this.middleWare = function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        };
    }
    return HeaderMorphing;
}());
exports.default = HeaderMorphing;
