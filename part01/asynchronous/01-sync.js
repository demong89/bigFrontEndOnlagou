console.log('start');
function bar(){
    console.log('bar');
}
function foo(){
    console.log('foo');
    bar()
}
foo();
console.log('end');
