var fn1 = function(){
    this.foo = function(){
        console.log(1111);
    }
}
var f1 = new fn1()

var fn2 = function(){}
fn2.prototype.foo = function(){
    console.log(1111);
}
let f2 = new fn2()