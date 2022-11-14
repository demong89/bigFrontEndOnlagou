
/**
 * 
 * 1、promise 是一个class
 * 在执行这个类时，需要传递一个执行器进去，执行器会立即执行
 * 2、三种状态 pending rejected fulfilled 
 * 状态不可逆
 * 3、resolve rejected 用来更改状态
 * 4、 then方法内部做的事情就是判断状态
 * 成功----执行resolve
 * 失败----执行rejected
 * 5、then 成功的参数
 *  失败的参数
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        try {
            executor(this.resolve, this.rejected)
        } catch (error) {
            this.rejected(error)
        }
    }
    // 状态
    status = PENDING;
    // 成功后的值
    value = undefined;
    // 失败后的原因
    err = undefined;
    // 成功回调
    successCb = [];
    // 失败回调
    failCb = []
    resolve = value => {
        if (this.status !== PENDING) return
        this.status = FULFILLED;
        this.value = value;
        // this.successCb && this.successCb(this.value)
        while (this.successCb.length) {
            this.successCb.shift()()
        }
    }
    rejected = err => {
        if (this.status !== PENDING) return
        this.status = REJECTED;
        this.err = err;
        // this.failCb && this.failCb(this.err)
        while (this.failCb.length) {
            this.failCb.shift()()
        }
    }
    then(successCb, failCb) {
        successCb = successCb ? successCb : value => value;
        failCb = failCb ? failCb : err => { throw err }
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = successCb(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = failCb(this.err)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            } else {
                //等待
                this.successCb.push(() => {
                    setTimeout(() => {
                        try {
                            let x = successCb(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                });
                this.failCb.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failCb(this.err)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                });
            }
        })
        return promise2;
    }
    catch(cb){
        return this.then(undefined,cb)
    }
    finally(cb) {
        return this.then(value => {
            return MyPromise.resolve(cb()).then(() => value);
        }, err => {
            return MyPromise.resolve(cb()).then(() => { throw err })
        })
    }
    static all(arr) {
        let result = [];
        let index = 0;

        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                result[key] = value;
                index++;
                if (index === arr.length) {
                    resolve(result)
                }
            }
            for (let i = 0; i < arr.length; i++) {
                let current = arr[i];
                if (current instanceof MyPromise) {
                    current.then(value => addData(i, value), err => reject(err))
                } else {
                    addData(i, arr[i])
                }
            }

        })
    }
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value
        } else {
            return new MyPromise((resolve) => resolve(value))
        }
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('重复引用了'))
    }
    if (x instanceof MyPromise) {
        // x.then(value=>resolve(value),err=>reject(err))
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}

let promise = new MyPromise((resolve, reject) => {
    // setTimeout(() => {
    resolve('OK')
    // reject('err')
    // }, 1000)
})
promise.then().then().then(resolve => console.log(resolve), err => {
    console.log(err);

})

function p1() {
    return new MyPromise((resolve) => {
        setTimeout(() => {
            resolve('p1')
        }, 2000)
    })
}

function p2() {
    return new MyPromise((resolve) => {
        resolve('p2')
    })
}

p2().finally(()=>{
    console.log('finally');
    
}).then(res=>{
    console.log(res);
    
},err=>{
    console.log(err);
    
})
MyPromise.all(['a', 'b', p1(), p2(), 'c']).then(res => {
    console.log(res);

})
MyPromise.resolve(100).then(res => console.log(res))
// function other() {
//     return new MyPromise((resolve, reject) => {
//         resolve('other')
//     })
// }
// let p1 = promise.then(value => {
//     // throw new Error('自定义then错误')
//     console.log(value);
//     // return p1;
// }, err => {
//     console.log(err);
//     return 1000
// })


// promise.then(value=>{
//     console.log(value);
// },err=>{
//     console.log(err);
// })

// lagou 
// Promise {pending}
// Promise {resolve}
// hello  
// lala
// undefined 
// lala


