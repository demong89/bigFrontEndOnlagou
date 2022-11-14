// 模拟常用高阶函数 

// map 
const map = (arr,fn)=>{
    let res =[];
    for (let i = 0; i < arr.length; i++) {
        res.push(fn(arr[i]))
    }
    return res;
}

// let arr = [1,2,3,4]
// let res = map(arr,v=>v*v)
// console.log(res);


//every 
const every = (array,fn)=>{
    let res = true;
    for (let i = 0; i < array.length; i++) {
        res = fn(array[i])
        if(!res) break
    }
    return res
}

// let arr = [3,4,5]
// let res = every(arr,v=>v>2)
// console.log(res);

// some 

const some = (array,fn)=>{
    let res =  false;
    for (const value of array) {
        res = fn(value)
        if(res) break
    }
    return res;
}

let arr = [1,4,5,7,9]
let res = some(arr,v=>v%2===0)
console.log(res);
