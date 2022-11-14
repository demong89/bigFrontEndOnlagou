let obj = {name:'xx'}

let ali = obj; 

obj = null;

// 可达对象
function objGroup(obj1,obj2) {
    obj1.next = obj2;
    obj2.pre = obj1;
    return {
        o1:obj1,
        o2:obj2
    }
}

let obj00 = objGroup({name:'222'},{name:'333'})