import { injectable } from 'inversify';
import { creamContainer } from '../container';
import { TYPES } from '../core/types';
import { Constructor } from '../interface';
import { CONTROLLER_CLASS_LIST, CONTROLLER_CLASS_PATH } from './constants';

/**
 * 定义 controller 的装饰器
 * @param path controller的基础路由路径
 * @returns ClassDecorator
 */
export const controller = (path?: string) => {
	// @ts-ignore
	return (TargetClass: Constructor<any>) => {
		injectable()(TargetClass);
		creamContainer
			.bind(TYPES.CONTROLLER)
			.to(TargetClass)
			.whenTargetNamed(TargetClass.name);

		// creamContainer.bind('constant-controller').toConstantValue(TargetClass);

		if (path) {
			// 给类添加 path
			Reflect.defineMetadata(CONTROLLER_CLASS_PATH, path, TargetClass);
		}

		// 从 Reflect对象上取下 类list
		const controllerList =
			Reflect.getMetadata(CONTROLLER_CLASS_LIST, Reflect) || [];
		// 将当前类添加到类 list
		const new_controllerList = [TargetClass].concat(controllerList);
		Reflect.defineMetadata(CONTROLLER_CLASS_LIST, new_controllerList, Reflect);
		return TargetClass;
	};
};
