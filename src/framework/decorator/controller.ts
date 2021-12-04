import {
	CONTROLLER_CLASS_LIST,
	CONTROLLER_CLASS_PATH,
	HTTP_FUNC_CONF,
} from './constants';

export const controller = (path: string): ClassDecorator => {
	return targetClass => {
		// 给类添加 path
		Reflect.defineMetadata(CONTROLLER_CLASS_PATH, path, targetClass);
		// 从 Reflect对象上取下 类list
		const controllers =
			Reflect.getMetadata(CONTROLLER_CLASS_LIST, Reflect) || [];
		// 将当前类添加到类 list
		const newControllers = [targetClass].concat(controllers);
		Reflect.defineMetadata(CONTROLLER_CLASS_LIST, newControllers, Reflect);
	};
};
