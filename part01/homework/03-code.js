const fp = require('lodash/fp')
class Container {
    static of(val) {
        return new Container(val)
    }
    constructor(val) {
        this._val = val
    }
    map(fn) {
        return Container.of(fn(this._val))
    }
}

class Maybe {
    static of(x) {
        return new Maybe(x)
    }
    isNothing() {
        return this._val === null || this._val === undefined
    }
    constructor(x) {
        this._val = x
    }
    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._val))
    }
}

// 3.4 使用Maybe重写ex4 不要有if语句

// let ex4 = (n)=>{
//     if(n){
//         return parseInt(n)
//     }
// }

let ex4 = (n)=>{
  return Maybe.of(n).map(parseInt)
}

console.log(ex4(3.5));


// 3.3 实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母。
// let safeProp = fp.curry((x,o)=>Maybe.of(o[x]))
// let user = {id:2,name:'Albert'}
// let ex3 = ()=>{
//     let safe = safeProp('name',user)
//     let names = safe.map(name=>name.split('')).map(fp.first)
//     return names
// }
// console.log(ex3());


// 3.2    实现一个函数ex2 ,能使用fp.first获取列表的第一个元素
// let xs = Container.of(['do','ray','me','fa','so','la','ti','do'])
// let ex2 = ()=>{
//     return xs.map(fp.first)
//     //.map(item=>console.log(item))
// }

// console.log(ex2());

// 3.1 使用fp.add(x,y) fp.map(f,x)创建一个能让functor里的值增加的函数exl
// let maybe = Maybe.of([5, 6, 1])
// let exl = (x) => {
//     return maybe.map(fp.map(a => fp.add(a, x)))
// }
// console.log(exl(2));
