## 搭建自己的SSR
+ 环境准备
    - npm init -y
    - npm i vue vue-server-renderer
+ 同构应用代码组织结构
+ 依赖安装
+ webpack配置
+ 构建命令配置
+ 启动应用
+ 渲染流程
    - Vue SSR 客户端激活
+ 开发模式
    

note： webpack 4 webpack-cli 3 vue-loader 15 注意这个npm包的版本
## 静态站点生产
+ gridsome 介绍
一个免费、开基于Vue技术栈的静态网站生成器。
什么是静态网站生成器 ？ 静态网站生成是使用一系列配置、模板以及数据，生成静态HTML文件及相关资源的工具（此功能也叫预渲染）。生成的网站不需要PHP、JAVA等后台服务器，
只需要放到支持静态资源的web server或CDN上即可运行。
+ 静态网站的好处
    - 省钱
    不需要专业的服务器，只要能托管静态文件的空间即可
    - 快速
    不经过后端服务器处理，只传输内容
    - 安全
    没有后端程序的执行，自然会更安全
+ 常见的静态网站生成器
    - Jekyll(Ruby)
    - Hugo(Go)
    - Hexo(node)
    - Gatsby(node/react)
    - Gtidsome(node/vue)
    - next nuxt[多数情况用来做SSR的]
    - VuePress

+ 使用场景
    - 不适合管理系统
    - 简单页面展示
    - 想要有更好的 SEO
    - 想要有更好的渲染性能
+ 学习条件
 具有有关HTML，CSS，Vue.js以及如何使用终端的基本知识。
 了解GraphQL的工作原理是有好处的，但不是必需的。 
 Gridsome 需要Node.js（v8.3 +），并建议使用 Yarn。
#### 它是如何工作的

Gridsome生成静态HTML，一旦加载到浏览器中，该HTML就会渗入Vue SPA。这意味着您可以使用Gridsome构建静态网站和动态应用程序。
Gridsome为每个页面构建一个.html文件和一个.json文件。加载第一页后，它仅使用.json文件来预取和加载下一页的数据。它还为需要它的每个页面构建一个.js包（代码拆分）。
它使用vue-router进行SPA路由，并使用vue-meta来管理<head>。
Gridsome默认添加最小57kB的gzip JS捆绑包大小（vue.js，vue-router，vue-meta和一些用于图像延迟加载的文件）。

[详细了解其工作原理](https://gridsome.org/docs/how-it-works)

[官网](https://gridsome.org/)
[GitHub](https://github.com/gridsome/gridsome)
#### 什么是jamstack
[Gridsome](https://gridsome.org/docs/jamstack)是一个Jamstack框架。 Jamstack使您可以通过预渲染文件并直接从CDN直接提供文件来构建快速安全的站点和应用程序，而无需管理或运行Web服务器。
JAMStack是指JS、API、Markup的技术栈，本质上是一种胖前端，通过调用各种API来实现更多功能。

+ 安装

yarn global add @gridsome/cli
gridsome create gridsome-site
cd gridsome-site
gridsome develop
+ gridsome 项目安装依赖注意事项：

  - [配置 node-gyp 编译环境](https://github.com/nodejs/node-gyp)
  - [配置sharp镜像](https://sharp.pixelplumbing.com/install#chinese-mirror) 
  - 配置 hosts：`199.232.68.133  raw.githubusercontent.com`
    - https://www.ipaddress.com/

+ 使用.md文件
    - @gridsome/source-filesystem
    - @gridsome/transformer-remark 转换器（必须）
+ Strapi
    - @gridsome/source-strapi



    
## 封装vue组件库
+ CDD (Component-Driven Development)组件驱动开发
    - 自下而上
    - 从组件级别开始，到页面级别结束
+ CDD的好处
    - 组件在最大程度被重用
    - 并行开发
    - 可视化测试
+ [处理组件的边界情况](https://cn.vuejs.org/v2/guide/components-edge-cases.html)
    - $root
    - $parent/$children
    - $refs
    - 依赖注入provide/inject
    - $attrs/$listeners
        - $attrs 把父组件中非prop属性绑定到内部组件
        - $listeners 把父组件中的DOM对象的原生事件绑定到内部组件
+ [快速原型开发](https://cli.vuejs.org/zh/guide/prototyping.html)
    - vue-cli中提供了一个插件可以进行快速原型开发
        - npm install -g @vue/cli-service-global
        - vue serve  快速查看组件的运行效果
            - vue serve 如果不指定参数，默认会在当前目录下找如下入口文件
                - main.js  index.js App.vue app.vue
            - vue serve ./src/Login.vue 指定要加载的组件
    - Element
        - npm init -y
        - vue add element
        - Vue.use()
+ 组件的分类
    - 第三方组件
    - 基础组价 
    - 业务组件
+ 组件开发
    - [步骤条组件](./component01/src/Steps.vue)
    - 表单组价
        - 整体结构
            - Form
            - FromItem
            - Input
            - Button
        - 表单验证

+ Monorepo
+ [Storybook](https://storybook.js.org/)
+ Lerna
+ Vue组件的单元测试
+ Rollup







