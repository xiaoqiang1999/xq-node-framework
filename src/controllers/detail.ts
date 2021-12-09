import { controller, get, params, RouterContext, Next } from '@/framework';

@controller('/detail')
export default class Detail {
	private name = 'controller-details';

	@get('')
	get(ctx: RouterContext, next: Next) {
		ctx.body = 'detail';
		console.log(this.name);
		this.name = '123';
		console.log(this.name);
		return next();
	}

	@get('/:id')
	getDetail(
		@params('id') id: string,
		@params('name') name: string,
		ctx: RouterContext,
		next: Next
	) {
		ctx.body = `detail from ${id}`;
		return next();
	}

	hehe() {
		console.log('pei');
	}
}
