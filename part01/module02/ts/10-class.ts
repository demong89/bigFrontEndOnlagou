// TS增强了class的特性

class Person {
    name:string
    age:number
    protected gendar:boolean
    constructor(name:string,age:number){
        this.name = name
        this.age =age
        this.gendar = true
    }
    sayHi(msg:string):void{

    }
}

// 类的访问修饰符 private（不能外部访问）
//  public（默认）
//  protected（不能外部访问,子类可访问）

class Student extends Person{
    constructor(name:string,age:number){
        super(name,age)
        console.log(this.gendar);
    }
    static create(name:string,age:number){
        return new Student(name,age)
    }
}

const tom = new Person('tom',10)
console.log(tom.name);

const jack = new Student('jack',13)


// 只读属性 - readonly 