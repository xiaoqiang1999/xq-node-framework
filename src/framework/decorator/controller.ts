import { injectable } from 'inversify';
import { appContainer } from '../container';
import { TYPES } from '../core/types';
import { Constructor } from '../interface';
import { CONTROLLER_CLASS_LIST, CONTROLLER_CLASS_PATH } from './constants';

/**
 * 注册 controller 的装饰器
 * @param path controller的基础路由路径
 * @returns ClassDecorator
 */
export const controller = (path: string) => {
	return (TargetClass: Constructor<any>) => {
		injectable()(TargetClass);
		appContainer
			.bind(TYPES.CONTROLLER)
			.to(TargetClass)
			.whenTargetNamed(TargetClass.name);

		// 给类添加 path
		Reflect.defineMetadata(CONTROLLER_CLASS_PATH, path, TargetClass);
		// 从 Reflect对象上取下 类list
		const controllerList =
			Reflect.getMetadata(CONTROLLER_CLASS_LIST, Reflect) || [];
		// 将当前类添加到类 list
		const new_controllerList = [TargetClass].concat(controllerList);
		Reflect.defineMetadata(CONTROLLER_CLASS_LIST, new_controllerList, Reflect);
	};
};
