一、简答题    
1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
+ 流程
    - 初始化项目
    - 配置文件webpack.config.js
    - 配置项目入口、输出路径、开发模式等
    - 配置不同资源处理的loader
    - 配置plugin
    - 执行打包命令
* 通过webpack.config.js配置文件的entry入口配置开始查找项目依赖资源
* 根据配置的loader解析不同的资源，输出打包后的资源。
* 在webpack打包过程中不同阶段根据配置的plugin做一些额外的工作

2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
+ loader主要是对不同资源做处理，将一些浏览器不支持或者有兼容问题的代码处理为浏览器可以支持的资源，如将ES6+转为ES5、Sass转为css等
    - 开发思路
        - 通过module.exports导出一个函数
        - 该函数默认参数一个参数source(即要处理的资源文件)
        - 在函数体中处理资源(loader里配置响应的loader后)
        - 通过return返回最终打包后的结果(这里返回的结果需为字符串形式)
+ plugin主要是在webpack构建的不同阶段执行一些额外的工作，比如拷贝静态资源、清空打包后的文件夹等
    - 开发思路  
        - 通过钩子机制实现
        - 插件必须是一个函数或包含apply方法的对象
        - 在方法体内通过webpack提供的API获取资源做响应处理
        - 将处理完的资源通过webpack提供的方法返回该资源

二、编程题   
1、使用 Webpack 实现 Vue 项目打包任务
+ 实战步骤
    - 安装`webpack webpack-cli webpack-dev-server`
    - 配置`webpack.config.js`入口文件`entry:'./src/main.js'`
    - 通过`npm webpack-dev-server`启动开发服务器,这里会报错
    - 安装`vue less less-loader vue-loader vue-template-compiler file-loader style-loader css-loader vue-style-loader`
    - 插件
        - webpack-merge
        - html-webpack-plugin
        - copy-webpack-plugin
        - clean-webpack-plugin(生产)
+ 配置文件
    - [webpack.common.js](./vue-app-base/webpack.common.js) 
    - [webpack.dev.js](./vue-app-base/webpack.dev.js) 
    - [webpack.prod.js](./vue-app-base/webpack.prod.js) 

+ 配置ESLint
    - 安装eslint 、 eslint-loader
    - [eslint-loader配置在开发环境](./vue-app-base/webpack.dev.js)
    - 通过`npx eslint --init`生成配置文件
+ package.json配置脚本
```
"scripts": {
    "serve": "npx webpack-dev-server --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js",
    "lint": "npm run serve"//这里通过eslint-loader校验js文件 开发环境保存文件的时候就会触发
  },
```

