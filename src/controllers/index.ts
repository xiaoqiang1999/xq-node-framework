import { controller, get, Next, RouterContext } from '@/framework';
import { middleware } from '@/framework/decorator/middleware';

@middleware('my-middleware-1')
// @middleware(['my-middleware2', '3'])
// @middleware('my-middleware4')
@controller('/')
export class Index {
	public name = 'xqqqqqq';

	@get('')
	@middleware(['my-middleware-1'])
	// @middleware('my-middleware1')
	@middleware('my-middleware-2')
	getIndex(ctx: RouterContext, next: Next) {
		ctx.body = 'index';
		return next();
	}
}
