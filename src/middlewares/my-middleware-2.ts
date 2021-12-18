import { CreamContext, Next, defineMiddleware } from '@/framework';
import { MiddlewareClass } from '@/framework/interface';

@defineMiddleware('my-middleware-2')
class MyMiddleware2 implements MiddlewareClass {
	initMiddleware() {
		return (ctx: CreamContext, next: Next) => {
			console.log('my-middleware-2');
			ctx.body = 'my-middleware-2';
			return next();
		};
	}
}
