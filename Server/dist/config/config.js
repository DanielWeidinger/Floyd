"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.connectionString = "mongodb+srv://daniel:daniel123@cluster0-wi7r8.mongodb.net/test?retryWrites=true&w=majority";
    Config.tokenExpiration = 1 * 60 * 60 * 1000;
    Config.secret = "dannydevito";
    Config.corsWhitelist = [
        'http://localhost:4200',
        'http://localhost:5000'
    ];
    Config.production = false;
    return Config;
}());
exports.Config = Config;
