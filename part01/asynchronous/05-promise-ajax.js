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

ajax('./api/users.json').then(res=>{
    console.log(res);
},err=>{
    console.log(err);
})