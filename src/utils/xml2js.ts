// import xml2js from 'xml2js';

// export const xmlParser = new xml2js.Parser({
// 	explicitRoot: false, // 是否获取根元素
// 	explicitArray: false, // 如果为true，则始终将子节点放入数组中；否则，仅当存在多个时才创建数组。
// 	ignoreAttrs: true, // 是否忽略xml的属性，只解析文本节点
// });

// export const xmlBuider = new xml2js.Builder({
// 	rootName: 'xml', // 根元素名字
// 	headless: true, // 省略XML头部声明元素：<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// 	cdata: true, // 在遇到与xml冲突的文本内容时，如：<Content>我是</Content>标签</Content>
// 	// 默认会使用转义字符：<Content>我是&lt;/Content&gt;标签</Content>
// 	// cdata设置为 true 则会使用cdata代替转义字符：<Content><![CDATA[我是</Content>标签]]></Content>
// 	// 建议使用转义字符 CDATA在特殊情况下可能会出现问题 如字符中包含 "]]>"时
// 	renderOpts: { pretty: false }, // 不美化xml 默认值为 { 'pretty': true, 'indent': ' ', 'newline': '\n' }
// });
