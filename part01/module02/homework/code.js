// var a = [];
// for (var index = 0; index < 10; index++) {
//    a[index] = function(){
//        console.log(index);
//    }
// }
// a[6]()



// var tmp = 123;
// if(true){
//     console.log(tmp);
//     let tmp;
// }




// var arr = [12,34,32,89,4]
// console.log(Math.min(...arr));

var a = 10;
var obj = {
    a:20,
    fn(){
        setTimeout(()=>{
            console.log(this.a);
        },0)
    }
}
obj.fn();