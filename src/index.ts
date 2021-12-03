/*

	* dev: ts-node + tsconfig-paths(解决ts不转译alias的问题)
	* build：
		1. 使用 tsc 转译代码为 ESNEXT
		2. 使用 babel 转译 alias 并转译代码到目标版本 (配置.babelrc)
		3. 静态资源使用shell命令复制指定文件夹

*/

import http from 'http';
import { add } from '@/utils';

http
	.createServer((req, res) => {
		res.end('hello world\n1 + 2 = ' + add(1, 2));
	})
	.listen(8080);
