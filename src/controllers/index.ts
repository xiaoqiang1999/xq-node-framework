import { controller, get, RouterContext } from '@/framework';

@controller('/')
export class Index {
	@get('')
	getIndex(ctx: RouterContext) {
		ctx.body = 'index';
	}
}
