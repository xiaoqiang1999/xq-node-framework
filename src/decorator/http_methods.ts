/**
 * http method 请求装饰器 @get('xx/xxx') @post()
 */
import { HttpMethods } from '../interface';
import { HTTP_FUNC_CONF } from './constants';

/**
 * 创建 method装饰器
 * @param httpMethod
 * @returns Function
 */
const createMethodDecorator = (method: HttpMethods) => {
	/**
	 * method装饰器
	 * @param path 路由路径
	 * @returns MethodDecorator
	 */
	return (path: string) => {
		return (
			targetProto: { [key: string]: any },
			funcName: string,
			// @ts-ignore
			descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
		) => {
			const ControllerClass = targetProto.constructor;
			// console.log(funcName);
			const funcList =
				Reflect.getMetadata(HTTP_FUNC_CONF, ControllerClass) || [];

			funcList.push({ funcName, path, method });
			Reflect.defineMetadata(HTTP_FUNC_CONF, funcList, ControllerClass);

			/**
			Reflect.defineMetadata(
				HTTP_FUNC_CONF,
				{
					path,
					method,
				} as HttpFuncConf,
				descriptor.value!
			);
			// return descriptor;
			 */
		};
	};
};

/** 创建 httpMethod装饰器 */
export const get = createMethodDecorator('get');
export const post = createMethodDecorator('post');
