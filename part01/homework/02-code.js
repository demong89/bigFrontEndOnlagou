const fp = require('lodash/fp')
const cars = [
    {
        name:'Ferrari FF',
        horsepower:660,
        dollar_value:700000,
        in_stock:true
    },
    {
        name:'Spyker C12 Zagato',
        horsepower:650,
        dollar_value:648000,
        in_stock:false
    },
    {
        name:'Jaguar XKR-S',
        horsepower:550,
        dollar_value:132000,
        in_stock:false
    },
    {
        name:'Audi R8',
        horsepower:525,
        dollar_value:114200,
        in_stock:false
    },
    {
        name:'Aston Martin One-77',
        horsepower:750,
        dollar_value:1850000,
        in_stock:true
    },
    {
        name:'Pagani Huayra',
        horsepower:700,
        dollar_value:1300000,
        in_stock:false
    }
]


// 使用flowRight写一个sanitizeNames()函数
let _underscore = fp.replace(/\W+/g,'_');
const sanitizeNames = fp.flowRight(fp.map(_underscore),fp.map(fp.toLower),fp.map(car=>car.name))
console.log(sanitizeNames(cars));

// 2.3
// let _average = function(xs){
//     return fp.reduce(fp.add,0,xs)/xs.length
// }
// let averageDollarValue = function(cars){
//     let dollar_values = fp.map((cars)=>{
//         return cars.dollar_value
//     },cars)
//     return _average(dollar_values)
// }

// const total = cars=>fp.map(cars=>cars.dollar_value,cars)
// console.log(total(cars));
// const fn = fp.flowRight(_average,total);
// console.log(fn(cars));

// console.log(averageDollarValue(cars));

// 2.2 fp.flowRight() fp.prop() fp.first()
// const fn = fp.flowRight(fp.prop('name'),fp.first)
// console.log(fn(cars));




// 2.1  
// let isLastInStock = function(cars){
//     let last_car = fp.last(cars)
//     return fp.prop('in_stock',last_car)
// }

// console.log(isLastInStock(cars))

// const fn = fp.flowRight(fp.prop('in_stock'),fp.last);
// console.log(fn(cars));
