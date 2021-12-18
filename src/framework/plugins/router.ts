import assert from 'assert';
import is from 'is_js';
import { Cream, CreamContext, RouterContext } from '..';
import { creamContainer } from '../container';
import { TYPES } from '../core/types';
import {
	CONTROLLER_CLASS_LIST,
	CONTROLLER_CLASS_PATH,
	CONTROLLER_MIDDLEWARE_LIST,
	HTTP_FUNC_CONF,
	HTTP_FUNC_MIDDLEWARE_LIST,
	HTTP_FUNC_PARAM_LIST,
	SERVICE_CLASS_LIST,
} from '../decorator/constants';
import { plugin } from '../decorator/plugin';
import {
	Constructor,
	HttpFuncConf,
	HttpFuncParam,
	HttpMethods,
	MiddlewareClass,
	PluginClass,
} from '../interface';

@plugin()
class Router implements PluginClass {
	async initPlugin(creamApp: Cream) {
		// 监听init事件 在app init时绑定路由
		creamApp.on('init', () => {
			// 触发routerUseBefore事件 在use router之前use中间件
			creamApp.emit('routerUseBefore');
			// 绑定路由
			this.bindRouter(creamApp);
		});
	}

	private bindRouter(creamApp: Cream) {
		const controllers: Constructor<any>[] | undefined = Reflect.getMetadata(
			CONTROLLER_CLASS_LIST,
			Reflect
		);

		if (!controllers) return;

		const services: Constructor<any>[] | undefined = Reflect.getMetadata(
			SERVICE_CLASS_LIST,
			Reflect
		);
		// temp
		services?.forEach(Service => {
			creamContainer.bind(Service.name).to(Service);
		});

		for (const Controller of controllers) {
			const basePath: string =
				Reflect.getMetadata(CONTROLLER_CLASS_PATH, Controller) || '';

			// 获取定义在 controllerClass 上的 httpMethods描述
			const funcList: HttpFuncConf[] | undefined = Reflect.getMetadata(
				HTTP_FUNC_CONF,
				Controller
			);

			if (!funcList) continue;

			for (const { method, path, funcName } of funcList) {
				const routePath = basePath + path;

				creamApp.perttyLog(`[init] [router] ${method} - ${routePath}`);

				useMiddleware(Controller, funcName, routePath, method, creamApp);

				const paramsDescriptionList: HttpFuncParam[] = Reflect.getMetadata(
					HTTP_FUNC_PARAM_LIST,
					Controller,
					funcName
				);

				// 若不存在参数装饰器 直接绑定回调函数
				if (!Array.isArray(paramsDescriptionList)) {
					creamApp.router[method](routePath, (ctx: CreamContext, next) => {
						// 获取对应的controller实例
						let controller: any = ctx.requestContainer.getNamed(
							TYPES.CONTROLLER,
							Controller.name
						);
						// 调用对应的handle方法
						return controller[funcName](ctx, next);
					});
				} else {
					// 存在参数装饰器 配置之
					creamApp.router[method](routePath, (ctx: CreamContext, next) => {
						let controller: any = ctx.requestContainer.getNamed(
							TYPES.CONTROLLER,
							Controller.name
						);
						return controller[funcName](
							...getArgsByParamsDescription(paramsDescriptionList, ctx),
							ctx,
							next
						);
					});
				}
			}
		}
		creamApp.koaApp
			.use(creamApp.router.routes())
			.use(creamApp.router.allowedMethods());
	}
}

function getArgsByParamsDescription(
	paramsDescriptionList: HttpFuncParam[],
	ctx: RouterContext
) {
	const args: any[] = [];

	for (const { paramType, propKey, paramIndex } of paramsDescriptionList) {
		switch (paramType) {
			case 'params':
				args[paramIndex] = ctx.params[propKey];
				break;
			case 'query':
				args[paramIndex] = ctx.query[propKey];
				break;
			case 'body':
				args[paramIndex] = ctx.request.body[propKey]; // 内置 koa-body来解析 body
				break;
			case 'headers':
				args[paramIndex] = ctx.headers[propKey];
				break;
			case 'cookies':
				args[paramIndex] = ctx.cookies.get(propKey);
		}
	}

	return args;
}

/**
 * 在 httpFunction 上 Use Middleware
 * @param Controller httpFunction所在的controller
 * @param funcName Function名
 * @param path 请求路径
 * @param method 请求Method
 * @param app App实例
 * @returns void
 */
function useMiddleware(
	Controller: Constructor<any>,
	funcName: string,
	path: string,
	method: HttpMethods,
	creamApp: Cream
) {
	let result: string[];

	const controllerMiddlewares: string[] | undefined = Reflect.getMetadata(
		CONTROLLER_MIDDLEWARE_LIST,
		Controller
	);
	const funMiddlewares: string[] | undefined = Reflect.getMetadata(
		HTTP_FUNC_MIDDLEWARE_LIST,
		Controller,
		funcName
	);

	if (controllerMiddlewares && funMiddlewares) {
		result = controllerMiddlewares.concat(funMiddlewares);
	} else if (controllerMiddlewares) {
		result = controllerMiddlewares;
	} else if (funMiddlewares) {
		result = funMiddlewares;
	} else {
		return;
	}

	for (let middlewareName of result) {
		let middlewareInstance = creamContainer.getNamed<MiddlewareClass>(
			TYPES.MIDDLEWARE,
			middlewareName
		);
		let middleware = middlewareInstance.initMiddleware(creamApp);
		assert(
			is.function(middleware),
			`[middleware] 中间件: ${middlewareName} 不存在或不是函数`
		);
		creamApp.router[method](path, middleware!);
	}
}
