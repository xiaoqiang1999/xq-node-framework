/**
 * http method 请求装饰器 @get('xx/xxx') @post()
 */
import { HttpFuncConf, HttpMethods } from '../interface';
import { HTTP_FUNC_CONF } from './constants';

/**
 * 创建 method装饰器
 * @param httpMethod字符串
 * @returns method装饰器
 */
const createMethodDecorator = (method: HttpMethods) => {
	return (path: string) => {
		return (
			targetProto: object,
			funcName: string,
			descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
		) => {
			Reflect.defineMetadata(
				HTTP_FUNC_CONF,
				{
					path,
					method,
				} as HttpFuncConf,
				descriptor.value!
			);
			// return descriptor;
		};
	};
};

/** 创建 httpMethod装饰器 */
export const get = createMethodDecorator('get');
export const post = createMethodDecorator('post');
