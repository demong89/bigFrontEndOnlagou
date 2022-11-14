// 非 Point Free模式
// function f(word){
//     return word.toLowerCase().replace(/\s+/g,'_')
// }

// console.log(f('Hello World'));

// Point Free
const fp = require('lodash/fp')

const f = fp.flowRight(fp.replace(/\s+/g,'_'),fp.toLower)
console.log(f('Hello World'));

// 实用Point Free，模式 将单词中的首字母提取出来，并转换为大些
const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '))

console.log(firstLetterToUpper('world wild web'));
