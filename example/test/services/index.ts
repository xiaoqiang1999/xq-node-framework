import { CreamContext, service } from '~/src';
import { inject } from 'inversify';

@service()
export class IndexService {
	@inject('ctx') ctx!: CreamContext;

	show() {
		console.log('IndexService');
		console.log(this.ctx.request.url);
		return 'Run: Index Service';
	}
}
