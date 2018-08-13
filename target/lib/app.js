"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const interceptors_1 = __importDefault(require("./../utils/interceptors"));
const router_1 = __importDefault(require("./router"));
/**
 * Application
 */
const app = () => {
    router_1.default.use(interceptors_1.default.request);
    router_1.default.use(interceptors_1.default.response);
    const config = {};
    const set = (key, value) => {
        config[key] = value;
    };
    const get = (key) => config[key];
    return Object.assign({
        set,
        get
    });
};
exports.default = app();
