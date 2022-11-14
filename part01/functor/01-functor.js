
// class Contains{
//     constructor(value){
//         this._value = value
//     }
//     map(fn){
//         return new Contains(fn(this._value))
//     }
// }

// let r = new Contains(5).map(x=>x+1).map(x=>x*x)
// console.log(r); // 36


class Contains{
    static of(val){
        return new Contains(val)
    }
    constructor(value){
        this._value = value
    }
    map(fn){
        return Contains.of(fn(this._value))
    }
}
let r = new Contains(5).map(x=>x+2).map(x=>x*x)
console.log(r); // 49

// 演示 null undefined的问题  如果不小心传入了空值 
Contains.of(null).map(x=>x.toUpperCase())