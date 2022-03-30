import { CreamContext, service } from '~/src';
import { inject } from 'inversify';
import { Utils } from '../utils';

@service()
export class IndexService {
	@inject('ctx') ctx!: CreamContext;
	@inject(Utils) utils!: Utils;

	show() {
		let res = 'Run: Index Service. utils add: ' + this.utils.add(1, 2, 3);
		console.log(this.ctx.request.url);
		return res;
	}
}
