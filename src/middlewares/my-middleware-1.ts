import { App, AppContext, Next } from '@/framework';
import { defineMiddleware } from '@/framework/decorator/defineMiddleware';
import { MiddlewareClass } from '@/framework/interface';

@defineMiddleware('my-middleware-1')
class Temp implements MiddlewareClass {
	public initMiddleware = (app: App) => {
		return (ctx: AppContext, next: Next) => {
			ctx.body = 'my-middleware-1';
			return next();
		};
	};
}
