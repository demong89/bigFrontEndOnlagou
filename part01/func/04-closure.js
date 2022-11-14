function makePower(power) {
    return function(number){
        return Math.pow(number,power)
    }
}

let power2 = makePower(2);//二次方
let power3 = makePower(3);

// console.log(power2(4));
// console.log(power2(5));
// console.log(power3(4));

function makeSalary(base) {
    return function(performance){
        return base + performance;
    }
}

let salaryLevel1 = makeSalary(12000);
let salaryLevel2 = makeSalary(15000);

console.log(salaryLevel1(2000));
console.log(salaryLevel2(3000));



