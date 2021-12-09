import { AppContext, Next } from '@/framework';
import { defineMiddleware } from '@/framework/decorator/defineMiddleware';
import { MiddlewareClass } from '@/framework/interface';

@defineMiddleware('my-middleware-2')
class MyMiddleware2 implements MiddlewareClass {
	initMiddleware() {
		return (ctx: AppContext, next: Next) => {
			ctx.body = 'my-middleware-2';
			return;
		};
	}
}
