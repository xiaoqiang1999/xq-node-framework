import { Next } from 'koa';
import { RouterContext } from '@koa/router';

// type routerFun = {
// 	[key in keyof Router]: Router[key] extends Function ? Router[key] : never;
// };
// export type routerMethods = {
// 	[key in keyof routerFun]?: routerCallback | routerCallback[];
// };

type routerCallback = (ctx: RouterContext, next: Next) => any;
export type routerMethods = 'use' | 'all' | 'get' | 'post';

export interface IController {
	pathname: string;
	methods: { [key in routerMethods]?: routerCallback | routerCallback[] };
	// methods: { [key in keyof routerMethods]?: routerMethods[key] };
	// callback: IMiddleware<IRouterParamContext> | IMiddleware<IRouterParamContext>[];
}
