/// <reference types="koa__router" />
import { RouterOptions, RouterContext } from '@koa/router';
import { Container } from 'inversify';
import { Next } from 'koa';
import { IKoaBodyOptions } from 'koa-body';
import { Cream } from '.';
export declare type HttpMethods = 'all' | 'get' | 'post';
export declare type Param = 'params' | 'query' | 'body' | 'headers' | 'cookies';
export declare type Constructor<T> = new (...args: any[]) => T;
export declare type LogLevel = 'info' | 'warn' | 'error';
export interface HttpFuncConf {
    path: string;
    method: HttpMethods;
    funcName: string;
}
export interface HttpFuncParam {
    paramType: Param;
    propKey: string;
    paramIndex: number;
}
export interface CreamOptions {
    rootPath?: string;
    middlewareOrder?: string[];
    routerOptions?: RouterOptions;
    onerrorOptions?: {
        [key: string]: any;
    };
    bodyOptions?: IKoaBodyOptions;
}
export interface MiddlewareClass {
    initMiddleware(creamApp: Cream): void | ((ctx: CreamContext, next: Next) => any);
}
export interface PluginClass {
    initPlugin(creamApp: Cream): Promise<any>;
}
export interface CreamContext extends RouterContext {
    requestContainer: Container;
}
