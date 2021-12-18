import { Cream } from '..';
import { creamContainer } from '../container';
import { TYPES } from '../core/types';
import { plugin } from '../decorator/plugin';
import { MiddlewareClass, PluginClass } from '../interface';

@plugin()
class GlobalMiddleware implements PluginClass {
	public static readonly internalMiddlewares = [
		'cream-logger',
		'cream-onerror',
		'cream-body',
		'cream-request-container',
	];

	async initPlugin(creamApp: Cream) {
		// 监听routerUseBefore事件，在use router之前use中间件
		creamApp.on('routerUseBefore', () => {
			let middlewareOrder;

			if (Array.isArray(creamApp.options.middlewareOrder)) {
				middlewareOrder = GlobalMiddleware.internalMiddlewares.concat(
					creamApp.options.middlewareOrder
				);
			} else {
				middlewareOrder = GlobalMiddleware.internalMiddlewares;
			}

			for (let middlewareName of middlewareOrder) {
				let middleware = creamContainer.getNamed<MiddlewareClass>(
					TYPES.MIDDLEWARE,
					middlewareName
				);
				let middlewareFun = middleware.initMiddleware(creamApp);
				if (middlewareFun) {
					creamApp.koaApp.use(middlewareFun);
				}
			}
		});
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
