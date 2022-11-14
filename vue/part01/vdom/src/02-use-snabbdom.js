import { h, init } from 'snabbdom'

let patch = init([])

let vnode = h('div#container',[h('h1','hello snabbdom'),h('p','this is a p tag')])

let app = document.querySelector('#app')

let oldVnode = patch(app,vnode)

setTimeout(()=>{
    vnode =  h('div#container',[h('h1','hello world'),h('p','hello p')])
    patch(oldVnode,vnode)

    // 清空元素
    patch(oldVnode,h('!'))
},2000)

