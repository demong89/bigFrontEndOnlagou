class Observer{
    constructor(data){
        this.walk(data)
    }
    walk(data){
        // 判断data是否是对象
        if(!data||typeof data!=='object') return
        // 遍历data对象所有属性
        Object.keys(data).forEach(key=>{
            this.defineReactive(data,key,data[key])
        })
    }
    // 传第三个参数val 不使用obj[key] 原因：会发生死递归
    defineReactive(obj,key,val){
        let _this = this;
        let dep = new Dep();
        this.walk(val);//如果val是对象 会将val内部的数据转为响应式
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get(){
                // 收集依赖
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set(newVal){
                if(newVal === val) return;
                val = newVal;
                _this.walk(newVal)
                // 发送通知
                dep.notify()
            }
        })
    }
}