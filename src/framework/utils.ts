import chalk from 'chalk';
import fs from 'fs';
import { join as pathJoin } from 'path';
import { LogLevel } from './interface';

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

export const debugLog = (msg: string, type: LogLevel = 'info') => {
	// @ts-ignore
	switch (type) {
		case 'info':
			console.log(chalk.rgb(38, 209, 237)(msg));
			break;
		case 'warn':
			console.log(chalk.rgb(255, 250, 120)(msg));
			break;
		case 'error':
			console.log(chalk.rgb(197, 15, 31)(msg));
			break;
	}
};
