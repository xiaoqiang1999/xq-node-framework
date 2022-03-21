import {
	CreamContext,
	controller,
	get,
	Next,
	post,
	middleware,
	Cream,
	inject,
} from '~/src';
import { IndexService } from '../services';

// @middleware(['my-middleware2', '3'])
// @middleware('my-middleware4')
@controller('/index')
@middleware('my-middleware-1')
export class Index {
	public name = 'xqqqqqq';

	@inject('IndexService') index!: IndexService;
	@inject('ctx') ctx!: CreamContext;
	@inject('creamApp') creamApp!: Cream;

	@get('/home/detail')
	@middleware(['my-middleware-2'])
	getIndex(ctx: CreamContext, next: Next) {
		let res = '';
		res += this.index.show();
		this.ctx.body = res;
		this.creamApp.perttyLog('str', 'info');
		// console.log(ctx.requestContainer.get('ctx'));
		return next();
	}

	@post('/home/detail')
	@middleware('my-middleware-3')
	postIndex() {
		console.log('post-index');
	}
}
