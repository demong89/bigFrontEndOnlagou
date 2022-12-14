const _ = require('lodash')

function getArea(r){
    console.log(r);
    return Math.PI*r*r
}
// let getAreaWithMemory = _.memoize(getArea);

// console.log(getAreaWithMemory(4));
// console.log(getAreaWithMemory(4));
// console.log(getAreaWithMemory(4));


// 模拟实现memoize 

function memoize(f){
    const cache = {}
    return function(){
        let key = JSON.stringify(arguments);
        cache[key] = cache[key] || f.apply(f,arguments)
        return cache[key]
    }
}

let getAreaWithMemory = memoize(getArea);

console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4));