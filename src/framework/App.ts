import { HttpFuncConf, HttpFuncParam } from './interface';
import Koa from 'koa';
import Router, { RouterContext } from '@koa/router';
import {
	CONTROLLER_CLASS_LIST,
	CONTROLLER_CLASS_PATH,
	HTTP_FUNC_CONF,
	HTTP_FUNC_PARAM_LIST,
} from './decorator/constants';
import { recursiveReaddir } from './utils';

export default class App {
	private koaApp: Koa;
	private router: Router;

	public constructor() {
		this.koaApp = new Koa();
		this.router = new Router();
	}

	public loadFile(path: string) {
		return recursiveReaddir(path);
	}

	public binding() {
		const controllerList = Reflect.getMetadata(CONTROLLER_CLASS_LIST, Reflect);

		for (const Controller of controllerList) {
			// console.log(Object.getOwnPropertyNames(Controller.prototype));
			// Object.getOwnPropertyNames(Controller.prototype).forEach(funcName => {
			// 	console.log(Controller.prototype[funcName]);
			// });

			const basePath = Reflect.getMetadata(
				CONTROLLER_CLASS_PATH,
				Controller
			) as string;
			// let instance = new Controller();
			// let proto = Object.getPrototypeOf(instance);
			const proto = Controller.prototype;

			Object.getOwnPropertyNames(proto)
				.filter(i => i !== 'constructor' && typeof proto[i] === 'function')
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
		}

		this.koaApp.use(this.router.routes()).use(this.router.allowedMethods());
	}

	public listen(port: number) {
		this.koaApp.listen(port);
	}
}

function getArgsByParam(paramList: HttpFuncParam[], ctx: RouterContext) {
	const args: any[] = [];

	for (const param of paramList) {
		const { paramType, propKey, paramIndex } = param;
		switch (paramType) {
			case 'params':
				args[paramIndex] = ctx.params[propKey];
				break;
			case 'query':
				args[paramIndex] = ctx.query[propKey];
				break;
			// case 'body':
			// args[paramIndex] = ctx.body[propKey]; // 内置 koa-body来解析 body
			// break;
			case 'headers':
				args[paramIndex] = ctx.headers[propKey];
				break;
			case 'cookies':
				args[paramIndex] = ctx.cookies.get(propKey);
		}
	}

	return args;
}
