/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
/// <reference types="node" />
import * as http from 'http'
import * as query from 'querystring'

// setter method
declare interface Setter {
    (key: string, value: any): void
}

// getter method
declare interface Getter {
    (key: string): any
}

// response writer method
declare interface ResponseWriter {
    (data: any): void
}

// Defer method
declare interface Defer {
    (key: string, value: any): void
}

// expose rest
export declare namespace rest {
    // rest.Request interface for http request
    interface Request extends http.IncomingMessage {
        readonly query: query.ParsedUrlQuery,
        readonly params: Params,
        readonly set: Setter,
        readonly get: Getter,

        readonly defer: Defer,
        readonly deferred: {
            readonly reset: () => void
        }
    }

    // rest.Response interface for http response
    interface Response extends http.ServerResponse {
        readonly json: ResponseWriter,
        readonly send: ResponseWriter,

        status(code: number): Response,
    }

    // rest.Params interface used in http request url
    interface Params {
        [key: string]: string
    }

    // rest.Handler function is used to declare function in route
    interface Handler {
        (req: Request, res: Response): Promise<any> | void
    }

    // rest.DeferredTask function is used to declare function in route
    interface DeferredTask {
        (data: any): Promise<void> | void
    }

    // rest.ExceptionHandler function is used to declare exception function in route
    interface ExceptionHandler {
        (err: Error, req: Request, res: Response): Promise<any> | void
    }

    // rest.Middleware is used in `use`
    interface Middleware {
        (handler: Handler): void
    }

    // rest.ExtendedRoute is used in `for`
    interface ExtendedRoute {
        (prefix: string): any
    }

    // rest.Route is used in `{http.Method}`
    interface Route {
        (url: string, handler: Handler): void
    }

    // rest.Exception is used in `error`
    interface Exception {
        (code: string, handler: ExceptionHandler): void
    }

    // rest.Deferred is used in `error`
    interface Deferred {
        (key: string, task: DeferredTask): void
    }
}

// exposed app type
declare const app: {
    readonly set: Setter,
    readonly get: Getter,
};

// exposed type route
declare const route: {
    readonly use: rest.Middleware,
    readonly for: rest.ExtendedRoute,
    readonly all: rest.Route,
    readonly get: rest.Route,
    readonly post: rest.Route,
    readonly put: rest.Route,
    readonly delete: rest.Route,
    readonly options: rest.Route,
    readonly head: rest.Route,
    readonly error: rest.Exception,
    readonly deferred: rest.Deferred
};

declare const requestListener: http.RequestListener;

export {
    app,
    route,
    requestListener
}
