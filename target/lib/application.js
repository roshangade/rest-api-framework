"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const interceptors_1 = __importDefault(require("../utils/interceptors"));
const route_1 = __importDefault(require("./route"));
/**
 * Application
 */
class Application {
    constructor() {
        this.config = {};
        route_1.default.use(interceptors_1.default.request);
        route_1.default.use(interceptors_1.default.response);
        route_1.default.use(interceptors_1.default.bodyParser);
    }
    set(key, value) {
        this.config[key] = value;
    }
    ;
    get(key) {
        try {
            return key.split(':').reduce((val, key) => val[key], this.config);
        }
        catch (e) { }
        return undefined;
    }
}
module.exports = new Application();
