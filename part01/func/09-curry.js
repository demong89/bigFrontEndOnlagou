// function checkAge(age){
//     let min = 18;
//     return age >= min;
// }

// 普通的纯函数
// function checkAge(min,age){
//     return age >= min
// }
// console.log(
//     checkAge(18,24),
//     checkAge(18,20),
//     checkAge(20,30)
//     );


// function checkAge(min) {
//     return function (age) {
//         return age >= min
//     }
// }

const checkAge = min => (age => age >= min)
let checkAge18 = checkAge(18)
let checkAge20 = checkAge(20)

console.log(checkAge18(20));
console.log(checkAge20(24));




