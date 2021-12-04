import fs = require('fs');
// import { xmlBuider, xmlParser } from '@/utils/xml2js';
import { join as pathJoin } from 'path';

/**
 * require某个路径下的全部文件 (深度优先遍历)
 * @param {string} 绝对路径
 * @return any[]
 */
export const requireAllFile = <T>(pathname: string): T[] => {
	const resList: T[] = []; // 定义结果数组
	return traverse(pathname); // 执行方法 递归遍历

	// 定义递归遍历方法
	function traverse(pathname: string): T[] {
		// 如果是目录 则读取 然后逐项遍历
		if (fs.statSync(pathname).isDirectory()) {
			const fileList = fs.readdirSync(pathname);
			for (const item of fileList) {
				traverse(`${pathname}/${item}`);
			}
		} else {
			// 如果是文件 则直接 require
			resList.push(require(pathname).default as T);
		}
		return resList;
	}
};

// export const parseXMLToObj = async (xmlStr: string): Promise<any> => {
// 	try {
// 		return await xmlParser.parseStringPromise(xmlStr);
// 	} catch {
// 		throw new Error('xml转JSON出错 ，检查输入的xml字符是否正确');
// 	}
// };

// export const buildXMLFromObj = (obj: object): string => {
// 	try {
// 		return xmlBuider.buildObject(obj);
// 	} catch {
// 		throw new Error('JSON转xml出错，请检查输入的对象格式是否正确');
// 	}
// };

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
