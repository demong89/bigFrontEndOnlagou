interface Eat {
    eat(food:string):void
}
interface Run{
    run(distance:number) :void
}

class Person1 implements Eat,Run{
    eat(food:string):void{}
    run(distance:number):void{}
}

class Animals implements Eat,Run{
    eat(food:string):void{}
    run(distance:number):void{}
}