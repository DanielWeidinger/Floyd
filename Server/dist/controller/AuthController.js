"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jsonwebtoken_1 = require("jsonwebtoken");
var express_validator_1 = require("express-validator");
var User_1 = __importDefault(require("../models/User"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var Config_1 = require("../config/Config");
var AuthController = /** @class */ (function () {
    function AuthController(path) {
        this.router = express_1.Router();
        this.path = path;
        this.initRoutes();
    }
    AuthController.prototype.initRoutes = function () {
        this.router.post(this.path + '/register', [
            express_validator_1.check("username", "Please Enter a Valid Username")
                .not()
                .isEmpty(),
            express_validator_1.check("password", "Please enter a valid password").isLength({
                min: 6
            })
        ], this.handleSignUp);
        this.router.post(this.path + '/login', [
            express_validator_1.check("username", "Please Enter a Valid Username")
                .not()
                .isEmpty(),
            express_validator_1.check("password", "Please enter a valid password").isLength({
                min: 6
            })
        ], this.handleLogin);
        this.router.get(this.path + '/secret-route', function (req, res) {
            res.send('This is the secret content. Only logged in users can see that!');
        });
    };
    AuthController.prototype.handleSignUp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, _a, username, password, user, salt, passwordHash, newUser, payload, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        errors = express_validator_1.validationResult(req);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, res.status(400).json({
                                    errors: errors.array()
                                })];
                        }
                        _a = req.body, username = _a.username, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, User_1.default.findOne({
                                username: username
                            })];
                    case 2:
                        user = _b.sent();
                        if (user) {
                            return [2 /*return*/, res.status(400).json({
                                    msg: "User Already Exists"
                                })];
                        }
                        return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
                    case 3:
                        salt = _b.sent();
                        return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
                    case 4:
                        passwordHash = _b.sent();
                        user = new User_1.default({
                            username: username,
                            passwordHash: passwordHash,
                            salt: salt,
                        });
                        return [4 /*yield*/, user.save()];
                    case 5:
                        newUser = _b.sent();
                        //add self to contacts
                        newUser.contacts = [newUser._id];
                        return [4 /*yield*/, newUser.save()];
                    case 6:
                        _b.sent();
                        payload = {
                            user: {
                                id: user.id
                            }
                        };
                        jsonwebtoken_1.sign(payload, Config_1.Config.secret, {
                            expiresIn: Config_1.Config.tokenExpiration
                        }, function (err, token) {
                            if (err)
                                throw err;
                            res.status(200).json({
                                token: token
                            });
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _b.sent();
                        res.status(500).send("Error in Saving");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.handleLogin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, _a, username, password, user, isMatch, payload, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        errors = express_validator_1.validationResult(req);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, res.status(400).json({
                                    errors: errors.array()
                                })];
                        }
                        _a = req.body, username = _a.username, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, User_1.default.findOne({
                                username: username
                            })];
                    case 2:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res.status(400).json({
                                    message: "User does not exist"
                                })];
                        return [4 /*yield*/, bcryptjs_1.default.compare(password, user.passwordHash)];
                    case 3:
                        isMatch = _b.sent();
                        if (!isMatch)
                            return [2 /*return*/, res.status(400).json({
                                    message: "Incorrect Password!"
                                })];
                        payload = {
                            user: {
                                id: user.id
                            }
                        };
                        jsonwebtoken_1.sign(payload, Config_1.Config.secret, {
                            expiresIn: Config_1.Config.tokenExpiration
                        }, function (err, token) {
                            if (err)
                                throw err;
                            res.status(200).json({
                                token: token
                            });
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        console.error(e_1);
                        res.status(500).json({
                            message: "Server Error"
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
