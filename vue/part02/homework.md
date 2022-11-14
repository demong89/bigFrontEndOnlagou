一、简答题

1、请简述 Vue 首次渲染的过程。
+ 首先初始化实例成员和静态成员。
+ 调用构造函数new Vue(),在构造函数中调用this._init().
  - 在_init()方法中调用$mount()[src/platforms/web/entry-runtime-with-compiler.js]把模板编译成render函数（如果没有render，把template编译成render函数，如果没有template会把el选项作为模板编译）
  - 通过compileToFunction生成render函数，生成后将render保存到options.render。
+ 然后调用$mount() [src/platforms/web/runtime/index.js] 从新获取el，调用mountComponent()[src/core/instance/lifecycle.js]判断是否有render方法，如果没有但是传入模板，开发环境会发送警告[运行时版本不支持编译器]。 
+ 然后触发beforeMount()  
+ 定义updateComponent
  - 定义_render()[生成VDOM]
  - 定义_update()[将VDOM转为真实DOM]，挂载到页面
+ 创建watcher完调用一次get()方法
  - 调用传入updateComponent() 
  - 调用vm._render()创建VNode
  - vm._update()中调用vm.__path__()挂载真实DOM
  - 真实DOM记录在vm.$el.
+ 触发mounted
+ return vm



2、请简述 Vue 响应式原理。
+ 通过observe()方法将实例中的data数据转为响应式的
  - 对象通过Object.defineProperty()转为getter和setter并在内部做追踪相关依赖，在属性被访问或修改时通知变化
  - 对象的value如果还是对象的话，递归调用observe()
  - 如果是数组，通过劫持的方式，重写数组的几个方法，改变原数组。
+ getter中收集依赖  
  - 在watcher对象的get方法中调用，pushTarget记录Dep.target属性
  - 访问data中的成员时收集依赖。defineReactive的getter中
  - 把属性对应的watcher对象添加到dep的subs数组中
  - 给子级对象收集依赖
+ setter 发送通知
  - dep.notify() 发送通知 update()
  




3、请简述虚拟 DOM 中 Key 的作用和好处。
+ key的作用主要是为了更高效的更新VDOM。
+ vue在patch的过程中判断两个节点是否是同相同节点是key的一个必要条件，渲染一组列表时，key往往是唯一标识，所以如果不定义key的话，vue只能认为比较的两个节点是同一个，哪怕实际上不是，这导致了频繁更新元素，使得整个patch过程比较低效，影响性能。
+ 实际使用中在渲染一组列表时key必须设置，而且必须是唯一标识，应该避免使用数组索引作为key,这可能导致一些隐蔽的bug；vue中在使用相同标签元素过渡切换时，也会使用key属性，其目的也是为了让vue可以区分它们，否则vue只会替换内部属性而不会触发过渡效果。
+ 从源码中得知，vue判断两个节点是否相同时主要判断两者的key和元素类型等，如果不设置key，它的值就是undefined，则可能永远认为这是两个相同节点，只能去做更新操作，造成大量的DOM更新操作。 


4、请简述 Vue 中模板编译的过程。
总体流程是：模板 ---> AST ---> 标记静态节点 ---> 转为字符串形式的代码 ---> render函数 
模板编译的入口从compilerToFunction() 先从缓存中加载编译好的render函数。如果没有，调用compiler()函数，compiler函数首先合并options，然后调用baseCompile();   
baseCompile()函数主要完成3件事：  
+ parse
  - 把template转为AST
+ optimize
  - 标记AST静态节点
  - 标记静态子树
  - patch跳过静态子树
+ generate   
  - AST tree转为JS
然后通过compileToFunction函数继续把上一步生成的字符串形式的JS代码转为函数(createFunction),通过render和staticRenderFns函数初始化后，挂载到vue实例的options对应的属性中。




