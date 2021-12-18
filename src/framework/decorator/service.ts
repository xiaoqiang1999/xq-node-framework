import { injectable } from 'inversify';
import { Constructor } from '../interface';
import { SERVICE_CLASS_LIST } from './constants';

/**
 * 注册 service 的装饰器
 * @returns ClassDecorator
 */
export const service = () => {
	return (TargetClass: Constructor<any>) => {
		injectable()(TargetClass);

		// 从 Reflect对象上取下 service list
		const services = Reflect.getMetadata(SERVICE_CLASS_LIST, Reflect) || [];
		// 将当前service添加到list
		services.push(TargetClass);

		Reflect.defineMetadata(SERVICE_CLASS_LIST, services, Reflect);
	};
};
