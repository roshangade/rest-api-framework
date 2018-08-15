"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
/**
 * Router
 */
class ExpressRouter extends router_1.Router {
    constructor(prefix) {
        prefix = prefix.replace(/(^\/)|(\/$)/g, "");
        super(prefix);
    }
    use(task) {
        this.all('.*', task);
    }
}
exports.ExpressRouter = ExpressRouter;
