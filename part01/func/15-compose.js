// 模拟实现lodash的flowRight方法
const reverse = arr=>arr.reverse();
const first = arr=>arr[0]
const toUpper = s=>s.toUpperCase();

// function compose(...args){
//     return function(value){
//         return args.reverse().reduce((acc,fn)=>{
//             return fn(acc)
//         },value)
//     }
// }

const compose = (...args)=>value=>args.reverse().reduce((acc,fn)=>fn(acc),value)
const f = compose(toUpper,first,reverse)
console.log(f(['one','two','three']));
