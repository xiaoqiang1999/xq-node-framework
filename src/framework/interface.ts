export type HttpMethods = 'all' | 'get' | 'post';

export type Param = 'params' | 'query' | 'body' | 'headers' | 'cookies';

export interface HttpFuncConf {
	path: string;
	method: HttpMethods;
}

export interface HttpFuncParam {
	paramType: Param;
	propKey: string;
	paramIndex: number;
}
