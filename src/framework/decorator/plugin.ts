import { injectable } from 'inversify';
import { appContainer } from '../container';
import { TYPES } from '../core/types';
import { Constructor, PluginClass } from '../interface';

/**
 * 定义plugin的装饰器
 * @returns ClassDecorator
 */
export const plugin = () => {
	return (TargetClass: Constructor<PluginClass>) => {
		injectable()(TargetClass);
		appContainer.bind<PluginClass>(TYPES.PLUGIN_CLASS).to(TargetClass);
	};
};
