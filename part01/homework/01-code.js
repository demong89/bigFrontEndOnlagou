setTimeout(()=>{
    var a = 'hello ';
    setTimeout(()=>{
        var b = 'lagou '
        setTimeout(()=>{
            var c = 'i love u'
            console.log(a+b+c);
        },10)
    },10)
},10)

// 将上面代码改成promise的方式
var promise = new Promise((resolve,reject)=>{
    resolve('hello ')
}).then(res=>{
    return res + 'lagou '
}).then(res=>{
    return res + 'i love u'
}).then(res=>{
    console.log(res);
})