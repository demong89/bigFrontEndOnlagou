const _ = require('lodash')

const trace = _.curry((tag,v)=>{
    console.log(tag,v);
    return v
})

const split = _.curry((sep,str)=>_.split(str,sep))

const jion = _.curry((sep,arr)=>_.join(arr,sep))

const map = _.curry((fn,arr)=>_.map(arr,fn))

const f = _.flowRight(jion('-'),trace('map之后'),map(_.toLower),trace('split之后'),split(' '))

console.log(f('never say die'));
