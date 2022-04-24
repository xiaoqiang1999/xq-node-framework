import {
	CreamContext,
	Next,
	defineMiddleware,
	MiddlewareClass,
} from 'cream.js';

@defineMiddleware('my-middleware-3')
class MyMiddleware2 implements MiddlewareClass {
	initMiddleware() {
		return (ctx: CreamContext, next: Next) => {
			console.log('my-middleware-3');
			return next();
		};
	}
}
