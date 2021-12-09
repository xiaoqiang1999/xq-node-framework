import {
	AppOptions,
	HttpFuncConf,
	HttpFuncParam,
	PluginClass,
} from '../interface';
import Koa, { Middleware } from 'koa';
import Router, { RouterContext } from '@koa/router';
import { recursiveReaddir } from '../utils';
import { appContainer } from '../container';
import { TYPES } from './types';
import { resolve } from 'path';
import EventEmitter from 'events';

export default class App extends EventEmitter {
	public koaApp: Koa;
	public router: Router;
	public options: AppOptions = {};

	public constructor(options: AppOptions = {}) {
		super();
		this.koaApp = new Koa();
		this.router = new Router();
		Object.assign(this.options, options);
	}

	public loadFile(path: string) {
		return recursiveReaddir(path);
	}

	public async binding() {
		this.loadFile(resolve(__dirname, '../plugins'));

		// const controllerList = Reflect.getMetadata(CONTROLLER_CLASS_LIST, Reflect);
		// const middlewareList = Reflect.getMetadata(MIDDLEWARE_LIST, Reflect);
		// console.log(middlewareList);
		// 按顺序 use 全局中间件
		// if (this.options.middlewareOrder) {
		// 	getMiddlewareToUse(
		// 		middlewareList,
		// 		this.options.middlewareOrder,
		// 		this
		// 	).forEach(item => this.koaApp.use(item));
		// }

		let list = appContainer.getAll<PluginClass>(TYPES.PLUGIN_CLASS);
		for (let item of list) {
			await item.initPlugin(this);
		}

		// 触发init事件 进行路由绑定
		this.emit('init');
		// for (const Controller of controllerList) {
		// 	const basePath: string = Reflect.getMetadata(
		// 		CONTROLLER_CLASS_PATH,
		// 		Controller
		// 	);

		// 	// 获取定义在 controllerClass 上的 httpMethods描述
		// 	const funcList: HttpFuncConf[] = Reflect.getMetadata(
		// 		HTTP_FUNC_CONF,
		// 		Controller
		// 	);

		// 	// let instance = new Controller();
		// 	// let proto = Object.getPrototypeOf(instance);
		// 	const proto = Controller.prototype;

		// 	for (const { method, path, funcName } of funcList) {
		// 		let func = proto[funcName];
		// 		const paramList = Reflect.getMetadata(
		// 			HTTP_FUNC_PARAM_LIST,
		// 			func
		// 		) as HttpFuncParam[];

		// 		// 若不存在参数装饰器 直接绑定回调函数
		// 		if (!Array.isArray(paramList)) {
		// 			this.router[method](basePath + path, func);
		// 		} else {
		// 			// 存在参数装饰器 配置之
		// 			this.router[method](basePath + path, (ctx, next) => {
		// 				func(...getArgsByParam(paramList, ctx), ctx, next);
		// 			});
		// 		}
		// 	}

		/**
			Object.getOwnPropertyNames(proto)
				.filter(
					i =>
						i !== 'constructor' &&
						typeof proto[i] === 'function' &&
						Reflect.getMetadata(HTTP_FUNC_CONF, proto[i])
				)
				.map((funcName: string) => proto[funcName])
				.forEach(func => {
					const { path, method } = Reflect.getMetadata(
						HTTP_FUNC_CONF,
						func
					) as HttpFuncConf;

					const paramList = Reflect.getMetadata(
						HTTP_FUNC_PARAM_LIST,
						func
					) as HttpFuncParam[];

					// 若不存在参数装饰器 直接绑定回调函数
					if (!Array.isArray(paramList)) {
						this.router[method](basePath + path, func);
						return;
					}
					// 存在参数装饰器 配置之
					this.router[method](basePath + path, (ctx, next) => {
						func(...getArgsByParam(paramList, ctx), ctx, next);
					});
				});
				 */
		// }

		// this.koaApp.use(this.router.routes()).use(this.router.allowedMethods());
	}

	public listen(port: number) {
		this.koaApp.listen(port);
	}
}

// function getMiddlewareToUse(
// 	middlewareList: { [key: string]: any },
// 	middlewareOrder: string[],
// 	app: App
// ): Middleware[] {
// 	let res: Middleware[] = [];
// 	middlewareOrder.forEach(name => {
// 		let Middleware = middlewareList[name];

// 		if (!Middleware) {
// 			throw new Error(`「使用了未定义的全局中间件: ${name}」`);
// 		}
// 		// 实例化 middleware类 并获取中间件函数
// 		let middlewareFun = new Middleware().initMiddleware(app);
// 		// 如果存在中间件函数 则返回 (返回后调用koaApp.use来使用中间件函数)
// 		// 如果不存在中间件函数 则什么都不做
// 		if (middlewareFun) {
// 			res.push(middlewareFun);
// 		}
// 	});
// 	return res;
// }

// function getArgsByParam(paramList: HttpFuncParam[], ctx: RouterContext) {
// 	const args: any[] = [];

// 	for (const param of paramList) {
// 		const { paramType, propKey, paramIndex } = param;
// 		switch (paramType) {
// 			case 'params':
// 				args[paramIndex] = ctx.params[propKey];
// 				break;
// 			case 'query':
// 				args[paramIndex] = ctx.query[propKey];
// 				break;
// 			// case 'body':
// 			// args[paramIndex] = ctx.body[propKey]; // 内置 koa-body来解析 body
// 			// break;
// 			case 'headers':
// 				args[paramIndex] = ctx.headers[propKey];
// 				break;
// 			case 'cookies':
// 				args[paramIndex] = ctx.cookies.get(propKey);
// 		}
// 	}

// 	return args;
// }
