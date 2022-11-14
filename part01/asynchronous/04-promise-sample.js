const promise = new Promise((resolve,reject)=>{
    resolve(100)
})

promise.then(value=>{
    console.log(value);
},err=>{
    console.log(err);
})
console.log('end');
