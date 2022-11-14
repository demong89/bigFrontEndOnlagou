// 演示lodash 
//  first / last / toUpper / reverse / each / includes / find / findIndex

const _ = require('lodash')

const array = ['jack','tom','kate','lucy']

// console.log(_.first(array));
// console.log(_.last(array));

// console.log(_.toUpper(_.first(array)));

// console.log(_.reverse(array));


const r = _.each(array,(item,index)=>{
    console.log(item,index);
})
console.log(r);
