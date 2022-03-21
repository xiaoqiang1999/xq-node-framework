import { Constructor } from '../interface';
import {
	CONTROLLER_MIDDLEWARE_LIST,
	HTTP_FUNC_MIDDLEWARE_LIST,
} from './constants';

/**
 * 添加局部中间件的装饰器
 * @param middleware 要添加的中间件
 * @returns MethodDecorator & ClassDecorator
 */
export const middleware = (middleware: string | string[]) => {
	return (
		// @ts-ignore
		target: any,
		funcName?: string,
		// @ts-ignore
		descriptor?: TypedPropertyDescriptor<(...args: any[]) => any>
	) => {
		// 判断装饰对象是函数还是类
		if (funcName && descriptor) {
			// target为被装饰类的 prototype
			defineFunMeta(target.constructor, funcName, middleware);
		} else {
			// target为被装饰类 (即constructor函数)
			defineControllerMeta(target, middleware);
		}
	};
};

function defineFunMeta(
	// @ts-ignore
	TargetClass: Constructor<any>,
	funcName: string,
	middleware: string | string[]
) {
	let middlewareList =
		Reflect.getMetadata(HTTP_FUNC_MIDDLEWARE_LIST, TargetClass, funcName) || [];

	// 如果传入的middleware参数是数组，则连接
	// 如果是字符串 则添加到数组第0位
	if (Array.isArray(middleware)) {
		middlewareList = middleware.concat(middlewareList);
	} else {
		middlewareList.unshift(middleware);
	}

	Reflect.defineMetadata(
		HTTP_FUNC_MIDDLEWARE_LIST,
		middlewareList,
		TargetClass,
		funcName
	);

	// console.log('FunMiddleware: ');
	// console.log(middlewareList);
}

function defineControllerMeta(
	// @ts-ignore
	TargetClass: Constructor<any>,
	middleware: string | string[]
) {
	let middlewareList =
		Reflect.getMetadata(CONTROLLER_MIDDLEWARE_LIST, TargetClass) || [];

	if (Array.isArray(middleware)) {
		middlewareList = middleware.concat(middlewareList);
	} else {
		middlewareList.unshift(middleware);
	}

	Reflect.defineMetadata(
		CONTROLLER_MIDDLEWARE_LIST,
		middlewareList,
		TargetClass
	);

	// console.log('ControllerMiddleware: ');
	// console.log(middlewareList);
}
