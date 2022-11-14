function * foo(){
    console.log('start');
    
    try {
        const res = yield 'foo'
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}
const generator = foo();
const res = generator.next();
console.log(res);

// generator.throw(new Error('xxx error'))
