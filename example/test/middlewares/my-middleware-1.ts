import {
	Cream,
	CreamContext,
	Next,
	defineMiddleware,
	MiddlewareClass,
} from '~/src';

@defineMiddleware('my-middleware-1')
class Temp implements MiddlewareClass {
	public initMiddleware = (creamApp: Cream) => {
		return (ctx: CreamContext, next: Next) => {
			console.log('my-middleware-1');
			return next();
		};
	};
}
