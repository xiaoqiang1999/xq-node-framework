import { Middleware } from 'koa';
import { Cream } from '..';
import { plugin } from '../decorator/plugin';
import { PluginClass } from '../interface';

@plugin()
class MiddlewareTime implements PluginClass {
	/**
	 * 中间件的执行时间 = 此中间件的结束时间 - 此中间件的开始时间
	 *                = 下一个中间件的开始时间 - 此中间件的开始时间
	 */
	public async initPlugin(creamApp: Cream) {
		return;

		let startTimeList: number[] = [];

		creamApp.koaApp.use(async (ctx, next) => {
			await next();
			startTimeList.push(Date.now());
			for (let i = 0; i < startTimeList.length - 1; i++) {
				let outStr = '';

				if (i === startTimeList.length - 2) {
					outStr += 'Router-allowedMethods: ';
				} else if (i === startTimeList.length - 3) {
					outStr += 'Router: ';
				} else {
					outStr += `middleware-${i + 1}: `;
				}

				outStr += startTimeList[i + 1] - startTimeList[i] + 'ms';
				console.log(outStr);
			}
			// 清空此次请求的list 以供下次请求使用
			startTimeList = [];
		});

		const use = creamApp.koaApp.use;
		// 重写 koa.use方法 记录每个中间件开始执行的时间
		// @ts-ignore
		creamApp.koaApp.use = (fn: Middleware) => {
			return use.call(creamApp.koaApp, (ctx, next) => {
				startTimeList.push(Date.now());
				return fn(ctx, next);
			});
		};
	}
}
