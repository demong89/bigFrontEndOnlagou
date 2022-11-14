// 纯函数和不纯的函数
// slice  splice 

let  arr = [1,2,3,4,5,6,7]

// 纯函数
console.log(arr.slice(0,3));//[ 1, 2, 3 ]
console.log(arr.slice(0,3));//[ 1, 2, 3 ]
console.log(arr.slice(0,3));//[ 1, 2, 3 ]

// 不纯的函数
console.log(arr.splice(0,3));//[ 1, 2, 3 ]
console.log(arr.splice(0,3));//[ 4, 5, 6 ]
console.log(arr.splice(0,3));//[ 7 ]

// 纯函数
function getSum(a,b){
    return a+b
}
console.log(getSum(1,2));
console.log(getSum(1,2));
console.log(getSum(1,2));

