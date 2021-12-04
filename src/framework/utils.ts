import fs from 'fs';
import { join as pathJoin } from 'path';

export const recursiveReaddir = (pathname: string, resList: any[] = []) => {
	// 如果是目录 则读取 然后逐项遍历
	if (fs.statSync(pathname).isDirectory()) {
		const fileList = fs.readdirSync(pathname);
		for (const item of fileList) {
			recursiveReaddir(pathJoin(pathname, item), resList);
		}
	} else {
		// 如果是文件 则直接 require
		resList.push(require(pathname));
	}
	return resList;
};
