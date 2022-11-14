class Watcher{
    constructor(vm, key, cb){
        this.vm = vm;
        this.key = key//data中属性的名称
        this.cb = cb// 回调函数负责更新视图
        // 把watcher对象记录到Dep类的静态属性target上
        Dep.target = this;
        // 触发get方法 在get方法中调用addSub
        this.oldValue = vm[key]
        Dep.target = null;
    }
    update(){
        let newValue = this.vm[this.key]
        if(this.oldValue === newValue){
            return
        }
        this.cb(newValue)
    }
}