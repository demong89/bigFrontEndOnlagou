console.log('start');
setTimeout(()=>{
    console.log('setTimeout');
},0)

Promise.resolve().then(()=>{
    console.log('promise');
}).then(()=>{
    console.log('promise1');
})

console.log('end');

