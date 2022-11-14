#### 4. 简答 (字节跳动 二面)

4.1 你觉得typescript和javascript有什么区别   
   
JS 是弱类型语言，变量可以赋值不同的数据类型，这在实际开发中会造成一些隐藏的bug。
TS 是对JS的增强，是JS的超集，TS实现了对类型的强约束。


4.2 typescript你都用过哪些类型   
类型约束、接口、class

4.3  typescript中type和interface的区别  
相同点：
都可以描述一个对象或者函数
interface可以extends type ，type可以与interface交叉（&） 语法不同
不同点 ： 
type可以声明基本类型别名，联合类型、元组等 interface不行
type语句中可以使用typeof获取实例的类型 interface不行

interface能声明合并 type不行



#### 5. 对 async/await 的理解，分析内部原理

async/await 是generator的语法糖，对generator做了改进，主要是为了解决promise连续then的链式问题及异步的回调地狱问题。
generator函数是可以暂停的，通过yield关键字实现暂停，next()继续执行，这个过程是需要手动调用的。async/await自带执行器，可以自动完成这个过程。



#### 6. async/await 如果右边方法执行出错该怎么办？（百度一面 2020）
使用try...catch进行捕捉，将一定会执行的代码发在finally里


#### 7. 说一下 event loop 的过程？promise 定义时传入的函数什么时候执行？（小米 三面）
JS中会将所有的同步任务放在主线程任务队列中，异步任务不能直接放到主线程任务队列，会阻塞同步任务的执行，所以会放在异步队列中，异步任务执行完会加入到主线程任务队列中，当主线程任务队列执行完会去查看异步队列有没有任务执行，主线程不断重复这个过程，称之为事件循环 -- event loop
立即执行。

#### 8. 说一下防抖函数的应用场景，并简单说下实现方式 （滴滴）
防抖 在事件被触发的n秒后执行处理函数，如果在n秒内又触发了，则重新计时。
应用场景： 如输入框输入，按下按键执行函数，从后台获取数据。频繁输入会连续触发 防抖可以在用户按键动作停下后触发，即不连续触发。
```
function douce(fn,time){
  let timer = null
  return function(){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(fn,time)
  } 
}
```


#### 9. 说一下V8的垃圾回收机制 （小米）

V8中将内存分为新生代和老生代两个区域。
新生代用于存放存活时间短的对象，采用复制算法和标记整理算法。使用空间为from，空闲空间为to，活动对象放在from，标记整理后将对象拷贝到to,完成后将from和to交换空间完成释放。
一轮GC还存活的对象会被存放到老生代（即对象晋升）  
老生代采用标记清除、标记整理、增量标记的算法，使用标记清除完成垃圾空间的回收，采用标记整理进行空间优化，采用增量标记进行效率优化。即先将垃圾对象贴个标签，然后将可使用对象整理到连续的内存空间并清除垃圾对象。


#### 10. performance API 中什么指标可以衡量首屏时间

timing

#### 11. 在 EcmaScript 新特性中，暂时性死区有什么作用

暂时性死区中访问变量会报错。
let const声明不会出现变量提升，var会，在作用域内访问var声明的变量是undefined，而访问let const 会报错

#### 12. 观察者模式和发布订阅模式的区别

最大的区别是观察者模式没有任务调度中心。
观察者模式由具体目标调度，如事件触发，Dep就会去调用观察的方法，所以观察者模式的订阅者和发布者之间存在依赖的。
发布订阅模式由统一调度中心调用，发布者和订阅者不需要知道对方的存在。

#### 13. gulp自己写过任务吗？说一下它的构建流程（阿里 2018）

gulp的原理是：读出文件—转换—写入
流程：创建gulpfile.js文件，通过src方法读取文件，在pipe()方法中处理任务然后输出，通过series和parallel组合任务。

#### 14. package-lock.json 有什么作用，如果项目中没有它会怎么样，举例说明

用于锁定项目中依赖的版本信息。如果没有的话，可能会导致项目安装依赖时版本不统一而出现一些bug

#### 15. webpack 常用配置项有哪些，并说明用途 （跟谁学 2020）
entry 入口  
output 打包文件出口
plugins webpack插件
module  loader
mode  开发模式
devtool 打包时sourcemap类型
devServer 开发环境配置



#### 16. 阐述 webpack css-loader 的作用 和 原理？ （跟谁学）
将CSS模块加载到JS代码中，并不会使用这个模块。
 原理：将css代码变成JS字符串形式push到css-loader模块提供的数组中

#### 17. webpack中loader和plugin的区别是什么 （字节跳动 搜狐）

loader 主要是做转换工作的，比如讲sass转为css,ES6转为ES5等
plugin 主要做一些额外的工作，比如清除构建后的目录，复制静态资源文件等

#### 18. webpack、rollup、parcel 它们的优劣？
webpack适用于复杂项目的构建，loader和plugin资源丰富。
rollup是ESM打包器，适合JS库的打包，自动移除未引用的代码，打包后的代码依然可读。无法实现HMR，加载非ESM模块比较困难。
parcel默认开启一个开发服务器，模块热替换，动态导入，自动安装依赖。



#### 19. babel.config.js 和 .babelrc 有什么区别？
babel.config.js是项目范围的配置，按照commonjs导出对象，可以写JS逻辑。针对自己和第三方组件库代码。
.babelrc 相对文件配置，按目录加载，只针对自己的代码。


#### 20. webpack 中 tree shaking 的用途和原理是什么？

用于去除项目中没有引用依赖关系的无用代码。

webpack打包时对未使用的代码进行标记删除。


#### 21. 阐述一下 eventbus 的原理，讲述eventbus在vue中的实践 （猿辅导）
基于发布订阅者模式实现。
```
const bus = new Vue();
bus.emit('fun',msg)
bus.on('fun',(msg)=>{})
```



#### 22. vue-loader 的实现原理是什么 
loader的作用就是转换代码。vue-loader是将.vue文件根据template、script、style进行拆分然后使用不同的loader再去转换。

```
// 计算加载时间
function getPerformanceTiming () {  
    var performance = window.performance;

    if (!performance) {
        // 当前浏览器不支持
        console.log('你的浏览器不支持 performance 接口');
        return;
    }

    var t = performance.timing;
    var times = {};

    //【重要】页面加载完成的时间
    //【原因】这几乎代表了用户等待页面可用的时间
    times.loadPage = t.loadEventEnd - t.navigationStart;

    //【重要】解析 DOM 树结构的时间
    //【原因】反省下你的 DOM 树嵌套是不是太多了！
    times.domReady = t.domComplete - t.responseEnd;

    //【重要】重定向的时间
    //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
    times.redirect = t.redirectEnd - t.redirectStart;

    //【重要】DNS 查询时间
    //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
    // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)            
    times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;

    //【重要】读取页面第一个字节的时间
    //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
    // TTFB 即 Time To First Byte 的意思
    // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
    times.ttfb = t.responseStart - t.navigationStart;

    //【重要】内容加载完成的时间
    //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
    times.request = t.responseEnd - t.requestStart;

    //【重要】执行 onload 回调函数的时间
    //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
    times.loadEvent = t.loadEventEnd - t.loadEventStart;

    // DNS 缓存时间
    times.appcache = t.domainLookupStart - t.fetchStart;

    // 卸载页面的时间
    times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;

    // TCP 建立连接完成握手的时间
    times.connect = t.connectEnd - t.connectStart;

    return times;
}

```