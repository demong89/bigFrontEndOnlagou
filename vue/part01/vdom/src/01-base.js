// import snabbdom from 'snabbdom' //错误引入 

// const snabbdom = require('snabbdom') 
// console.log(snabbdom);
// import { h, thunk, init } from 'snabbdom'
import { h, init } from 'snabbdom'

// hello world

let patch = init([])
// 参数1 标签+选择器
// 参数2  如果是字符串的话 就是标签中的内容
let vnode = h('div#container.cls',{
    hook:{
        init(vnode){
            console.log(vnode.elm);
        },
        create(emptyVnode,vnode){
            console.log(vnode.elm);
        }
    }
},'hello world')
let app  = document.querySelector('#app')


// 参数1 可以是DOM元素，内部会把DOM元素转换为VNode  参数2 VNode
let oldVnode = patch(app,vnode)


vnode = h('div','hello snabbdom')

patch(oldVnode,vnode)