import { CreamOptions, LogLevel, PluginClass } from '../interface';
import Koa from 'koa';
import Router from '@koa/router';
import { debugLog, recursiveReaddir } from '../utils';
import { creamContainer } from '../container';
import { TYPES } from './types';
import { join } from 'path';
import EventEmitter from 'events';
import { Server } from 'http';
import { ListenOptions } from 'net';
import defaultOptions from './defaultOptions';
import objectAssignDeep from 'object-assign-deep';
import { buildProviderModule } from 'inversify-binding-decorators';

export default class Cream extends EventEmitter {
	public koaApp: Koa;
	public router: Router;
	// @ts-ignore
	public options: CreamOptions = {};
	public httpServer!: Server;
	// public creamContainer: Container = creamContainer;

	public constructor(options: CreamOptions = {}) {
		super();

		objectAssignDeep(this.options, defaultOptions, options);

		this.koaApp = new Koa();
		this.router = new Router(defaultOptions.routerOptions);

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

		creamContainer.load(buildProviderModule()); // 加载provide绑定的依赖
		this.emit('init', creamContainer); // 触发init事件 进行路由绑定
	}

	public perttyLog(msg: string, level: LogLevel = 'info') {
		debugLog(`[${new Date().toLocaleString()}] ${msg}`, level);
		// this.log4js.getLogger('cream')[level](msg);
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
	public listen(...args: any[]): Server {
		this.httpServer = this.koaApp.listen(...args);
		this.emit('serverReady', this.httpServer);
		return this.httpServer;
	}
}
