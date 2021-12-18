import { CreamContext, controller, get, Next, post } from '@/framework';
import { middleware } from '@/framework/decorator/middleware';
import { IndexService } from '@/services';
import { inject } from 'inversify';

// @middleware(['my-middleware2', '3'])
// @middleware('my-middleware4')
@controller('/index')
@middleware('my-middleware-1')
export class Index {
	public name = 'xqqqqqq';

	@inject('IndexService') index!: IndexService;

	@get('/home/detail')
	@middleware(['my-middleware-2'])
	getIndex(ctx: CreamContext, next: Next) {
		ctx.body = 'index';
		this.index.show();
		// console.log(ctx.requestContainer.get('ctx'));
		return next();
	}

	@post('/home/detail')
	@middleware('my-middleware-3')
	postIndex() {
		console.log('post-index');
	}
}
