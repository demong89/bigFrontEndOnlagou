const fs = require('fs')
const fp = require('lodash/fp')

class IO{
    static of(val){
        return new IO(()=>val)
    }
    constructor(fn){
        this._val = fn
    }
    map(fn){
        return new IO(fp.flowRight(fn,this._val))
    }
    join(){
        return this._val()
    }
    flatMap(fn){
        return this.map(fn).join()
    }
}

let readFile = (filename)=>{
    return new IO(()=>fs.readFileSync(filename,'utf-8'))
}
let print = (x)=>{
    return new IO(()=>{
        console.log(x);
        return x
    })
}


let r = readFile('../../package.json') 
        .map(fp.toUpper)
        .flatMap(print)
        .join()
    console.log(r);
    