function getSum(a,b,c){
    return a+b+c;
}
const curried = curry(getSum)
console.log(curried(1,2,3));
console.log(curried(1)(2,3));
console.log(curried(1,2)(3));

function curry(func){
    return function curriedFn(...args){
        if(args.length<func.length){
            return function(){
                return curriedFn(...args.concat(Array.from(arguments)))
            }
        }
        return func(...args)
    }
}