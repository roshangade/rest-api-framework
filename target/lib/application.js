"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const interceptors_1 = __importDefault(require("./../utils/interceptors"));
const router_1 = __importDefault(require("./router"));
/**
 * Application
 */
class Application {
    constructor() {
        this.config = {};
        router_1.default.use(interceptors_1.default.request);
        router_1.default.use(interceptors_1.default.response);
    }
    set(key, value) {
        this.config[key] = value;
    }
    ;
    get(key) {
        return this.config[key];
    }
}
module.exports = new Application();
