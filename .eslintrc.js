/**
 * 配置 ESLint 使用 prettier的和规则
 */
module.exports = {
	root: true,
	// 定义ESLint的解析器
	parser: '@typescript-eslint/parser',
	// 定义eslint要加载的的插件
	plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
	// 扩展eslint配置 (代码规范 lint规则)
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier', // 启用eslint-config-prettier 关闭与prettier冲突的eslint规则
	],
	rules: {
		// 启用eslint-plugin-prettier提供的规则 并使用error级别的错误(错误级别可自定义)
		'prettier/prettier': 'error',
		// prettier 建议关闭的配置 不关闭可能会导致某些情况下出现问题 请参阅eslint-plugin-prettier的GitHub文档
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off', // 开启时: 必须显式声明 函数的返回类型、参数类型
		// '@typescript-eslint/no-var-requires': 'off', // 开启时: 不允许使用var = require()形式的导入
		'@typescript-eslint/no-unused-vars': 'off', // 变量定义未使用
		'@typescript-eslint/ban-ts-comment': 'off', // 允许 @ts-ignore
		'@typescript-eslint/no-var-requires': 'off', // 允许使用 require
		'@typescript-eslint/ban-types': [
			'error',
			{ types: { object: false }, extendDefaults: true },
		],
	},
	env: {
		//指定代码的运行环境
		node: true,
	},
};
