const fp = require('lodash/fp')

class IO{
    static of(val){
        return new IO(function(){
            return val
        })
    }
    constructor(val){
        this._val = val
    }
    map(fn){
        return new IO(fp.flowRight(fn,this._val))
    }
}

let r = IO.of(process).map(p=>p.execPath)

console.log(r);
console.log(r._val());

