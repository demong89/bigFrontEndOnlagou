// 柯里化案例

const _ = require('lodash')

const match = _.curry(function(reg,str){
    return str.match(reg)
})
const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)

const filter = _.curry((func,array)=>{
    return array.filter(func)
})

const findSpace = filter(haveSpace)

// console.log(haveSpace('hello  world'));
// console.log(haveNumber('abc123'));

console.log(filter(haveSpace,['John Connor','John_Donne']));
console.log(findSpace(['John Connor','John_Donne']));
