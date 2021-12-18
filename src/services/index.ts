import { CreamContext, service } from '@/framework';
import { inject } from 'inversify';

@service()
export class IndexService {
	@inject('ctx') ctx!: CreamContext;

	show() {
		console.log('IndexService');
		console.log(this.ctx.request.url);
	}
}
