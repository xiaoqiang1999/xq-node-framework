/*

	* npm install 时 执行npm的生命周期 script："prepare" 来初始化 git hooks
	* dev: ts-node + tsconfig-paths(解决ts不转译alias的问题)
	* build：
		1. 使用 tsc 转译代码为 ESNEXT
		2. 使用 babel 转译 alias 并转译代码到目标版本 (配置.babelrc)
		3. 静态资源使用shell命令复制指定文件夹

*/
import { App } from '@/framework';
import path from 'path';

const app = new App();

// let res = app.loadFile('./controllers');
app.loadFile(path.resolve(__dirname, './controllers'));

app.binding();

app.listen(8080);
