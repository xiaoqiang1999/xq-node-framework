import { RouterContext } from '@koa/router';
import { Next } from 'koa';
import { controller, get, params } from '@/framework';

@controller('/detail')
export default class Detail {
	@get('')
	get(ctx: RouterContext, next) {
		ctx.body = 'detail';
	}

	@get('/:id')
	getDetail(@params('id') id: string, ctx: RouterContext, next: Next) {
		ctx.body = `detail from ${id}`;
	}
}
