const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        try {
            //执行器
            executor(this.resolve, this.rejected)
        } catch (error) {
            this.rejected(error)
        }
    }
    // 初始状态
    status = PENDING;
    // 成功后的值
    value = undefined;
    // 失败的原因
    err = undefined;
    // 成功回调
    successCb = []
    //失败回调
    failCb = [];
    resolve = (value) => {
        if (this.status !== PENDING) return;
        this.status = FULFILLED;
        this.value = value
        // this.successCb && this.successCb(this.value)
        while (this.successCb.length) {
            this.successCb.shift()(this.value)
        }
    }
    rejected = (err) => {
        if (this.status !== PENDING) return;
        this.status = REJECTED
        this.err = err;
        // this.failCb&& this.failCb(this.err)
        while (this.failCb.length) {//一次调用
            this.failCb.shift()(this.err)
        }
    }
    then(successCb, failCb) {
        successCb = successCb ? successCb : value => value
        failCb = failCb ? failCb : err => { throw err }
        // 链式调用
        let promise2 = new MyPromise((resolve, reject) => {
            // 成功
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = successCb(this.value)
                        // x是普通值还是promise对象
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = failCb(this.err)
                        // x是普通值还是promise对象
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            } else {
                // 等待的状态
                //将失败或成功的回调保存起来
                this.successCb.push(() => {
                    setTimeout(() => {
                        try {
                            let x = successCb(this.value)
                            // x是普通值还是promise对象
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                });
                this.failCb.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failCb(this.err)
                            // x是普通值还是promise对象
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                });
            }
        })
        return promise2;
    }
    catch(cb) {
        return this.then(undefined, cb)
    }
    finally(cb) {
        return this.then(value => {
            return MyPromise.resolve(cb()).then(() => value)
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
                let cur = arr[i]
                if (cur instanceof MyPromise) {
                    cur.then(val => addData(i, val), err => reject(err))
                } else {
                    addData(i, arr[i])
                }
            }
        })
    }
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value
        } else {//包装成promise对象
            return new MyPromise((resolve) => resolve(value))
        }
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('promise实例重复引用了'))
    }
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {//普通值
        resolve(x)
    }
}

let promise = new MyPromise((resolve, reject) => {
    // setTimeout(() => {
    resolve('1000')
    // }, 1500)
})
promise.then(res => {
    console.log(res);
    return '100'
}, err => {
    console.log(err);
}).then(res => {
    console.log(res);
}, err => {
    console.log(err);
})