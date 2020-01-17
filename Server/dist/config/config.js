"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
function getMongoInstace(connectionString) {
    var mongoose = new mongoose_1.Mongoose();
    try {
        mongoose.connect(connectionString, {
            useNewUrlParser: true
        });
        console.log("Connected to DB !!");
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    return mongoose;
}
exports.getMongoInstace = getMongoInstace;
