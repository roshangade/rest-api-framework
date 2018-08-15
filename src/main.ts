/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import app from './lib/application';
import route from './lib/route';
import server from './lib/server';

class API {
    private _app: object;
    private _route: object;
    private _server: object;

    constructor() {
        this._app = app;
        this._route = route;
        this._server = server;
    }

    get app() {
        return this._app;
    }

    get route() {
        return this._route;
    }

    get server() {
        return this._server;
    }
}

export = new API();