import { Constructor, MiddlewareClass } from '../interface';
export declare const defineMiddleware: (middlewareName: string) => (TargetClass: Constructor<MiddlewareClass>) => void;
