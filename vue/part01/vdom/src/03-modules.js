import {init, h} from 'snabbdom'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

let patch = init([
    style,
    eventlisteners
])

let vnode = h('div',{
    style:{
        backgroundColor:'#f60'
    },
    on:{
        click:eventHandler
    }
},[h('h1','this is h1'),h('p','this is a p')])

function eventHandler(){
    console.log('click event');
}

let app = document.querySelector('#app')

patch(app,vnode)