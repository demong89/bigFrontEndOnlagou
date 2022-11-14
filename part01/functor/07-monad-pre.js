const fs = require('fs')
const fp = require('lodash/fp')

class IO{
    static of(val){
        return new IO(()=>val)
    }
    constructor(val){
        this._val = val
    }
    map(fn){
        return new IO(fp.flowRight(fn,this._val))
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

let cat = fp.flowRight(print,readFile)
let r = cat('../../package.json')._val()._val()
console.log(r);
