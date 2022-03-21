import { Next, Context } from 'koa';
import { MiddlewareClass } from '../../interface';
import { defineMiddleware, Cream } from '../..';
// import log4js, { Log4js } from 'log4js';
import chalk from 'chalk';
import { debugLog } from '@/utils';

const chalkGreen = chalk.green;
const chalkBlue = chalk.blue;

// log4js.configure({
// 	appenders: {
// 		console: {
// 			type: 'console',
// 		},
// 		// file: {
// 		// 	type: 'file',
// 		// 	filename: './test.log',
// 		// },
// 	},
// 	categories: {
// 		default: {
// 			appenders: ['console'],
// 			level: 'debug',
// 		},
// 	},
// });

// let logger = log4js.getLogger();
// logger.debug('hello log4js!');

const title_time = chalkGreen('time:');
const title_method = chalkGreen('method:');
const title_url = chalkGreen('url:');
const title_status = chalkGreen('status:');
const title_time_cout = chalkGreen('time_cost:');

@defineMiddleware('cream-logger')
class CreamLogger implements MiddlewareClass {
	public initMiddleware(creamApp: Cream) {
		return async (ctx: Context, next: Next) => {
			const reqTime = Date.now();
			await next();
			const info = this.getInfo(
				new Date().toLocaleString(),
				ctx.method,
				ctx.url,
				ctx.status,
				Date.now() - reqTime
			);
			creamApp.perttyLog(info);
		};
	}

	private getInfo(
		time: string,
		method: string,
		url: string,
		status: string | number,
		time_cost: string | number
	) {
		return `
${title_time}      ${time}
${title_method}    ${method}
${title_url}       ${chalkBlue(url)}
${title_status}    ${chalkBlue(status.toString())}
${title_time_cout} ${time_cost}ms
----------------------------------`;
	}
}
