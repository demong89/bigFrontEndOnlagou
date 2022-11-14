// 不纯的
let min = 18;
function checkAge(age){
    return age>= min
}

// 纯的 （有硬编码）
function checkAge2(age){
    let min = 18;
    return age>=min
}