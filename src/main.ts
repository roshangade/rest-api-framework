/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import app from './lib/application';
import router from './lib/router';
import server from './lib/server';

class API {
    private _app: object;
    private _router: object;
    private _server: object;

    constructor() {
        this._app = app;
        this._router = router;
        this._server = server;
    }

    get app() {
        return this._app;
    }

    get router() {
        return this._router;
    }

    get server() {
        return this._server;
    }
}

export = new API();