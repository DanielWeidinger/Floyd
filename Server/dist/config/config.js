"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.connectionString = "mongodb+srv://daniel:daniel123@cluster0-wi7r8.mongodb.net/test?retryWrites=true&w=majority";
    Config.tokenExpiration = 1 * 60 * 60 * 1000;
    Config.secret = "dannydevito";
    return Config;
}());
exports.Config = Config;
