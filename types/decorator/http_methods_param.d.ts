export declare const params: (propKey: string) => (targetProto: Record<string, unknown>, funcName: string, paramIndex: number) => void;
export declare const query: (propKey: string) => (targetProto: Record<string, unknown>, funcName: string, paramIndex: number) => void;
export declare const body: (propKey: string) => (targetProto: Record<string, unknown>, funcName: string, paramIndex: number) => void;
export declare const headers: (propKey: string) => (targetProto: Record<string, unknown>, funcName: string, paramIndex: number) => void;
export declare const cookies: (propKey: string) => (targetProto: Record<string, unknown>, funcName: string, paramIndex: number) => void;
