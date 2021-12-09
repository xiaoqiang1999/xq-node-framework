import { Middleware } from 'koa';
import { App } from '.';

export type HttpMethods = 'all' | 'get' | 'post';

export type Param = 'params' | 'query' | 'body' | 'headers' | 'cookies';

export type Constructor<T> = new (...args: any[]) => T;

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

export interface AppOptions {
	middlewareOrder?: string[];
}

export interface MiddlewareClass {
	initMiddleware(app: App): void | Middleware;
}

export interface PluginClass {
	initPlugin(app: App): Promise<any>;
}
