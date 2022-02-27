/// <reference types="koa__router" />
/// <reference types="node" />
import { CreamOptions, LogLevel } from '../interface';
import Koa from 'koa';
import Router from '@koa/router';
import EventEmitter from 'events';
import { Server } from 'http';
import { ListenOptions } from 'net';
import { Log4js } from 'log4js';
export default class Cream extends EventEmitter {
    koaApp: Koa;
    router: Router;
    options: CreamOptions;
    log4js: Log4js;
    constructor(options?: CreamOptions);
    loadFile(path: string): any[];
    binding(): Promise<void>;
    perttyLog(msg: string, level?: LogLevel): void;
    listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): Server;
    listen(port: number, hostname?: string, listeningListener?: () => void): Server;
    listen(port: number, backlog?: number, listeningListener?: () => void): Server;
    listen(port: number, listeningListener?: () => void): Server;
    listen(path: string, backlog?: number, listeningListener?: () => void): Server;
    listen(path: string, listeningListener?: () => void): Server;
    listen(options: ListenOptions, listeningListener?: () => void): Server;
    listen(handle: any, backlog?: number, listeningListener?: () => void): Server;
    listen(handle: any, listeningListener?: () => void): Server;
}
