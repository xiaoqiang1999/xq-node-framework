import assert from 'assert';
import is from 'is_js';
import { Middleware } from 'koa';
import { App, RouterContext } from '..';
import { appContainer } from '../container';
import { TYPES } from '../core/types';
import {
	CONTROLLER_CLASS_LIST,
	CONTROLLER_CLASS_PATH,
	CONTROLLER_MIDDLEWARE_LIST,
	HTTP_FUNC_CONF,
	HTTP_FUNC_MIDDLEWARE_LIST,
	HTTP_FUNC_PARAM_LIST,
} from '../decorator/constants';
import { plugin } from '../decorator/plugin';
import {
	HttpFuncConf,
	HttpFuncParam,
	MiddlewareClass,
	PluginClass,
} from '../interface';

@plugin()
class Router implements PluginClass {
	async initPlugin(app: App) {
		// 监听init事件 在app init时绑定路由
		app.on('init', () => {
			// 触发routerUseBefore事件 在use router之前use中间件
			app.emit('routerUseBefore');

			const controllerList = Reflect.getMetadata(
				CONTROLLER_CLASS_LIST,
				Reflect
			);

			// const list = appContainer.getAll<any>(TYPES.CONTROLLER);
			// console.log(list);
			// console.log(list[0].constructor);

			for (const Controller of controllerList) {
				const basePath: string = Reflect.getMetadata(
					CONTROLLER_CLASS_PATH,
					Controller
				);
				const controllerMiddlewares: string[] = Reflect.getMetadata(
					CONTROLLER_MIDDLEWARE_LIST,
					Controller
				);
				console.log(controllerMiddlewares);

				// 获取定义在 controllerClass 上的 httpMethods描述
				const funcList: HttpFuncConf[] = Reflect.getMetadata(
					HTTP_FUNC_CONF,
					Controller
				);
				// let proto = Object.getPrototypeOf(instance);
				for (const { method, path, funcName } of funcList) {
					const routePath = basePath + path;
					const paramList: HttpFuncParam[] = Reflect.getMetadata(
						HTTP_FUNC_PARAM_LIST,
						Controller,
						funcName
					);

					const middlewareList: string[] = Reflect.getMetadata(
						HTTP_FUNC_MIDDLEWARE_LIST,
						Controller,
						funcName
					);
					middlewareList &&
						middlewareList.forEach(middlewareName => {
							let middlewareInstance = appContainer.getNamed<MiddlewareClass>(
								TYPES.MIDDLEWARE,
								middlewareName
							);
							let middleware = middlewareInstance.initMiddleware(app);
							assert(
								is.function(middleware),
								`[middleware] 中间件: ${middlewareName} 不存在或不是函数`
							);
							app.router.use(routePath, middleware as Middleware);
						});

					// 若不存在参数装饰器 直接绑定回调函数
					if (!Array.isArray(paramList)) {
						app.router[method](routePath, (ctx, next) => {
							// 获取对应的controller实例
							let controller: any = appContainer.getNamed(
								TYPES.CONTROLLER,
								Controller.name
							);
							// 调用对应的handle方法
							return controller[funcName](ctx, next);
						});
					} else {
						// 存在参数装饰器 配置之
						app.router[method](routePath, (ctx, next) => {
							let controller: any = appContainer.getNamed(
								TYPES.CONTROLLER,
								Controller.name
							);
							return controller[funcName](
								...getArgsByParam(paramList, ctx),
								ctx,
								next
							);
							// func(...getArgsByParam(paramList, ctx), ctx, next);
						});
					}
				}
			}
			app.koaApp.use(app.router.routes()).use(app.router.allowedMethods());
		});
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
