/**
 * @flow
 */

 function fn(a:number,b:number) :number{
     return a+b
 }


 function foo(cb:(string,number)=>void) {
     cb('str',100)
 }