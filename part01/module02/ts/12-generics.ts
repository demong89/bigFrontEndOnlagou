// 泛型

function createNumberArray(length:number,value:number):number[] {
    const arr = new Array<number>(length).fill(value);
    return arr
}
// function createNumberString(length:number,a:string):string[] {
//     const arr = new Array<string>(length).fill(a);
//     return arr
// }

// function createArray<T>(length:number,value:T):T[] {
//     const arr = new Array<T>(length).fill(value);
//     return arr
// }