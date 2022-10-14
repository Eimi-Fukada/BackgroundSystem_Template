# 后台模板框架
此项目框架是基于[Ant Design Pro](https://pro.ant.design)

## 项目目录结构
```js
├── config                   # 全局配置，包含路由，构建等配置
├── docs                     # 文档
├── mock                     # 本地模拟数据
├── public
│   └── icon.png             # icon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── enums                # 枚举文件
│   ├── hooks                # 业务通用hooks文件
│   ├── locales              # 多语言配置
│   ├── pages                # 业务页面入口和常用模板
│   ├── request              # 业务请求
│   ├── services             # 后台接口服务
│   ├── styles               # 通用样式文件
│   ├── utils                # 工具库
│   ├── global.less          # 全局样式
│   └── global.ts            # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json
```

## 内置函数库
1. useSuperLock - 超级钩子锁，当接口有返回值时才会触发下一个行为
2. useCallBackState - 返回一个带缓存的state
3. useRouteQuery - 获取路由查询参数

## 内置帮助方法
1. 忽略对象中的特定key
2. 将文件转换为base64格式
3. 校验函数
