import log4js from 'log4js';

log4js.configure({
	appenders: {
		console: {
			type: 'console',
		},
		access: {
			type: 'console',
		},
		cream: {
			type: 'console',
		},
	},
	categories: {
		default: {
			appenders: ['console'],
			level: 'debug',
		},
		access: {
			appenders: ['access'],
			level: 'info',
		},
		cream: {
			appenders: ['cream'],
			level: 'debug',
		},
	},
});

export default log4js;
