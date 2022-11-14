function foo(cb) {
    setTimeout(()=>{
        cb()
    },1000)
}

foo(()=>{
    console.log('回调');
    console.log('调用者定义，执行者执行');
    console.log('就是调用者告诉执行者异步任务结束后应该做什么');
})

// 回调地狱