/**
 * 从ctx中提取所需参数 的装饰器
 * handleRequest(@params('所需参数的key'), @query('所需参数的key'), ...... ctx, next)
 */
import { Param, HttpFuncParam } from '../interface';
import { HTTP_FUNC_PARAM_LIST } from './constants';

/**
 * 创建参数装饰器
 * @param paramType 参数在context中的类型 即参数在context中的key值
 * @returns Function
 */
const createParamDecorator = (paramType: Param) => {
	/**
	 * http函数的参数装饰器
	 * @param propKey 要获取的值的key
	 * @returns ParameterDecorator
	 */
	return (propKey: string) => {
		return (targetProto: object, funcName: string, paramIndex: number) => {
			const TargetClass = targetProto.constructor;
			// 在controller类上定义 函数的参数信息
			// 获取参数list
			const paramList: HttpFuncParam[] =
				Reflect.getMetadata(HTTP_FUNC_PARAM_LIST, TargetClass, funcName) || [];
			// 添加新的参数
			paramList.unshift({ paramType, propKey, paramIndex });
			// 重新赋值
			Reflect.defineMetadata(
				HTTP_FUNC_PARAM_LIST,
				paramList,
				TargetClass,
				funcName
			);
		};
	};
};

/** 创建参数装饰器 */
export const params = createParamDecorator('params');
export const query = createParamDecorator('query');
export const body = createParamDecorator('body');
export const headers = createParamDecorator('headers');
export const cookies = createParamDecorator('cookies');
