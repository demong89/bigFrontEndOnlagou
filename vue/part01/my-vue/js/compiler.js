class Compiler{
    constructor(vm){
        this.el = vm.$el;
        this.vm = vm;
        this.compile(this.el)
    }
    // 编译模块，处理文本节点和元素节点
    compile(el){
        let childNodes = el.childNodes;
        Array.from(childNodes).forEach(node=>{

            if(this.isTextNode(node)){
                this.compileText(node)
            }else if(this.isElementNode(node)){
                this.compileElement(node)
            }
            // 判断node是否有子节点
            if(node.childNodes&&node.childNodes.length){
                this.compile(node)
            }
        })
    }
    // 处理元素节点
    compileElement(node){
        // 遍历属性节点
        Array.from(node.attributes).forEach(attr=>{
            let attrName = attr.name;
            if(this.isDirective(attrName)){
                attrName = attrName.substr(2)
                let key = attr.value;
                if (attrName.indexOf(':')!==-1) {
                    let eventType = attrName.split(':')[1]
                    this.handleEvent(this,node,eventType,key)
                }
                this.update(node, key, attrName)
            }
        })
    }
    update(node,key, attrName){
       let updateFn =  this[attrName+'Updater']
       updateFn && updateFn.call(this,node,this.vm[key],key)
    }
    handleEvent(vm,node,eventType,eventName){
        console.log(vm,node,eventType);
        node.addEventListener(eventType,()=>{
            vm.vm.$options.methods[eventName]()
        })
    }
    htmlUpdater(node,value,key){
        node.innerHTML = value;
        new Watcher(this.vm, key, (newValue)=>{
            node.innerHTML = newValue
        })
    }
    onUpdater(node,value,key){
        console.log(node,value,key);
        
    }
    textUpdater(node,value,key){
        node.textContent = value;
        new Watcher(this.vm, key, (newValue)=>{
            node.textContent = newValue
        })
    }
    modelUpdater(node,value,key){
        node.value = value;
        new Watcher(this.vm, key, (newValue)=>{
            node.value = newValue
        })
        // 双向绑定
        node.addEventListener('input',()=>{
            this.vm[key] = node.value
        })
    }
    // 处理文本节点
    compileText(node){
        // console.log(node);
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if(reg.test(value)){
            let key = RegExp.$1.trim();
            node.textContent = value.replace(reg,this.vm[key])
            new Watcher(this.vm, key, (newValue)=>{
                node.textContent = newValue
            })
        }

    }
    // 判断元素属性是否是指令
    isDirective(attrName){
        return attrName.startsWith('v-')
    }
    // 判断节点是否是文本节点
    isTextNode(node){
        return node.nodeType === 3
    }
    // 判断节点是否是元素节点
    isElementNode(node){
        return node.nodeType === 1
    }
}