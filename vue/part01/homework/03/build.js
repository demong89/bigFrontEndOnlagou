import { h, init } from 'snabbdom'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'
import { originalData } from './originData'

let patch = init([style,eventlisteners])

let data = [...originalData]
const container = document.querySelector('#container')

var sortBy = 'rank';
let vnode = view(data);

// 初次渲染
let oldVnode = patch(container, vnode)


// 渲染
function render() {
    oldVnode = patch(oldVnode, view(data));
}
// 生成新的VDOM
function view(data) {
    return h('div#container',
        [
            h('h1', 'Top 10 movies'),
            h('div',
                [
                    h('a.btn.add',
                        { on: { click: add } }, 'Add'),
                    'Sort by: ',
                    h('span.btn-group',
                        [
                            h('a.btn.rank',
                                {
                                    'class': { active: sortBy === 'rank' },
                                    on: { click: [changeSort, 'rank'] }
                                }, 'Rank'),
                            h('a.btn.title',
                                {
                                    'class': { active: sortBy === 'title' },
                                    on: { click: [changeSort, 'title'] }
                                }, 'Title'),
                            h('a.btn.desc',
                                {
                                    'class': { active: sortBy === 'desc' },
                                    on: { click: [changeSort, 'desc'] }
                                }, 'Description')
                        ])
                ]),
            h('div.list', data.map(movieView))
        ]);
}

// 添加一条数据 放在最上面
function add() {
    const n = originalData[Math.floor(Math.random() * 10)];
    data = [{ rank: data.length+1, title: n.title, desc: n.desc, elmHeight: 0 }].concat(data);
    render();
}
// 排序
function changeSort(prop) {
    sortBy = prop;
    data.sort(function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        }
        if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    });
    render();
}

// 单条数据
function movieView(movie) {
    return h('div.row', {
        key: movie.rank,
        style: {
            display: 'none', 
            delayed: { transform: 'translateY(' + movie.offset + 'px)', display: 'block' },
            remove: { display: 'none', transform: 'translateY(' + movie.offset + 'px) translateX(200px)' }
        },
        hook: {
            insert: function insert(vnode) {
                movie.elmHeight = vnode.elm.offsetHeight;
            }
        }
    }, [
        h('div', { style: { fontWeight: 'bold' } }, movie.rank),
        h('div', movie.title), h('div', movie.desc),
        h('div.btn.rm-btn', {on: { click: [remove, movie]}}, 'x')]);
}
// 删除数据
function remove(movie) {
    data = data.filter(function (m) {
        return m !== movie;
    });
    render()
}