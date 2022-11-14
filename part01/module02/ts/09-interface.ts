// function printPost(post){
//     console.log(post.title);
//     console.log(post.content);
// }
// 接口
interface Post{
    title:string
    content:string
    subtitle?:string // 可选成员
    readonly summary:string // 只读成员
}


function printPost(post:Post){
    console.log(post.title);
    console.log(post.content);
}
printPost({
    title:'标题',
    content:'这是一段文字',
    summary:'摘要'
})


// 任意成员
interface Cache{
    [prop:string]:string
}

