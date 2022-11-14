## 简答
1、谈谈你是如何理解JS异步编程的，EventLoop、消息队列都是做什么的？什么是宏任务、什么是微任务？     
由于JS是单线程的，这样执行任务会发生线程阻塞。所有JS引入了异步编程，通过回调的方式来解决这种阻塞。   
对于像定时器这种异步任务以及IO任务、其它线程发送过来的任务，JS会将其放到消息队列中，通过EventLoop的机制从消息队列里面依次取出任务执行。  
消息队列里的任务就是宏任务，微任务是promise、mutationObserver、nextTick。每一个宏任务都会配置一个微任务队列，微任务队列的执行时机是当前宏任务执行完毕、主线程退出之前。   

## 代码
1、[代码](./01-code.js)   
2、[代码](./02-code.js)    
2.1 使用函数组合fp.flowRight()重新实现下面函数
```
let isLastInStock = function(cars){
    let last_car = fp.last(cars)
    return fp.prop('in_stock',last_car)
}
```
```
//实现
const fn = fp.flowRight(fp.prop('in_stock'),fp.last);
```

2.2 使用fp.flowRight() fp.prop() fp.first()获取第一个car的name
```
// 实现
const fn = fp.flowRight(fp.prop('name'),fp.first)
```
2.3 使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现
```
let _average = function(xs){
    return fp.reduce(fp.add,0,xs)/xs.length
}
let averageDollarValue = function(cars){
    let dollar_values = fp.map((cars)=>{
        return cars.dollar_value
    },cars)
    return _average(dollar_values)
}
```
```
const total = cars=>fp.map(cars=>cars.dollar_value,cars)
const fn = fp.flowRight(_average,total);
console.log(fn(cars));
```

2.4 使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的name转换成这种形式。
```
let _underscore = fp.replace(/\W+/g,'_');
const sanitizeNames = fp.flowRight(fp.map(_underscore),fp.map(fp.toLower),fp.map(car=>car.name))
console.log(sanitizeNames(cars));
```
3、[代码](./03-code.js)   
3.1 使用fp.add(x,y) fp.map(f,x)创建一个能让functor里的值增加的函数exl
```
let maybe = Maybe.of([5, 6, 1])
let exl = (x) => {
    return maybe.map(fp.map(a => fp.add(a, x)))
}
console.log(exl(2));
```

3.2 实现一个函数ex2 ,能使用fp.first获取列表的第一个元素
```
let xs = Container.of(['do','ray','me','fa','so','la','ti','do'])
let ex2 = ()=>{
    return xs.map(fp.first)
    //.map(item=>console.log(item))
}
```

3.3 实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母。
```
let safeProp = fp.curry((x,o)=>Maybe.of(o[x]))
let user = {id:2,name:'Albert'}
let ex3 = ()=>{
    let safe = safeProp('name',user)
    let names = safe.map(name=>name.split('')).map(fp.first)
    return names
}
console.log(ex3());
```

3.4 使用Maybe重写ex4 不要有if语句
```
// let ex4 = (n)=>{
//     if(n){
//         return parseInt(n)
//     }
// }

let ex4 = (n)=>{
  return Maybe.of(n).map(parseInt)
}

console.log(ex4(3.5));
```

## 手写promise实现

1、核心逻辑
定义promise三种状态
通过resolve和rejected方法改变状态
```
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        //执行器
        executor(this.resolve, this.rejected)
    }
    // 初始状态
    status = PENDING;
    // 成功后的值
    value = undefined;
    // 失败的原因
    err = undefined;
    resolve = (value) => {
        this.status = FULFILLED;
        this.value = value
    }
    rejected = (err) => {
        this.status = REJECTED
        this.err = err;
    }
    then(successCb, failCb) {
        successCb(this.value)
        failCb(this.err)
    }
}

let promise = new MyPromise((resolve, reject) => {
    resolve('1000')
}).then(res => {
    console.log(res);
}, err => {
    console.log(err);

})
```

2、异步逻辑
状态是等待的时候 ，将成功回调和失败的回调保存起来。
当异步代码执行完毕后，调用resolve或reject时，判断成功或失败的回调是否存在。

```
 resolve = (value) => {
        if(this.status!==PENDING) return;
        this.status = FULFILLED;
        this.value = value
        this.successCb && this.successCb(this.value)
    }
    rejected = (err) => {
        if(this.status!==PENDING) return;
        this.status = REJECTED
        this.err = err;
        this.failCb&& this.failCb(this.err)
    }
    then(successCb, failCb) {
        if(this.status===FULFILLED){
            successCb(this.value)
        }else if(this.status===REJECTED){
            failCb(this.err)
        }else{
            // 等待的状态
            //将失败或成功的回调保存起来
            this.successCb = successCb;
            this.failCb = failCb;
        }
    }
```
3、then方法多次调用
将成功或失败的回调保存到一个数组中。
```
 // 成功回调
    successCb = []
    //失败回调
    failCb = [];
    resolve = (value) => {
        if(this.status!==PENDING) return;
        this.status = FULFILLED;
        this.value = value
        // this.successCb && this.successCb(this.value)
        while (this.successCb.length) {
            this.successCb.shift()(this.value)
        }
    }
    rejected = (err) => {
        if(this.status!==PENDING) return;
        this.status = REJECTED
        this.err = err;
        // this.failCb&& this.failCb(this.err)
        while (this.failCb.length) {
            this.failCb.shift()(this.err)
        }
    }
    then(successCb, failCb) {
        // 成功
        if(this.status===FULFILLED){
            successCb(this.value)
        }else if(this.status===REJECTED){
            failCb(this.err)
        }else{
            // 等待的状态
            //将失败或成功的回调保存起来
            this.successCb.push(successCb) ;
            this.failCb.push(failCb);
        }
    }
```
5、then链式调用
通过在then方法return 一个promise
```
  then(successCb, failCb) {
        let promise2 = new MyPromise((resolve, reject) => {
            // 成功
            if (this.status === FULFILLED) {
               let x = successCb(this.value)
               resolve(x)
            } else if (this.status === REJECTED) {
               let y = failCb(this.err)
               reject(y)
            } else {
                // 等待的状态
                //将失败或成功的回调保存起来
                this.successCb.push(successCb);
                this.failCb.push(failCb);
            }
        })
        return promise2;
    }
```
6、错误捕捉
循环引用的错误
```
function resolvePromise(promise2,x,resolve,reject) {
    if(promise2 === x){
       return reject(new TypeError('promise实例重复引用了'))
    }
    if(x instanceof MyPromise){
        x.then(resolve,reject)
    }else{//普通值
        resolve(x)
    }
}
```
```
 constructor(executor) {
        try {
            //执行器
            executor(this.resolve, this.rejected)
        } catch (error) {
            this.rejected(error)
        }
    }
```
7、then方法参数可选
```
successCb = successCb?successCb:value=>value
failCb = failCb?failCb:err=>{throw err}
```
8、all方法实现
```
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
```
9、resolve方法实现
```
static resolve(value){
        if(value instanceof MyPromise){
            return value
        }else{//包装成promise对象
            return new MyPromise((resolve)=>resolve(value))
        }
    }
```
10、finally方法实现
```
 finally(cb){
        return this.then(value=>{
            return MyPromise.resolve(cb()).then(()=>value)
        },err=>{
            return MyPromise.resolve(cb()).then(()=>{throw err})
        })
    }
```
11、catch方法实现
```
catch(cb) {
        return this.then(undefined, cb)
    }
```

[代码](./promise.js)