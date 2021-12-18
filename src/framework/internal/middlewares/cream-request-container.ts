import { Cream } from '../..';
import { creamContainer } from '../../container';
import { defineMiddleware } from '../..';
import { MiddlewareClass } from '../../interface';
import { Container } from 'inversify';
import { Context, Next } from 'koa';

@defineMiddleware('cream-request-container')
class RequestContainer implements MiddlewareClass {
	public initMiddleware(creamApp: Cream) {
		return this.middleware;
	}

	middleware(ctx: Context, next: Next) {
		let requestContainer = new Container();
		requestContainer.parent = creamContainer;
		requestContainer.bind('ctx').toConstantValue(ctx);
		ctx.requestContainer = requestContainer;
		return next();
	}
}
