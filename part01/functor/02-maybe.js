class MayBe{
    static of(val){
        return new MayBe(val)
    }
    constructor(val){
        this._val = val
    }
    map(fn){
        return this.isNothing()?MayBe.of(null):MayBe.of(fn(this._val))
    }
    isNothing(){
        return this._val === null || this._val === undefined
    }
}

let r = MayBe.of('hello lala').map(x=>x.toUpperCase())
// console.log(r);

let r1 = MayBe.of(null).map(x=>x.toUpperCase())
// console.log(r1);

let r2 = MayBe.of('hello lala')
        .map(x=>x.toUpperCase())
        .map(x=>null)
        .map(x=>x.split(' '))
console.log(r2);
