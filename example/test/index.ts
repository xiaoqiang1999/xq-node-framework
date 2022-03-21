/*

	* npm install 时 执行npm的生命周期 script："prepare" 来初始化 git hooks
	* dev: ts-node + tsconfig-paths(解决ts不转译alias的问题)
	* build：
		1. 使用 tsc 转译代码为 ESNEXT
		2. 使用 babel 转译 alias 并转译代码到目标版本 (配置.babelrc)
		3. 静态资源使用shell命令复制指定文件夹

*/
import { Cream } from '~/src';
import { Container, inject, injectable } from 'inversify';
import log4js from './log4js';
// import log4js from './log4js';

// const app = new Cream({ middlewareOrder: ['static-server'], log4js });
const app = new Cream({ middlewareOrder: ['static-server'] });

(async () => {
	// let res = app.loadFile('./controllers');
	await app.loadFile('./services');
	await app.loadFile('./controllers');
	await app.loadFile('./middlewares');

	app.binding();

	app.listen(8080);
})();

// console.log(require.main);

// const container = new Container();
// @injectable()
// class Knife {
// 	hit() {
// 		console.log('给你一刀');
// 	}
// }
// container.bind<Knife>('Knife').to(Knife);

// @injectable()
// class Person {
// 	@inject('Knife') public knife?: Knife;

// 	hit() {
// 		this.knife?.hit();
// 	}
// }
// container.bind<Person>('Person').to(Person);

// let person = container.get<Person>('Person');
// person.hit();
// console.log(person === container.get<Person>('Person'));

// const subContainer = new Container();
// subContainer.parent = container;
// subContainer.get<Knife>('Knife').hit();
