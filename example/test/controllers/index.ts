import {
	CreamContext,
	controller,
	get,
	Next,
	post,
	middleware,
	Cream,
	inject,
} from 'cream.js';
import { IndexService } from '../services';
import { Utils } from '../utils';

const header = () => {
	return (
		targetProto: object,
		funcName: string,
		descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
	) => {
		// console.log(descriptor.value!.constructor.name);
		// console.log(descriptor.value!.constructor === Index); // false
		descriptor.value = () => {
			console.log('hehehe');
		};
	};
};

// @middleware(['my-middleware2', '3'])
// @middleware('my-middleware4')
@controller('/index')
@middleware('my-middleware-1')
export class Index {
	public name = 'xqqqqqq';

	@inject('IndexService') index!: IndexService;
	@inject('ctx') ctx!: CreamContext;
	@inject('creamApp') creamApp!: Cream;
	@inject(Utils) utils!: Utils;

	@get('/home/detail')
	@middleware(['my-middleware-2'])
	@header()
	getIndex(ctx: CreamContext, next: Next) {
		let res = '';
		res += this.index.show();
		let utils = this.ctx.requestContainer.get(Utils);
		console.log(utils === this.utils);
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
