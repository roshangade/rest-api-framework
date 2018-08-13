"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const handler_1 = __importDefault(require("./handler"));
/**
 * Create sesrver
 */
const server = http_1.default.createServer((req, res) => {
    return handler_1.default(req, res);
});
exports.default = server;
