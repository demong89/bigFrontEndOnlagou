function Person() {
    this.name = 'icoder';
    this.age = 22;
    this.getAge = function(){
        return this.age
    }
}

const p1 = new Person();
const a1 = p1.getAge();



function Person() {
    this.name = 'icoder';
    this.age = 22;
}
const p2 = new Person()
const a2 = p2.age;