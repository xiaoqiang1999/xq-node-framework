import { RouterOptions } from '@koa/router';
import { Container } from 'inversify';
import { Next } from 'koa';
import { IKoaBodyOptions } from 'koa-body';
import { Log4js } from 'log4js';
import { Cream, RouterContext } from '.';

export type HttpMethods = 'all' | 'get' | 'post';

export type Param = 'params' | 'query' | 'body' | 'headers' | 'cookies';

export type Constructor<T> = new (...args: any[]) => T;

export type LogLevel = 'info' | 'warn' | 'error';

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
	onerrorOptions?: object;
	bodyOptions?: IKoaBodyOptions;
	log4js?: Log4js;
}

export interface MiddlewareClass {
	initMiddleware(
		creamApp: Cream
	): void | ((ctx: CreamContext, next: Next) => any);
}

export interface PluginClass {
	initPlugin(creamApp: Cream): Promise<any>;
}

export interface CreamContext extends RouterContext {
	requestContainer: Container;
}
