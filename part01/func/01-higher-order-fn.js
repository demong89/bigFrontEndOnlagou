// 高阶函数 函数作为参数
function  forEach(arr,fn) {
    for (let i = 0; i < arr.length; i++) {
       fn(arr[i])
    }
}

// let arr = [1,2,3,,4,5,6]
// forEach(arr,(item)=>{
//     console.log(item);
// })

function filter(array,fn) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if(fn(array[i])){
          result.push(array[i])
      }
    }
    return result
}

let arr = [1,2,3,6,4,5,6]
let res = filter(arr,(item)=>{
    return item % 2 === 0
})
console.log(res);

