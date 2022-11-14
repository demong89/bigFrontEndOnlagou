function ajax(url) {
    return new Promise((resolve,reject)=>{
        var xhr = new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.responseType = 'json'
        xhr.onload = function(){
            if(this.status === 200){
                resolve(this.response)
            }else{
                reject(new Error(this.statusText))
            }
        }
        xhr.send()
    })
}


// 使用catch注册失败回调


ajax('./api/users.json')
    .then(res=>{
        console.log(res);
        return ajax('./api/users.json')
    })
    .catch(err=>{
        console.log(err);
    })

// then(onRejected) === then(undefined,onRejected)
ajax('./api/users.json')
    .then(res=>{
        console.log(res);
        return ajax('./api/users.json')
    }).then(undefined,(err)=>{
        console.log(err);
    })

// 全局捕获 promise异常
window.addEventListener('unhandlerejection',event=>{
    const {reason,promise} = event
    console.log(reason,promise);
    event.preventDefault();
},false)

// node中的方式
process.on('unhandledRejection',(reason,promise)=>{
    console.log(reason,promise);
})