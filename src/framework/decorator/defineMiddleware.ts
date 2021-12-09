import { injectable } from 'inversify';
import { appContainer } from '../container';
import { TYPES } from '../core/types';
import { Constructor, MiddlewareClass } from '../interface';

/**
 * 定义中间件的装饰器
 * @param middlewareName 中间件的名字
 * @returns ClassDecorator
 */
export const defineMiddleware = (middlewareName: string) => {
	return (TargetClass: Constructor<MiddlewareClass>) => {
		injectable()(TargetClass);
		appContainer
			.bind(TYPES.MIDDLEWARE)
			.to(TargetClass)
			.whenTargetNamed(middlewareName);
	};
};
