import foo from './foo'
// import $ from 'jquery'
import './style.css'
foo.bar()

if(module.hot){
    module.hot.accept(()=>{
        console.log('html');
        
    })
}
// $(document.body).append('<h1></h1>')