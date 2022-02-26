import { CreamOptions, LogLevel, PluginClass } from '../interface';
import Koa from 'koa';
import Router from '@koa/router';
import { recursiveReaddir } from '../utils';
import { creamContainer } from '../container';
import { TYPES } from './types';
import { join } from 'path';
import EventEmitter from 'events';
import { Server } from 'http';
import { ListenOptions } from 'net';
import log4js, { Log4js } from 'log4js';
import defaultOptions from './defaultOptions';
import objectAssignDeep from 'object-assign-deep';

export default class Cream extends EventEmitter {
	public koaApp: Koa;
	public router: Router;
	// @ts-ignore
	public options: CreamOptions = {};
	public log4js: Log4js;

	public constructor(options: CreamOptions = {}) {
		super();
		this.koaApp = new Koa();
		this.router = new Router();

		if (options.log4js) {
			this.log4js = options.log4js;
			delete options.log4js;
		} else {
			this.log4js = log4js.configure(defaultOptions.log4jsConfigure);
		}

		objectAssignDeep(this.options, defaultOptions, options);

		this.koaApp.on('error', (err: Error) => {
			this.perttyLog(`[Koa Error] ${err.stack || err.message}`, 'error');
		});

		creamContainer.bind('creamApp').toConstantValue(this);
	}

	public loadFile(path: string) {
		// @ts-ignore
		return recursiveReaddir(join(this.options.rootPath!, path));
	}

	public async binding() {
		recursiveReaddir(join(__dirname, '../plugins'));
		recursiveReaddir(join(__dirname, '../internal/middlewares'));

		const plugins = creamContainer.getAll<PluginClass>(TYPES.PLUGIN_CLASS);
		for (const item of plugins) {
			await item.initPlugin(this);
		}

		// 触发init事件 进行路由绑定
		this.emit('init');
	}

	public perttyLog(msg: string, level: LogLevel = 'info') {
		// debugLog(`[${new Date().toLocaleString()}] ${msg}`, level);
		this.log4js.getLogger('cream')[level](msg);
	}

	listen(
		port?: number,
		hostname?: string,
		backlog?: number,
		listeningListener?: () => void
	): Server;
	listen(
		port: number,
		hostname?: string,
		listeningListener?: () => void
	): Server;
	listen(
		port: number,
		backlog?: number,
		listeningListener?: () => void
	): Server;
	listen(port: number, listeningListener?: () => void): Server;
	listen(
		path: string,
		backlog?: number,
		listeningListener?: () => void
	): Server;
	listen(path: string, listeningListener?: () => void): Server;
	listen(options: ListenOptions, listeningListener?: () => void): Server;
	// @ts-ignore
	listen(handle: any, backlog?: number, listeningListener?: () => void): Server;
	// @ts-ignore
	listen(handle: any, listeningListener?: () => void): Server;
	// @ts-ignore
	public listen(...args: any[]) {
		return this.koaApp.listen(...args);
	}
}
