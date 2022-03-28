/**
 * npm run build 打包代码
 */

const shell = require('shelljs');

// 删除 build文件夹
shell.rm('-rf', './build');
shell.rm('-rf', './types');

// 使用 tsconfig 将项目编译成js
shell.exec('tsc --project ./tsconfig.prod.json');
// 使用babel 转译alias 可配置babel编译到目标环境版本、以及要使用的polyfill
shell.exec('babel ./build --out-dir ./build');
// 复制 public目录
// shell.cp('-r', './src/static', './build/');

console.log('build Success');

// const babel = require('@babel/core');
// babel.transformFileSync('./build/index.js', {
// 	configFile: './.babelrc',
// });

// const { execSync } = require('child_process');
// const { resolve } = require('path');
// const tscCommand = resolve('./node_modules/.bin/tsc');
// const babelCommand = resolve('./node_modules/.bin/babel');
// execSync(`${tscCommand} --project ./tsconfig.prod.json`);
// execSync(`${babelCommand} ./build --out-dir ./build`);

// console.log(JSON.parse(process.env.npm_config_HOST));
