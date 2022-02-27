export declare const get: (path: string) => (targetProto: {
    [key: string]: any;
}, funcName: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) => void;
export declare const post: (path: string) => (targetProto: {
    [key: string]: any;
}, funcName: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) => void;
