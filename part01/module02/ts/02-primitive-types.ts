

const a:string = 'foo'
const b: number = 12;
const c:boolean = false;

// 注意：严格模式 不能为空的


const d:void = undefined
const e:null = null
const f:undefined = undefined

// 报错  const g:symbol = Symbol() 
// 解决：1、（tsconfig.json）target-->es2015
//   2、 （tsconfig.json） "lib": ['ES2015','DOM'], 
// const g:symbol = Symbol()
// Promise 

