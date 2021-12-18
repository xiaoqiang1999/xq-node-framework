import { dirname } from 'path';

export default {
	rootPath: dirname(require.main?.filename || ''),
	log4jsConfigure: {
		appenders: {
			console: {
				type: 'console',
			},
			access: {
				type: 'console',
			},
			application: {
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
			application: {
				appenders: ['application'],
				level: 'debug',
			},
		},
	},
};
