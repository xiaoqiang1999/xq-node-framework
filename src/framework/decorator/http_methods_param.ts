/**
 * 从ctx中提取所需参数 的装饰器
 * handleRequest(@params('所需参数的key'), @query('所需参数的key'), ...... ctx, next)
 */
import { Param, HttpFuncParam } from '../interface';
import { HTTP_FUNC_PARAM_LIST } from './constants';

/**
 * 创建参数装饰器
 * @param paramType 参数在context中的类型 即参数在context中的key值
 * @returns
 */
const createParamDecorator = (paramType: Param) => {
	return (propKey: string) => {
		return (
			targetProto: { [key: string]: any },
			funcName: string,
			paramIndex: number
		) => {
			let func = targetProto[funcName];
			// 在函数上定义 参数的信息
			// 获取参数list
			let paramList: HttpFuncParam[] =
				Reflect.getMetadata(HTTP_FUNC_PARAM_LIST, func) || [];
			// 添加新的参数
			let newParamList = (
				[{ paramType, propKey, paramIndex }] as HttpFuncParam[]
			).concat(paramList);
			// 重新赋值
			Reflect.defineMetadata(HTTP_FUNC_PARAM_LIST, newParamList, func);
		};
	};
};

/** 创建参数装饰器 */
export const params = createParamDecorator('params');
export const query = createParamDecorator('query');
export const body = createParamDecorator('body');
