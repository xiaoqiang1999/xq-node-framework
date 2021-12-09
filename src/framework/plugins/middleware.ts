import { Middleware } from 'koa';
import { App, RouterContext } from '..';
import { appContainer } from '../container';
import { TYPES } from '../core/types';
import { plugin } from '../decorator/plugin';
import { MiddlewareClass, PluginClass } from '../interface';

@plugin()
class GlobalMiddleware implements PluginClass {
	async initPlugin(app: App) {
		// 监听routerUseBefore事件，在use router之前use中间件
		app.on('routerUseBefore', () => {
			if (!app.options.middlewareOrder) {
				return;
			}

			for (let middlewareName of app.options.middlewareOrder) {
				let middleware = appContainer.getNamed<MiddlewareClass>(
					TYPES.MIDDLEWARE,
					middlewareName
				);
				let middlewareFun = middleware.initMiddleware(app);
				if (middlewareFun) {
					app.koaApp.use(middlewareFun);
				}
			}

			// const middlewareList = Reflect.getMetadata(MIDDLEWARE_LIST, Reflect);
			// 按顺序 use 全局中间件
			// if (app.options.middlewareOrder) {
			// 	getMiddlewareToUse(
			// 		middlewareList,
			// 		app.options.middlewareOrder,
			// 		app
			// 	).forEach(item => app.koaApp.use(item));
			// }
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
