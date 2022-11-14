const arrList = [1,2,3,4,5,6,6,78,9,0]

for (let i = arrList.length; i ; i--) {
    console.log(arrList[i]);
    
}
for (const i in arrList) {
    console.log(arrList[i]);
}
arrList.forEach((item)=>{
    console.log(item);
})