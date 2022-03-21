import { creamContainer } from '@/container';
import { injectable } from 'inversify';
import { Constructor } from '../interface';
import { SERVICE_CLASS_LIST } from './constants';

/**
 * 定义 service 的装饰器
 * @returns ClassDecorator
 */
export const service = () => {
	// @ts-ignore
	return (TargetClass: Constructor<any>) => {
		injectable()(TargetClass); // 修饰service为可注入类
		creamContainer.bind(TargetClass.name).to(TargetClass); // 将service通过类名绑定到容器

		// 从 Reflect对象上取下 service list
		// const services = Reflect.getMetadata(SERVICE_CLASS_LIST, Reflect) || [];
		// 将当前service添加到list
		// services.push(TargetClass);

		// Reflect.defineMetadata(SERVICE_CLASS_LIST, services, Reflect);
	};
};
