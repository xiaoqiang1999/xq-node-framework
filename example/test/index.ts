/*

	* npm install 时 执行npm的生命周期 script："prepare" 来初始化 git hooks
	* dev: ts-node + tsconfig-paths(解决ts不转译alias的问题)
	* build：
		1. 使用 tsc 转译代码为 ESNEXT
		2. 使用 babel 转译 alias 并转译代码到目标版本 (配置.babelrc)
		3. 静态资源使用shell命令复制指定文件夹

*/
import { Cream } from '~/src';
import log4js from './log4js';

// const app = new Cream({ middlewareOrder: ['static-server'], log4js });
const app = new Cream({ middlewareOrder: ['static-server'] });

(async () => {
	// let res = app.loadFile('./controllers');
	await app.loadFile('./services');
	await app.loadFile('./controllers');
	await app.loadFile('./middlewares');
	await app.loadFile('./utils/index.ts');

	await app.binding();

	app.listen(8080);
})();
