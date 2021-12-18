import { Next, Context } from 'koa';
import { MiddlewareClass } from '../../interface';
import { defineMiddleware, Cream } from '../..';
import koaBody from 'koa-body';

@defineMiddleware('cream-body')
class CreamLogger implements MiddlewareClass {
	public initMiddleware(creamApp: Cream) {
		return koaBody(creamApp.options.bodyOptions);
		// return async (ctx: Context, next: Next) => {};
	}
}
