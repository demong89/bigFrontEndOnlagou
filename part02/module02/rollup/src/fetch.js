export default endpoint =>{
    return fetch(`https://jsonplaceholder.typicode.com${endpoint}`).then(res=>res.json())
}