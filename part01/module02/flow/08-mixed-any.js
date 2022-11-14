// @flow

// mixed 任意类型  --- 强类型
function passMixed(value:mixed){
    if(typeof value === 'string'){
        value.substr(1)
    }
}
passMixed('2ss')
passMixed(20)
// any  --- 弱类型 
function passMixe2(value:any){

}


/**
 * any 和 mixed区别
 * 
 * any是弱类型的，mixed是强类型的。
 * 尽量不要使用any
 * 
 */
