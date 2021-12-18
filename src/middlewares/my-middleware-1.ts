import { Cream, CreamContext, Next, defineMiddleware } from '@/framework';
import { MiddlewareClass } from '@/framework/interface';

@defineMiddleware('my-middleware-1')
class Temp implements MiddlewareClass {
	public initMiddleware = (creamApp: Cream) => {
		return (ctx: CreamContext, next: Next) => {
			console.log('my-middleware-1');
			ctx.body = 'my-middleware-1';
			return next();
		};
	};
}
