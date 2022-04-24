import {
	controller,
	get,
	params,
	CreamContext,
	Next,
	body,
	post,
	cookies,
	headers,
	Cream,
	middleware,
	inject,
} from 'cream.js';
import { OutgoingHttpHeaders } from 'http';
import { IndexService } from '../services';

const header = () => {
	return (
		targetProto: object,
		funcName: string,
		descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
	) => {
		const oldFun = descriptor.value;
		descriptor.value = function (...args: any[]) {
			console.log('hehehe');
			// console.log(args[args.length - 1]); // next
			// console.log(args[args.length - 2]); // context
			const next = args.pop();
			const ctx: CreamContext = args.pop();

			console.log('this');
			console.log(this);

			return oldFun!.call(this, ...args, ctx, () => {
				// ctx.res.setHeader();
				// ctx.append();
				return next();
			});
		};
	};
};

@controller('/detail')
@middleware('my-middleware-1')
export default class Detail {
	@inject('IndexService') index!: IndexService;
	@inject('creamApp') creamApp!: Cream;

	@get('')
	@middleware('my-middleware-2')
	get(ctx: CreamContext, next: Next) {
		ctx.body = 'detail';
		console.log('detail');
		this.index.show();
		return next();
	}

	@get('/:id')
	@post('/:id')
	@middleware('my-middleware-3')
	@header()
	getDetail(
		@params('id') id: string,
		@body('name') body_name: string,
		@cookies('name') cookie_name: string,
		@headers('name') header_name: string,
		ctx: CreamContext,
		next: Next
	) {
		const outStr = `
			detail from ${id}
			body_name: ${body_name}
			cookie_name: ${cookie_name}
			header_name: ${header_name}
		`;
		ctx.body = outStr;
		this.creamApp.perttyLog(outStr);
		this.index.show();
		return next();
	}
}
