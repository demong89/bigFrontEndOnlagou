// 函数作为返回值
function makeFn(){
    let msg = 'hello'
    return function(){
        console.log(msg);
    }
}

// const fn = makeFn();
// fn()

// makeFn()();


function once(fn) {
    let done = false;
    return function(){
        if(!done){
            done = true;
            return fn.apply(this,arguments)
        }
    }
}

let pay = once(function(money){
    console.log(`支付${money}RMB`);
})

pay(18)
pay(18)
pay(18)
pay(18)