// import { Context, Next } from 'koa';
import send, { SendOptions } from 'koa-send';
import path from 'path';

import { defineMiddleware } from '@/framework/decorator/defineMiddleware';
import { App, AppContext, Next } from '@/framework';
import { MiddlewareClass } from '@/framework/interface';

const options: SendOptions = {
	root: path.resolve(__dirname, '../public'),
	index: 'index.html',
};

/**
 * 基于 koa-send 实现的静态文件服务
 * 比 koa-static 更优雅 性能更好
 * koa-static 也是基于 send 的封装
 * 且实现十分简单 所以不如自己封装 send
 * send 的错误创建 使用了 http-errors三方模块
 */
// export default async (ctx: Context, next: Next) => {
// 	/**
// 	 * 如果访问的路径以 /public/ 开头 或是 /public
// 	 * 才执行此函数 提供静态文件服务
// 	 */
// 	if (ctx.path.indexOf('/public/') !== 0 && ctx.path !== '/public') {
// 		return next();
// 	}

// 	const filename = '/' + ctx.path.split('/').splice(2).join('/');
// 	try {
// 		return await send(ctx, filename, options);
// 	} catch (err) {
// 		// 报错 找不到文件
// 		ctx.status = 404;
// 		return;
// 	}
// };

@defineMiddleware('static-server')
class StaticServer implements MiddlewareClass {
	public initMiddleware(app: App) {
		return this.middleware;
	}

	public async middleware(ctx: AppContext, next: Next) {
		/**
		 * 如果访问的路径以 /public/ 开头 或是 /public
		 * 才执行此函数 提供静态文件服务
		 */
		if (ctx.path.indexOf('/public/') !== 0 && ctx.path !== '/public') {
			return next();
		}

		const filename = '/' + ctx.path.split('/').splice(2).join('/');
		try {
			return await send(ctx, filename, options);
		} catch (err) {
			// 报错 找不到文件
			ctx.status = 404;
		}
	}
}
