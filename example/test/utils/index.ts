// // import { xmlBuider, xmlParser } from '@/utils/xml2js';
import { provide, fluentProvide } from '~/src';

// // export const parseXMLToObj = async (xmlStr: string): Promise<any> => {
// // 	try {
// // 		return await xmlParser.parseStringPromise(xmlStr);
// // 	} catch {
// // 		throw new Error('xml转JSON出错 ，检查输入的xml字符是否正确');
// // 	}
// // };

// // export const buildXMLFromObj = (obj: object): string => {
// // 	try {
// // 		return xmlBuider.buildObject(obj);
// // 	} catch {
// // 		throw new Error('JSON转xml出错，请检查输入的对象格式是否正确');
// // 	}
// // };

@fluentProvide(Utils).inSingletonScope().done() // 在容器中保持单例
export class Utils {
	public add(...args: number[]) {
		return args.reduce((previousValue, currentValue, currentIndex) => {
			return previousValue + currentValue;
		}, 0);
	}
}
