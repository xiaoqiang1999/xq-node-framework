import { injectable } from 'inversify';
import { creamContainer } from '../container';
import { TYPES } from '../core/types';
import { Constructor, PluginClass } from '../interface';

/**
 * 定义plugin的装饰器
 * @returns ClassDecorator
 */
export const plugin = () => {
	return (TargetClass: Constructor<PluginClass>) => {
		injectable()(TargetClass); // 修饰plugin为可注入类
		creamContainer.bind<PluginClass>(TYPES.PLUGIN_CLASS).to(TargetClass); // 将plugin绑定到容器
	};
};
