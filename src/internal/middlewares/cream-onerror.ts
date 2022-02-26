import { Cream, defineMiddleware } from '../..';
import { MiddlewareClass } from '../../interface';
// @ts-ignore 没有对应的@types库
import onerror from 'koa-onerror';

@defineMiddleware('cream-onerror')
class CreamOnerror implements MiddlewareClass {
	public initMiddleware(creamApp: Cream) {
		onerror(creamApp.koaApp, creamApp.options.onerrorOptions);
	}
}
