/**
 * @flow
 */
const obj:{
    foo:string,
    bar:number
} = {
    foo:'s',
    bar:125
}

// 可选属性 
const obj1:{
    foo:string,
    bar?:number
} = {
    foo:'s'
}

const obj3 :{[string]:string}= {}

obj3.key ='value'
obj3.key2 = 'value2'