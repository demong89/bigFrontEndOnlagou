console.log('start');

setTimeout(()=>{
    console.log('timer1');
},1800)
setTimeout(()=>{
    console.log('timer2');
    setTimeout(()=>{
        console.log('inner');
    },1000)
},1000)
console.log('end');
// start
// end
// timer2
// timer1
// inner